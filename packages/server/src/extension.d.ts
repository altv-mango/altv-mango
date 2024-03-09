import * as altShared from '@altv/shared';
import * as altServer from '@altv/server';

declare module '@altv/server' {
    export namespace RPC {
        export interface CustomServerRPC {}
    }

    export interface Player {
        emitWebView<E extends keyof altShared.Events.CustomServerToPlayerEvent>(eventName: E, body?: unknown): void;
        emitWebView<E extends string>(
            id: string | number,
            eventName: Exclude<E, keyof altShared.Events.CustomServerToPlayerEvent>,
            body?: unknown,
        ): void;
        call<E extends keyof altShared.RPC.CustomServerToPlayerRpcEvent>(eventName: E, body?: unknown): void;
        call<E extends string>(
            rpcName: Exclude<E, keyof altShared.RPC.CustomServerToPlayerRpcEvent>,
            body?: unknown,
            options?: altShared.RPCCallOptions,
        ): Promise<altShared.RPCResult>;
        callWebView<E extends keyof altShared.RPC.CustomServerToWebViewRPC>(
            id: string | number,
            rpcName: E,
            body?: unknown,
            options?: RPCCallOptions,
        ): Promise<altShared.RPCResult>;
        callWebView<E extends string>(
            id: string | number,
            rpcName: Exclude<E, keyof altShared.RPC.CustomServerToWebViewRPC>,
            body?: unknown,
            options?: RPCCallOptions,
        ): Promise<altShared.RPCResult>;
    }
}
