import type * as Alt from 'alt-shared';
import { AltVScriptEvent } from './altv-script-event-handler';
import type { EventEmmiter, ScriptEventHandler } from '../../../interfaces';

export class AltVEventEmmiterV1 implements EventEmmiter {
    private mapEventsShared: Record<string, string> = {
        "entityColShapeEnter": "entityEnterColshape",
        "entityColShapeLeave": "entityLeaveColshape",
    }
    constructor(private readonly alt: typeof Alt, private mapEvents: Record<string, string> = {}) {}
    
    
    private getEventName(eventName: string): string{
        return this.mapEventsShared[eventName] || this.mapEvents[eventName] || eventName;
    }
    
    emit(eventName: string, ...args: any[]): void {
        this.alt.emitRaw(eventName, ...args);
    }

    on(eventName: string, listener: (...args: any[]) => void): ScriptEventHandler {
        const eventNameV1 = this.getEventName(eventName)
        this.alt.on(eventNameV1, listener);
        return new AltVScriptEvent(this.alt, eventNameV1, listener);
    }
    
    once(eventName: string, listener: (...args: any[]) => void): ScriptEventHandler {
        const eventNameV1 = this.getEventName(eventName)
        this.alt.once(eventNameV1, listener);
        return new AltVScriptEvent(this.alt, eventNameV1, listener);
    }

    off(eventName: string, listener: (...args: any[]) => void): void {
        this.alt.off(eventName, listener);
    }
}
