import type { EventEmmiter } from '../../../interfaces';
import type { MultiplayerService, MultiplayerTimers } from '../../../interfaces/multiplayer';
import type * as Alt from '@altv/shared';
import { AltVTimers } from './altv-timers';
import { AltVEventEmmiterV2 } from './altv-event-emmiter';
import { isObject } from '../../../../utils';

export class AltMultiplayerServceV2 implements MultiplayerService {
    readonly Timers: MultiplayerTimers;
    readonly Events: EventEmmiter;
    constructor(private readonly alt: typeof Alt) {
        this.Events = new AltVEventEmmiterV2(this.alt);
        this.Timers = new AltVTimers(this.alt);
    }

    parseInternalArgs<U = unknown, T = unknown>(...args: any): {
        player?: U;
        body?: T;
    }{
        const body = args[0];
        const player = (isObject(body) && 'player' in body && isObject(body.player) ? body.player : undefined) as U;

        return {
            player,
            body,
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
