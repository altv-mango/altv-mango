import { z } from 'zod';
import { DynamicModuleSchema } from './dynamic-module.validate';
import type { Newable } from '../../types';
import type { DynamicModule, ModuleOptions } from '../../interfaces';
import { ProviderSchema } from './provider.validate';
import { isBoolean, isFunction, isNil, isObject } from '../../utils';

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
            .array(z.union([InjectionTokenSchema, ProviderSchema]))
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

export function validateModuleOptions(value: ModuleOptions | DynamicModule, isDynamic = false) {
    if (isNil(value)) {
        value = {
            controllers: [],
            imports: [],
            providers: [],
            exports: [],
        };
    }

    if (!isNil(value) && !isObject(value)) {
        return { valid: false, value };
    }

    if (isDynamic) {
        if (!('module' in value) || !isFunction(value.module)) {
            return { valid: false, value };
        }

        if (!('global' in value) && !isBoolean(value.global)) {
            return { valid: false, value };
        } else if (!('global' in value)) {
            value.global = false;
        }
    }

    if ('imports' in value && !Array.isArray(value.imports)) {
        return { valid: false, value };
    } else if (!('imports' in value)) {
        value.imports = [];
    }

    if ('controllers' in value && !Array.isArray(value.controllers)) {
        return { valid: false, value };
    } else if (!('controllers' in value)) {
        value.controllers = [];
    }

    if ('providers' in value && !Array.isArray(value.providers)) {
        return { valid: false, value };
    } else if (!('providers' in value)) {
        value.providers = [];
    }

    if ('exports' in value && !Array.isArray(value.exports)) {
        return { valid: false, value };
    } else if (!('exports' in value)) {
        value.exports = [];
    }

    for (const imported of value.imports) {
        if (!isFunction(imported) && !isObject(imported) && !(imported instanceof Promise)) {
            return { valid: false, value };
        }

        if (isObject(imported)) {
            const { valid } = validateModuleOptions(imported as DynamicModule, true);
            if (!valid) {
                return { valid: false, value };
            }
        }
    }

    for (const controller of value.controllers) {
        if (!isFunction(controller)) {
            return { valid: false, value };
        }
    }

    for (const provider of value.providers) {
        const { valid } = validateProvider(provider);
        if (!valid) {
            return { valid: false, value };
        }
    }

    for (const exportItem of value.exports) {
        if (!isInjectionToken(exportItem) && !isProvider(exportItem)) {
            return { valid: false, value };
        }
    }

    return { valid: true, value };
}
