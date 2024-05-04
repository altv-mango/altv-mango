import { isFunction, isObject } from '../../utils';
import type {
    ClassProvider,
    ExistingProvider,
    FactoryProvider,
    OptionalFactoryDependency,
    Provider,
    ValueProvider,
} from '../../interfaces';
import { validateInjectionToken } from '../injection-token.validate';
import { InjectableScope } from '../../enums';

export function validateProvider(value: Provider) {
    if (!isObject(value) && !isFunction(value)) {
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
            return validateValueProvider(value);
        } else if ('useFactory' in value) {
            return validateFactoryProvider(value);
        } else if ('useExisting' in value) {
            return validateExistingProvider(value);
        }
    }

    return { valid: false, value };
}

export function validateClassProvider(value: ClassProvider) {
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

export function validateValueProvider(value: ValueProvider) {
    if (!('useValue' in value)) {
        return { valid: false, value, error: 'useValue is required' };
    }

    return { valid: true, value };
}

function validateOptionalFactoryDependency(value: OptionalFactoryDependency) {
    if (!('optional' in value)) {
        return { valid: false, value, error: 'optional is required' };
    }

    if (!('token' in value)) {
        return { valid: false, value, error: 'token is required' };
    }

    const tokenValidation = validateInjectionToken(value.token);
    if (!tokenValidation.valid) {
        return { valid: false, value, error: tokenValidation.error };
    }

    return { valid: true, value };
}

export function validateFactoryProvider(value: FactoryProvider) {
    if (!('useFactory' in value)) {
        return { valid: false, value, error: 'useFactory is required' };
    }

    if ('inject' in value && !Array.isArray(value.inject)) {
        return { valid: false, value, error: 'inject must be an array' };
    }

    if ('inject' in value) {
        for (const token of value.inject) {
            if (isObject(token) && 'optional' in token && 'token' in token) {
                const optionalFactoryDependencyValidation = validateOptionalFactoryDependency(token);
                if (!optionalFactoryDependencyValidation.valid) {
                    return { valid: false, value, error: optionalFactoryDependencyValidation.error };
                }
            } else {
                const tokenValidation = validateInjectionToken(token);
                if (!tokenValidation.valid) {
                    return { valid: false, value, error: tokenValidation.error };
                }
            }
        }
    }

    if ('scope' in value && !Object.values<`${InjectableScope}`>(InjectableScope).includes(value.scope)) {
        return { valid: false, value, error: 'scope must be a valid InjectableScope' };
    }

    return { valid: true, value };
}

export function validateExistingProvider(value: ExistingProvider) {
    if (!('useExisting' in value)) {
        return { valid: false, value, error: 'useExisting is required' };
    }

    return { valid: true, value };
}
