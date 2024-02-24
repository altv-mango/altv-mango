import type { ThrottlerMethodOrControllerOptions } from '../interfaces';
import { THROTTLER_LIMIT, THROTTLER_TTL } from '../throttler.constants';

function setThrottlerMetadata(target: any, options: Record<string, ThrottlerMethodOrControllerOptions>): void {
    for (const name in options) {
        Reflect.defineMetadata(THROTTLER_TTL + name, options[name]!.ttl, target);
        Reflect.defineMetadata(THROTTLER_LIMIT + name, options[name]!.limit, target);
    }
}

export function Throttle(options: Record<string, ThrottlerMethodOrControllerOptions>) {
    return (target: any, _propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<any>) => {
        if (descriptor) {
            setThrottlerMetadata(descriptor.value, options);
            return descriptor;
        }
        setThrottlerMetadata(target, options);
        return target;
    };
}
