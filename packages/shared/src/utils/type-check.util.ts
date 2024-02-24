export const isUndefined = (obj: any): obj is undefined => typeof obj === 'undefined';
export const isObject = (fn: any): fn is object => !isNil(fn) && typeof fn === 'object';
export const isFunction = (val: any): val is Function => typeof val === 'function';
export const isString = (val: any): val is string => typeof val === 'string';
export const isNumber = (val: any): val is number => typeof val === 'number';
export const isConstructor = (val: any): boolean => val === 'constructor';
export const isNil = (val: any): val is null | undefined => isUndefined(val) || val === null;
export const isEmpty = (array: any): boolean => !(array && array.length > 0);
export const isSymbol = (val: any): val is symbol => typeof val === 'symbol';
