import { z } from 'zod';
import { isFunction, isObject } from '../../utils';
import type { Guard } from '../../app/interfaces';
import type { Newable } from '../../types';

export const GuardSchema = z.custom<Newable<Guard> | Guard>(
    (value) =>
        (isFunction(value) && isFunction(value.prototype.canActivate)) ||
        (isObject(value) && isFunction((<Guard>value).canActivate)),
);
