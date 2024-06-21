import type { MultiplayerTimer, MultiplayerTimers } from '../../../interfaces';
import type * as Alt from '@altv/shared';

export class AltVTimers implements MultiplayerTimers {
    constructor(private readonly alt: typeof Alt) {}
    public all: MultiplayerTimer[];

    public get warningThreshold(): number {
        return this.alt.Timers.warningThreshold;
    }

    public set warningThreshold(value: number) {
        this.alt.Timers.warningThreshold = value
    }

    public get sourceLocationFrameSkipCount(): number {
        return this.alt.Timers.sourceLocationFrameSkipCount;
    }
    public set sourceLocationFrameSkipCount(value: number) {
        this.alt.Timers.sourceLocationFrameSkipCount = value;
    }

    getByID(id: number): MultiplayerTimer | null {
        return this.alt.Timers.getByID(id);
    }

    setInterval(callback: Function, interval: number, ...args: unknown[]) {
        return this.alt.Timers.setInterval(callback, interval, ...args);
    }

    setTimeout(callback: Function, timeout: number, ...args: unknown[]) {
        return this.alt.Timers.setTimeout(callback, timeout, ...args);
    }

    everyTick(callback: Function, ...args: unknown[]) {
        return this.alt.Timers.everyTick(callback, ...args);
    }

    nextTick(callback: Function, ...args: unknown[]) {
        return this.alt.Timers.nextTick(callback, ...args);
    }

    time(name?: string) {
        this.alt.Timers.time(name);
    }

    timeEnd(name?: string) {
        this.alt.Timers.timeEnd(name);
    }
}
