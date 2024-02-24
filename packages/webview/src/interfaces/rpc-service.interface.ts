import type { RPCCallOptions, RPCResult, ScriptRPCHandler } from '@altv-mango/shared';
import * as altShared from '@altv/shared';

export interface RPCService {
    call<E extends keyof altShared.RPC.CustomWebViewRPC>(
        rpcName: E,
        body?: Parameters<altShared.RPC.CustomWebViewRPC[E]>[0],
        options?: RPCCallOptions,
    ): Promise<RPCResult<ReturnType<altShared.RPC.CustomWebViewRPC[E]>>>;
    call<E extends string>(
        rpcName: Exclude<E, keyof altShared.RPC.CustomWebViewRPC>,
        body?: unknown,
        options?: RPCCallOptions,
    ): Promise<RPCResult>;
    onRequest<E extends keyof altShared.RPC.CustomWebViewRPC>(
        rpcName: E,
        handler: (body: Parameters<altShared.RPC.CustomWebViewRPC[E]>[0]) => ReturnType<altShared.RPC.CustomWebViewRPC[E]>,
    ): ScriptRPCHandler;
    onRequest<E extends string>(
        rpcName: Exclude<E, keyof altShared.RPC.CustomWebViewRPC>,
        handler: (body: unknown) => unknown | Promise<unknown>,
    ): ScriptRPCHandler;
    callServer<E extends keyof altShared.RPC.CustomWebViewToServerRPC>(
        rpcName: E,
        body?: Parameters<altShared.RPC.CustomWebViewToServerRPC[E]>[0],
        options?: RPCCallOptions,
    ): Promise<RPCResult<ReturnType<altShared.RPC.CustomWebViewToServerRPC[E]>>>;
    callServer<E extends string>(
        rpcName: Exclude<E, keyof altShared.RPC.CustomWebViewToServerRPC>,
        body?: unknown,
        options?: RPCCallOptions,
    ): Promise<RPCResult>;
    onServerRequest<E extends keyof altShared.RPC.CustomServerToWebViewRPC>(
        rpcName: E,
        handler: (body: Parameters<altShared.RPC.CustomServerToWebViewRPC[E]>[0]) => ReturnType<altShared.RPC.CustomServerToWebViewRPC[E]>,
    ): ScriptRPCHandler;
    onServerRequest<E extends string>(
        rpcName: Exclude<E, keyof altShared.RPC.CustomServerToWebViewRPC>,
        handler: (body: unknown) => unknown | Promise<unknown>,
    ): ScriptRPCHandler;
    callPlayer<E extends keyof altShared.RPC.CustomWebViewToClientRPC>(
        rpcName: E,
        body?: Parameters<altShared.RPC.CustomWebViewToClientRPC[E]>[0],
        options?: RPCCallOptions,
    ): Promise<RPCResult<ReturnType<altShared.RPC.CustomWebViewToClientRPC[E]>>>;
    callPlayer<E extends string>(
        rpcName: Exclude<E, keyof altShared.RPC.CustomWebViewToClientRPC>,
        body?: unknown,
        options?: RPCCallOptions,
    ): Promise<RPCResult>;
    onPlayerRequest<E extends keyof altShared.RPC.CustomClientToWebviewRPC>(
        rpcName: E,
        handler: (body: Parameters<altShared.RPC.CustomClientToWebviewRPC[E]>[0]) => ReturnType<altShared.RPC.CustomClientToWebviewRPC[E]>,
    ): ScriptRPCHandler;
    onPlayerRequest<E extends string>(
        rpcName: Exclude<E, keyof altShared.RPC.CustomClientToWebviewRPC>,
        handler: (body: unknown) => unknown | Promise<unknown>,
    ): ScriptRPCHandler;
}
