import type * as Alt from 'alt-shared';
import { AltVEventEmmiterV1 } from './altv-event-emmiter';
import type { EventEmmiter, MultiplayerService, MultiplayerTimers } from '../../../interfaces';

export class AltMultiplayerServceV1 implements MultiplayerService {
    readonly Timers: MultiplayerTimers;
    Events: EventEmmiter;
    constructor(private readonly alt: typeof Alt) {
        this.Events = new AltVEventEmmiterV1(this.alt);
    }
    log(arg: any, ...args: any[]): void {
        this.alt.log(arg, ...args);
    }
    logError(arg: any, ...args: any[]): void {
        this.alt.logError(arg, ...args);
    }
    logWarning(arg: any, ...args: any[]): void {
        this.alt.logWarning(arg, ...args);
    }
    logDebug(arg: any, ...args: any[]): void {
        this.alt.logDebug(arg, ...args);
    }
}
