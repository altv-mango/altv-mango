import type { RPCCallOptions, RPCResult, ScriptRPCHandler } from '@altv-mango/core';
import * as altShared from '@altv/shared';
import * as altClient from '@altv/client';

export interface RPCService {
    call<E extends keyof altClient.RPC.CustomClientRPC>(
        rpcName: E,
        body?: Parameters<altClient.RPC.CustomClientRPC[E]>[0],
        options?: RPCCallOptions,
    ): Promise<RPCResult<ReturnType<altClient.RPC.CustomClientRPC[E]>>>;
    call<E extends string>(
        rpcName: Exclude<E, keyof altClient.RPC.CustomClientRPC>,
        body?: unknown,
        options?: RPCCallOptions,
    ): Promise<RPCResult<unknown>>;
    onRequest<E extends keyof altClient.RPC.CustomClientRPC>(
        rpcName: E,
        handler: (body: Parameters<altClient.RPC.CustomClientRPC[E]>[0]) => ReturnType<altClient.RPC.CustomClientRPC[E]>,
    ): ScriptRPCHandler;
    onRequest<E extends string>(
        rpcName: Exclude<E, keyof altClient.RPC.CustomClientRPC>,
        handler: (body: unknown) => unknown | Promise<unknown>,
    ): ScriptRPCHandler;
    callServer<E extends keyof altShared.RPC.CustomClientToServerRPC>(
        rpcName: E,
        body: Parameters<altShared.RPC.CustomClientToServerRPC[E]>[0],
        options?: RPCCallOptions,
    ): Promise<RPCResult<altShared.RPC.CustomServerToClientRPC[E]>>;
    callServer<E extends string>(
        rpcName: Exclude<E, keyof altShared.RPC.CustomClientToServerRPC>,
        body?: unknown,
        options?: RPCCallOptions,
    ): Promise<RPCResult>;
    onServerRequest<E extends keyof altShared.RPC.CustomServerToClientRPC>(
        rpcName: E,
        handler: (body: Parameters<altShared.RPC.CustomServerToClientRPC[E]>[0]) => ReturnType<altShared.RPC.CustomServerToClientRPC[E]>,
    ): ScriptRPCHandler;
    onServerRequest<E extends string>(
        rpcName: Exclude<E, keyof altShared.RPC.CustomServerToClientRPC>,
        handler: (body: unknown) => unknown | Promise<unknown>,
    ): ScriptRPCHandler;
    callWebView<E extends keyof altShared.RPC.CustomClientToWebviewRPC>(
        id: string | number,
        rpcName: E,
        body: Parameters<altShared.RPC.CustomClientToWebviewRPC[E]>[0],
        options?: RPCCallOptions,
    ): Promise<RPCResult<altShared.RPC.CustomClientToWebviewRPC[E]>>;
    callWebView<E extends string>(
        id: string | number,
        rpcName: Exclude<E, keyof altShared.RPC.CustomClientToWebviewRPC>,
        body?: unknown,
        options?: RPCCallOptions,
    ): Promise<RPCResult>;
    onWebViewRequest<E extends keyof altShared.RPC.CustomWebViewToClientRPC>(
        id: string | number,
        rpcName: E,
        handler: (body: Parameters<altShared.RPC.CustomWebViewToClientRPC[E]>[0]) => ReturnType<altShared.RPC.CustomWebViewToClientRPC[E]>,
    ): ScriptRPCHandler;
    onWebViewRequest<E extends string>(
        id: string | number,
        rpcName: Exclude<E, keyof altShared.RPC.CustomWebViewToClientRPC>,
        handler: (body: unknown) => unknown | Promise<unknown>,
    ): ScriptRPCHandler;
}
