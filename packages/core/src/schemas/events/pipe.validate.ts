import { isFunction, isNil, isObject } from '../../utils';
import type { Pipe } from '../../interfaces';
import type { Newable } from '../../types';

export function validatePipe(value: Pipe | Newable<Pipe>) {
    if (isNil(value)) {
        return { valid: false, value, error: 'Pipe must be a class or a function' };
    }

    if (!isFunction(value) && !isObject(value)) {
        return { valid: false, value, error: 'Pipe must be a class or a function' };
    }

    if (isFunction(value) && !isFunction(value.prototype.transform)) {
        return { valid: false, value, error: 'Pipe must have a transform method' };
    }

    if (isObject(value) && !isFunction((<Pipe>value).transform)) {
        return { valid: false, value, error: 'Pipe must have a transform method' };
    }

    return { valid: true, value };
}
