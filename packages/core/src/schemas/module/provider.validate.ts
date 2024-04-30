import type { Newable } from '../../types';
import { isFunction, isObject } from '../../utils';
import type { ClassProvider, Provider } from '../../interfaces';
import { validateInjectionToken } from '../injection-token.validate';
import { InjectableScope } from '../../enums';

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
    FactoryProviderSchema,
    ExistingProviderSchema,
    ClassProviderSchema,
    ValueProviderSchema,
    z.custom<Newable>((val) => isFunction(val)),
]);

export function validateProvider(value: Provider) {
    if (!isObject(value) || !isFunction(value)) {
        return { valid: false, value, error: 'Provider must be an object or function' };
    }

    if (isObject(value)) {
        if (!('provide' in value)) {
            return { valid: false, value, error: 'provide is required' };
        }

        const provideValidation = validateInjectionToken(value.provide);
        if (!provideValidation.valid) {
            return { valid: false, value, error: provideValidation.error };
        }

        if ('useClass' in value) {
            return validateClassProvider(value);
        } else if ('useValue' in value) {
        } else if ('useFactory' in value) {
        } else if ('useExisting' in value) {
        }
    }

    return { valid: false, value };
}

function validateClassProvider(value: ClassProvider) {
    if (!('useClass' in value)) {
        return { valid: false, value, error: 'useClass is required' };
    }

    if (!('scope' in value)) {
        value.scope = InjectableScope.Singleton;
    }

    if ('scope' in value && !Object.values<`${InjectableScope}`>(InjectableScope).includes(value.scope)) {
        return { valid: false, value, error: 'scope must be a valid InjectableScope' };
    }

    return { valid: true, value };
}
