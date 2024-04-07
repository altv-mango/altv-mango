import type { CronOptions } from 'croner';
import { createTimerDecorator } from '../create-timer.decorator';

export function Cron(pattern: string | Date, options: CronOptions = {}) {
    return createTimerDecorator('cron', options.name, { pattern, ...options });
}
