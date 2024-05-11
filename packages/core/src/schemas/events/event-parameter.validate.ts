import { isFunction, isNil, isNumber, isObject, isString } from '../../utils';
import { validatePipe } from './pipe.validate';
import type { MethodParameter } from '../../app/interfaces';
import { MethodParamType } from '../../app/enums';

export function validateEventParameter(value: MethodParameter) {
    if (isNil(value) || !isObject(value)) {
        return { valid: false, value, error: 'Event parameter must be an object' };
    }
    if ('key' in value && !isNil(value.key) && !isString(value.key)) {
        return { valid: false, value, error: 'Event parameter key must be a string' };
    }
    if (!('index' in value) || !isNumber(value.index)) {
        return { valid: false, value, error: 'Event parameter index is required' };
    }
    // BodyParameter | PlayerParameter
    if (
        (value.type === MethodParamType.Body || value.type === MethodParamType.Player) &&
        'data' in value &&
        !isNil(value.data) &&
        !isString(value.data)
    ) {
        return { valid: false, value, error: 'Event parameter data must be a string' };
    }
    // CustomParameter
    if (value.type === MethodParamType.Custom && !('factory' in value)) {
        return { valid: false, value, error: 'Event parameter factory is required' };
    }
    if (value.type === MethodParamType.Custom && 'factory' in value && !isFunction(value.factory)) {
        return { valid: false, value, error: 'Event parameter factory must be a function' };
    }
    //  ParamParameter
    if ((value.type === MethodParamType.Param || value.type === MethodParamType.Index) && !('data' in value)) {
        return { valid: false, value, error: 'Event parameter data is required' };
    }
    if (value.type === MethodParamType.Param && 'data' in value && !isString(value.data)) {
        return { valid: false, value, error: 'Event parameter data must be a string' };
    }
    // IndexParameter
    if (value.type === MethodParamType.Index && 'data' in value && !isNumber(value.data)) {
        return { valid: false, value, error: 'Event parameter data must be a number' };
    }
    // BodyParameter | CustomParameter | ParamParameter | PlayerParameter | IndexParameter;
    if (
        value.type !== MethodParamType.Request &&
        value.type !== MethodParamType.Response &&
        'pipes' in value &&
        !Array.isArray(value.pipes)
    ) {
        return { valid: false, value, error: 'Event parameter pipes must be an array' };
    }
    if (value.type !== MethodParamType.Request && value.type !== MethodParamType.Response && !('pipes' in value)) {
        value.pipes = [];
    }
    if (value.type !== MethodParamType.Request && value.type !== MethodParamType.Response) {
        for (const pipe of value.pipes!) {
            const { valid, error } = validatePipe(pipe);
            if (!valid) {
                return { valid: false, value, error };
            }
        }
    }

    return { valid: true, value };
}
