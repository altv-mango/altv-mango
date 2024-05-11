import type { Guard } from '../../app/interfaces';
import type { Newable } from '../../types';
import { isNil } from '../../utils';
import { CoreMetadataKey } from '../../app/enums';
import { ErrorMessage } from '../../enums';
import { validateGuard } from '../../schemas';

export function UseGuards(...guards: (Newable<Guard> | Guard)[]) {
    return <ClassDecorator & MethodDecorator>((target: Object, method?: string, descriptor?: PropertyDescriptor) => {
        const validatedGuards: (Newable<Guard> | Guard)[] = [];
        for (const guard of guards) {
            const { valid, value, error } = validateGuard(guard);
            if (!valid) throw new Error(error);
            validatedGuards.push(value);
        }

        if (!isNil(descriptor) && !isNil(descriptor.value)) {
            if (guards.length === 0) {
                throw new Error(ErrorMessage.AtLeastOneGuardRequired);
            }

            const methodGuards = Reflect.getMetadata<Newable<Guard>[]>(CoreMetadataKey.Guards, target.constructor, method) || [];
            Reflect.defineMetadata(CoreMetadataKey.Guards, [...validatedGuards, ...methodGuards], target.constructor, method);
            return descriptor;
        }

        if (guards.length === 0) {
            throw new Error(ErrorMessage.AtLeastOneGuardRequired);
        }

        const classGuards = Reflect.getMetadata<Newable<Guard>[]>(CoreMetadataKey.Guards, target) || [];
        Reflect.defineMetadata(CoreMetadataKey.Guards, [...validatedGuards, ...classGuards], target);
        return target;
    });
}
