import type { EventMetadata } from '../../app';
import { isNil, isObject, isString } from '../../utils';
import { validateEventParameter } from './event-parameter.validate';

export function validateEventMetadata(value: EventMetadata) {
    if (isNil(value) || !isObject(value)) {
        return { valid: false, value, error: 'Event metadata must be an object' };
    }

    // Type
    if (!('type' in value)) {
        return { valid: false, value, error: 'Event metadata type is required' };
    }
    if (!isString(value.type)) {
        return { valid: false, value, error: 'Event metadata type must be a string' };
    }
    // Name
    if (!('name' in value)) {
        return { valid: false, value, error: 'Event metadata name is required' };
    }
    if (!isString(value.name)) {
        return { valid: false, value, error: 'Event metadata name must be a string' };
    }
    // Method
    if (!('method' in value)) {
        return { valid: false, value, error: 'Event metadata method is required' };
    }
    if (!isString(value.method)) {
        return { valid: false, value, error: 'Event metadata method must be a string' };
    }
    // Params
    if (!('params' in value)) {
        (<EventMetadata>value).params = [];
    }
    if ('params' in value && !Array.isArray(value.params)) {
        return { valid: false, value, error: 'Event metadata params must be an array' };
    }
    for (const param of value.params) {
        const { valid, error } = validateEventParameter(param);
        if (!valid) {
            return { valid, value, error };
        }
    }

    return { valid: true, value };
}
