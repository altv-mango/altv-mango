import { z } from 'zod';
import type { Newable } from '../types';
import { isFunction, isObject } from '../utils';

export const InjectionTokenSchema = z.union([
    z.string(),
    z.symbol(),
    z.custom<Newable>((token) => isFunction(token)),
    z.custom((token) => isObject(token)),
]);
