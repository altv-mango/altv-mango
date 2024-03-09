import type { RPCResult, RPCCallOptions, ScriptRPCHandler } from '../../../interfaces';
import * as altShared from '@altv/shared';
import * as altServer from '@altv/server';
import * as altClient from '@altv/client';

export interface InternalRPCService {
    $serverHandlers: Map<string, altShared.Events.ScriptEventHandler>;
    $webViewHandlers: Map<string, altShared.Events.ScriptEventHandler>;
    $clientHandlers: Map<string, altShared.Events.ScriptEventHandler>;
    // Client
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
        rpcName: Exclude<E, altShared.RPC.CustomWebViewToClientRPC>,
        handler: (body: unknown) => unknown | Promise<unknown>,
    ): ScriptRPCHandler;
    // Server
    call<E extends keyof altServer.RPC.CustomServerRPC>(
        rpcName: E,
        body?: Parameters<altServer.RPC.CustomServerRPC[E]>[0],
        options?: RPCCallOptions,
    ): Promise<RPCResult<ReturnType<altServer.RPC.CustomServerRPC[E]>>>;
    call<E extends string>(rpcName: E, body?: unknown, options?: RPCCallOptions): Promise<RPCResult<unknown>>;
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
