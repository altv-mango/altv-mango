import { injectable } from 'inversify';
import { ErrorMessage } from '../../enums';
import * as altShared from '@altv/shared';

@injectable()
export abstract class BaseEventService<T extends Record<string, any>> {
    protected $altEvents: any;
    protected readonly $localHandlers: Set<altShared.Events.ScriptEventHandler> = new Set();
    protected readonly $internalHandlers: Set<altShared.Events.EventHandler> = new Set();
    protected readonly $remoteHandlers: Set<altShared.Events.ScriptEventHandler> = new Set();
    protected $internalEventNames = new Set<string>();

    public on<E extends keyof T>(
        eventName: E,
        callback: (body: Parameters<T[E]>[0]) => ReturnType<T[E]>,
    ): altShared.Events.ScriptEventHandler;
    public on<E extends string>(
        eventName: Exclude<E, keyof T>,
        callback: (body: unknown) => void | Promise<void>,
    ): altShared.Events.ScriptEventHandler;
    public on<E extends string>(
        eventName: Exclude<E, keyof T>,
        callback: (body: unknown) => void | Promise<void>,
    ): altShared.Events.ScriptEventHandler {
        const wrapper = (...args: any[]) => callback(args[0]);
        const eventHandler = <altShared.Events.ScriptEventHandler>this.$altEvents.on(eventName, wrapper);
        this.$localHandlers.add(eventHandler);
        return eventHandler;
    }
    public once<E extends keyof T>(
        eventName: E,
        callback: (body: Parameters<T[E]>[0]) => ReturnType<T[E]>,
    ): altShared.Events.ScriptEventHandler;
    public once<E extends string>(
        eventName: Exclude<E, keyof T>,
        callback: (body: unknown) => void | Promise<void>,
    ): altShared.Events.ScriptEventHandler;
    public once<E extends string>(
        eventName: Exclude<E, keyof T>,
        callback: (body: unknown) => void | Promise<void>,
    ): altShared.Events.ScriptEventHandler {
        const wrapper = (...args: any[]) => callback(args[0]);
        const eventHandler = <altShared.Events.ScriptEventHandler>this.$altEvents.once(eventName, wrapper);
        this.$localHandlers.add(eventHandler);
        return eventHandler;
    }

    public emit<E extends keyof T>(eventName: E, body?: T[E]): void;
    public emit<E extends string>(eventName: E, body?: unknown): void;
    public emit<E extends string>(eventName: E, body?: unknown): void {
        this.$altEvents.emitRaw(eventName, body);
    }

    protected $onInternal(eventName: string, handler: (body: unknown) => void | Promise<void>) {
        if (!this.$internalEventNames.has(eventName)) {
            throw new Error(ErrorMessage.InvalidInternalEventName);
        }
        const eventHandler = <altShared.Events.EventHandler>this.$altEvents[`on${eventName}`](handler);
        this.$internalHandlers.add(eventHandler);
        return eventHandler;
    }

    protected $onceInternal(eventName: string, handler: (body: unknown) => void | Promise<void>) {
        if (!this.$internalEventNames.has(eventName)) {
            throw new Error(ErrorMessage.InvalidInternalEventName);
        }
        const eventHandler = <altShared.Events.ScriptEventHandler>this.$altEvents[`once${eventName}`](handler);
        this.$internalHandlers.add(eventHandler);
        return eventHandler;
    }
}
