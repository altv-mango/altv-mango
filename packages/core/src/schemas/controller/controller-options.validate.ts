import type { ControllerOptions } from '../../interfaces';
import { isNil, isObject, isString } from '../../utils';

const defaultControllerOptions: ControllerOptions = { prefix: '' };

export function validateControllerOptions(options?: ControllerOptions) {
    if (isNil(options)) {
        return { valid: true, value: defaultControllerOptions };
    }

    if (!isObject(options)) {
        return { valid: false, value: defaultControllerOptions, error: 'Controller options must be an object' };
    }

    if (!('prefix' in options)) {
        return { valid: true, value: { ...defaultControllerOptions, ...options } };
    }
    if ('prefix' in options && !isString(options.prefix)) {
        return { valid: true, value: defaultControllerOptions, error: 'Controller prefix must be a string' };
    }

    return { valid: true, value: { ...defaultControllerOptions, ...options } };
}
