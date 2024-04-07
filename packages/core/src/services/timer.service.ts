import { injectable } from 'inversify';
import { Timers } from '@altv/shared';
import { isString } from '../utils';
import { type CronCallback, CronJob, type CronJobParams } from 'cron';
import type { CronOptions } from '../interfaces';

@injectable()
export class TimerService {
    private readonly $everyticks = new Map<string, Timer>();
    private readonly $intervals = new Map<string, Timer>();
    private readonly $timeouts = new Map<string, Timer>();
    private readonly $cronJobs = new Map<string, CronJob>();

    public get all() {
        return Timers.all;
    }

    public get everyticks() {
        return [...this.$everyticks.values()];
    }

    public get intervals() {
        return [...this.$intervals.values()];
    }

    public get timeouts() {
        return [...this.$timeouts.values()];
    }

    public get cronJobs() {
        return [...this.$cronJobs.values()];
    }

    public set warningThreshold(value: number) {
        Timers.warningThreshold = value;
    }

    public get warningThreshold() {
        return Timers.warningThreshold;
    }

    public set sourceLocationFrameSkipCount(value: number) {
        Timers.sourceLocationFrameSkipCount = value;
    }

    public get sourceLocationFrameSkipCount() {
        return Timers.sourceLocationFrameSkipCount;
    }

    public createCronJob(callback: Function, options: CronOptions & { cronTime: CronJobParams['cronTime'] }) {
        const { name, disabled, ...cronOptions } = options;

        const cronJob = CronJob.from({ ...cronOptions, onTick: callback as CronCallback<null, false>, start: !disabled });
        if (isString(name)) this.$cronJobs.set(name, cronJob);

        return cronJob;
    }

    public createInterval(callback: Function, interval: number, name?: string) {
        const timer = Timers.setInterval(callback, interval);
        if (isString(name)) this.$intervals.set(name, timer);
        return timer;
    }

    public createTimeout(callback: Function, timeout: number, name?: string) {
        const timer = Timers.setTimeout(callback, timeout);
        if (isString(name)) this.$timeouts.set(name, timer);
        return timer;
    }

    public createEveryTick(callback: Function, name?: string) {
        const timer = Timers.everyTick(callback);
        if (isString(name)) this.$everyticks.set(name, timer);
        return timer;
    }

    public delete(type: 'cron' | 'everytick' | 'timeout' | 'interval', name: string) {
        switch (type) {
            case 'cron':
                const cronJob = this.$cronJobs.get(name);
                if (cronJob) {
                    cronJob.stop();
                    this.$cronJobs.delete(name);
                }
                break;
            case 'everytick':
                const everytick = this.$everyticks.get(name);
                if (everytick) {
                    everytick.destroy();
                    this.$everyticks.delete(name);
                }
                break;
            case 'interval':
                const interval = this.$intervals.get(name);
                if (interval) {
                    interval.destroy();
                    this.$intervals.delete(name);
                }
                break;
            case 'timeout':
                const timeout = this.$timeouts.get(name);
                if (timeout) {
                    timeout.destroy();
                    this.$timeouts.delete(name);
                }
                break;
        }
    }

    public getByName(type: 'cron' | 'everytick' | 'timeout' | 'interval', name: string) {
        switch (type) {
            case 'cron':
                return this.$cronJobs.get(name);
            case 'everytick':
                return this.$everyticks.get(name);
            case 'interval':
                return this.$intervals.get(name);
            case 'timeout':
                return this.$timeouts.get(name);
        }
    }

    public getById(id: number) {
        return Timers.getByID(id);
    }

    public time(name?: string) {
        return Timers.time(name);
    }

    public timeEnd(name?: string) {
        return Timers.timeEnd(name);
    }
}
