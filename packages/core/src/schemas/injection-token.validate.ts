import type { InjectionToken } from '../types';
import { isFunction, isObject, isString, isSymbol } from '../utils';

export function validateInjectionToken<T>(key: InjectionToken<T>) {
    const valid = isString(key) || isSymbol(key) || isFunction(key) || isObject(key);
    return { valid, value: key, error: valid ? undefined : 'Injection token must be a string, symbol, function or object' };
}
