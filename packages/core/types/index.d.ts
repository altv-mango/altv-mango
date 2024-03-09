import type { RPCPayload } from './app';
import type { RPCCallOptions, RPCResult } from './interfaces';

declare module '@altv/client' {
    export namespace RPC {
        export interface CustomClientRPC {}
    }
}

declare module '@altv/server' {
    export namespace RPC {
        export interface CustomServerRPC {}
    }
}

declare module '@altv/webview' {
    export namespace RPC {
        export interface CustomWebViewRPC {}
    }
}
