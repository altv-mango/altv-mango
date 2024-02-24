import { LazyServiceIdentifer, type interfaces } from 'inversify';

export function forwardRef<T = unknown>(fn: () => interfaces.ServiceIdentifier<T>) {
    return new LazyServiceIdentifer<T>(fn);
}
