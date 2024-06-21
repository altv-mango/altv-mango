import type { MultiplayerTimer, MultiplayerTimers } from '../../../interfaces';
import type * as Alt from 'alt-shared';
import { AltVTimer } from './altv-timer';

export class AltVTimers implements MultiplayerTimers {
    private timerIncrementer: number = 0;
    constructor(private readonly alt: typeof Alt) {}
    private timers = new Map<number, MultiplayerTimer>();

    public get all(): MultiplayerTimer[] {
        return [...Object.values(this.timers)];
    }

    public get warningThreshold(): number {
        this.alt.logWarning('Not implement');
        return 0;
    }

    public set warningThreshold(_value: number) {
        this.alt.logWarning('Not implement');
    }

    public get sourceLocationFrameSkipCount(): number {
        this.alt.logWarning('Not implement');
        return 0;
    }

    public set sourceLocationFrameSkipCount(_value: number) {
        this.alt.logWarning('Not implement');
    }

    getByID(id: number): MultiplayerTimer | null {
        const timer = this.timers.get(id);
        return timer ? timer : null;
    }

    private createTimer(
        createTimer: (...args: any[]) => number,
        clear: (id: number) => void,
        callback: Function,
        interval: number | undefined,
        once: boolean,
        ...args: unknown[]
    ) {
        const callbackBind = callback.bind(this, ...(Array.isArray(args) ? args : []));
        console.log(interval);
        const timer = typeof interval === 'number' ? createTimer(callbackBind, interval) : createTimer(callbackBind);
        const id = this.timerIncrementer++;
        const altVTimer = new AltVTimer(id, interval, once, callbackBind, () => {
            clear(timer);
            this.timers.delete(id);
        });
        this.timers.set(id, altVTimer);
        return altVTimer;
    }

    setInterval(callback: Function, time: number, ...args: unknown[]) {
        return this.createTimer(this.alt.setInterval, this.alt.clearInterval, callback, time, false, ...args);
    }

    setTimeout(callback: Function, time: number, ...args: unknown[]) {
        return this.createTimer(this.alt.setTimeout, this.alt.clearTimeout, callback, time, true, ...args);
    }

    everyTick(callback: Function, ...args: unknown[]) {
        return this.createTimer(this.alt.everyTick, this.alt.clearEveryTick, callback, undefined, false, ...args);
    }

    nextTick(callback: Function, ...args: unknown[]) {
        return this.createTimer(this.alt.nextTick, this.alt.clearNextTick, callback, undefined, true, ...args);
    }

    time(name?: string) {
        if (name) this.alt.time(name);
        this.alt.time();
    }

    timeEnd(name?: string) {
        if (name) this.alt.timeEnd(name);
        this.alt.timeEnd();
    }
}
