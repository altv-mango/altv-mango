import { z } from 'zod';
import { isFunction, isNil } from '../../utils';
import type { ErrorFilter } from '../../app/interfaces';

export const ErrorFilterSchema = z.custom<ErrorFilter>(
    (value) => !isNil(value) && isFunction(value) && isFunction(value.prototype.catch),
);
