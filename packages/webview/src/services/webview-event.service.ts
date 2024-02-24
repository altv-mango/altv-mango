import type { EventService, ScriptEventHandler } from '../interfaces';
import * as altShared from '@altv/shared';

export class WebViewEventService implements EventService {
    private readonly $localHandlers: Map<string, Set<ScriptEventHandler>> = new Map();
    private readonly $remoteHandlers: Map<string, Set<ScriptEventHandler>> = new Map();

    public on<E extends keyof altShared.Events.CustomWebViewToWebViewEvent>(
        eventName: E,
        callback: (
            body: Parameters<altShared.Events.CustomWebViewToWebViewEvent[E]>[0],
        ) => ReturnType<altShared.Events.CustomWebViewToWebViewEvent[E]>,
    ): ScriptEventHandler;
    public on<E extends string>(
        eventName: Exclude<E, keyof altShared.Events.CustomWebViewToWebViewEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): ScriptEventHandler;
    public on<E extends string>(
        eventName: Exclude<E, keyof altShared.Events.CustomWebViewToWebViewEvent>,
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

    public once<E extends keyof altShared.Events.CustomWebViewToWebViewEvent>(
        eventName: E,
        callback: (
            body: Parameters<altShared.Events.CustomWebViewToWebViewEvent[E]>[0],
        ) => ReturnType<altShared.Events.CustomWebViewToWebViewEvent[E]>,
    ): ScriptEventHandler;
    public once<E extends string>(
        eventName: Exclude<E, keyof altShared.Events.CustomWebViewToWebViewEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): ScriptEventHandler;
    public once<E extends string>(
        eventName: Exclude<E, keyof altShared.Events.CustomWebViewToWebViewEvent>,
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
            location: { fileName: '', lineNumber: 0 },
            onlyOnce: true,
            remote: false,
            valid: true,
        };

        return <ScriptEventHandler>eventHandler;
    }

    public emit<E extends keyof altShared.Events.CustomWebViewToWebViewEvent>(
        eventName: E,
        body?: Parameters<altShared.Events.CustomWebViewToWebViewEvent[E]>[0],
    ): void;
    public emit<E extends string>(eventName: Exclude<E, keyof altShared.Events.CustomWebViewToWebViewEvent>, body?: unknown): void;
    public emit<E extends string>(eventName: Exclude<E, keyof altShared.Events.CustomWebViewToWebViewEvent>, body?: unknown): void {
        const listeners = this.$localHandlers.get(eventName);
        listeners?.forEach((scriptEventHandler) => {
            scriptEventHandler.handler(body);
            if (!scriptEventHandler.onlyOnce) return;
            scriptEventHandler.destroy();
        });
    }

    public onPlayer<E extends keyof altShared.Events.CustomClientToWebViewEvent>(
        eventName: E,
        callback: (
            body: Parameters<altShared.Events.CustomClientToWebViewEvent[E]>[0],
        ) => ReturnType<altShared.Events.CustomClientToWebViewEvent[E]>,
    ): ScriptEventHandler;
    public onPlayer<E extends string>(
        eventName: Exclude<E, keyof altShared.Events.CustomClientToWebViewEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): ScriptEventHandler;
    public onPlayer<E extends string>(
        eventName: Exclude<E, keyof altShared.Events.CustomClientToWebViewEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): ScriptEventHandler {
        const wrapper = (...args: any[]) => callback(args[0]);
        const eventHandler: ScriptEventHandler = {
            destroy: () => {
                // @ts-ignore
                eventHandler.valid = false;
                const handlers = this.$remoteHandlers.get(eventName);
                handlers?.delete(eventHandler);
                window.alt.off(eventName, wrapper);
            },
            eventName,
            handler: wrapper,
            local: false,
            onlyOnce: false,
            remote: true,
            valid: true,
        };
        window.alt.on(eventName, wrapper);
        return eventHandler;
    }

