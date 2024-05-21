import type * as Alt from 'alt-shared';
import { AltVScriptEvent } from './altv-script-event-handler';
import type { EventEmmiter, ScriptEventHandler } from '../../../interfaces';

export class AltVEventEmmiterV1 implements EventEmmiter {
    constructor(private readonly alt: typeof Alt) {}
    emit(eventName: string, ...args: any[]): void {
        this.alt.emitRaw(eventName, ...args);
    }

    on(eventName: string, listener: (...args: any[]) => void): ScriptEventHandler {
        this.alt.on(eventName, listener);
        return new AltVScriptEvent(this.alt, eventName, listener);
    }
    
    once(eventName: string, listener: (...args: any[]) => void): ScriptEventHandler {
        this.alt.once(eventName, listener);
        return new AltVScriptEvent(this.alt, eventName, listener);
    }

    off(eventName: string, listener: (...args: any[]) => void): void {
        this.alt.off(eventName, listener);
    }
}
