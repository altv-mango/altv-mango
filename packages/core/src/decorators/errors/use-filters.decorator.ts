import type { Newable } from '../../types';
import type { ErrorFilter } from '../../app/interfaces';
import { CoreMetadataKey } from '../../app/enums';
import { isNil } from '../../utils';
import { ErrorMessage } from '../../enums';
import { validateErrorFilter } from '../../schemas';

export function UseFilters(...filters: (Newable<ErrorFilter> | ErrorFilter)[]) {
    return <ClassDecorator & MethodDecorator>((target: Object, method?: string, descriptor?: PropertyDescriptor) => {
        const validatedFilters: (Newable<ErrorFilter> | ErrorFilter)[] = [];
        for (const filter of filters) {
            const { valid, value, error } = validateErrorFilter(filter);
            if (!valid) throw new Error(error);
            validatedFilters.push(value);
        }

        if (!isNil(descriptor) && !isNil(descriptor.value)) {
            if (filters.length === 0) {
                throw new Error(ErrorMessage.AtLeastOneFilterRequired);
            }

            const methodFilters =
                Reflect.getMetadata<Newable<ErrorFilter>[]>(CoreMetadataKey.ErrorFilters, target.constructor, method) || [];
            if (!isNil(methodFilters.find((filter) => filters.includes(filter)))) {
                throw new Error(ErrorMessage.DuplicateErrorFilterDetected);
            }
            Reflect.defineMetadata(CoreMetadataKey.ErrorFilters, [...validatedFilters, ...methodFilters], target.constructor, method);
            return descriptor;
        }

        if (filters.length === 0) {
            throw new Error(ErrorMessage.AtLeastOneFilterRequired);
        }

        const classFilters = Reflect.getMetadata<Newable<ErrorFilter>[]>(CoreMetadataKey.ErrorFilters, target) || [];
        if (!isNil(classFilters.find((filter) => filters.includes(filter)))) {
            throw new Error(ErrorMessage.DuplicateErrorFilterDetected);
        }
        Reflect.defineMetadata(CoreMetadataKey.ErrorFilters, [...validatedFilters, ...classFilters], target);
        return target;
    });
}
