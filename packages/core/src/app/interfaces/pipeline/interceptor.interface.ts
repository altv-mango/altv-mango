import type { ExecutionContext } from './execution-context.interface';
import type { MangoRequest } from './mango-request.interface';
import type { MangoResponse } from './mango-response.interface';

export interface Interceptor<
    THandlerResult = unknown,
    TRequest extends MangoRequest = MangoRequest,
    TResponse extends MangoResponse = MangoResponse,
> {
    intercept(context: ExecutionContext<TRequest, TResponse>, handler: () => THandlerResult): void | Promise<void>;
}
