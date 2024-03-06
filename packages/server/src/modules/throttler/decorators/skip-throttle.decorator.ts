import { THROTTLER_SKIP } from '../throttler.constants';

export function SkipThrottle(skip: Record<string, boolean> = { default: true }) {
    return (target: any, _propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<any>) => {
        for (const key in skip) {
            if (descriptor) {
                Reflect.defineMetadata(THROTTLER_SKIP + key, skip[key], descriptor.value);
                return descriptor;
            }
            Reflect.defineMetadata(THROTTLER_SKIP + key, skip[key], target);
            return target;
        }
    };
}
