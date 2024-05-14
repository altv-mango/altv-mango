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
            return { valid: false, value, error: 'Provider must have a provide property' };
        }

        const { valid, error } = validateInjectionToken(value.provide);
        if (!valid) {
            return { valid: false, value, error };
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
    } else if (isFunction(value)) {
        return { valid: true, value };
    }

    return { valid: false, value, error: 'Provider must have a useClass, useValue, useFactory, or useExisting property' };
}

export function validateClassProvider(value: ClassProvider) {
    if (!('useClass' in value)) {
        return { valid: false, value, error: 'Provider must have a useClass property' };
    }

    if (!('scope' in value)) {
        value.scope = InjectableScope.Singleton;
    }

    if ('scope' in value && !Object.values<`${InjectableScope}`>(InjectableScope).includes(value.scope)) {
        return { valid: false, value, error: 'Provider scope must be a valid injectable scope' };
    }

    return { valid: true, value };
}

export function validateValueProvider(value: ValueProvider) {
    if (!('useValue' in value)) {
        return { valid: false, value, error: 'Provider must have a useValue property' };
    }

    return { valid: true, value };
}

function validateOptionalFactoryDependency(value: OptionalFactoryDependency) {
    if (!('optional' in value)) {
        return { valid: false, value, error: 'Provider must have an optional property' };
    }

    if (!('token' in value)) {
        return { valid: false, value, error: 'Provider must have a token property' };
    }

    const { valid, error } = validateInjectionToken(value.token);
    if (!valid) {
        return { valid: false, value, error };
    }

    return { valid: true, value };
}

export function validateFactoryProvider(value: FactoryProvider) {
    if (!('useFactory' in value)) {
        return { valid: false, value, error: 'Provider must have a useFactory property' };
    }
    if (!isFunction(value.useFactory)) {
        return { valid: false, value, error: 'Provider useFactory must be a function' };
    }

    if (!('inject' in value)) {
        value.inject = [];
    }
    if ('inject' in value && !Array.isArray(value.inject)) {
        return { valid: false, value, error: 'Provider inject must be an array' };
    }
    if ('inject' in value) {
        for (const token of value.inject) {
            if (isObject(token) && 'optional' in token && 'token' in token) {
                const { valid, error } = validateOptionalFactoryDependency(token);
                if (!valid) {
                    return { valid, value, error };
                }
            } else {
                const { valid, error } = validateInjectionToken(token);
                if (!valid) {
                    return { valid, value, error };
                }
            }
        }
    }

    if ('scope' in value && !Object.values<`${InjectableScope}`>(InjectableScope).includes(value.scope)) {
        return { valid: false, value, error: 'Provider scope must be a valid injectable scope' };
    }

    return { valid: true, value };
}

export function validateExistingProvider(value: ExistingProvider) {
    if (!('useExisting' in value)) {
        return { valid: false, value, error: 'Provider must have a useExisting property' };
    }

    return { valid: true, value };
}
