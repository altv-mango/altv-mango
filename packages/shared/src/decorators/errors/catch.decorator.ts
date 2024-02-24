import { CoreMetadataKey } from '../../app/enums';
import { ErrorMessage } from '../../enums';
import type { Newable } from '../../types';

export function Catch<T extends Newable>(...exceptions: unknown[]) {
    return (target: T) => {
        if (Reflect.hasMetadata(CoreMetadataKey.Catch, target)) {
            throw new Error(ErrorMessage.DuplicateDecoratorUsage);
        }

        const duplicates = exceptions.filter((exception, index) => exceptions.indexOf(exception) !== index);
        if (duplicates.length) {
            throw new Error(ErrorMessage.ExceptionHandlingConflict);
        }

        Reflect.defineMetadata(CoreMetadataKey.Catch, exceptions, target);

        return target;
    };
}
