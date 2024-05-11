import { isFunction, isNil, isObject } from '../../utils';
import type { Interceptor } from '../../app/interfaces';
import type { Newable } from '../../types';

export function validateInterceptor<I extends Interceptor = Interceptor>(value: I | Newable<I>) {
    if (isNil(value)) {
        return { valid: false, value, error: 'Interceptor must be a class or a function' };
    }

    if (!isFunction(value) && !isObject(value)) {
        return { valid: false, value, error: 'Interceptor must be a class or a function' };
    }

    if (isFunction(value) && !isFunction(value.prototype.intercept)) {
        return { valid: false, value, error: 'Interceptor must have an intercept method' };
    }

    if (isObject(value) && !isFunction((<Interceptor>value).intercept)) {
        return { valid: false, value, error: 'Interceptor must have an intercept method' };
    }

    return { valid: true, value };
}
