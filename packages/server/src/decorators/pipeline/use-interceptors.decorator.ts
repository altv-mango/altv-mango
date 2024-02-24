import type { Interceptor } from '../../interfaces';
import { UseInterceptors as $UseInterceptors, type Newable } from '@altv-mango/shared';

export function UseInterceptors(...interceptors: (Newable<Interceptor> | Interceptor)[]) {
    return $UseInterceptors(...interceptors);
}
