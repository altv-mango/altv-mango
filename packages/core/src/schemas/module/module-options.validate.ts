import type { DynamicModule, ModuleOptions, Provider } from '../../interfaces';
import { validateProvider } from './provider.validate';
import { isBoolean, isFunction, isNil, isObject, isPromise } from '../../utils';

export function validateModuleOptions(value: ModuleOptions | DynamicModule, isDynamic = false) {
    if (isNil(value)) {
        value = {
            controllers: [],
            imports: [],
            providers: [],
            exports: [],
        };
    }

    if (!isNil(value) && !isObject(value)) {
        return { valid: false, value, error: 'Module options must be an object' };
    }

    if (isDynamic) {
        if (!('module' in value) || !isFunction(value.module)) {
            return { valid: false, value, error: 'Dynamic module must have a module function' };
        }

        if (!('global' in value) && !isBoolean(value.global)) {
            return { valid: false, value, error: 'Global property must be a boolean' };
        } else if (!('global' in value)) {
            value.global = false;
        }
    }

    if ('imports' in value && !Array.isArray(value.imports)) {
        return { valid: false, value, error: 'Imports property must be an array' };
    } else if (!('imports' in value)) {
        value.imports = [];
    }

    if ('controllers' in value && !Array.isArray(value.controllers)) {
        return { valid: false, value, error: 'Controllers property must be an array' };
    } else if (!('controllers' in value)) {
        value.controllers = [];
    }

    if ('providers' in value && !Array.isArray(value.providers)) {
        return { valid: false, value, error: 'Providers property must be an array' };
    } else if (!('providers' in value)) {
        value.providers = [];
    }

    if ('exports' in value && !Array.isArray(value.exports)) {
        return { valid: false, value, error: 'Exports property must be an array' };
    } else if (!('exports' in value)) {
        value.exports = [];
    }

    for (const imported of value.imports) {
        if (!isFunction(imported) && !isObject(imported) && !isPromise(imported)) {
            return { valid: false, value };
        }

        if (isObject(imported)) {
            const optionsValidate = validateModuleOptions(imported, true);
            if (!optionsValidate.valid) {
                // return { valid: false, value, error: optionsValidate.error };
            }
        }
    }

    for (const controller of value.controllers) {
        if (!isFunction(controller)) {
            return { valid: false, value, error: 'Controller must be a function' };
        }
    }

    for (const provider of value.providers) {
        const { valid, error } = validateProvider(provider);
        if (!valid) {
            return { valid: false, value, error };
        }
    }

    for (const exportItem of value.exports) {
        if (!isFunction(exportItem) && !isObject(exportItem)) {
            return { valid: false, value, error: 'Export must be a function or an object' };
        }

        if (isObject(exportItem)) {
            const { valid } = validateProvider(<Provider>exportItem);
            if (!valid) {
                return { valid: false, value, error: 'Export must be a provider object' };
            }
        }
    }

    return { valid: true, value };
}
