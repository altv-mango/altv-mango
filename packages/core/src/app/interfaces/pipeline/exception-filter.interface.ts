import type { ExecutionContext } from './execution-context.interface';
import type { MangoRequest } from './mango-request.interface';
import type { MangoResponse } from './mango-response.interface';

export interface ErrorFilter<
    T = unknown,
    TRequest extends MangoRequest = MangoRequest,
    TResponse extends MangoResponse = MangoResponse,
> {
    catch(error: T, context: ExecutionContext<TRequest, TResponse>): unknown;
}
