import type { MangoRequest } from './mango-request.interface';
import type { MangoResponse } from './mango-response.interface';

export interface Middleware<TRequest extends MangoRequest = MangoRequest, TResponse extends MangoResponse = MangoResponse> {
    use(req: TRequest, res: TResponse, next: (error?: Error | any) => void): void | Promise<void>;
}
