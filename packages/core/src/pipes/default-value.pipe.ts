import type { Pipe } from '../interfaces';
import { isNil, isNumber } from '../utils';

export class DefaultValuePipe<T = unknown, R = unknown> implements Pipe<T, T | R> {
    constructor(private readonly defaultValue: T) {}

    public transform(value: T) {
        if (isNil(value) || (isNumber(value) && isNaN(<number>value))) {
            return this.defaultValue;
        }
        return value;
    }
}
