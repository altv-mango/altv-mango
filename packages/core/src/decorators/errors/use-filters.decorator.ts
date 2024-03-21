import { z } from 'zod';
import type { Newable } from '../../types';
import type { ErrorFilter } from '../../app/interfaces';
import { ErrorFilterSchema } from '../../schemas';
import { CoreMetadataKey } from '../../app/enums';
import { isNil } from '../../utils';
import { ErrorMessage } from '../../enums';

export function UseFilters(...filters: (Newable<ErrorFilter> | ErrorFilter)[]) {
    return <ClassDecorator | MethodDecorator>((target: Object, method?: string, descriptor?: PropertyDescriptor) => {
        if (!isNil(descriptor) && !isNil(descriptor.value)) {
            if (filters.length === 0) {
                throw new Error(ErrorMessage.AtLeastOneFilterRequired);
            }
            if (!z.array(ErrorFilterSchema).safeParse(filters).success) {
                throw new Error(ErrorMessage.InvalidErrorFilterDefinition);
            }

            const methodFilters =
                Reflect.getMetadata<Newable<ErrorFilter>[]>(CoreMetadataKey.ErrorFilters, target.constructor, method) || [];
            if (!isNil(methodFilters.find((filter) => filters.includes(filter)))) {
                throw new Error(ErrorMessage.DuplicateErrorFilterDetected);
            }
            Reflect.defineMetadata(CoreMetadataKey.ErrorFilters, [...filters, ...methodFilters], target.constructor, method);
            return descriptor;
        }

        if (filters.length === 0) {
            throw new Error(ErrorMessage.AtLeastOneFilterRequired);
        }

        if (!z.array(ErrorFilterSchema).safeParse(filters).success) {
            throw new Error(ErrorMessage.InvalidErrorFilterDefinition);
        }

        const classFilters = Reflect.getMetadata<Newable<ErrorFilter>[]>(CoreMetadataKey.ErrorFilters, target) || [];
        if (isNil(classFilters.find((filter) => filters.includes(filter)))) {
            throw new Error(ErrorMessage.DuplicateErrorFilterDetected);
        }
        Reflect.defineMetadata(CoreMetadataKey.ErrorFilters, [...filters, ...classFilters], target);
        return target;
    });
}
