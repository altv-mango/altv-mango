import { isFunction, isNil, isObject } from '../../utils';
import type { ErrorFilter } from '../../app/interfaces';
import type { Newable } from '../../types';

export function validateErrorFilter(value: ErrorFilter | Newable<ErrorFilter>) {
    if (isNil(value)) {
        return { valid: false, value, error: 'Error filter must be a class or a function' };
    }

    if (isFunction(value) && isFunction(value.prototype.catch)) {
        return { valid: true, value };
    }

    if (isObject(value) && isFunction((<ErrorFilter>value).catch)) {
        return { valid: true, value };
    }

    return { valid: false, value, error: 'Error filter must be a class or a function' };
}
