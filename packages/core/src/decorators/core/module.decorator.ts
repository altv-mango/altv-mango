import { ZodError } from 'zod';
import { CoreMetadataKey } from '../../app/enums';
import type { ModuleOptions } from '../../interfaces';
import { ModuleOptionsSchema } from '../../schemas';
import type { Newable } from '../../types';
import { injectable } from 'inversify';
import { ErrorMessage } from '../../enums';

export function Module<T extends Newable>(options?: ModuleOptions) {
    return (target: T) => {
        if (Reflect.hasMetadata(CoreMetadataKey.Module, target)) {
            throw new Error(ErrorMessage.DuplicateDecoratorUsage);
        }

        try {
            const parsedOptions = <ModuleOptions>ModuleOptionsSchema.parse(options);
            Reflect.defineMetadata(CoreMetadataKey.Module, parsedOptions, target);
        } catch (error) {
            if (error instanceof ZodError) {
                throw new Error(ErrorMessage.InvalidModuleOptions);
            }
        }

        return injectable()(target);
    };
}
