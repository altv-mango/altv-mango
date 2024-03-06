import { z } from 'zod';
import type { Newable } from '../../types';
import { InjectionTokenSchema } from '../injection-token.schema';
import { isFunction } from '../../utils';

const ClassProviderSchema = z.object({
    provide: InjectionTokenSchema,
    useClass: z.custom<Newable>((val) => isFunction(val)),
    scope: z.enum(['request', 'transient', 'singleton']).optional().default('singleton'),
});

const ValueProviderSchema = z.object({
    provide: InjectionTokenSchema,
    useValue: z.any(),
});

const FactoryProviderSchema = z.object({
    provide: InjectionTokenSchema,
    useFactory: z.custom<(...args: unknown[]) => unknown | Promise<unknown>>((val) => isFunction(val)),
    inject: z.array(InjectionTokenSchema).optional(),
    scope: z.enum(['request', 'transient', 'singleton']).optional().default('singleton'),
});

const ExistingProviderSchema = z.object({
    provide: InjectionTokenSchema,
    useExisting: InjectionTokenSchema,
});

export const ProviderSchema = z.union([
    z.custom<Newable>((val) => isFunction(val)),
    ClassProviderSchema,
    ValueProviderSchema,
    FactoryProviderSchema,
    ExistingProviderSchema,
]);
