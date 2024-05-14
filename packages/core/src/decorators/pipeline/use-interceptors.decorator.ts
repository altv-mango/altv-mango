import type { Newable } from '../../types';
import type { Interceptor } from '../../app/interfaces';
import { isNil } from '../../utils';
import { CoreMetadataKey } from '../../app/enums';
import { ErrorMessage } from '../../enums';
import { validateInterceptor } from '../../schemas';

export function UseInterceptors(...interceptors: (Newable<Interceptor> | Interceptor)[]) {
    return <ClassDecorator & MethodDecorator>((target: Object, method?: string, descriptor?: PropertyDescriptor) => {
        const validatedInterceptors: (Newable<Interceptor> | Interceptor)[] = [];
        for (const interceptor of interceptors) {
            const { valid, value, error } = validateInterceptor(interceptor);
            if (!valid) throw new Error(error);
            validatedInterceptors.push(value);
        }

        if (!isNil(descriptor) && !isNil(descriptor.value)) {
            if (interceptors.length === 0) {
                throw new Error(ErrorMessage.AtLeastOneInterceptorRequired);
            }

            const methodInterceptors =
                Reflect.getMetadata<Newable<Interceptor>[]>(CoreMetadataKey.Interceptors, target.constructor, method) || [];
            Reflect.defineMetadata(
                CoreMetadataKey.Interceptors,
                [...validatedInterceptors, ...methodInterceptors],
                target.constructor,
                method,
            );
            return descriptor;
        }

        if (interceptors.length === 0) {
            throw new Error(ErrorMessage.AtLeastOneInterceptorRequired);
        }

        const classInterceptors = Reflect.getMetadata<Newable<Interceptor>[]>(CoreMetadataKey.Interceptors, target) || [];
        Reflect.defineMetadata(CoreMetadataKey.Interceptors, [...validatedInterceptors, ...classInterceptors], target);
        return target;
    });
}
