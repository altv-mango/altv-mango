import type { EventService, ScriptEventHandler } from '../interfaces';
import type { Events as SharedEvents } from '@altv/shared';
import type { Events as WebViewEvents } from '@altv/webview';

export class WebViewEventService implements EventService {
    private readonly $localHandlers: Map<string, Set<ScriptEventHandler>> = new Map();
    private readonly $remoteHandlers: Map<string, Set<ScriptEventHandler>> = new Map();

    public on<E extends keyof WebViewEvents.CustomWebViewEvent>(
        eventName: E,
        callback: (body: Parameters<WebViewEvents.CustomWebViewEvent[E]>[0]) => ReturnType<WebViewEvents.CustomWebViewEvent[E]>,
    ): ScriptEventHandler;
    public on<E extends string>(
        eventName: Exclude<E, keyof WebViewEvents.CustomWebViewEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): ScriptEventHandler;
    public on<E extends string>(
        eventName: Exclude<E, keyof WebViewEvents.CustomWebViewEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): ScriptEventHandler {
        const eventHandler: ScriptEventHandler = {
            destroy: () => {
                // @ts-ignore
                eventHandler.valid = false;
                const handlers = this.$localHandlers.get(eventName);
                handlers?.delete(eventHandler);
            },
            eventName,
            handler: callback,
            local: true,
            onlyOnce: false,
            remote: false,
            valid: true,
        };

        return eventHandler;
    }

    public once<E extends keyof WebViewEvents.CustomWebViewEvent>(
        eventName: E,
        callback: (body: Parameters<WebViewEvents.CustomWebViewEvent[E]>[0]) => ReturnType<WebViewEvents.CustomWebViewEvent[E]>,
    ): ScriptEventHandler;
    public once<E extends string>(
        eventName: Exclude<E, keyof WebViewEvents.CustomWebViewEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): ScriptEventHandler;
    public once<E extends string>(
        eventName: Exclude<E, keyof WebViewEvents.CustomWebViewEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): ScriptEventHandler {
        const eventHandler = {
            destroy: () => {
                eventHandler.valid = false;
                const handlers = this.$localHandlers.get(eventName);
                handlers?.delete(eventHandler);
            },
            eventName,
            handler: callback,
            local: true,
            onlyOnce: true,
            remote: false,
            valid: true,
        };

        return <ScriptEventHandler>eventHandler;
    }

    public emit<E extends keyof WebViewEvents.CustomWebViewEvent>(
        eventName: E,
        body?: Parameters<WebViewEvents.CustomWebViewEvent[E]>[0],
    ): void;
    public emit<E extends string>(eventName: Exclude<E, keyof WebViewEvents.CustomWebViewEvent>, body?: unknown): void;
    public emit<E extends string>(eventName: Exclude<E, keyof WebViewEvents.CustomWebViewEvent>, body?: unknown): void {
        const listeners = this.$localHandlers.get(eventName);
        listeners?.forEach((scriptEventHandler) => {
            scriptEventHandler.handler(body);
            if (!scriptEventHandler.onlyOnce) return;
            scriptEventHandler.destroy();
        });
    }

    public onPlayer<E extends keyof SharedEvents.CustomClientToWebViewEvent>(
        eventName: E,
        callback: (
            body: Parameters<SharedEvents.CustomClientToWebViewEvent[E]>[0],
        ) => ReturnType<SharedEvents.CustomClientToWebViewEvent[E]>,
    ): ScriptEventHandler;
    public onPlayer<E extends string>(
        eventName: Exclude<E, keyof SharedEvents.CustomClientToWebViewEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): ScriptEventHandler;
    public onPlayer<E extends string>(
        eventName: Exclude<E, keyof SharedEvents.CustomClientToWebViewEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): ScriptEventHandler {
        const wrapper = (...args: any[]) => callback(args[0]);
        const eventHandler: ScriptEventHandler = {
            destroy: () => {
                // @ts-ignore
                eventHandler.valid = false;
                const handlers = this.$remoteHandlers.get(eventName);
                handlers?.delete(eventHandler);
                window.alt?.off(eventName, wrapper);
            },
            eventName,
            handler: wrapper,
            local: false,
            onlyOnce: false,
            remote: true,
            valid: true,
        };
        window.alt?.on(eventName, wrapper);
        return eventHandler;
    }

