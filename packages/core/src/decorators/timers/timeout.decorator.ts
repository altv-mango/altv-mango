import { isString } from '../../utils';
import { createTimerDecorator } from '../create-timer.decorator';

export function Timeout(timeout: number): MethodDecorator;
export function Timeout(name: string, value: number): MethodDecorator;
export function Timeout(nameOrTimeout: string | number, timeout?: number): MethodDecorator {
    const [name, intervalTimeout] = isString(nameOrTimeout) ? [nameOrTimeout, timeout] : [undefined, nameOrTimeout];
    return createTimerDecorator('timeout', name, { timeout: intervalTimeout! });
}
