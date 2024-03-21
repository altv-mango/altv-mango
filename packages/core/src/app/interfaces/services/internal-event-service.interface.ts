import type { Events as ServerEvents, Player } from '@altv/server';
import type { Events as SharedEvents } from '@altv/shared';
import type { Events as ClientEvents } from '@altv/client';

export interface InternalEventService {
    readonly $localHandlers: Set<SharedEvents.ScriptEventHandler>;
    readonly $internalHandlers: Set<SharedEvents.EventHandler>;
    readonly $remoteHandlers: Set<SharedEvents.ScriptEventHandler>;
    // Client
    on<E extends keyof ClientEvents.CustomClientEvent>(
        eventName: E,
        callback: (body: Parameters<ClientEvents.CustomClientEvent[E]>[0]) => void | Promise<void>,
    ): SharedEvents.ScriptEventHandler;
    on<E extends string>(
        eventName: Exclude<E, keyof ClientEvents.CustomClientEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): SharedEvents.ScriptEventHandler;
    once<E extends keyof ClientEvents.CustomClientEvent>(
        eventName: E,
        callback: (body: Parameters<ClientEvents.CustomClientEvent[E]>[0]) => void | Promise<void>,
    ): SharedEvents.ScriptEventHandler;
    once<E extends string>(
        eventName: Exclude<E, keyof ClientEvents.CustomClientEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): SharedEvents.ScriptEventHandler;
    emit<E extends keyof ClientEvents.CustomClientEvent>(eventName: E, body?: ClientEvents.CustomClientEvent[E]): void;
    emit<E extends string>(eventName: Exclude<E, keyof ClientEvents.CustomClientEvent>, body?: unknown): void;
    onServer<E extends keyof SharedEvents.CustomServerToPlayerEvent>(
        eventName: E,
        callback: (body: Parameters<SharedEvents.CustomServerToPlayerEvent[E]>[0]) => void | Promise<void>,
    ): SharedEvents.ScriptEventHandler;
    onServer<E extends string>(
        eventName: Exclude<E, keyof SharedEvents.CustomServerToPlayerEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): SharedEvents.ScriptEventHandler;
    onceServer<E extends keyof SharedEvents.CustomServerToPlayerEvent>(
        eventName: E,
        callback: (body: Parameters<SharedEvents.CustomServerToPlayerEvent[E]>[0]) => void | Promise<void>,
    ): SharedEvents.ScriptEventHandler;
    onceServer<E extends string>(
        eventName: Exclude<E, keyof SharedEvents.CustomServerToPlayerEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): SharedEvents.ScriptEventHandler;
    emitServer<E extends keyof SharedEvents.CustomPlayerToServerEvent>(
        eventName: E,
        body?: Parameters<SharedEvents.CustomPlayerToServerEvent[E]>[0],
    ): void;
    emitServer<E extends string>(eventName: Exclude<E, keyof SharedEvents.CustomPlayerToServerEvent>, body?: unknown): void;
    onWebView<E extends keyof SharedEvents.CustomWebViewToClientEvent>(
        id: string | number,
        eventName: E,
        callback: (body: Parameters<SharedEvents.CustomWebViewToClientEvent[E]>[0]) => void | Promise<void>,
    ): SharedEvents.ScriptEventHandler;
    onWebView<E extends string>(
        id: string | number,
        eventName: Exclude<E, keyof SharedEvents.CustomWebViewToClientEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): SharedEvents.ScriptEventHandler;
    onceWebView<E extends keyof SharedEvents.CustomWebViewToClientEvent>(
        id: string | number,
        eventName: E,
        callback: (body: Parameters<SharedEvents.CustomWebViewToClientEvent[E]>[0]) => void | Promise<void>,
    ): SharedEvents.ScriptEventHandler;
    onceWebView<E extends string>(
        id: string | number,
        eventName: Exclude<E, keyof SharedEvents.CustomWebViewToClientEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): SharedEvents.ScriptEventHandler;
    emitWebView<E extends keyof SharedEvents.CustomClientToWebViewEvent>(
        id: string | number,
        eventName: E,
        body?: Parameters<SharedEvents.CustomClientToWebViewEvent[E]>[0],
    ): void;
    emitWebView<E extends string>(
        id: string | number,
        eventName: Exclude<E, keyof SharedEvents.CustomClientToWebViewEvent>,
        body?: unknown,
    ): void;
    // Server
    on<E extends keyof ServerEvents.CustomServerEvent>(
        eventName: E,
        callback: (body: Parameters<ServerEvents.CustomServerEvent[E]>[0]) => void | Promise<void>,
    ): SharedEvents.ScriptEventHandler;
    on<E extends string>(
        eventName: Exclude<E, keyof ServerEvents.CustomServerEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): SharedEvents.ScriptEventHandler;
    once<E extends keyof ServerEvents.CustomServerEvent>(
        eventName: E,
        callback: (body: Parameters<ServerEvents.CustomServerEvent[E]>[0]) => void | Promise<void>,
    ): SharedEvents.ScriptEventHandler;
    once<E extends string>(
        eventName: Exclude<E, keyof ServerEvents.CustomServerEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): SharedEvents.ScriptEventHandler;
    emit<E extends keyof ServerEvents.CustomServerEvent>(eventName: E, body?: ServerEvents.CustomServerEvent[E]): void;
    emit<E extends string>(eventName: Exclude<E, keyof ServerEvents.CustomServerEvent>, body?: any): void;
    onPlayer<E extends keyof SharedEvents.CustomPlayerToServerEvent, U extends Player>(
        eventName: E,
        callback: (player: U, body: Parameters<SharedEvents.CustomPlayerToServerEvent[E]>[0]) => void | Promise<void>,
    ): SharedEvents.ScriptEventHandler;
    onPlayer<E extends string, U extends Player>(
        eventName: Exclude<E, keyof SharedEvents.CustomPlayerToServerEvent>,
        callback: (player: U, body: unknown) => void | Promise<void>,
    ): SharedEvents.ScriptEventHandler;
    oncePlayer<E extends keyof SharedEvents.CustomPlayerToServerEvent, U extends Player>(
        eventName: E,
        callback: (player: U, body: Parameters<SharedEvents.CustomPlayerToServerEvent[E]>[0]) => void | Promise<void>,
    ): SharedEvents.ScriptEventHandler;
    oncePlayer<E extends string, U extends Player>(
        eventName: Exclude<E, keyof SharedEvents.CustomPlayerToServerEvent>,
        callback: (player: U, body: unknown) => void | Promise<void>,
    ): SharedEvents.ScriptEventHandler;
    onRemote<E extends keyof SharedEvents.CustomPlayerToServerEvent, U extends Player>(
        eventName: E,
        callback: (player: U, body: Parameters<SharedEvents.CustomPlayerToServerEvent[E]>[0]) => void | Promise<void>,
    ): SharedEvents.ScriptEventHandler;
    onRemote<E extends string, U extends Player>(
        eventName: Exclude<E, keyof SharedEvents.CustomPlayerToServerEvent>,
        callback: (player: U, body: unknown) => void | Promise<void>,
    ): SharedEvents.ScriptEventHandler;
    onceRemote<E extends keyof SharedEvents.CustomPlayerToServerEvent, U extends Player>(
        eventName: E,
        callback: (player: U, body: Parameters<SharedEvents.CustomPlayerToServerEvent[E]>[0]) => void | Promise<void>,
    ): SharedEvents.ScriptEventHandler;
    onceRemote<E extends string, U extends Player>(
        eventName: Exclude<E, keyof SharedEvents.CustomPlayerToServerEvent>,
        callback: (player: U, body: unknown) => void | Promise<void>,
    ): SharedEvents.ScriptEventHandler;
    emitPlayers<E extends keyof SharedEvents.CustomServerToPlayerEvent, U extends Player>(
        player: U[],
        eventName: E,
        body?: Parameters<SharedEvents.CustomServerToPlayerEvent[E]>[0],
    ): void;
    emitPlayers<E extends string, U extends Player>(
        player: U[],
        eventName: Exclude<E, keyof SharedEvents.CustomServerToPlayerEvent>,
        body?: unknown,
    ): void;
    emitPlayersUnreliable<E extends keyof SharedEvents.CustomServerToPlayerEvent, U extends Player>(
        player: U[],
        eventName: E,
        body?: Parameters<SharedEvents.CustomServerToPlayerEvent[E]>[0],
    ): void;
    emitPlayersUnreliable<E extends string, U extends Player>(
        player: U[],
        eventName: Exclude<E, keyof SharedEvents.CustomServerToPlayerEvent>,
        body?: unknown,
    ): void;
    emitAllPlayers<E extends keyof SharedEvents.CustomServerToPlayerEvent>(
        eventName: E,
        body?: Parameters<SharedEvents.CustomServerToPlayerEvent[E]>[0],
    ): void;
    emitAllPlayers<E extends string>(eventName: Exclude<E, keyof SharedEvents.CustomServerToPlayerEvent>, body?: unknown): void;
    emitAllPlayersUnreliable<E extends keyof SharedEvents.CustomServerToPlayerEvent>(
        eventName: E,
        body?: Parameters<SharedEvents.CustomServerToPlayerEvent[E]>[0],
    ): void;
    emitAllPlayersUnreliable<E extends string>(eventName: Exclude<E, keyof SharedEvents.CustomServerToPlayerEvent>, body?: unknown): void;
    onWebView<E extends keyof SharedEvents.CustomWebViewToServerEvent, U extends Player>(
        id: string | number,
        eventName: E,
        callback: (player: U, body: Parameters<SharedEvents.CustomWebViewToServerEvent[E]>[0]) => void | Promise<void>,
    ): SharedEvents.ScriptEventHandler;
    onWebView<E extends string, U extends Player>(
        id: string | number,
        eventName: Exclude<E, keyof SharedEvents.CustomWebViewToServerEvent>,
        callback: (player: U, body: unknown) => void | Promise<void>,
    ): SharedEvents.ScriptEventHandler;
    onceWebView<E extends keyof SharedEvents.CustomWebViewToServerEvent, U extends Player>(
        id: string | number,
        eventName: E,
        callback: (player: U, body: Parameters<SharedEvents.CustomWebViewToServerEvent[E]>[0]) => void | Promise<void>,
    ): SharedEvents.ScriptEventHandler;
    onceWebView<E extends string, U extends Player>(
        id: string | number,
        eventName: Exclude<E, keyof SharedEvents.CustomWebViewToServerEvent>,
        callback: (player: U, body: unknown) => void | Promise<void>,
    ): SharedEvents.ScriptEventHandler;

