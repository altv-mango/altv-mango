import type { RPCCallOptions, RPCResult, ScriptRPCHandler } from '@altv-mango/core/interfaces';
import type { RPC } from '@altv/shared';

export interface RPCService {
    call<E extends keyof RPC.CustomWebViewRPC>(
        rpcName: E,
        body?: Parameters<RPC.CustomWebViewRPC[E]>[0],
        options?: RPCCallOptions,
    ): Promise<RPCResult<ReturnType<RPC.CustomWebViewRPC[E]>>>;
    call<E extends string>(rpcName: Exclude<E, keyof RPC.CustomWebViewRPC>, body?: unknown, options?: RPCCallOptions): Promise<RPCResult>;
    onRequest<E extends keyof RPC.CustomWebViewRPC>(
        rpcName: E,
        handler: (body: Parameters<RPC.CustomWebViewRPC[E]>[0]) => ReturnType<RPC.CustomWebViewRPC[E]>,
    ): ScriptRPCHandler;
    onRequest<E extends string>(
        rpcName: Exclude<E, keyof RPC.CustomWebViewRPC>,
        handler: (body: unknown) => unknown | Promise<unknown>,
    ): ScriptRPCHandler;
    callServer<E extends keyof RPC.CustomWebViewToServerRPC>(
        rpcName: E,
        body?: Parameters<RPC.CustomWebViewToServerRPC[E]>[0],
        options?: RPCCallOptions,
    ): Promise<RPCResult<ReturnType<RPC.CustomWebViewToServerRPC[E]>>>;
    callServer<E extends string>(
        rpcName: Exclude<E, keyof RPC.CustomWebViewToServerRPC>,
        body?: unknown,
        options?: RPCCallOptions,
    ): Promise<RPCResult>;
    onServerRequest<E extends keyof RPC.CustomServerToWebViewRPC>(
        rpcName: E,
        handler: (body: Parameters<RPC.CustomServerToWebViewRPC[E]>[0]) => ReturnType<RPC.CustomServerToWebViewRPC[E]>,
    ): ScriptRPCHandler;
    onServerRequest<E extends string>(
        rpcName: Exclude<E, keyof RPC.CustomServerToWebViewRPC>,
        handler: (body: unknown) => unknown | Promise<unknown>,
    ): ScriptRPCHandler;
    callPlayer<E extends keyof RPC.CustomWebViewToClientRPC>(
        rpcName: E,
        body?: Parameters<RPC.CustomWebViewToClientRPC[E]>[0],
        options?: RPCCallOptions,
    ): Promise<RPCResult<ReturnType<RPC.CustomWebViewToClientRPC[E]>>>;
    callPlayer<E extends string>(
        rpcName: Exclude<E, keyof RPC.CustomWebViewToClientRPC>,
        body?: unknown,
        options?: RPCCallOptions,
    ): Promise<RPCResult>;
    onPlayerRequest<E extends keyof RPC.CustomClientToWebviewRPC>(
        rpcName: E,
        handler: (body: Parameters<RPC.CustomClientToWebviewRPC[E]>[0]) => ReturnType<RPC.CustomClientToWebviewRPC[E]>,
    ): ScriptRPCHandler;
    onPlayerRequest<E extends string>(
        rpcName: Exclude<E, keyof RPC.CustomClientToWebviewRPC>,
        handler: (body: unknown) => unknown | Promise<unknown>,
    ): ScriptRPCHandler;
}
