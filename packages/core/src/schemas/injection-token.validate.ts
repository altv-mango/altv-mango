import type { InjectionToken } from '../types';
import { isFunction, isObject, isString, isSymbol } from '../utils';

export function validateInjectionToken(value: InjectionToken) {
    const valid = isString(value) || isSymbol(value) || isFunction(value) || isObject(value);
    return valid ? { valid, value } : { valid, value, error: 'Injection token must be a string, symbol, class, or object' };
}
