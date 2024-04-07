import { isString } from '../../utils';
import { createTimerDecorator } from '../create-timer.decorator';

export function Interval(timeout: number): MethodDecorator;
export function Interval(name: string, timeout: number): MethodDecorator;
export function Interval(nameOrTimeout: string | number, timeout?: number): MethodDecorator {
    const [name, intervalTimeout] = isString(nameOrTimeout) ? [nameOrTimeout, timeout] : [undefined, nameOrTimeout];
    return createTimerDecorator('interval', name, { timeout: intervalTimeout! });
}
