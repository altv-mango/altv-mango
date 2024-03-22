import { z } from 'zod';
import type { Guard } from '../../app/interfaces';
import type { Newable } from '../../types';
import { isNil } from '../../utils';
import { GuardSchema } from '../../schemas';
import { CoreMetadataKey } from '../../app/enums';
import { ErrorMessage } from '../../enums';

export function UseGuards(...guards: (Newable<Guard> | Guard)[]) {
    return <ClassDecorator & MethodDecorator>((target: Object, method?: string, descriptor?: PropertyDescriptor) => {
        if (!isNil(descriptor) && !isNil(descriptor.value)) {
            if (guards.length === 0) {
                throw new Error(ErrorMessage.AtLeastOneGuardRequired);
            }
            if (!z.array(GuardSchema).safeParse(guards).success) {
                throw new Error(ErrorMessage.InvalidGuardDefinition);
            }

            const methodGuards = Reflect.getMetadata<Newable<Guard>[]>(CoreMetadataKey.Guards, target.constructor, method) || [];
            Reflect.defineMetadata(CoreMetadataKey.Guards, [...guards, ...methodGuards], target.constructor, method);
            return descriptor;
        }

        if (guards.length === 0) {
            throw new Error(ErrorMessage.AtLeastOneGuardRequired);
        }
        if (!z.array(GuardSchema).safeParse(guards).success) {
            throw new Error(ErrorMessage.InvalidGuardDefinition);
        }

        const classGuards = Reflect.getMetadata<Newable<Guard>[]>(CoreMetadataKey.Guards, target) || [];
        Reflect.defineMetadata(CoreMetadataKey.Guards, [...guards, ...classGuards], target);
        return target;
    });
}
