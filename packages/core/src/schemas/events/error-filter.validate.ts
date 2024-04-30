import { isFunction, isNil, isObject } from '../../utils';
import type { ErrorFilter } from '../../app/interfaces';

export function validateErrorFilter(value: unknown) {
    if (isNil(value)) {
        return { valid: false, value };
    }

    if (isFunction(value) && isFunction(value.prototype.catch)) {
        return { valid: true, value };
    }

    if (isObject(value) && isFunction((<ErrorFilter>value).catch)) {
        return { valid: true, value };
    }

    return { valid: false, value };
}
