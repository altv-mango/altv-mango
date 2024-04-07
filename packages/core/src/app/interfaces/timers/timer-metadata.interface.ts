import type { CronOptions } from 'croner';

export type TimerMetadata = CronTimerMetadata | EveryTickTimerMetadata | TimeoutTimerMetadata | IntervalTimerMetadata;

export interface CronTimerMetadata {
    type: 'cron';
    name: string;
    method: string;
    options: CronOptions & { pattern: string | Date };
}

export interface EveryTickTimerMetadata {
    type: 'everytick';
    name: string;
    method: string;
    options: never;
}

export interface TimeoutTimerMetadata {
    type: 'timeout';
    name: string;
    method: string;
    options: {
        timeout: number;
    };
}

export interface IntervalTimerMetadata {
    type: 'interval';
    name: string;
    method: string;
    options: {
        timeout: number;
    };
}
