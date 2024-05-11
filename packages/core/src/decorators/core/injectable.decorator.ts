import { injectable } from 'inversify';
import type { Newable } from '../../types';
import { CoreMetadataKey } from '../../app/enums';
import type { InjectableOptions } from '../../interfaces';
import { ErrorMessage } from '../../enums';
import { validateInjectableMetadata } from '../../schemas';

export function Injectable<T extends Newable>(options?: InjectableOptions) {
    return (target: T) => {
        if (Reflect.hasMetadata(CoreMetadataKey.Injectable, target)) {
            throw new Error(ErrorMessage.DuplicateDecoratorUsage);
        }

        const { valid, value, error } = validateInjectableMetadata(options);
        if (!valid) throw new Error(error);
        Reflect.defineMetadata(CoreMetadataKey.Injectable, value, target);

        return injectable()(target);
    };
}
