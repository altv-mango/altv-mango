import { isFunction, isNil, isObject } from '../../utils';
import type { Guard } from '../../app/interfaces';

export function validateGuard(value: unknown) {
    if (isNil(value)) {
        return { valid: false, value };
    }

    if (isFunction(value) && isFunction(value.prototype.canActivate)) {
        return { valid: true, value };
    }

    if (isObject(value) && isFunction((<Guard>value).canActivate)) {
        return { valid: true, value };
    }

    return { valid: false, value };
}
