import { inject } from 'inversify';
import type { InjectionToken } from '../../types';
import { ErrorMessage } from '../../enums';
import { validateInjectionToken } from '../../schemas';
import { isNil } from '../../utils';

export function Inject<T = unknown>(key?: InjectionToken<T>) {
    return <PropertyDecorator & ParameterDecorator>((target: Object, propertyKey: string, paramIndex?: number) => {
        if (!isNil(key) && !validateInjectionToken(key).valid) {
            throw new Error(ErrorMessage.InvalidInjectionTokenSpecified);
        }

        const token = key ?? Reflect.getMetadata<InjectionToken>('design:type', target, propertyKey);
        if (!token) {
            throw new Error(ErrorMessage.InjectionTokenNotFound);
        }

        inject(token)(target, propertyKey, paramIndex);
    });
}
