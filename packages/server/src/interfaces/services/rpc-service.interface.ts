import type { RPCCallOptions, RPCResult, ScriptRPCHandler } from '@altv-mango/core';
import * as altServer from '@altv/server';
import * as altShared from '@altv/shared';

export interface RPCService {
    call<E extends keyof altServer.RPC.CustomServerRPC>(
        rpcName: E,
        body?: Parameters<altServer.RPC.CustomServerRPC[E]>[0],
        options?: RPCCallOptions,
    ): Promise<RPCResult<ReturnType<altServer.RPC.CustomServerRPC[E]>>>;
    call<E extends string>(
        rpcName: Exclude<E, keyof altServer.RPC.CustomServerRPC>,
        body?: unknown,
        options?: RPCCallOptions,
    ): Promise<RPCResult<unknown>>;
    onRequest<E extends keyof altServer.RPC.CustomServerRPC>(
        rpcName: E,
        handler: (body: Parameters<altServer.RPC.CustomServerRPC[E]>[0]) => ReturnType<altServer.RPC.CustomServerRPC[E]>,
    ): ScriptRPCHandler;
    onRequest<E extends string>(
        rpcName: Exclude<E, keyof altServer.RPC.CustomServerRPC>,
        handler: (body: unknown) => unknown | Promise<unknown>,
    ): ScriptRPCHandler;
    callPlayer<E extends keyof altShared.RPC.CustomServerToClientRPC, U extends altServer.Player>(
        player: U,
        rpcName: E,
        body?: Parameters<altShared.RPC.CustomServerToClientRPC[E]>[0],
        options?: RPCCallOptions,
    ): Promise<RPCResult<ReturnType<altShared.RPC.CustomServerToClientRPC[E]>>>;
    callPlayer<E extends string, U extends altServer.Player>(
        player: U,
        rpcName: Exclude<E, keyof altShared.RPC.CustomServerToClientRPC>,
        body?: unknown,
        options?: RPCCallOptions,
    ): Promise<RPCResult>;
    onPlayerRequest<E extends keyof altShared.RPC.CustomClientToServerRPC, U extends altServer.Player>(
        rpcName: E,
        handler: (
            sender: U,
            body: Parameters<altShared.RPC.CustomClientToServerRPC[E]>[0],
        ) => ReturnType<altShared.RPC.CustomClientToServerRPC[E]>,
    ): ScriptRPCHandler;
    onPlayerRequest<E extends string, U extends altServer.Player>(
        rpcName: Exclude<E, keyof altShared.RPC.CustomClientToServerRPC>,
        handler: (sender: U, body: unknown) => unknown | Promise<unknown>,
    ): ScriptRPCHandler;
    callWebView<E extends keyof altShared.RPC.CustomServerToWebViewRPC, U extends altServer.Player>(
        player: U,
        id: string | number,
        rpcName: E,
        body?: Parameters<altShared.RPC.CustomServerToWebViewRPC[E]>[0],
        options?: RPCCallOptions,
    ): Promise<RPCResult<ReturnType<altShared.RPC.CustomServerToWebViewRPC[E]>>>;
    callWebView<E extends string, U extends altServer.Player>(
        player: U,
        id: string | number,
        rpcName: Exclude<E, keyof altShared.RPC.CustomServerToWebViewRPC>,
        body?: unknown,
        options?: RPCCallOptions,
    ): Promise<RPCResult>;
    onWebViewRequest<E extends string, U extends altServer.Player>(
        id: string | number,
        rpcName: Exclude<E, keyof altShared.RPC.CustomWebViewToServerRPC>,
        handler: (player: U, body: unknown) => unknown | Promise<unknown>,
    ): ScriptRPCHandler;
    onWebViewRequest<E extends keyof altShared.RPC.CustomWebViewToServerRPC, U extends altServer.Player>(
        id: string | number,
        rpcName: E,
        handler: (
            player: U,
            body: Parameters<altShared.RPC.CustomWebViewToServerRPC[E]>[0],
        ) => ReturnType<altShared.RPC.CustomWebViewToServerRPC[E]>,
    ): ScriptRPCHandler;
}
