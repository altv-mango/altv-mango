import * as altShared from '@altv/shared';
import type { ScriptEventHandler } from './script-event-handler.interface';

export interface EventService {
    on<E extends keyof altShared.Events.CustomWebViewToWebViewEvent>(
        eventName: E,
        callback: (
            body: Parameters<altShared.Events.CustomWebViewToWebViewEvent[E]>[0],
        ) => ReturnType<altShared.Events.CustomWebViewToWebViewEvent[E]>,
    ): ScriptEventHandler;
    on<E extends string>(
        eventName: Exclude<E, keyof altShared.Events.CustomWebViewToWebViewEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): ScriptEventHandler;
    once<E extends keyof altShared.Events.CustomWebViewToWebViewEvent>(
        eventName: E,
        callback: (
            body: Parameters<altShared.Events.CustomWebViewToWebViewEvent[E]>[0],
        ) => ReturnType<altShared.Events.CustomWebViewToWebViewEvent[E]>,
    ): ScriptEventHandler;
    once<E extends string>(
        eventName: Exclude<E, keyof altShared.Events.CustomWebViewToWebViewEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): ScriptEventHandler;
    emit<E extends keyof altShared.Events.CustomWebViewToWebViewEvent>(
        eventName: E,
        body?: Parameters<altShared.Events.CustomWebViewToWebViewEvent[E]>[0],
    ): void;
    emit<E extends string>(eventName: Exclude<E, keyof altShared.Events.CustomWebViewToWebViewEvent>, body?: unknown): void;
    onPlayer<E extends keyof altShared.Events.CustomClientToWebViewEvent>(
        eventName: E,
        callback: (
            body: Parameters<altShared.Events.CustomClientToWebViewEvent[E]>[0],
        ) => ReturnType<altShared.Events.CustomClientToWebViewEvent[E]>,
    ): ScriptEventHandler;
    onPlayer<E extends string>(
        eventName: Exclude<E, keyof altShared.Events.CustomClientToWebViewEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): ScriptEventHandler;
    oncePlayer<E extends keyof altShared.Events.CustomClientToWebViewEvent>(
        eventName: E,
        callback: (
            body: Parameters<altShared.Events.CustomClientToWebViewEvent[E]>[0],
        ) => ReturnType<altShared.Events.CustomClientToWebViewEvent[E]>,
    ): ScriptEventHandler;
    oncePlayer<E extends string>(
        eventName: Exclude<E, keyof altShared.Events.CustomClientToWebViewEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): ScriptEventHandler;
    emitPlayer<E extends keyof altShared.Events.CustomWebViewToClientEvent>(
        eventName: E,
        body?: Parameters<altShared.Events.CustomWebViewToClientEvent[E]>[0],
    ): void;
    emitPlayer<E extends string>(eventName: Exclude<E, keyof altShared.Events.CustomWebViewToClientEvent>, body?: unknown): void;
    onServer<E extends keyof altShared.Events.CustomServerToWebViewEvent>(
        eventName: E,
        callback: (
            body: Parameters<altShared.Events.CustomServerToWebViewEvent[E]>[0],
        ) => ReturnType<altShared.Events.CustomServerToWebViewEvent[E]>,
    ): ScriptEventHandler;
    onServer<E extends string>(
        eventName: Exclude<E, keyof altShared.Events.CustomServerToWebViewEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): ScriptEventHandler;
    onceServer<E extends keyof altShared.Events.CustomServerToWebViewEvent>(
        eventName: E,
        callback: (
            body: Parameters<altShared.Events.CustomServerToWebViewEvent[E]>[0],
        ) => ReturnType<altShared.Events.CustomServerToWebViewEvent[E]>,
    ): ScriptEventHandler;
    onceServer<E extends string>(
        eventName: Exclude<E, keyof altShared.Events.CustomServerToWebViewEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): ScriptEventHandler;
    emitServer<E extends keyof altShared.Events.CustomWebViewToServerEvent>(
        eventName: E,
        body?: Parameters<altShared.Events.CustomWebViewToServerEvent[E]>[0],
    ): void;
    emitServer<E extends string>(eventName: Exclude<E, keyof altShared.Events.CustomWebViewToServerEvent>, body?: unknown): void;
}
