import { z } from 'zod';
import type { Newable } from '../../types';
import type { Interceptor } from '../../app/interfaces';
import { isNil } from '../../utils';
import { InterceptorSchema } from '../../schemas';
import { CoreMetadataKey } from '../../app/enums';
import { ErrorMessage } from '../../enums';

export function UseInterceptors(...interceptors: (Newable<Interceptor> | Interceptor)[]) {
    return <ClassDecorator | MethodDecorator>((target: any, method?: string, descriptor?: PropertyDescriptor) => {
        if (!isNil(descriptor) && !isNil(descriptor.value)) {
            if (interceptors.length === 0) {
                throw new Error(ErrorMessage.AtLeastOneInterceptorRequired);
            }
            if (!z.array(InterceptorSchema).safeParse(interceptors).success) {
                throw new Error(ErrorMessage.InvalidInterceptorDefinition);
            }

            const methodInterceptors =
                Reflect.getMetadata<Newable<Interceptor>[]>(CoreMetadataKey.Interceptors, target, method) || [];
            Reflect.defineMetadata(
                CoreMetadataKey.Interceptors,
                [...interceptors, ...methodInterceptors],
                target,
                method,
            );
            return descriptor;
        }

        if (interceptors.length === 0) {
            throw new Error(ErrorMessage.AtLeastOneInterceptorRequired);
        }
        if (!z.array(InterceptorSchema).safeParse(interceptors).success) {
            throw new Error(ErrorMessage.InvalidInterceptorDefinition);
        }

        const classInterceptors =
            Reflect.getMetadata<Newable<Interceptor>[]>(CoreMetadataKey.Interceptors, target) || [];
        Reflect.defineMetadata(CoreMetadataKey.Interceptors, [...interceptors, ...classInterceptors], target);
        return target;
    });
}
