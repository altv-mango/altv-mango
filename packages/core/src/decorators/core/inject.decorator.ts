import { inject } from 'inversify';
import type { InjectionToken } from '../../types';
import { InjectionTokenSchema } from '../../schemas';
import { ErrorMessage } from '../../enums';

export function Inject<T = unknown>(key?: InjectionToken<T>) {
    return <PropertyDecorator & ParameterDecorator>((target: Object, propertyKey: string, paramIndex?: number) => {
        if (!InjectionTokenSchema.optional().safeParse(key).success) {
            throw new Error(ErrorMessage.InvalidInjectionTokenSpecified);
        }

        const token = key ?? Reflect.getMetadata<InjectionToken>('design:type', target, propertyKey);
        if (!token) {
            throw new Error(ErrorMessage.InjectionTokenNotFound);
        }

        inject(token)(target, propertyKey, paramIndex);
    });
}
