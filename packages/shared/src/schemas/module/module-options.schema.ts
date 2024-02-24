import { z } from 'zod';
import { DynamicModuleSchema } from './dynamic-module.schema';
import type { Newable } from '../../types';
import type { DynamicModule } from '../../interfaces';
import { ProviderSchema } from './provider.schema';
import { InjectionTokenSchema } from '../injection-token.schema';
import { isFunction } from '../../utils';

export const ModuleOptionsSchema = z
    .object({
        imports: z
            .array(
                z.union([
                    z.custom<Newable>((v) => isFunction(v)),
                    DynamicModuleSchema,
                    z.custom<Promise<DynamicModule>>((v) => v instanceof Promise),
                ]),
            )
            .refine((v) => new Set(v).size === v.length, 'Array must have unique values.')
            .optional()
            .default([]),
        controllers: z
            .array(z.custom<Newable>((v) => isFunction(v)))
            .refine((v) => new Set(v).size === v.length, 'Array must have unique values.')
            .optional()
            .default([]),
        providers: z
            .array(ProviderSchema)
            .refine((v) => new Set(v).size === v.length, 'Array must have unique values.')
            .optional()
            .default([]),
        exports: z
            .array(z.union([InjectionTokenSchema, DynamicModuleSchema, ProviderSchema]))
            .refine((v) => new Set(v).size === v.length, 'Array must have unique values.')
            .optional()
            .default([]),
    })
    .optional()
    .default({
        controllers: [],
        imports: [],
        providers: [],
        exports: [],
    });
