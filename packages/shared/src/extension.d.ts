import type { RPCPayload } from './app';
import type { RPCCallOptions, RPCResult } from './interfaces';
import * as altServer from '@altv/server';

declare module '@altv/shared' {
    export namespace RPC {
        // Client
        export interface CustomClientRPC {}
        export interface CustomClientToServerRPC {}
        export interface CustomClientToWebviewRPC {}
        // Server
        export interface CustomServerRPC {}
        export interface CustomServerToClientRPC {}
        export interface CustomServerToWebViewRPC {}
        // WebView
        export interface CustomWebViewRPC {}
        export interface CustomWebViewToClientRPC {}
        export interface CustomWebViewToServerRPC {}
    }

    export namespace Events {
        // Mango
        export interface CustomWebViewToServerEvent {}
        export interface CustomServerToWebViewEvent {
            'RPC::CALL_WEBVIEW': (body: RPCPayload) => Promise<void>;
        }
        export interface CustomWebViewToWebViewEvent {}
        // altV
        export interface CustomClientToWebViewEvent {
            'RPC::CALL_WEBVIEW': (body: RPCPayload) => Promise<void>;
        }
        export interface CustomServerToPlayerEvent {
            'SERVER::EMIT_WEBVIEW': (body: { payload: unknown; id: string | number; eventName: string }) => void;
            'RPC::CALL_CLIENT': (body: RPCPayload) => Promise<void>;
        }
        export interface CustomPlayerToServerEvent {
            'RPC::CALL_SERVER': (body: RPCPayload) => Promise<void>;
        }
    }
}

declare module '@altv/server' {
    export interface Player {
        emitWebView<E extends string>(id: string | number, eventName: E, body?: unknown): void;
        call<E extends string, U extends altServer.Player>(
            player: U,
            rpcName: E,
            body?: unknown,
            options?: RPCCallOptions,
        ): Promise<RPCResult>;
        callWebView<E extends string, U extends altServer.Player>(
            player: U,
            id: string | number,
            rpcName: E,
            body?: unknown,
            options?: RPCCallOptions,
        ): Promise<RPCResult>;
    }
}
