import type { RPCCallOptions, RPCResult, ScriptRPCHandler } from '@altv-mango/core';
import type { RPC as SharedRPC } from '@altv/shared';
import type { RPC as WebViewRPC } from '@altv/webview';

export interface RPCService {
    call<E extends keyof WebViewRPC.CustomWebViewRPC>(
        rpcName: E,
        body?: Parameters<WebViewRPC.CustomWebViewRPC[E]>[0],
        options?: RPCCallOptions,
    ): Promise<RPCResult<ReturnType<WebViewRPC.CustomWebViewRPC[E]>>>;
    call<E extends string>(
        rpcName: Exclude<E, keyof WebViewRPC.CustomWebViewRPC>,
        body?: unknown,
        options?: RPCCallOptions,
    ): Promise<RPCResult>;
    onRequest<E extends keyof WebViewRPC.CustomWebViewRPC>(
        rpcName: E,
        handler: (body: Parameters<WebViewRPC.CustomWebViewRPC[E]>[0]) => ReturnType<WebViewRPC.CustomWebViewRPC[E]>,
    ): ScriptRPCHandler;
    onRequest<E extends string>(
        rpcName: Exclude<E, keyof WebViewRPC.CustomWebViewRPC>,
        handler: (body: unknown) => unknown | Promise<unknown>,
    ): ScriptRPCHandler;
    callServer<E extends keyof SharedRPC.CustomWebViewToServerRPC>(
        rpcName: E,
        body?: Parameters<SharedRPC.CustomWebViewToServerRPC[E]>[0],
        options?: RPCCallOptions,
    ): Promise<RPCResult<ReturnType<SharedRPC.CustomWebViewToServerRPC[E]>>>;
    callServer<E extends string>(
        rpcName: Exclude<E, keyof SharedRPC.CustomWebViewToServerRPC>,
        body?: unknown,
        options?: RPCCallOptions,
    ): Promise<RPCResult>;
    onServerRequest<E extends keyof SharedRPC.CustomServerToWebViewRPC>(
        rpcName: E,
        handler: (body: Parameters<SharedRPC.CustomServerToWebViewRPC[E]>[0]) => ReturnType<SharedRPC.CustomServerToWebViewRPC[E]>,
    ): ScriptRPCHandler;
    onServerRequest<E extends string>(
        rpcName: Exclude<E, keyof SharedRPC.CustomServerToWebViewRPC>,
        handler: (body: unknown) => unknown | Promise<unknown>,
    ): ScriptRPCHandler;
    callPlayer<E extends keyof SharedRPC.CustomWebViewToClientRPC>(
        rpcName: E,
        body?: Parameters<SharedRPC.CustomWebViewToClientRPC[E]>[0],
        options?: RPCCallOptions,
    ): Promise<RPCResult<ReturnType<SharedRPC.CustomWebViewToClientRPC[E]>>>;
    callPlayer<E extends string>(
        rpcName: Exclude<E, keyof SharedRPC.CustomWebViewToClientRPC>,
        body?: unknown,
        options?: RPCCallOptions,
    ): Promise<RPCResult>;
    onPlayerRequest<E extends keyof SharedRPC.CustomClientToWebviewRPC>(
        rpcName: E,
        handler: (body: Parameters<SharedRPC.CustomClientToWebviewRPC[E]>[0]) => ReturnType<SharedRPC.CustomClientToWebviewRPC[E]>,
    ): ScriptRPCHandler;
    onPlayerRequest<E extends string>(
        rpcName: Exclude<E, keyof SharedRPC.CustomClientToWebviewRPC>,
        handler: (body: unknown) => unknown | Promise<unknown>,
    ): ScriptRPCHandler;
}
