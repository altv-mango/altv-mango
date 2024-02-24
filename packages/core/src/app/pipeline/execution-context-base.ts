import { injectable } from 'inversify';
import type { Newable } from '../../types';
import type { ExecutionContextType } from '../enums';
import type { ExecutionContext } from '../interfaces';
import type { MangoRequestBase } from './mango-request-base';
import type { MangoResponseBase } from './mango-response-base';

@injectable()
export class ExecutionContextBase<
    TRequest extends MangoRequestBase = MangoRequestBase,
    TResponse extends MangoResponseBase = MangoResponseBase,
> implements ExecutionContext<TRequest, TResponse>
{
    public $type: ExecutionContextType;
    public $classRef: Newable;
    public $handler: Function;
    public $request: TRequest;
    public $response?: TResponse;

    public get type() {
        return this.$type;
    }

    public get classRef() {
        return this.$classRef;
    }

    public get handler() {
        return this.$handler;
    }

    public get request() {
        return this.$request;
    }

    public get response() {
        return this.$response!;
    }
}
