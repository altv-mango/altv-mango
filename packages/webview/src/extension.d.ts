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

declare module '@altv/webview' {
    export namespace RPC {
        export interface CustomWebViewRPC {}
    }

    export namespace Events {
        export interface CustomWebViewEvent {}
    }
}
