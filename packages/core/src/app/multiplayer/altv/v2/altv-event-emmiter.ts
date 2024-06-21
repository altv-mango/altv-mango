import type { EventEmmiter, ScriptEventHandler } from '../../../interfaces';
import type * as Alt from '@altv/shared';

export class AltVEventEmmiterV2 implements EventEmmiter {
    constructor(private readonly alt: typeof Alt) {}

    emit(eventName: string, ...args: any[]): void {
        this.alt.Events.emitRaw(eventName, ...args);
    }

    on(eventName: string, listener: (...args: any[]) => void): ScriptEventHandler {
        return this.alt.Events.on(eventName, listener);
    }

    once(eventName: string, listener: (...args: any[]) => void): ScriptEventHandler {
        return this.alt.Events.once(eventName, listener);
    }

    off(eventName: string, listener: (...args: any[]) => void): void {
        this.alt.Events.unsubscribeScriptEvent(true, eventName, listener);
    }
}
