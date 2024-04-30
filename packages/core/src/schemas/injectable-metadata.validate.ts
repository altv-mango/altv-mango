import { isNil, isObject, isString } from '../utils';
import { InjectableScope } from '../enums';

export function validateInjectableMetadata(metadata: unknown) {
    if (isNil(metadata)) {
        return { valid: true, value: { scope: InjectableScope.Singleton } };
    }

    if (!isObject(metadata)) {
        return { valid: false, value: { scope: InjectableScope.Singleton } };
    }

    if ('scope' in metadata && isString(metadata.scope) && Object.keys(InjectableScope).includes(metadata.scope)) {
        return { valid: true, value: metadata };
    }

    return { valid: false, value: { scope: InjectableScope.Singleton } };
}
