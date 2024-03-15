import {
    generateRandomId,
    isNil,
    RPCResultStatus,
    type RPCCallOptions,
    type RPCResult,
    type ScriptRPCHandler,
    ErrorMessage,
} from '@altv-mango/core';
import { EventDestination, RPC_RESULT_HANDLER_NOT_FOUND, RPC_RESULT_TIMEOUT, type RPCPayload } from '@altv-mango/core/app';
import type { RPCService } from '../interfaces';
import type { WebViewEventService } from './webview-event.service';
import type { WebViewLoggerService } from './webview-logger.service';
import type { RPC as SharedRPC } from '@altv/shared';
import type { RPC as WebViewRPC } from '@altv/webview';

export class WebViewRPCService implements RPCService {
    private readonly $TIMEOUT = 2000;
    public readonly $localHandlers = new Map<string, ScriptRPCHandler>();
    public readonly $clientHandlers = new Map<string, ScriptRPCHandler>();
    public readonly $serverHandlers = new Map<string, ScriptRPCHandler>();

    public constructor(private readonly $eventService: WebViewEventService, private readonly $loggerService: WebViewLoggerService) {}

    public async call<E extends keyof WebViewRPC.CustomWebViewRPC>(
        rpcName: E,
        body?: Parameters<WebViewRPC.CustomWebViewRPC[E]>[0],
        options?: RPCCallOptions,
    ): Promise<RPCResult<ReturnType<WebViewRPC.CustomWebViewRPC[E]>>>;
    public async call<E extends string>(
        rpcName: Exclude<E, keyof WebViewRPC.CustomWebViewRPC>,
        body?: unknown,
        options?: RPCCallOptions,
    ): Promise<RPCResult>;
    public async call<E extends string>(
        rpcName: Exclude<E, keyof WebViewRPC.CustomWebViewRPC>,
        body?: unknown,
        options: RPCCallOptions = { timeout: this.$TIMEOUT },
    ): Promise<RPCResult> {
        return new Promise(async (resolve) => {
            const rpcHandler = this.$localHandlers.get(rpcName);
            if (isNil(rpcHandler)) {
                resolve(RPC_RESULT_HANDLER_NOT_FOUND);
                return;
            }

            const timeoutId = setTimeout(() => {
                resolve(RPC_RESULT_TIMEOUT);
            }, options.timeout);

            const result = await rpcHandler.handler(body);
            clearTimeout(timeoutId);
            resolve({ success: true, status: RPCResultStatus.Success, body: result, error: undefined });
        });
    }

    public onRequest<E extends keyof WebViewRPC.CustomWebViewRPC>(
        rpcName: E,
        handler: (body: Parameters<WebViewRPC.CustomWebViewRPC[E]>[0]) => ReturnType<WebViewRPC.CustomWebViewRPC[E]>,
    ): ScriptRPCHandler;
    public onRequest<E extends string>(
        rpcName: Exclude<E, keyof WebViewRPC.CustomWebViewRPC>,
        handler: (body: unknown) => unknown | Promise<unknown>,
    ): ScriptRPCHandler;
    public onRequest<E extends string>(
        rpcName: Exclude<E, keyof WebViewRPC.CustomWebViewRPC>,
        handler: (body: unknown) => unknown | Promise<unknown>,
    ): ScriptRPCHandler {
        if (this.$localHandlers.has(rpcName)) {
            this.$loggerService.error('An error occurred while registering a RPC handler.');
            throw new Error(ErrorMessage.RPCHandlerAlreadyExists);
        }
        const rpcHandler: ScriptRPCHandler = {
            destroy: () => {
                // @ts-ignore
                rpcHandler.valid = false;
                this.$localHandlers.delete(rpcName);
            },
            rpcName,
            handler,
            valid: true,
        };
        this.$localHandlers.set(rpcName, rpcHandler);
        return rpcHandler;
    }

    public callServer<E extends keyof SharedRPC.CustomWebViewToServerRPC>(
        rpcName: E,
        body?: Parameters<SharedRPC.CustomWebViewToServerRPC[E]>[0],
        options?: RPCCallOptions,
    ): Promise<RPCResult<ReturnType<SharedRPC.CustomWebViewToServerRPC[E]>>>;
    public callServer<E extends string>(
        rpcName: Exclude<E, keyof SharedRPC.CustomWebViewToServerRPC>,
        body?: unknown,
        options?: RPCCallOptions,
    ): Promise<RPCResult>;
    public callServer<E extends string>(
        rpcName: Exclude<E, keyof SharedRPC.CustomWebViewToServerRPC>,
        body?: unknown,
        options: RPCCallOptions = { timeout: this.$TIMEOUT },
    ): Promise<RPCResult> {
        return this.$handleCall(rpcName, EventDestination.Server, options, body);
    }

