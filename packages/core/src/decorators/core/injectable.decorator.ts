import { injectable } from 'inversify';
import { ZodError } from 'zod';
import type { Newable } from '../../types';
import { CoreMetadataKey } from '../../app/enums';
import type { InjectableOptions } from '../../interfaces';
import { InjectableMetadataSchema } from '../../schemas';
import type { InjectableMetadata } from '../../app/interfaces';
import { ErrorMessage } from '../../enums';

export function Injectable<T extends Newable>(options?: InjectableOptions) {
    return (target: T) => {
        if (Reflect.hasMetadata(CoreMetadataKey.Injectable, target)) {
            throw new Error(ErrorMessage.DuplicateDecoratorUsage);
        }

        try {
            const parsedOptions = <InjectableMetadata>InjectableMetadataSchema.parse(options);
            Reflect.defineMetadata(CoreMetadataKey.Injectable, parsedOptions, target);
        } catch (error) {
            if (error instanceof ZodError) {
                throw new Error(ErrorMessage.InvalidInjectableOptions);
            }
        }

        return injectable()(target);
    };
}
