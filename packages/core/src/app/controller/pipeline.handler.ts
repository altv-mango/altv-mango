import { inject, injectable } from 'inversify';
import type { Guard, Interceptor } from '../interfaces';
import type { Newable } from '../../types';
import { GuardCancelError, GuardInvalidReturnError } from '../../errors';
import { isFunction, isNil, isObject } from '../../utils';
import type { ExecutionContextBase } from '../pipeline';
import { ErrorMessage } from '../../enums';
import type { ArgumentMetadata, CallHandler, LoggerService, Pipe } from '../../interfaces';
import { LOGGER_SERVICE } from '../../constants';
import type { ModuleContainer } from '../module';

@injectable()
export class PipelineHandler {
    @inject(LOGGER_SERVICE) private readonly loggerService: LoggerService;
    // @inject(GLOBAL_APP_CONTAINER) private readonly globalContainer: Container;

    public async goTroughGuards(executionContext: ExecutionContextBase, guards: (Newable<Guard> | Guard)[], container: ModuleContainer) {
        for (const guard of guards) {
            const instance = isFunction(guard) ? container.get(guard) : isObject(guard) && isFunction(guard['canActivate']) ? guard : null;
            if (isNil(instance)) {
                this.loggerService.error('An error occurred while trying to go through guards.');
                throw new Error(ErrorMessage.InvalidGuardDefinition);
            }
            const canActivate = await instance.canActivate.call(instance, executionContext);
            if (typeof canActivate !== 'boolean') {
                this.loggerService.error('An error occurred while trying to go through guards.');
                throw new GuardInvalidReturnError();
            }
            if (!canActivate) {
                throw new GuardCancelError();
            }
        }
    }

    public async goThroughInterceptors(
        executionContext: ExecutionContextBase,
        interceptors: (Newable<Interceptor> | Interceptor)[],
        container: ModuleContainer,
        callHandler: CallHandler,
    ) {
        const postInterceptors = [];

        for (const interceptor of interceptors) {
            const instance = isFunction(interceptor)
                ? container.get(interceptor)
                : isObject(interceptor) && isFunction(interceptor['intercept'])
                  ? interceptor
                  : null;
            if (isNil(instance)) {
                this.loggerService.error('An error occurred while trying to go through interceptors.');
                throw new Error(ErrorMessage.InvalidInterceptorDefinition);
            }
            const postInterceptor = await instance.intercept.call(instance, executionContext, callHandler);
            if (!isFunction(postInterceptor)) {
                this.loggerService.error('An error occurred while trying to go through interceptors.');
                throw new Error(ErrorMessage.InvalidInterceptorReturnValue);
            }
            postInterceptors.push(postInterceptor);
        }

        return postInterceptors;
    }

    public async goTroughPipes(
        value: unknown,
        pipes: (Newable<Pipe> | Pipe)[],
        argumentMetadata: ArgumentMetadata,
        container: ModuleContainer,
    ) {
        for (const pipe of pipes) {
            const instance = isFunction(pipe) ? container.get(pipe) : isObject(pipe) ? pipe : null;
            if (isNil(instance)) {
                this.loggerService.error('An error occurred while trying to go through pipes.');
                throw new Error(ErrorMessage.InvalidPipeDefinition);
            }
            value = await Promise.resolve(instance.transform.call(instance, value, argumentMetadata));
        }

        return value;
    }
}
