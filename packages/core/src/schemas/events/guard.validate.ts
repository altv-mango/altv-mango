import { isFunction, isNil, isObject } from '../../utils';
import type { Guard } from '../../app/interfaces';
import type { Newable } from '../../types';

export function validateGuard<G extends Guard = Guard>(value: G | Newable<G>) {
    if (isNil(value)) {
        return { valid: false, value, error: 'Guard must be a class or a function' };
    }

    if (!isFunction(value) && !isObject(value)) {
        return { valid: false, value, error: 'Guard must be a class or a function' };
    }

    if (isFunction(value) && !isFunction(value.prototype.canActivate)) {
        return { valid: false, value, error: 'Guard must have a canActivate method' };
    }

    if (isObject(value) && !isFunction((<Guard>value).canActivate)) {
        return { valid: false, value, error: 'Guard must have a canActivate method' };
    }

    return { valid: true, value };
}
