import { inject, injectable } from 'inversify';
import type { ErrorFilter, Guard, Interceptor, InternalEventService } from '../interfaces';
import type { Newable } from '../../types';
import { APP_ENVIROMENT, EXECUTION_CONTEXT_FACTORY, MANGO_REQUEST_FACTORY } from '../constants';
import { isFunction, isNil, isObject } from '../../utils';
import { PipelineHandler } from './pipeline.handler';
import type { EventMetadata } from '../interfaces';
import { EVENT_SERVICE, LOGGER_SERVICE } from '../../constants';
import type { Controller } from './controller';
import { AppEnviroment, ExecutionContextType } from '../enums';
import { ExecutionContextBase, type MangoRequestBase } from '../pipeline';
import type { Player } from '@altv/server';
import { ErrorMessage } from '../../enums';
import type { CallHandler, LoggerService, Pipe } from '../../interfaces';
import { isAsyncFunction } from '../../utils';
import { ControllerFlowHandler } from './controller-flow.handler';

@injectable()
export class ControllerEventHandler {
    @inject(APP_ENVIROMENT) private readonly appEnv: AppEnviroment;
    @inject(EVENT_SERVICE) private readonly eventService: InternalEventService;
    @inject(ControllerFlowHandler) private readonly controllerFlowHandler: ControllerFlowHandler;
    @inject(PipelineHandler) private readonly pipelineHandler: PipelineHandler;
    @inject(LOGGER_SERVICE) private readonly loggerService: LoggerService;
    @inject(MANGO_REQUEST_FACTORY) private readonly createMangoRequest: (body: unknown, player?: Player) => MangoRequestBase;
    @inject(EXECUTION_CONTEXT_FACTORY) private readonly createExecutionContext: (
        type: ExecutionContextType,
        classRef: Newable,
        handler: Function,
        request: MangoRequestBase,
    ) => ExecutionContextBase;

    public registerEvent(
        guards: (Newable<Guard> | Guard)[],
        interceptors: (Newable<Interceptor> | Interceptor)[],
        pipes: (Newable<Pipe> | Pipe)[],
        mappedErrorFilters: [any | 'MANGO_ANY_ERROR', Newable<ErrorFilter> | ErrorFilter][],
        controller: Controller,
        event: EventMetadata,
    ) {
        if (event.type === 'on' || event.type === 'once') {
            return this.eventService[event.type](event.name, async (body) => {
                await this.handleEvent(guards, interceptors, pipes, mappedErrorFilters, controller, event, body);
            });
        } else if (event.type === 'onInternal' || event.type === 'onceInternal') {
            return this.eventService[`$${event.type}`](event.name, async (body) => {
                const player = isObject(body) && 'player' in body && isObject(body.player) ? <Player>body.player : undefined;
                await this.handleEvent(guards, interceptors, pipes, mappedErrorFilters, controller, event, body, player);
            });
        } else if (event.type === 'onPlayer' || event.type === 'oncePlayer') {
            return this.eventService[event.type](event.name, async (player, body) => {
                await this.handleEvent(guards, interceptors, pipes, mappedErrorFilters, controller, event, body, player);
            });
        } else if (event.type === 'onServer' || event.type === 'onceServer') {
            return this.eventService[event.type](event.name, async (body) => {
                await this.handleEvent(guards, interceptors, pipes, mappedErrorFilters, controller, event, body);
            });
        } else if (event.type === 'onWebView' || event.type === 'onceWebView') {
            return this.eventService[event.type](event.webViewId!, event.name, async (...args: unknown[]) => {
                const body = this.appEnv === AppEnviroment.Server ? args[1] : args[0];
                const player = this.appEnv === AppEnviroment.Server ? <Player>args[0] : undefined;
                await this.handleEvent(guards, interceptors, pipes, mappedErrorFilters, controller, event, body, player);
            });
        }

        this.loggerService.error('An error occurred while trying to register event.');
        throw new Error(ErrorMessage.InvalidEventType);
    }

    private async handleEvent(
        guards: (Newable<Guard> | Guard)[],
        interceptors: (Newable<Interceptor> | Interceptor)[],
        pipes: (Newable<Pipe> | Pipe)[],
        mappedErrorFilters: [any | 'MANGO_ANY_ERROR', Newable<ErrorFilter> | ErrorFilter][],
        controller: Controller,
        event: EventMetadata,
        body: unknown,
        player?: Player,
    ) {
        const request = this.createMangoRequest(body, player);
        const executionContext = this.createExecutionContext(
            ExecutionContextType.Event,
            controller.metadata.classRef,
            controller.metadata.classRef.prototype[event.method],
            request,
        );

        try {
            await this.pipelineHandler.goTroughGuards(executionContext, guards, controller.owner.container);
            const args = await this.controllerFlowHandler.createArgs(controller, executionContext, event, pipes, player);
            const controllerMethod = controller.instance[event.method]!;
            const handle = isAsyncFunction(controllerMethod)
                ? (): unknown => controller.instance[event.method]!.apply(controller.instance, args)
                : (): Promise<unknown> => controller.instance[event.method]!.apply(controller.instance, args);
            const callHandler: CallHandler = {
                handle,
                return: () => {
                    this.loggerService.error('An error occurred while trying to return a value from an event.');
                    throw new Error(ErrorMessage.InvalidReturnInEvent);
                },
            };

            if (interceptors.length > 0) {
                await this.pipelineHandler.goThroughInterceptors(executionContext, interceptors, controller.owner.container, callHandler);
            } else {
                await callHandler.handle();
            }
        } catch (error) {
            const errorGroup = mappedErrorFilters.find(
                ([errorType]) =>
                    (isFunction(errorType) && error instanceof errorType) || errorType === 'MANGO_ANY_ERROR' || error === errorType,
            );
            if (isNil(errorGroup)) return;
            const instance = isFunction(errorGroup[1])
                ? controller.owner.container.get(errorGroup[1])
                : isObject(errorGroup[1]) && isFunction(errorGroup[1]['catch'])
                  ? errorGroup[1]
                  : null;
            if (isNil(instance)) {
                this.loggerService.error('An error occurred while trying to go through error filters.');
                throw new Error(ErrorMessage.InvalidErrorFilterDefinition);
            }
            await Promise.resolve(instance.catch.call(instance, error, executionContext));
        }
    }
}
