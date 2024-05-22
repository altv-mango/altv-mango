import type * as Alt from 'alt-shared';
import { AltVEventEmmiterV1 } from './altv-event-emmiter';
import type { EventEmmiter, MultiplayerService, MultiplayerTimers } from '../../../interfaces';
import { isObject } from '../../../../utils';

export class AltMultiplayerServceV1 implements MultiplayerService {
    readonly Timers: MultiplayerTimers;
    readonly Events: EventEmmiter;
    constructor(private readonly alt: typeof Alt) {
        this.Events = new AltVEventEmmiterV1(this.alt);
    }
    parseInternalArgs<U = unknown, T = unknown>(
        ...args: any
    ): {
        player?: U;
        body?: T;
    } {
        const player = (isObject(args[0]) ? args[0] : undefined) as U;

        return {
            player,
            body: args,
        };
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
