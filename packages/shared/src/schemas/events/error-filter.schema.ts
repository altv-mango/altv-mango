import { z } from 'zod';
import { isFunction, isObject } from '../../utils';
import type { ErrorFilter } from '../../app/interfaces';
import type { Newable } from '../../types';

export const ErrorFilterSchema = z.custom<Newable<ErrorFilter> | ErrorFilter>(
    (value) =>
        (isFunction(value) && isFunction(value.prototype.catch)) ||
        (isObject(value) && isFunction((<ErrorFilter>value).catch)),
);
