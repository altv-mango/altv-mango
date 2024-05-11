import { CoreMetadataKey } from '../../app/enums';
import type { ModuleOptions } from '../../interfaces';
import type { Newable } from '../../types';
import { injectable } from 'inversify';
import { ErrorMessage } from '../../enums';
import { validateModuleOptions } from '../../schemas';

export function Module<T extends Newable>(options?: ModuleOptions) {
    return (target: T) => {
        if (Reflect.hasMetadata(CoreMetadataKey.Module, target)) {
            throw new Error(ErrorMessage.DuplicateDecoratorUsage);
        }

        const { valid, value, error } = validateModuleOptions(options);
        if (!valid) throw new Error(error!);
        Reflect.defineMetadata(CoreMetadataKey.Module, value, target);

        return injectable()(target);
    };
}
