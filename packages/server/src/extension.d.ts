import type { Events as SharedEvents, RPC as SharedRPC } from '@altv/shared';
import type { Events as ServerEvents } from '@altv/server';

declare module '@altv/shared' {
    export namespace RPC {
        export interface CustomClientToServerRPC {}
        export interface CustomClientToWebviewRPC {}
        export interface CustomServerToClientRPC {}
        export interface CustomServerToWebViewRPC {}
        export interface CustomWebViewToClientRPC {}
        export interface CustomWebViewToServerRPC {}
    }

    export namespace Events {
        export interface CustomWebViewToServerEvent {}
        export interface CustomServerToWebViewEvent {}
        export interface CustomClientToWebViewEvent {}
        export interface CustomServerToPlayerEvent {}
        export interface CustomPlayerToServerEvent {}
        export interface CustomWebViewToClientEvent {}
    }
}

declare module '@altv/server' {
    export namespace RPC {
        export interface CustomServerRPC {}
    }

    export interface Player {
        emitWebView<E extends keyof SharedEvents.CustomServerToPlayerEvent>(eventName: E, body?: unknown): void;
        emitWebView<E extends string>(
            id: string | number,
            eventName: Exclude<E, keyof SharedEvents.CustomServerToPlayerEvent>,
            body?: unknown,
        ): void;
        call<E extends keyof SharedRPC.CustomServerToPlayerRpcEvent>(eventName: E, body?: unknown): void;
        call<E extends string>(
            rpcName: Exclude<E, keyof SharedRPC.CustomServerToPlayerRpcEvent>,
            body?: unknown,
            options?: SharedRPCCallOptions,
        ): Promise<SharedRPCResult>;
        callWebView<E extends keyof SharedRPC.CustomServerToWebViewRPC>(
            id: string | number,
            rpcName: E,
            body?: unknown,
            options?: RPCCallOptions,
        ): Promise<SharedRPCResult>;
        callWebView<E extends string>(
            id: string | number,
            rpcName: Exclude<E, keyof SharedRPC.CustomServerToWebViewRPC>,
            body?: unknown,
            options?: RPCCallOptions,
        ): Promise<SharedRPCResult>;
    }
}
