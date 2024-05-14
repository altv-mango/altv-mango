import { isFunction, isNil, isObject } from '../../utils';
import type { ErrorFilter } from '../../app/interfaces';
import type { Newable } from '../../types';

export function validateErrorFilter<EF extends ErrorFilter = ErrorFilter>(value: EF | Newable<EF>) {
    if (isNil(value)) {
        return { valid: false, value, error: 'Error filter must be a class or a function' };
    }

    if (!isFunction(value) && !isObject(value)) {
        return { valid: false, value, error: 'Error filter must be a class or a function' };
    }

    if (isFunction(value) && !isFunction(value.prototype.catch)) {
        return { valid: true, value, error: 'Error filter must have a catch method' };
    }

    if (isObject(value) && !isFunction((<ErrorFilter>value).catch)) {
        return { valid: true, value, error: 'Error filter must have a catch method' };
    }

    return { valid: true, value };
}
