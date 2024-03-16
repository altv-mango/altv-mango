import type { Events } from '@altv/shared';
import type { RPCPayload } from '../src/app';

declare module '@altv/shared' {
    export namespace RPC {
        // Client
        export interface CustomClientToServerRPC {}
        export interface CustomClientToWebviewRPC {}
        // Server
        export interface CustomServerToClientRPC {}
        export interface CustomServerToWebViewRPC {}
        // WebView
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

        export interface CustomWebViewToClientEvent {
            'RPC::CALL_CLIENT': (body: RPCPayload) => Promise<void>;
            'RPC::CALL_SERVER': (body: RPCPayload) => void;
            'WEBVIEW::EMIT_SERVER': (body: { eventName: string; payload: Record<string, unknown> }) => void;
        }
    }
}

declare module '@altv/server' {
    export namespace RPC {
        export interface CustomServerRPC {}
    }

    export namespace Events {
        export interface CustomServerEvent {}
    }
}

declare module '@altv/client' {
    export namespace RPC {
        export interface CustomClientRPC {}
    }

    export namespace Events {
        export interface CustomClientEvent {}
    }
}

declare module '@altv/webview' {
    export namespace RPC {
        export interface CustomWebViewRPC {}
    }

    export namespace Events {
        export interface CustomWebViewEvent {}
    }
}
