import { isFunction, isNil, isObject } from '../../utils';
import type { Interceptor } from '../../app/interfaces';

export function validateInterceptor(value: unknown) {
    if (isNil(value)) {
        return { valid: false, value };
    }

    if (isFunction(value) && isFunction(value.prototype.intercept)) {
        return { valid: true, value };
    }

    if (isObject(value) && isFunction((<Interceptor>value).intercept)) {
        return { valid: true, value };
    }

    return { valid: false, value };
}
