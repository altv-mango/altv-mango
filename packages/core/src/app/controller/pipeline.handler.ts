import { Container, inject, injectable } from 'inversify';
import type { Guard, Interceptor } from '../interfaces';
import type { Newable } from '../../types';
import { GuardCancelError, GuardInvalidReturnError } from '../../errors';
import { GLOBAL_APP_CONTAINER } from '../constants';
import { isFunction, isNil, isObject } from '../../utils';
import type { ExecutionContextBase } from '../pipeline';
import { ErrorMessage } from '../../enums';
import type { ArgumentMetadata, LoggerService, Pipe } from '../../interfaces';
import { LOGGER_SERVICE } from '../../constants';

@injectable()
export class PipelineHandler {
    @inject(LOGGER_SERVICE) private readonly loggerService: LoggerService;
    @inject(GLOBAL_APP_CONTAINER) private readonly globalContainer: Container;

    public async goTroughGuards(executionContext: ExecutionContextBase, guards: (Newable<Guard> | Guard)[]) {
        for (const guard of guards) {
            const instance = isFunction(guard)
                ? this.globalContainer.get(guard)
                : isObject(guard) && isFunction(guard['canActivate'])
                ? guard
                : null;
            if (isNil(instance)) {
                this.loggerService.error('An error occurred while trying to go through guards.');
                throw new Error(ErrorMessage.InvalidGuardDefinition);
            }
            const canActivate = await instance.canActivate(executionContext);
            if (typeof canActivate !== 'boolean') {
                this.loggerService.error('An error occurred while trying to go through guards.');
                throw new GuardInvalidReturnError();
            }
            if (!canActivate) {
                throw new GuardCancelError();
            }
        }
    }

    public async goThroughInterceptors(executionContext: ExecutionContextBase, interceptors: (Newable<Interceptor> | Interceptor)[]) {
        const postInterceptors = [];

        for (const interceptor of interceptors) {
            const instance = isFunction(interceptor)
                ? this.globalContainer.get(interceptor)
                : isObject(interceptor) && isFunction(interceptor['intercept'])
                ? interceptor
                : null;
            if (isNil(instance)) {
                this.loggerService.error('An error occurred while trying to go through interceptors.');
                throw new Error(ErrorMessage.InvalidInterceptorDefinition);
            }
            const postInterceptor = await instance.intercept(executionContext);
            if (!isFunction(postInterceptor)) {
                this.loggerService.error('An error occurred while trying to go through interceptors.');
                throw new Error(ErrorMessage.InvalidInterceptorReturnValue);
            }
            postInterceptors.push(postInterceptor);
        }

        return postInterceptors;
    }

    public async goTroughPipes(value: unknown, pipes: (Newable<Pipe> | Pipe)[], argumentMetadata: ArgumentMetadata) {
        for (const pipe of pipes) {
            const instance = isFunction(pipe) ? this.globalContainer.get(pipe) : isObject(pipe) ? pipe : null;
            if (isNil(instance)) {
                this.loggerService.error('An error occurred while trying to go through pipes.');
                throw new Error(ErrorMessage.InvalidPipeDefinition);
            }
            value = await Promise.resolve(instance.transform(value, argumentMetadata));
        }

        return value;
    }
}
