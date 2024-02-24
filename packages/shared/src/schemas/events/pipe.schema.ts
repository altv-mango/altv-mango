import { z } from 'zod';
import { isFunction, isObject } from '../../utils';
import type { Newable } from '../../types';
import type { Pipe } from '../../interfaces';

export const PipeSchema = z.custom<Newable<Pipe> | Pipe>(
    (value) => (isFunction(value) && isFunction(value.prototype.transform)) || (isObject(value) && isFunction((<Pipe>value).transform)),
);
