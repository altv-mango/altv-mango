import { z } from 'zod';
import { PipeSchema } from '../../schemas';
import type { Newable } from '../../types';
import { isNil } from '../../utils';
import { CoreMetadataKey } from '../../app/enums';
import { ErrorMessage } from '../../enums';
import type { Pipe } from '../../interfaces';

export function UsePipes(...pipes: (Newable<Pipe> | Pipe)[]) {
    return <ClassDecorator | MethodDecorator>((target: Object, method?: string, descriptor?: PropertyDescriptor) => {
        if (!isNil(descriptor) && !isNil(descriptor.value)) {
            if (pipes.length === 0) {
                throw new Error(ErrorMessage.AtLeastOnePipeRequired);
            }
            if (!z.array(PipeSchema).safeParse(pipes).success) {
                throw new Error(ErrorMessage.InvalidPipeDefinition);
            }

            const methodPipes = Reflect.getMetadata<Newable<Pipe>[]>(CoreMetadataKey.Pipes, target.constructor, method) || [];
            Reflect.defineMetadata(CoreMetadataKey.Pipes, [...pipes, ...methodPipes], target.constructor, method);
            return descriptor;
        }

        if (pipes.length === 0) {
            throw new Error(ErrorMessage.AtLeastOnePipeRequired);
        }
        if (!z.array(PipeSchema).safeParse(pipes).success) {
            throw new Error(ErrorMessage.InvalidPipeDefinition);
        }

        const classPipes = Reflect.getMetadata<Newable<Pipe>[]>(CoreMetadataKey.Pipes, target) || [];
        Reflect.defineMetadata(CoreMetadataKey.Pipes, [...pipes, ...classPipes], target);
        return target;
    });
}
