import type { Events } from '@altv/shared';
import type { ScriptEventHandler } from './script-event-handler.interface';

export interface EventService {
    on<E extends keyof Events.CustomWebViewToWebViewEvent>(
        eventName: E,
        callback: (body: Parameters<Events.CustomWebViewToWebViewEvent[E]>[0]) => ReturnType<Events.CustomWebViewToWebViewEvent[E]>,
    ): ScriptEventHandler;
    on<E extends string>(
        eventName: Exclude<E, keyof Events.CustomWebViewToWebViewEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): ScriptEventHandler;
    once<E extends keyof Events.CustomWebViewToWebViewEvent>(
        eventName: E,
        callback: (body: Parameters<Events.CustomWebViewToWebViewEvent[E]>[0]) => ReturnType<Events.CustomWebViewToWebViewEvent[E]>,
    ): ScriptEventHandler;
    once<E extends string>(
        eventName: Exclude<E, keyof Events.CustomWebViewToWebViewEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): ScriptEventHandler;
    emit<E extends keyof Events.CustomWebViewToWebViewEvent>(
        eventName: E,
        body?: Parameters<Events.CustomWebViewToWebViewEvent[E]>[0],
    ): void;
    emit<E extends string>(eventName: Exclude<E, keyof Events.CustomWebViewToWebViewEvent>, body?: unknown): void;
    onPlayer<E extends keyof Events.CustomClientToWebViewEvent>(
        eventName: E,
        callback: (body: Parameters<Events.CustomClientToWebViewEvent[E]>[0]) => ReturnType<Events.CustomClientToWebViewEvent[E]>,
    ): ScriptEventHandler;
    onPlayer<E extends string>(
        eventName: Exclude<E, keyof Events.CustomClientToWebViewEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): ScriptEventHandler;
    oncePlayer<E extends keyof Events.CustomClientToWebViewEvent>(
        eventName: E,
        callback: (body: Parameters<Events.CustomClientToWebViewEvent[E]>[0]) => ReturnType<Events.CustomClientToWebViewEvent[E]>,
    ): ScriptEventHandler;
    oncePlayer<E extends string>(
        eventName: Exclude<E, keyof Events.CustomClientToWebViewEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): ScriptEventHandler;
    emitPlayer<E extends keyof Events.CustomWebViewToClientEvent>(
        eventName: E,
        body?: Parameters<Events.CustomWebViewToClientEvent[E]>[0],
    ): void;
    emitPlayer<E extends string>(eventName: Exclude<E, keyof Events.CustomWebViewToClientEvent>, body?: unknown): void;
    onServer<E extends keyof Events.CustomServerToWebViewEvent>(
        eventName: E,
        callback: (body: Parameters<Events.CustomServerToWebViewEvent[E]>[0]) => ReturnType<Events.CustomServerToWebViewEvent[E]>,
    ): ScriptEventHandler;
    onServer<E extends string>(
        eventName: Exclude<E, keyof Events.CustomServerToWebViewEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): ScriptEventHandler;
    onceServer<E extends keyof Events.CustomServerToWebViewEvent>(
        eventName: E,
        callback: (body: Parameters<Events.CustomServerToWebViewEvent[E]>[0]) => ReturnType<Events.CustomServerToWebViewEvent[E]>,
    ): ScriptEventHandler;
    onceServer<E extends string>(
        eventName: Exclude<E, keyof Events.CustomServerToWebViewEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): ScriptEventHandler;
    emitServer<E extends keyof Events.CustomWebViewToServerEvent>(
        eventName: E,
        body?: Parameters<Events.CustomWebViewToServerEvent[E]>[0],
    ): void;
    emitServer<E extends string>(eventName: Exclude<E, keyof Events.CustomWebViewToServerEvent>, body?: unknown): void;
}
