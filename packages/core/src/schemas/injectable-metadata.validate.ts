import { isNil, isObject, isString } from '../utils';
import { InjectableScope } from '../enums';
import type { InjectableOptions } from '../interfaces';

const defaultInjectableOptions: InjectableOptions = { scope: InjectableScope.Singleton };

export function validateInjectableMetadata(value?: InjectableOptions) {
    if (isNil(value)) {
        return { valid: true, value: defaultInjectableOptions };
    }

    if (!isObject(value)) {
        return { valid: false, value: defaultInjectableOptions, error: 'Injectable options must be an object' };
    }

    if (!('scope' in value)) {
        return { valid: true, value: { ...defaultInjectableOptions, ...value } };
    }
    if ('scope' in value && !isString(value.scope)) {
        return { valid: false, value: defaultInjectableOptions, error: 'Injectable scope must be a string' };
    }

    if ('scope' in value && !Object.values<`${InjectableScope}`>(InjectableScope).includes(value.scope)) {
        return { valid: false, value: defaultInjectableOptions, error: 'Invalid injectable scope' };
    }

    return { valid: true, value };
}