    public oncePlayer<E extends keyof altShared.Events.CustomClientToWebViewEvent>(
        eventName: E,
        callback: (
            body: Parameters<altShared.Events.CustomClientToWebViewEvent[E]>[0],
        ) => ReturnType<altShared.Events.CustomClientToWebViewEvent[E]>,
    ): ScriptEventHandler;
    public oncePlayer<E extends string>(
        eventName: Exclude<E, keyof altShared.Events.CustomClientToWebViewEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): ScriptEventHandler;
    public oncePlayer<E extends string>(
        eventName: Exclude<E, keyof altShared.Events.CustomClientToWebViewEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): ScriptEventHandler {
        const wrapper = (...args: any[]) => callback(args[0]);
        const eventHandler: ScriptEventHandler = {
            destroy: () => {
                // @ts-ignore
                eventHandler.valid = false;
                const handlers = this.$remoteHandlers.get(eventName);
                handlers?.delete(eventHandler);
                window.alt.off(eventName, wrapper);
            },
            eventName,
            handler: wrapper,
            local: false,
            onlyOnce: true,
            remote: true,
            valid: true,
        };
        window.alt.once(eventName, wrapper);
        return eventHandler;
    }

    public emitPlayer<E extends keyof altShared.Events.CustomWebViewToClientEvent>(
        eventName: E,
        body?: Parameters<altShared.Events.CustomWebViewToClientEvent[E]>[0],
    ): void;
    public emitPlayer<E extends string>(eventName: Exclude<E, keyof altShared.Events.CustomWebViewToClientEvent>, body?: unknown): void;
    public emitPlayer<E extends string>(eventName: Exclude<E, keyof altShared.Events.CustomWebViewToClientEvent>, body?: unknown): void {
        window.alt.emit(eventName, body);
    }

    public onServer<E extends keyof altShared.Events.CustomServerToWebViewEvent>(
        eventName: E,
        callback: (
            body: Parameters<altShared.Events.CustomServerToWebViewEvent[E]>[0],
        ) => ReturnType<altShared.Events.CustomServerToWebViewEvent[E]>,
    ): ScriptEventHandler;
    public onServer<E extends string>(
        eventName: Exclude<E, keyof altShared.Events.CustomServerToWebViewEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): ScriptEventHandler;
    public onServer<E extends string>(
        eventName: Exclude<E, keyof altShared.Events.CustomServerToWebViewEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): ScriptEventHandler {
        return this.onPlayer(<string>`WEBVIEW::ON_SERVER_${eventName}`, <any>callback);
    }

    public onceServer<E extends keyof altShared.Events.CustomServerToWebViewEvent>(
        eventName: E,
        callback: (
            body: Parameters<altShared.Events.CustomServerToWebViewEvent[E]>[0],
        ) => ReturnType<altShared.Events.CustomServerToWebViewEvent[E]>,
    ): ScriptEventHandler;
    public onceServer<E extends string>(
        eventName: Exclude<E, keyof altShared.Events.CustomServerToWebViewEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): ScriptEventHandler;
    public onceServer<E extends string>(
        eventName: Exclude<E, keyof altShared.Events.CustomServerToWebViewEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): ScriptEventHandler {
        return this.oncePlayer(<string>`WEBVIEW::ON_SERVER_${eventName}`, <any>callback);
    }

    public emitServer<E extends keyof altShared.Events.CustomWebViewToServerEvent>(
        eventName: E,
        body?: Parameters<altShared.Events.CustomWebViewToServerEvent[E]>[0],
    ): void;
    public emitServer<E extends string>(eventName: Exclude<E, keyof altShared.Events.CustomWebViewToServerEvent>, body?: unknown): void;
    public emitServer<E extends string>(eventName: Exclude<E, keyof altShared.Events.CustomWebViewToServerEvent>, body?: unknown): void {
        window.alt.emit('WEBVIEW::EMIT_SERVER', {
            eventName,
            payload: body,
        });
    }
}
