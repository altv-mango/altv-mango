import type { EventService, ScriptEventHandler } from '../interfaces';
import type { Events as SharedEvents } from '@altv/shared';
import type { Events as WebViewEvents } from '@altv/webview';

export class WebViewEventService implements EventService {
    private readonly $localHandlers: Map<string, Set<ScriptEventHandler>> = new Map();
    private readonly $remoteHandlers: Map<string, Set<ScriptEventHandler>> = new Map();

    public on<E extends string>(
        eventName: Exclude<E, keyof WebViewEvents.CustomWebViewEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ) {
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

    public once<E extends string>(
        eventName: Exclude<E, keyof WebViewEvents.CustomWebViewEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ) {
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

    public emit<E extends string>(eventName: Exclude<E, keyof WebViewEvents.CustomWebViewEvent>, body?: unknown) {
        const listeners = this.$localHandlers.get(eventName);
        listeners?.forEach((scriptEventHandler) => {
            scriptEventHandler.handler(body);
            if (!scriptEventHandler.onlyOnce) return;
            scriptEventHandler.destroy();
        });
    }

    public onPlayer<E extends string>(
        eventName: Exclude<E, keyof SharedEvents.CustomClientToWebViewEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ) {
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

    public oncePlayer<E extends string>(
        eventName: Exclude<E, keyof SharedEvents.CustomClientToWebViewEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ) {
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

    public emitPlayer<E extends string>(eventName: Exclude<E, keyof SharedEvents.CustomWebViewToClientEvent>, body?: unknown) {
        window.alt?.emit(eventName, body);
    }

    public onServer<E extends string>(
        eventName: Exclude<E, keyof SharedEvents.CustomServerToWebViewEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ) {
        return this.onPlayer(<string>`WEBVIEW::ON_SERVER_${eventName}`, <any>callback);
    }

    public onceServer<E extends string>(
        eventName: Exclude<E, keyof SharedEvents.CustomServerToWebViewEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): ScriptEventHandler {
        return this.oncePlayer(<string>`WEBVIEW::ON_SERVER_${eventName}`, <any>callback);
    }

    public emitServer<E extends string>(eventName: Exclude<E, keyof SharedEvents.CustomWebViewToServerEvent>, body?: unknown) {
        window.alt?.emit(<string>'WEBVIEW::EMIT_SERVER', {
            eventName,
            payload: body,
        });
    }
}
