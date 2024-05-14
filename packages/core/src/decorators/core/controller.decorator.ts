import { CoreMetadataKey } from '../../app/enums';
import type { ControllerOptions } from '../../interfaces';
import { validateControllerOptions } from '../../schemas';
import type { Newable } from '../../types';
import { injectable } from 'inversify';
import { ErrorMessage } from '../../enums';

export function Controller<T extends Newable>(options?: ControllerOptions) {
    return (target: T) => {
        if (Reflect.hasMetadata(CoreMetadataKey.Controller, target)) {
            throw new Error(ErrorMessage.DuplicateDecoratorUsage);
        }

        const { valid, value, error } = validateControllerOptions(options);
        if (!valid) throw new Error(error);
        Reflect.defineMetadata(CoreMetadataKey.Controller, value, target);

        return injectable()(target);
    };
}
