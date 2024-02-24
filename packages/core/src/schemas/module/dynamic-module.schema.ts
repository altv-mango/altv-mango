import { z } from 'zod';
import type { Newable } from '../../types';
import { isFunction } from '../../utils';

export const DynamicModuleSchema = z.object({ module: z.custom<Newable>((v) => isFunction(v)) });
