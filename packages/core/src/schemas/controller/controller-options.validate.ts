import type { ControllerOptions } from '../../interfaces';
import { isNil, isObject, isString } from '../../utils';

export function validateControllerOptions(options: ControllerOptions) {
    if (isNil(options)) {
        return { valid: true, value: { prefix: '' } };
    }

    if (!isObject(options)) {
        return { valid: false, value: { prefix: '' }, error: 'Controller options must be an object' };
    }

    if ('prefix' in options && isString(options.prefix)) {
        return { valid: true, value: options };
    }

    return { valid: false, value: { prefix: '' }, error: 'Invalid controller options' };
}
