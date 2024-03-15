import type { Events as SharedEvents } from '@altv/shared';
import type { Events as WebViewEvents } from '@altv/webview';
import type { ScriptEventHandler } from './script-event-handler.interface';

export interface EventService {
    on<E extends keyof WebViewEvents.CustomWebViewEvent>(
        eventName: E,
        callback: (body: Parameters<WebViewEvents.CustomWebViewEvent[E]>[0]) => ReturnType<WebViewEvents.CustomWebViewEvent[E]>,
    ): ScriptEventHandler;
    on<E extends string>(
        eventName: Exclude<E, keyof WebViewEvents.CustomWebViewEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): ScriptEventHandler;
    once<E extends keyof WebViewEvents.CustomWebViewEvent>(
        eventName: E,
        callback: (body: Parameters<WebViewEvents.CustomWebViewEvent[E]>[0]) => ReturnType<WebViewEvents.CustomWebViewEvent[E]>,
    ): ScriptEventHandler;
    once<E extends string>(
        eventName: Exclude<E, keyof WebViewEvents.CustomWebViewEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): ScriptEventHandler;
    emit<E extends keyof WebViewEvents.CustomWebViewEvent>(eventName: E, body?: Parameters<WebViewEvents.CustomWebViewEvent[E]>[0]): void;
    emit<E extends string>(eventName: Exclude<E, keyof WebViewEvents.CustomWebViewEvent>, body?: unknown): void;
    onPlayer<E extends keyof SharedEvents.CustomClientToWebViewEvent>(
        eventName: E,
        callback: (
            body: Parameters<SharedEvents.CustomClientToWebViewEvent[E]>[0],
        ) => ReturnType<SharedEvents.CustomClientToWebViewEvent[E]>,
    ): ScriptEventHandler;
    onPlayer<E extends string>(
        eventName: Exclude<E, keyof SharedEvents.CustomClientToWebViewEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): ScriptEventHandler;
    oncePlayer<E extends keyof SharedEvents.CustomClientToWebViewEvent>(
        eventName: E,
        callback: (
            body: Parameters<SharedEvents.CustomClientToWebViewEvent[E]>[0],
        ) => ReturnType<SharedEvents.CustomClientToWebViewEvent[E]>,
    ): ScriptEventHandler;
    oncePlayer<E extends string>(
        eventName: Exclude<E, keyof SharedEvents.CustomClientToWebViewEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): ScriptEventHandler;
    emitPlayer<E extends keyof SharedEvents.CustomWebViewToClientEvent>(
        eventName: E,
        body?: Parameters<SharedEvents.CustomWebViewToClientEvent[E]>[0],
    ): void;
    emitPlayer<E extends string>(eventName: Exclude<E, keyof SharedEvents.CustomWebViewToClientEvent>, body?: unknown): void;
    onServer<E extends keyof SharedEvents.CustomServerToWebViewEvent>(
        eventName: E,
        callback: (
            body: Parameters<SharedEvents.CustomServerToWebViewEvent[E]>[0],
        ) => ReturnType<SharedEvents.CustomServerToWebViewEvent[E]>,
    ): ScriptEventHandler;
    onServer<E extends string>(
        eventName: Exclude<E, keyof SharedEvents.CustomServerToWebViewEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): ScriptEventHandler;
    onceServer<E extends keyof SharedEvents.CustomServerToWebViewEvent>(
        eventName: E,
        callback: (
            body: Parameters<SharedEvents.CustomServerToWebViewEvent[E]>[0],
        ) => ReturnType<SharedEvents.CustomServerToWebViewEvent[E]>,
    ): ScriptEventHandler;
    onceServer<E extends string>(
        eventName: Exclude<E, keyof SharedEvents.CustomServerToWebViewEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): ScriptEventHandler;
    emitServer<E extends keyof SharedEvents.CustomWebViewToServerEvent>(
        eventName: E,
        body?: Parameters<SharedEvents.CustomWebViewToServerEvent[E]>[0],
    ): void;
    emitServer<E extends string>(eventName: Exclude<E, keyof SharedEvents.CustomWebViewToServerEvent>, body?: unknown): void;
}