    emitWebViews<E extends keyof SharedEvents.CustomServerToWebViewEvent, U extends Player>(
        player: U[],
        id: string | number,
        eventName: E,
        body?: Parameters<SharedEvents.CustomServerToWebViewEvent[E]>[0],
    ): void;
    emitWebViews<E extends string, U extends Player>(
        player: U[],
        id: string | number,
        eventName: Exclude<E, keyof SharedEvents.CustomServerToWebViewEvent>,
        body?: unknown,
    ): void;

    emitAllWebViews<E extends keyof SharedEvents.CustomServerToWebViewEvent>(
        id: string | number,
        eventName: E,
        body?: Parameters<SharedEvents.CustomServerToWebViewEvent[E]>[0],
    ): void;
    emitAllWebViews<E extends string>(
        id: string | number,
        eventName: Exclude<E, keyof SharedEvents.CustomServerToWebViewEvent>,
        body?: unknown,
    ): void;

    emitAllWebViewsUnreliable<E extends keyof SharedEvents.CustomServerToWebViewEvent>(
        id: string | number,
        eventName: E,
        body?: Parameters<SharedEvents.CustomServerToWebViewEvent[E]>[0],
    ): void;
    emitAllWebViewsUnreliable<E extends string>(
        id: string | number,
        eventName: Exclude<E, keyof SharedEvents.CustomServerToWebViewEvent>,
        body?: unknown,
    ): void;
    // Internal
    $onInternal(eventName: string, handler: (body: unknown) => void | Promise<void>): SharedEvents.EventHandler;
    $onceInternal(eventName: string, handler: (body: unknown) => void | Promise<void>): SharedEvents.EventHandler;
}
