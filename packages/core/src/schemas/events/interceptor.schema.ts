import { z } from 'zod';
import { isFunction, isObject } from '../../utils';
import type { Interceptor } from '../../app/interfaces';
import type { Newable } from '../../types';

export const InterceptorSchema = z.custom<Newable<Interceptor> | Interceptor>(
    (value) =>
        (isFunction(value) && isFunction(value.prototype.intercept)) ||
        (isObject(value) && isFunction((<Interceptor>value).intercept)),
);
