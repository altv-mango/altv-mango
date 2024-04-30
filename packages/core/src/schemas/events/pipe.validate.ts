import { isFunction, isNil, isObject } from '../../utils';
import type { Pipe } from '../../interfaces';

export function validatePipe(value: unknown) {
    if (isNil(value)) {
        return { valid: false, value };
    }

    if (isFunction(value) && isFunction(value.prototype.transform)) {
        return { valid: true, value };
    }

    if (isObject(value) && isFunction((<Pipe>value).transform)) {
        return { valid: true, value };
    }

    return { valid: false, value };
}
