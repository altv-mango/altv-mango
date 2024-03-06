import type { ExecutionContext } from '../../../interfaces';
import type { Resolvable } from './throttler-method-or-controller-options.interface';

export interface ThrottlerOptions {
    name?: string;
    limit: Resolvable<number>;
    ttl: Resolvable<number>;
    skipIf?: (context: ExecutionContext) => boolean | Promise<boolean>;
}
