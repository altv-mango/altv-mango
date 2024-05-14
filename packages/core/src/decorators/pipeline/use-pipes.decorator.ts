import type { Newable } from '../../types';
import { isNil } from '../../utils';
import { CoreMetadataKey } from '../../app/enums';
import { ErrorMessage } from '../../enums';
import type { Pipe } from '../../interfaces';
import { validatePipe } from '../../schemas';

export function UsePipes(...pipes: (Newable<Pipe> | Pipe)[]) {
    return <ClassDecorator & MethodDecorator>((target: Object, method?: string, descriptor?: PropertyDescriptor) => {
        const validatedPipes: (Newable<Pipe> | Pipe)[] = [];
        for (const pipe of pipes) {
            const { valid, value, error } = validatePipe(pipe);
            if (!valid) throw new Error(error);
            validatedPipes.push(value);
        }

        if (!isNil(descriptor) && !isNil(descriptor.value)) {
            if (pipes.length === 0) {
                throw new Error(ErrorMessage.AtLeastOnePipeRequired);
            }

            const methodPipes = Reflect.getMetadata<Newable<Pipe>[]>(CoreMetadataKey.Pipes, target.constructor, method) || [];
            Reflect.defineMetadata(CoreMetadataKey.Pipes, [...validatedPipes, ...methodPipes], target.constructor, method);
            return descriptor;
        }

        if (pipes.length === 0) {
            throw new Error(ErrorMessage.AtLeastOnePipeRequired);
        }

        const classPipes = Reflect.getMetadata<Newable<Pipe>[]>(CoreMetadataKey.Pipes, target) || [];
        Reflect.defineMetadata(CoreMetadataKey.Pipes, [...validatedPipes, ...classPipes], target);
        return target;
    });
}
