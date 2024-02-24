import type { CustomDecorator } from '../../types';

export function SetMetadata<K extends string = string, V = unknown>(key: K, value: V) {
    const decoratorFactory = <CustomDecorator>((target: object, _method?: string, descriptor?: PropertyDescriptor) => {
        if (descriptor) {
            Reflect.defineMetadata(key, value, descriptor.value);
            return descriptor;
        }
        Reflect.defineMetadata(key, value, target);
        return target;
    });
    decoratorFactory.KEY = key;
    return decoratorFactory;
}
