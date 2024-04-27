import type { Newable } from '../../../types';
import type { ExecutionContextType } from '../../enums';
import type { MangoRequest } from './mango-request.interface';
import type { MangoResponse } from './mango-response.interface';

export interface ExecutionContext<TRequest extends MangoRequest = MangoRequest, TResponse extends MangoResponse = MangoResponse> {
    readonly type: `${ExecutionContextType}`;
    readonly classRef: Newable;
    readonly handler: Function;
    readonly request: TRequest;
    readonly response?: TResponse;
}
