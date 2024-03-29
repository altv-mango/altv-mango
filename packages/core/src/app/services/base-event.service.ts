import { injectable } from 'inversify';
import { ErrorMessage } from '../../enums';
import type { Events as SharedEvents } from '@altv/shared';

@injectable()
export abstract class BaseEventService<T extends Record<string, any>> {
    protected $altEvents: any;
    protected readonly $localHandlers: Set<SharedEvents.ScriptEventHandler> = new Set();
    protected readonly $internalHandlers: Set<SharedEvents.EventHandler> = new Set();
    protected readonly $remoteHandlers: Set<SharedEvents.ScriptEventHandler> = new Set();
    protected $internalEventNames = new Set<string>();

    public on<E extends keyof T>(eventName: E, callback: (body: Parameters<T[E]>[0]) => ReturnType<T[E]>): SharedEvents.ScriptEventHandler;
    public on<E extends string>(
        eventName: Exclude<E, keyof T>,
        callback: (body: unknown) => void | Promise<void>,
    ): SharedEvents.ScriptEventHandler;
    public on<E extends string>(eventName: Exclude<E, keyof T>, callback: (body: unknown) => void | Promise<void>) {
        const wrapper = (...args: any[]) => callback(args[0]);
        const eventHandler = <SharedEvents.ScriptEventHandler>this.$altEvents.on(eventName, wrapper);
        this.$localHandlers.add(eventHandler);
        return eventHandler;
    }
    public once<E extends keyof T>(
        eventName: E,
        callback: (body: Parameters<T[E]>[0]) => ReturnType<T[E]>,
    ): SharedEvents.ScriptEventHandler;
    public once<E extends string>(
        eventName: Exclude<E, keyof T>,
        callback: (body: unknown) => void | Promise<void>,
    ): SharedEvents.ScriptEventHandler;
    public once<E extends string>(eventName: Exclude<E, keyof T>, callback: (body: unknown) => void | Promise<void>) {
        const wrapper = (...args: any[]) => callback(args[0]);
        const eventHandler = <SharedEvents.ScriptEventHandler>this.$altEvents.once(eventName, wrapper);
        this.$localHandlers.add(eventHandler);
        return eventHandler;
    }

    public emit<E extends keyof T>(eventName: E, body?: T[E]): void;
    public emit<E extends string>(eventName: E, body?: unknown): void;
    public emit<E extends string>(eventName: E, body?: unknown) {
        this.$altEvents.emitRaw(eventName, body);
    }

    protected $onInternal(eventName: string, handler: (body: unknown) => void | Promise<void>) {
        if (!this.$internalEventNames.has(eventName)) {
            throw new Error(ErrorMessage.InvalidInternalEventName);
        }
        const eventHandler = <SharedEvents.EventHandler>this.$altEvents[`on${eventName}`](handler);
        this.$internalHandlers.add(eventHandler);
        return eventHandler;
    }

    protected $onceInternal(eventName: string, handler: (body: unknown) => void | Promise<void>) {
        if (!this.$internalEventNames.has(eventName)) {
            throw new Error(ErrorMessage.InvalidInternalEventName);
        }
        const eventHandler = <SharedEvents.ScriptEventHandler>this.$altEvents[`once${eventName}`](handler);
        this.$internalHandlers.add(eventHandler);
        return eventHandler;
    }
}
