import { isFunction, isNil, isNumber, isObject, isString } from '../../utils';
import { validatePipe } from './pipe.validate';
import type { MethodParameter } from '../../app/interfaces';
import { MethodParamType } from '../../app/enums';

export function validateEventParameter(value: MethodParameter) {
    if (isNil(value) || !isObject(value)) {
        return { valid: false, value };
    }
    if ('key' in value && !isNil(value.key) && !isString(value.key)) {
        return { valid: false, value };
    }
    if (!('index' in value) || !isNumber(value.index)) {
        return { valid: false, value };
    }
    // BodyParameter | PlayerParameter
    if (
        (value.type === MethodParamType.Body || value.type === MethodParamType.Player) &&
        'data' in value &&
        !isNil(value.data) &&
        !isString(value.data)
    ) {
        return { valid: false, value, error: 'data must be a string' };
    }
    // CustomParameter
    if (value.type === MethodParamType.Custom && !('factory' in value)) {
        return { valid: false, value, error: 'factory is required' };
    }
    if (value.type === MethodParamType.Custom && 'factory' in value && !isFunction(value.factory)) {
        return { valid: false, value, error: 'factory must be a function' };
    }
    //  ParamParameter
    if ((value.type === MethodParamType.Param || value.type === MethodParamType.Index) && !('data' in value)) {
        return { valid: false, value, error: 'data is required' };
    }
    if (value.type === MethodParamType.Param && 'data' in value && !isString(value.data)) {
        return { valid: false, value, error: 'data must be a string' };
    }
    // IndexParameter
    if (value.type === MethodParamType.Index && 'data' in value && !isNumber(value.data)) {
        return { valid: false, value, error: 'data must be a number' };
    }
    // BodyParameter | CustomParameter | ParamParameter | PlayerParameter | IndexParameter;
    if (
        value.type !== MethodParamType.Request &&
        value.type !== MethodParamType.Response &&
        'pipes' in value &&
        !Array.isArray(value.pipes)
    ) {
        return { valid: false, value };
    }
    if (value.type !== MethodParamType.Request && value.type !== MethodParamType.Response && !('pipes' in value)) {
        value.pipes = [];
    }
    if (value.type !== MethodParamType.Request && value.type !== MethodParamType.Response) {
        for (const pipe of value.pipes!) {
            const { valid } = validatePipe(pipe);
            if (!valid) {
                return { valid: false, value };
            }
        }
    }

    return { valid: true, value };
}
