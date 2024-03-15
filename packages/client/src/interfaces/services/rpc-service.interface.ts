import type { RPCCallOptions, RPCResult, ScriptRPCHandler } from '@altv-mango/core';
import type { RPC as SharedRPC } from '@altv/shared';
import type { RPC as ClientRPC } from '@altv/client';

export interface RPCService {
    call<E extends keyof ClientRPC.CustomClientRPC>(
        rpcName: E,
        body?: Parameters<ClientRPC.CustomClientRPC[E]>[0],
        options?: RPCCallOptions,
    ): Promise<RPCResult<ReturnType<ClientRPC.CustomClientRPC[E]>>>;
    call<E extends string>(
        rpcName: Exclude<E, keyof ClientRPC.CustomClientRPC>,
        body?: unknown,
        options?: RPCCallOptions,
    ): Promise<RPCResult<unknown>>;
    onRequest<E extends keyof ClientRPC.CustomClientRPC>(
        rpcName: E,
        handler: (body: Parameters<ClientRPC.CustomClientRPC[E]>[0]) => ReturnType<ClientRPC.CustomClientRPC[E]>,
    ): ScriptRPCHandler;
    onRequest<E extends string>(
        rpcName: Exclude<E, keyof ClientRPC.CustomClientRPC>,
        handler: (body: unknown) => unknown | Promise<unknown>,
    ): ScriptRPCHandler;
    callServer<E extends keyof SharedRPC.CustomClientToServerRPC>(
        rpcName: E,
        body: Parameters<SharedRPC.CustomClientToServerRPC[E]>[0],
        options?: RPCCallOptions,
    ): Promise<RPCResult<SharedRPC.CustomServerToClientRPC[E]>>;
    callServer<E extends string>(
        rpcName: Exclude<E, keyof SharedRPC.CustomClientToServerRPC>,
        body?: unknown,
        options?: RPCCallOptions,
    ): Promise<RPCResult>;
    onServerRequest<E extends keyof SharedRPC.CustomServerToClientRPC>(
        rpcName: E,
        handler: (body: Parameters<SharedRPC.CustomServerToClientRPC[E]>[0]) => ReturnType<SharedRPC.CustomServerToClientRPC[E]>,
    ): ScriptRPCHandler;
    onServerRequest<E extends string>(
        rpcName: Exclude<E, keyof SharedRPC.CustomServerToClientRPC>,
        handler: (body: unknown) => unknown | Promise<unknown>,
    ): ScriptRPCHandler;
    callWebView<E extends keyof SharedRPC.CustomClientToWebviewRPC>(
        id: string | number,
        rpcName: E,
        body: Parameters<SharedRPC.CustomClientToWebviewRPC[E]>[0],
        options?: RPCCallOptions,
    ): Promise<RPCResult<SharedRPC.CustomClientToWebviewRPC[E]>>;
    callWebView<E extends string>(
        id: string | number,
        rpcName: Exclude<E, keyof SharedRPC.CustomClientToWebviewRPC>,
        body?: unknown,
        options?: RPCCallOptions,
    ): Promise<RPCResult>;
    onWebViewRequest<E extends keyof SharedRPC.CustomWebViewToClientRPC>(
        id: string | number,
        rpcName: E,
        handler: (body: Parameters<SharedRPC.CustomWebViewToClientRPC[E]>[0]) => ReturnType<SharedRPC.CustomWebViewToClientRPC[E]>,
    ): ScriptRPCHandler;
    onWebViewRequest<E extends string>(
        id: string | number,
        rpcName: Exclude<E, keyof SharedRPC.CustomWebViewToClientRPC>,
        handler: (body: unknown) => unknown | Promise<unknown>,
    ): ScriptRPCHandler;
}
