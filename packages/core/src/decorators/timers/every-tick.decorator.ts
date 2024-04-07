import { createTimerDecorator } from '../create-timer.decorator';

export function EveryTick(name?: string) {
    return createTimerDecorator('everytick', name);
}
