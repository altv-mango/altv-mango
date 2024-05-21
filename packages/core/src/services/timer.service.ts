import { inject, injectable } from 'inversify';
import { isString } from '../utils';
import { Cron, type CronOptions } from 'croner';
import { MULTIPLAYER_SERVICE, type MultiplayerService, type MultiplayerTimer } from '../app';

@injectable()
export class TimerService {
    @inject(MULTIPLAYER_SERVICE) private readonly multiplayerService: MultiplayerService;
    private readonly $everyticks = new Map<string, MultiplayerTimer>();
    private readonly $intervals = new Map<string, MultiplayerTimer>();
    private readonly $timeouts = new Map<string, MultiplayerTimer>();
    private readonly $crons = new Map<string, Cron>();

    public get all() {
        return this.multiplayerService.Timers.all;
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

    public get crons() {
        return [...this.$crons.values()];
    }

    public set warningThreshold(value: number) {
        this.multiplayerService.Timers.warningThreshold = value;
    }

    public get warningThreshold() {
        return this.multiplayerService.Timers.warningThreshold;
    }

    public set sourceLocationFrameSkipCount(value: number) {
        this.multiplayerService.Timers.sourceLocationFrameSkipCount = value;
    }

    public get sourceLocationFrameSkipCount() {
        return this.multiplayerService.Timers.sourceLocationFrameSkipCount;
    }

    public createCronJob(callback: Function, options: CronOptions & { pattern: string | Date }) {
        const { pattern, ...cronOptions } = options;

        const cron = Cron(pattern, cronOptions, callback);
        if (isString(options.name)) this.$crons.set(options.name, cron);

        return cron;
    }

    public createInterval(callback: Function, interval: number, name?: string) {
        const timer = this.multiplayerService.Timers.setInterval(callback, interval);
        if (isString(name)) this.$intervals.set(name, timer);
        return timer;
    }

    public createTimeout(callback: Function, timeout: number, name?: string) {
        const timer = this.multiplayerService.Timers.setTimeout(callback, timeout);
        if (isString(name)) this.$timeouts.set(name, timer);
        return timer;
    }

    public createEveryTick(callback: Function, name?: string) {
        const timer = this.multiplayerService.Timers.everyTick(callback);
        if (isString(name)) this.$everyticks.set(name, timer);
        return timer;
    }

    public delete(type: 'cron' | 'everytick' | 'timeout' | 'interval', name: string) {
        switch (type) {
            case 'cron':
                const cronJob = this.$crons.get(name);
                if (cronJob) {
                    cronJob.stop();
                    this.$crons.delete(name);
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
                return this.$crons.get(name);
            case 'everytick':
                return this.$everyticks.get(name);
            case 'interval':
                return this.$intervals.get(name);
            case 'timeout':
                return this.$timeouts.get(name);
        }
    }

    public getById(id: number) {
        return this.multiplayerService.Timers.getByID(id);
    }

    public time(name?: string) {
        return this.multiplayerService.Timers.time(name);
    }

    public timeEnd(name?: string) {
        return this.multiplayerService.Timers.timeEnd(name);
    }
}
