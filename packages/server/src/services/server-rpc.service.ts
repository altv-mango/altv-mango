import { inject, injectable } from 'inversify';
import {
    BaseRPCService,
    EventDestination,
    type RPCPayload,
    RPC_RESULT_TIMEOUT,
    RPC_RESULT_PLAYER_DISCONNECTED,
    RPC_RESULT_PLAYER_NOT_FOUND,
} from '@altv-mango/core/app';
import {
    EVENT_SERVICE,
    ErrorMessage,
    type RPCCallOptions,
    type RPCResult,
    type ScriptRPCHandler,
    generateRandomId,
} from '@altv-mango/core';
import type { RPCService } from '../interfaces';
import type { ServerEventService } from './server-event.service';
import * as altServer from '@altv/server';
import * as altShared from '@altv/shared';

@injectable()
export class ServerRPCService extends BaseRPCService<altShared.RPC.CustomServerRPC> implements RPCService {
    @inject(EVENT_SERVICE) private readonly $eventService: ServerEventService;
    public readonly $clientHandlers = new Map<string, ScriptRPCHandler>();
    public readonly $webViewHandlers = new Map<string, ScriptRPCHandler>();

    public async callPlayer<E extends keyof altShared.RPC.CustomServerToClientRPC, U extends altServer.Player>(
        player: U,
        rpcName: E,
        body?: Parameters<altShared.RPC.CustomServerToClientRPC[E]>[0],
        options?: RPCCallOptions,
    ): Promise<RPCResult<ReturnType<altShared.RPC.CustomServerToClientRPC[E]>>>;
    public async callPlayer<E extends string, U extends altServer.Player>(
        player: U,
        rpcName: E,
        body?: unknown,
        options?: RPCCallOptions,
    ): Promise<RPCResult>;
    public async callPlayer<E extends string, U extends altServer.Player>(
        player: U,
        rpcName: E,
        body?: unknown,
        options: RPCCallOptions = { timeout: this.$TIMEOUT },
    ): Promise<RPCResult> {
        return this.$handleCall(player, rpcName, EventDestination.Client, options, body);
    }

    public onPlayerRequest<E extends keyof altShared.RPC.CustomClientToServerRPC, U extends altServer.Player>(
        rpcName: E,
        handler: (
            sender: U,
            body: Parameters<altShared.RPC.CustomClientToServerRPC[E]>[0],
        ) => ReturnType<altShared.RPC.CustomClientToServerRPC[E]>,
    ): ScriptRPCHandler;
    public onPlayerRequest<E extends string, U extends altServer.Player>(
        rpcName: E,
        handler: (sender: U, body: unknown) => unknown | Promise<unknown>,
    ): ScriptRPCHandler;
    public onPlayerRequest<E extends string, U extends altServer.Player>(
        rpcName: E,
        handler: (sender: U, body: unknown) => unknown | Promise<unknown>,
    ): ScriptRPCHandler {
        if (this.$clientHandlers.has(rpcName)) {
            this.$loggerService.error('An error occurred while trying to register RPC.');
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

    public async callWebView<E extends keyof altShared.RPC.CustomServerToWebViewRPC, U extends altServer.Player>(
        player: U,
        id: string | number,
        rpcName: E,
        body?: Parameters<altShared.RPC.CustomServerToWebViewRPC[E]>[0],
        options?: RPCCallOptions,
    ): Promise<RPCResult<ReturnType<altShared.RPC.CustomServerToWebViewRPC[E]>>>;
    public async callWebView<E extends string, U extends altServer.Player>(
        player: U,
        id: string | number,
        rpcName: E,
        body?: unknown,
        options?: RPCCallOptions,
    ): Promise<RPCResult>;
    public async callWebView<E extends string, U extends altServer.Player>(
        player: U,
        id: string | number,
        rpcName: E,
        body?: unknown,
        options: RPCCallOptions = { timeout: this.$TIMEOUT },
    ): Promise<RPCResult> {
        return this.$handleCall(player, rpcName, EventDestination.WebView, options, body, id);
    }

    public onWebViewRequest<E extends string, U extends altServer.Player>(
        id: string | number,
        rpcName: E,
        handler: (player: U, body: unknown) => unknown | Promise<unknown>,
    ): ScriptRPCHandler;
    public onWebViewRequest<E extends keyof altShared.RPC.CustomWebViewToServerRPC, U extends altServer.Player>(
        id: string | number,
        rpcName: E,
        handler: (
            player: U,
            body: Parameters<altShared.RPC.CustomWebViewToServerRPC[E]>[0],
        ) => ReturnType<altShared.RPC.CustomWebViewToServerRPC[E]>,
    ): ScriptRPCHandler;
    public onWebViewRequest<E extends keyof altShared.RPC.CustomWebViewToServerRPC, U extends altServer.Player>(
        id: string | number,
        rpcName: E,
        handler: (
            player: U,
            body: Parameters<altShared.RPC.CustomWebViewToServerRPC[E]>[0],
        ) => ReturnType<altShared.RPC.CustomWebViewToServerRPC[E]>,
    ): ScriptRPCHandler {
        const key = `${id}::${rpcName}`;
        if (this.$webViewHandlers.has(key)) {
            this.$loggerService.error('An error occurred while trying to register RPC.');
            throw new Error(ErrorMessage.RPCHandlerAlreadyExists);
        }

        const rpcHandler: ScriptRPCHandler = {
            destroy: () => {
                // @ts-ignore
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
        player: altServer.Player,
        rpcName: string,
        destination: EventDestination, // 'client' | 'webview',
        options?: Partial<RPCCallOptions>,
        body?: unknown,
        webViewId?: string | number,
    ) {
        return new Promise<RPCResult<TResult>>((resolve) => {
            if (!player.valid) {
                resolve(<RPCResult<TResult>>RPC_RESULT_PLAYER_NOT_FOUND);
                return;
            }

            const callId = generateRandomId();
            let timeoutId: NodeJS.Timeout;

            const disconnectHandler = this.$eventService.onPlayerDisconnect((context) => {
                if (context.player === player) {
                    clearTimeout(timeoutId);
                    disconnectHandler.destroy();
                    resolve(<RPCResult<TResult>>RPC_RESULT_PLAYER_DISCONNECTED);
                }
            });

            const onceHandle = (_player: altServer.Player, body: unknown) => {
                clearTimeout(timeoutId);
                disconnectHandler.destroy();
                resolve(<RPCResult<TResult>>body);
            };
            // Example: RPC::RETURN_FROM_SERVER_21ewrEq, RPC::RETURN_FROM_WEBVIEW_teEqd2
            const eventHandler =
                destination === EventDestination.WebView
                    ? this.$eventService.onceWebView(webViewId!, 'RPC::RETURN_FROM_WEBVIEW', onceHandle)
                    : this.$eventService.oncePlayer('RPC::RETURN_FROM_SERVER', onceHandle);

            const payload: RPCPayload = {
                source: EventDestination.Server,
                destination,
                id: callId,
                rpcName,
                body,
            };
            // Example: RPC::CALL_SERVER, RPC::CALL_WEBVIEW
            destination === EventDestination.WebView
                ? this.$eventService.emitWebViews([player], webViewId!, 'RPC::CALL_WEBVIEW', payload)
                : this.$eventService.emitPlayers([player], 'RPC::CALL_SERVER', payload);

            timeoutId = setTimeout(() => {
                eventHandler.destroy();
                resolve(<RPCResult<TResult>>RPC_RESULT_TIMEOUT);
            }, options?.timeout ?? this.$TIMEOUT);
        });
    }
}
