import { inject, injectable } from 'inversify';
import { BaseRPCService, EventDestination, type RPCPayload, RPC_RESULT_TIMEOUT } from '@altv-mango/core/app';
import {
    ErrorMessage,
    EVENT_SERVICE,
    generateRandomId,
    type RPCCallOptions,
    type RPCResult,
    type ScriptRPCHandler,
} from '@altv-mango/core';
import type { RPCService } from '../interfaces';
import type { ClientEventService } from './client-event.service';
import type { RPC as SharedRPC } from '@altv/shared';
import type { RPC as ClientRPC } from '@altv/client';

@injectable()
export class ClientRPCService extends BaseRPCService<ClientRPC.CustomClientRPC> implements RPCService {
    @inject(EVENT_SERVICE) private readonly $eventService: ClientEventService;
    public readonly $serverHandlers = new Map<string, ScriptRPCHandler>();
    public readonly $webViewHandlers = new Map<string, ScriptRPCHandler>();

    public async callServer<E extends keyof SharedRPC.CustomClientToServerRPC>(
        rpcName: E,
        body: Parameters<SharedRPC.CustomClientToServerRPC[E]>[0],
        options?: RPCCallOptions,
    ): Promise<RPCResult<SharedRPC.CustomServerToClientRPC[E]>>;
    public async callServer<E extends string>(
        rpcName: Exclude<E, keyof SharedRPC.CustomClientToServerRPC>,
        body?: unknown,
        options?: RPCCallOptions,
    ): Promise<RPCResult>;
    public async callServer<E extends string>(
        rpcName: Exclude<E, keyof SharedRPC.CustomClientToServerRPC>,
        body?: unknown,
        options: RPCCallOptions = { timeout: this.$TIMEOUT },
    ) {
        return this.$handleCall(rpcName, EventDestination.Server, options, body);
    }

    public onServerRequest<E extends keyof SharedRPC.CustomServerToClientRPC>(
        rpcName: E,
        handler: (body: Parameters<SharedRPC.CustomServerToClientRPC[E]>[0]) => ReturnType<SharedRPC.CustomServerToClientRPC[E]>,
    ): ScriptRPCHandler;
    public onServerRequest<E extends string>(
        rpcName: Exclude<E, keyof SharedRPC.CustomServerToClientRPC>,
        handler: (body: unknown) => unknown | Promise<unknown>,
    ): ScriptRPCHandler;
    public onServerRequest<E extends string>(
        rpcName: Exclude<E, keyof SharedRPC.CustomServerToClientRPC>,
        handler: (body: unknown) => unknown | Promise<unknown>,
    ) {
        if (this.$serverHandlers.has(rpcName)) {
            this.$loggerService.error('An error occurred while trying to register RPC.');
            throw new Error(ErrorMessage.RPCHandlerAlreadyExists);
        }
        const rpcHandler: ScriptRPCHandler = {
            destroy: () => {
                // @ts-ignore
                rpcHandler.valid = false;
                this.$serverHandlers.delete(rpcName);
            },
            rpcName,
            handler,
            valid: true,
        };
        this.$serverHandlers.set(rpcName, rpcHandler);
        return rpcHandler;
    }

    public async callWebView<E extends keyof SharedRPC.CustomClientToWebviewRPC>(
        id: string | number,
        rpcName: E,
        body: Parameters<SharedRPC.CustomClientToWebviewRPC[E]>[0],
        options?: RPCCallOptions,
    ): Promise<RPCResult<SharedRPC.CustomClientToWebviewRPC[E]>>;
    public async callWebView<E extends string>(
        id: string | number,
        rpcName: Exclude<E, keyof SharedRPC.CustomClientToWebviewRPC>,
        body?: unknown,
        options?: RPCCallOptions,
    ): Promise<RPCResult>;
    public async callWebView<E extends string>(
        id: string | number,
        rpcName: Exclude<E, keyof SharedRPC.CustomClientToWebviewRPC>,
        body?: unknown,
        options: RPCCallOptions = { timeout: this.$TIMEOUT },
    ) {
        return this.$handleCall(rpcName, EventDestination.WebView, options, body, id);
    }

    public onWebViewRequest<E extends keyof SharedRPC.CustomWebViewToClientRPC>(
        id: string | number,
        rpcName: E,
        handler: (body: Parameters<SharedRPC.CustomWebViewToClientRPC[E]>[0]) => ReturnType<SharedRPC.CustomWebViewToClientRPC[E]>,
    ): ScriptRPCHandler;
    public onWebViewRequest<E extends string>(
        id: string | number,
        rpcName: Exclude<E, keyof SharedRPC.CustomWebViewToClientRPC>,
        handler: (body: unknown) => unknown | Promise<unknown>,
    ): ScriptRPCHandler;
    public onWebViewRequest<E extends string>(
        id: string | number,
        rpcName: Exclude<E, keyof SharedRPC.CustomWebViewToClientRPC>,
        handler: (body: unknown) => unknown | Promise<unknown>,
    ) {
        const key = `${id}::${rpcName}`;
        if (this.$webViewHandlers.has(key)) {
            this.$loggerService.error('An error occurred while trying to register RPC.');
            throw new Error(ErrorMessage.RPCHandlerAlreadyExists);
        }

        const rpcHandler = {
            destroy: () => {
                rpcHandler.valid = false;
                this.$webViewHandlers.delete(key);
            },
            rpcName,
            handler,
            valid: true,
        };

        this.$webViewHandlers.set(key, rpcHandler);

        return rpcHandler;
    }

    private async $handleCall<TResult>(
        rpcName: string,
        destination: EventDestination, // 'server' | 'webview',
        options?: Partial<RPCCallOptions>,
        body?: unknown,
        webViewId?: string | number,
    ) {
        return new Promise<RPCResult<TResult>>((resolve) => {
            const callId = generateRandomId();
            let timeoutId: NodeJS.Timeout;

            const onceHandle = (resultData: unknown) => {
                clearTimeout(timeoutId);
                resolve(<RPCResult<TResult>>resultData);
            };
            // Example: RPC::RETURN_FROM_SERVER_21ewrEq, RPC::RETURN_FROM_WEBVIEW_teEqd2
            const eventHandler =
                destination === EventDestination.WebView
                    ? this.$eventService.onceWebView(webViewId!, `RPC::RETURN_FROM_WEBVIEW_${callId}`, onceHandle)
                    : this.$eventService.onceServer(`RPC::RETURN_FROM_SERVER_${callId}`, onceHandle);

            const payload: RPCPayload = {
                source: EventDestination.Client,
                destination,
                id: callId,
                rpcName,
                body,
            };
            // Example: RPC::CALL_SERVER, RPC::CALL_WEBVIEW
            destination === EventDestination.WebView
                ? this.$eventService.emitWebView(webViewId!, 'RPC::CALL_WEBVIEW', payload)
                : this.$eventService.emitServer('RPC::CALL_SERVER', payload);

            timeoutId = setTimeout(() => {
                eventHandler.destroy();
                resolve(<RPCResult<TResult>>RPC_RESULT_TIMEOUT);
            }, options?.timeout ?? this.$TIMEOUT);
        });
    }
}
