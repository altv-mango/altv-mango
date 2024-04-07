import type { CronJobParams } from 'cron';
import type { CronOptions } from '../../interfaces';
import { createTimerDecorator } from '../create-timer.decorator';

export function Cron(cronTime: CronJobParams['cronTime'], options: CronOptions = {}) {
    return createTimerDecorator('cron', options.name, { cronTime, ...options });
}
