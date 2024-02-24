import type { ExecutionContext } from './execution-context.interface';
import type { MangoRequest } from './mango-request.interface';
import type { MangoResponse } from './mango-response.interface';

export interface Guard<TRequest extends MangoRequest = MangoRequest, TResponse extends MangoResponse = MangoResponse> {
    canActivate(context: ExecutionContext<TRequest, TResponse>): boolean | Promise<boolean>;
}
