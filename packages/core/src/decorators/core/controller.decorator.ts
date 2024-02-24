import { ZodError } from 'zod';
import { CoreMetadataKey } from '../../app/enums';
import type { ControllerOptions } from '../../interfaces';
import { ControllerOptionsSchema } from '../../schemas';
import type { Newable } from '../../types';
import { injectable } from 'inversify';
import { ErrorMessage } from '../../enums';

export function Controller<T extends Newable>(options?: ControllerOptions) {
    return (target: T) => {
        if (Reflect.hasMetadata(CoreMetadataKey.Controller, target)) {
            throw new Error(ErrorMessage.DuplicateDecoratorUsage);
        }

        try {
            const parsedOptions = <ControllerOptions>ControllerOptionsSchema.parse(options);
            Reflect.defineMetadata(CoreMetadataKey.Controller, parsedOptions, target);
        } catch (error) {
            if (error instanceof ZodError) {
                throw new Error(ErrorMessage.InvalidControllerOptions);
            }
        }

        return injectable()(target);
    };
}