    public oncePlayer<E extends keyof SharedEvents.CustomClientToWebViewEvent>(
        eventName: E,
        callback: (
            body: Parameters<SharedEvents.CustomClientToWebViewEvent[E]>[0],
        ) => ReturnType<SharedEvents.CustomClientToWebViewEvent[E]>,
    ): ScriptEventHandler;
    public oncePlayer<E extends string>(
        eventName: Exclude<E, keyof SharedEvents.CustomClientToWebViewEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): ScriptEventHandler;
    public oncePlayer<E extends string>(
        eventName: Exclude<E, keyof SharedEvents.CustomClientToWebViewEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): ScriptEventHandler {
        const wrapper = (...args: any[]) => callback(args[0]);
        const eventHandler: ScriptEventHandler = {
            destroy: () => {
                // @ts-ignore
                eventHandler.valid = false;
                const handlers = this.$remoteHandlers.get(eventName);
                handlers?.delete(eventHandler);
                window.alt?.off(eventName, wrapper);
            },
            eventName,
            handler: wrapper,
            local: false,
            onlyOnce: true,
            remote: true,
            valid: true,
        };
        window.alt?.once(eventName, wrapper);
        return eventHandler;
    }

    public emitPlayer<E extends keyof SharedEvents.CustomWebViewToClientEvent>(
        eventName: E,
        body?: Parameters<SharedEvents.CustomWebViewToClientEvent[E]>[0],
    ): void;
    public emitPlayer<E extends string>(eventName: Exclude<E, keyof SharedEvents.CustomWebViewToClientEvent>, body?: unknown): void;
    public emitPlayer<E extends string>(eventName: Exclude<E, keyof SharedEvents.CustomWebViewToClientEvent>, body?: unknown): void {
        window.alt?.emit(eventName, body);
    }

    public onServer<E extends keyof SharedEvents.CustomServerToWebViewEvent>(
        eventName: E,
        callback: (
            body: Parameters<SharedEvents.CustomServerToWebViewEvent[E]>[0],
        ) => ReturnType<SharedEvents.CustomServerToWebViewEvent[E]>,
    ): ScriptEventHandler;
    public onServer<E extends string>(
        eventName: Exclude<E, keyof SharedEvents.CustomServerToWebViewEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): ScriptEventHandler;
    public onServer<E extends string>(
        eventName: Exclude<E, keyof SharedEvents.CustomServerToWebViewEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): ScriptEventHandler {
        return this.onPlayer(<string>`WEBVIEW::ON_SERVER_${eventName}`, <any>callback);
    }

    public onceServer<E extends keyof SharedEvents.CustomServerToWebViewEvent>(
        eventName: E,
        callback: (
            body: Parameters<SharedEvents.CustomServerToWebViewEvent[E]>[0],
        ) => ReturnType<SharedEvents.CustomServerToWebViewEvent[E]>,
    ): ScriptEventHandler;
    public onceServer<E extends string>(
        eventName: Exclude<E, keyof SharedEvents.CustomServerToWebViewEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): ScriptEventHandler;
    public onceServer<E extends string>(
        eventName: Exclude<E, keyof SharedEvents.CustomServerToWebViewEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): ScriptEventHandler {
        return this.oncePlayer(<string>`WEBVIEW::ON_SERVER_${eventName}`, <any>callback);
    }

    public emitServer<E extends keyof SharedEvents.CustomWebViewToServerEvent>(
        eventName: E,
        body?: Parameters<SharedEvents.CustomWebViewToServerEvent[E]>[0],
    ): void;
    public emitServer<E extends string>(eventName: Exclude<E, keyof SharedEvents.CustomWebViewToServerEvent>, body?: unknown): void;
    public emitServer<E extends string>(eventName: Exclude<E, keyof SharedEvents.CustomWebViewToServerEvent>, body?: unknown): void {
        window.alt?.emit(<string>'WEBVIEW::EMIT_SERVER', {
            eventName,
            payload: body,
        });
    }
}
