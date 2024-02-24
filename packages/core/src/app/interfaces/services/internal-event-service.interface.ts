import * as altServer from '@altv/server';
import * as altShared from '@altv/shared';
import * as altClient from '@altv/client';

export interface InternalEventService {
    readonly $localHandlers: Set<altShared.Events.ScriptEventHandler>;
    readonly $internalHandlers: Set<altShared.Events.EventHandler>;
    readonly $remoteHandlers: Set<altShared.Events.ScriptEventHandler>;
    // Client
    on<E extends keyof altClient.Events.CustomClientEvent>(
        eventName: E,
        callback: (body: Parameters<altClient.Events.CustomClientEvent[E]>[0]) => ReturnType<altClient.Events.CustomClientEvent[E]>,
    ): altShared.Events.ScriptEventHandler;
    on<E extends string>(
        eventName: Exclude<E, keyof altClient.Events.CustomClientEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): altShared.Events.ScriptEventHandler;
    once<E extends keyof altClient.Events.CustomClientEvent>(
        eventName: E,
        callback: (body: Parameters<altClient.Events.CustomClientEvent[E]>[0]) => ReturnType<altClient.Events.CustomClientEvent[E]>,
    ): altShared.Events.ScriptEventHandler;
    once<E extends string>(
        eventName: Exclude<E, keyof altClient.Events.CustomClientEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): altShared.Events.ScriptEventHandler;
    emit<E extends keyof altClient.Events.CustomClientEvent>(eventName: E, body?: altClient.Events.CustomClientEvent[E]): void;
    emit<E extends string>(eventName: Exclude<E, keyof altClient.Events.CustomClientEvent>, body?: unknown): void;
    onServer<E extends keyof altShared.Events.CustomServerToPlayerEvent>(
        eventName: E,
        callback: (
            body: Parameters<altShared.Events.CustomServerToPlayerEvent[E]>[0],
        ) => ReturnType<altShared.Events.CustomServerToPlayerEvent[E]>,
    ): altShared.Events.ScriptEventHandler;
    onServer<E extends string>(
        eventName: Exclude<E, keyof altShared.Events.CustomServerToPlayerEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): altShared.Events.ScriptEventHandler;
    onceServer<E extends keyof altShared.Events.CustomServerToPlayerEvent>(
        eventName: E,
        callback: (
            body: Parameters<altShared.Events.CustomServerToPlayerEvent[E]>[0],
        ) => ReturnType<altShared.Events.CustomServerToPlayerEvent[E]>,
    ): altShared.Events.ScriptEventHandler;
    onceServer<E extends string>(
        eventName: Exclude<E, keyof altShared.Events.CustomServerToPlayerEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): altShared.Events.ScriptEventHandler;
    emitServer<E extends keyof altShared.Events.CustomPlayerToServerEvent>(
        eventName: E,
        body: Parameters<altShared.Events.CustomPlayerToServerEvent[E]>[0],
    ): void;
    emitServer<E extends string>(eventName: Exclude<E, keyof altShared.Events.CustomPlayerToServerEvent>, body?: unknown): void;
    onWebView<E extends keyof altShared.Events.CustomWebViewToClientEvent>(
        id: string | number,
        eventName: E,
        callback: (
            body: Parameters<altShared.Events.CustomWebViewToClientEvent[E]>[0],
        ) => ReturnType<altShared.Events.CustomWebViewToClientEvent[E]>,
    ): altShared.Events.ScriptEventHandler;
    onWebView<E extends string>(
        id: string | number,
        eventName: Exclude<E, keyof altShared.Events.CustomWebViewToClientEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): altShared.Events.ScriptEventHandler;
    onceWebView<E extends keyof altShared.Events.CustomWebViewToClientEvent>(
        id: string | number,
        eventName: E,
        callback: (
            body: Parameters<altShared.Events.CustomWebViewToClientEvent[E]>[0],
        ) => ReturnType<altShared.Events.CustomWebViewToClientEvent[E]>,
    ): altShared.Events.ScriptEventHandler;
    onceWebView<E extends string>(
        id: string | number,
        eventName: Exclude<E, keyof altShared.Events.CustomWebViewToClientEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): altShared.Events.ScriptEventHandler;
    emitWebView<E extends keyof altShared.Events.CustomClientToWebViewEvent>(
        id: string | number,
        eventName: E,
        body: Parameters<altShared.Events.CustomClientToWebViewEvent[E]>[0],
    ): void;
    emitWebView<E extends string>(
        id: string | number,
        eventName: Exclude<E, keyof altShared.Events.CustomClientToWebViewEvent>,
        body?: unknown,
    ): void;
    // Server
    on<E extends keyof altServer.Events.CustomServerEvent>(
        eventName: E,
        callback: (body: Parameters<altServer.Events.CustomServerEvent[E]>[0]) => ReturnType<altServer.Events.CustomServerEvent[E]>,
    ): altShared.Events.ScriptEventHandler;
    on<E extends string>(
        eventName: Exclude<E, keyof altServer.Events.CustomServerEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): altShared.Events.ScriptEventHandler;
    once<E extends keyof altServer.Events.CustomServerEvent>(
        eventName: E,
        callback: (body: Parameters<altServer.Events.CustomServerEvent[E]>[0]) => ReturnType<altServer.Events.CustomServerEvent[E]>,
    ): altShared.Events.ScriptEventHandler;
    once<E extends string>(
        eventName: Exclude<E, keyof altServer.Events.CustomServerEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): altShared.Events.ScriptEventHandler;
    emit<E extends keyof altServer.Events.CustomServerEvent>(eventName: E, body?: altServer.Events.CustomServerEvent[E]): void;
    emit<E extends string>(eventName: Exclude<E, keyof altServer.Events.CustomServerEvent>, body?: any): void;
    onPlayer<E extends keyof altShared.Events.CustomPlayerToServerEvent, U extends altServer.Player>(
        eventName: E,
        callback: (
            player: U,
            body: Parameters<altShared.Events.CustomPlayerToServerEvent[E]>[0],
        ) => ReturnType<altShared.Events.CustomPlayerToServerEvent[E]>,
    ): altShared.Events.ScriptEventHandler;
    onPlayer<E extends string, U extends altServer.Player>(
        eventName: Exclude<E, keyof altShared.Events.CustomPlayerToServerEvent>,
        callback: (player: U, body: unknown) => void | Promise<void>,
    ): altShared.Events.ScriptEventHandler;
    oncePlayer<E extends keyof altShared.Events.CustomPlayerToServerEvent, U extends altServer.Player>(
        eventName: E,
        callback: (
            player: U,
            body: Parameters<altShared.Events.CustomPlayerToServerEvent[E]>[0],
        ) => ReturnType<altShared.Events.CustomPlayerToServerEvent[E]>,
    ): altShared.Events.ScriptEventHandler;
    oncePlayer<E extends string, U extends altServer.Player>(
        eventName: Exclude<E, keyof altShared.Events.CustomPlayerToServerEvent>,
        callback: (player: U, body: unknown) => void | Promise<void>,
    ): altShared.Events.ScriptEventHandler;
    onRemote<E extends keyof altShared.Events.CustomPlayerToServerEvent, U extends altServer.Player>(
        eventName: E,
        callback: (
            player: U,
            body: Parameters<altShared.Events.CustomPlayerToServerEvent[E]>[0],
        ) => ReturnType<altShared.Events.CustomPlayerToServerEvent[E]>,
    ): altShared.Events.ScriptEventHandler;
    onRemote<E extends string, U extends altServer.Player>(
        eventName: Exclude<E, keyof altShared.Events.CustomPlayerToServerEvent>,
        callback: (player: U, body: unknown) => void | Promise<void>,
    ): altShared.Events.ScriptEventHandler;
    onceRemote<E extends keyof altShared.Events.CustomPlayerToServerEvent, U extends altServer.Player>(
        eventName: E,
        callback: (
            player: U,
            body: Parameters<altShared.Events.CustomPlayerToServerEvent[E]>[0],
        ) => ReturnType<altShared.Events.CustomPlayerToServerEvent[E]>,
    ): altShared.Events.ScriptEventHandler;
    onceRemote<E extends string, U extends altServer.Player>(
        eventName: Exclude<E, keyof altShared.Events.CustomPlayerToServerEvent>,
        callback: (player: U, body: unknown) => void | Promise<void>,
    ): altShared.Events.ScriptEventHandler;
    emitPlayers<E extends keyof altShared.Events.CustomServerToPlayerEvent, U extends altServer.Player>(
        player: U[],
        eventName: E,
        body?: Parameters<altShared.Events.CustomServerToPlayerEvent[E]>[0],
    ): void;
    emitPlayers<E extends string, U extends altServer.Player>(
        player: U[],
        eventName: Exclude<E, keyof altShared.Events.CustomServerToPlayerEvent>,
        body?: unknown,
    ): void;
    emitPlayersUnreliable<E extends keyof altShared.Events.CustomServerToPlayerEvent, U extends altServer.Player>(
        player: U[],
        eventName: E,
        body?: Parameters<altShared.Events.CustomServerToPlayerEvent[E]>[0],
    ): void;
    emitPlayersUnreliable<E extends string, U extends altServer.Player>(
        player: U[],
        eventName: Exclude<E, keyof altShared.Events.CustomServerToPlayerEvent>,
        body?: unknown,
    ): void;
    emitAllPlayers<E extends keyof altShared.Events.CustomServerToPlayerEvent>(
        eventName: E,
        body?: Parameters<altShared.Events.CustomServerToPlayerEvent[E]>[0],
    ): void;
    emitAllPlayers<E extends string>(eventName: Exclude<E, keyof altShared.Events.CustomServerToPlayerEvent>, body?: unknown): void;
    emitAllPlayersUnreliable<E extends keyof altShared.Events.CustomServerToPlayerEvent>(
        eventName: E,
        body?: Parameters<altShared.Events.CustomServerToPlayerEvent[E]>[0],
    ): void;
    emitAllPlayersUnreliable<E extends string>(
        eventName: Exclude<E, keyof altShared.Events.CustomServerToPlayerEvent>,
        body?: unknown,
    ): void;
    onWebView<E extends keyof altShared.Events.CustomWebViewToServerEvent, U extends altServer.Player>(
        id: string | number,
        eventName: E,
        callback: (
            player: U,
            body: Parameters<altShared.Events.CustomWebViewToServerEvent[E]>[0],
        ) => ReturnType<altShared.Events.CustomWebViewToServerEvent[E]>,
    ): altShared.Events.ScriptEventHandler;
    onWebView<E extends string, U extends altServer.Player>(
        id: string | number,
        eventName: Exclude<E, keyof altShared.Events.CustomWebViewToServerEvent>,
        callback: (player: U, body: unknown) => void | Promise<void>,
    ): altShared.Events.ScriptEventHandler;
    onceWebView<E extends keyof altShared.Events.CustomWebViewToServerEvent, U extends altServer.Player>(
        id: string | number,
        eventName: E,
        callback: (
            player: U,
            body: Parameters<altShared.Events.CustomWebViewToServerEvent[E]>[0],
        ) => ReturnType<altShared.Events.CustomWebViewToServerEvent[E]>,
    ): altShared.Events.ScriptEventHandler;
    onceWebView<E extends string, U extends altServer.Player>(
        id: string | number,
        eventName: Exclude<E, keyof altShared.Events.CustomWebViewToServerEvent>,
        callback: (player: U, body: unknown) => void | Promise<void>,
    ): altShared.Events.ScriptEventHandler;
    emitWebViews<E extends keyof altShared.Events.CustomServerToWebViewEvent, U extends altServer.Player>(
        player: U[],
        id: string | number,
        eventName: E,
        body?: Parameters<altShared.Events.CustomServerToWebViewEvent[E]>[0],
    ): void;
    emitWebViews<E extends string, U extends altServer.Player>(
        player: U[],
        id: string | number,
        eventName: Exclude<E, keyof altShared.Events.CustomServerToWebViewEvent>,
        body?: unknown,
    ): void;
    emitAllWebViews<E extends keyof altShared.Events.CustomServerToWebViewEvent>(
        id: string | number,
        eventName: E,
        body?: Parameters<altShared.Events.CustomServerToWebViewEvent[E]>[0],
    ): void;
    emitAllWebViews<E extends string>(
        id: string | number,
        eventName: Exclude<E, keyof altShared.Events.CustomServerToWebViewEvent>,
        body?: unknown,
    ): void;
    emitAllWebViewsUnreliable<E extends keyof altShared.Events.CustomServerToWebViewEvent>(
        id: string | number,
        eventName: E,
        body?: Parameters<altShared.Events.CustomServerToWebViewEvent[E]>[0],
    ): void;
    emitAllWebViewsUnreliable<E extends string>(
        id: string | number,
        eventName: Exclude<E, keyof altShared.Events.CustomServerToWebViewEvent>,
        body?: unknown,
    ): void;
    // Internal
    $onInternal(eventName: string, handler: (body: unknown) => void | Promise<void>): altShared.Events.EventHandler;
    $onceInternal(eventName: string, handler: (body: unknown) => void | Promise<void>): altShared.Events.EventHandler;
}
