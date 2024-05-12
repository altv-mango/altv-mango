import type { ExecutionContext } from '../../../interfaces';

export type Resolvable<T extends number | string | boolean> = T | ((context: ExecutionContext) => T | Promise<T>);

export interface ThrottlerMethodOrControllerOptions {
    limit?: Resolvable<number>;
    ttl?: Resolvable<number>;
}