    public onServerRequest<E extends keyof SharedRPC.CustomServerToWebViewRPC>(
        rpcName: E,
        handler: (body: Parameters<SharedRPC.CustomServerToWebViewRPC[E]>[0]) => ReturnType<SharedRPC.CustomServerToWebViewRPC[E]>,
    ): ScriptRPCHandler;
    public onServerRequest<E extends string>(
        rpcName: Exclude<E, keyof SharedRPC.CustomServerToWebViewRPC>,
        handler: (body: unknown) => unknown | Promise<unknown>,
    ): ScriptRPCHandler;
    public onServerRequest<E extends string>(
        rpcName: Exclude<E, keyof SharedRPC.CustomServerToWebViewRPC>,
        handler: (body: unknown) => unknown | Promise<unknown>,
    ): ScriptRPCHandler {
        if (this.$serverHandlers.has(rpcName)) {
            this.$loggerService.error('An error occurred while registering a RPC handler.');
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

    public callPlayer<E extends keyof SharedRPC.CustomWebViewToClientRPC>(
        rpcName: E,
        body?: Parameters<SharedRPC.CustomWebViewToClientRPC[E]>[0],
        options?: RPCCallOptions,
    ): Promise<RPCResult<ReturnType<SharedRPC.CustomWebViewToClientRPC[E]>>>;
    public callPlayer<E extends string>(
        rpcName: Exclude<E, keyof SharedRPC.CustomWebViewToClientRPC>,
        body?: unknown,
        options?: RPCCallOptions,
    ): Promise<RPCResult>;
    public callPlayer<E extends string>(
        rpcName: Exclude<E, keyof SharedRPC.CustomWebViewToClientRPC>,
        body?: unknown,
        options: RPCCallOptions = { timeout: this.$TIMEOUT },
    ): Promise<RPCResult> {
        return this.$handleCall(rpcName, EventDestination.Client, options, body);
    }

    public onPlayerRequest<E extends keyof SharedRPC.CustomClientToWebviewRPC>(
        rpcName: E,
        handler: (body: Parameters<SharedRPC.CustomClientToWebviewRPC[E]>[0]) => ReturnType<SharedRPC.CustomClientToWebviewRPC[E]>,
    ): ScriptRPCHandler;
    public onPlayerRequest<E extends string>(
        rpcName: Exclude<E, keyof SharedRPC.CustomClientToWebviewRPC>,
        handler: (body: unknown) => unknown | Promise<unknown>,
    ): ScriptRPCHandler;
    public onPlayerRequest<E extends string>(
        rpcName: Exclude<E, keyof SharedRPC.CustomClientToWebviewRPC>,
        handler: (body: unknown) => unknown | Promise<unknown>,
    ): ScriptRPCHandler {
        if (this.$clientHandlers.has(rpcName)) {
            this.$loggerService.error('An error occurred while registering a RPC listener.');
            throw new Error(ErrorMessage.RPCHandlerAlreadyExists);
        }
        const rpcHandler: ScriptRPCHandler = {
            destroy: () => {
                // @ts-ignore
                rpcHandler.valid = false;
                this.$clientHandlers.delete(rpcName);
            },
            rpcName,
            handler,
            valid: true,
        };
        this.$clientHandlers.set(rpcName, rpcHandler);
        return rpcHandler;
    }

    private async $handleCall<TResult>(
        rpcName: string,
        destination: EventDestination, // 'client' | 'server',
        options?: Partial<RPCCallOptions>,
        body?: unknown,
    ) {
        return new Promise<RPCResult<TResult>>((resolve) => {
            const callId = generateRandomId();
            let timeoutId: number;

            const onceHandle = (body: unknown) => {
                clearTimeout(timeoutId);
                resolve(<RPCResult<TResult>>body);
            };
            const scriptEventHandler =
                destination === EventDestination.Server
                    ? this.$eventService.onceServer(`RPC::RETURN_FROM_SERVER_${callId}`, onceHandle)
                    : this.$eventService.oncePlayer(`RPC::RETURN_FROM_CLIENT_${callId}`, onceHandle);

            const payload: RPCPayload = {
                source: EventDestination.WebView,
                destination,
                id: callId,
                rpcName,
                body,
            };
            destination === EventDestination.Server
                ? this.$eventService.emitPlayer('RPC::CALL_SERVER', payload)
                : this.$eventService.emitPlayer('RPC::CALL_CLIENT', payload);

            timeoutId = setTimeout(() => {
                scriptEventHandler.destroy();
                resolve(<RPCResult<TResult>>RPC_RESULT_TIMEOUT);
            }, options?.timeout ?? this.$TIMEOUT);
        });
    }
}
