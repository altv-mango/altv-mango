import { Container, inject, injectable } from 'inversify';
import type { ErrorFilter, Guard, Interceptor, InternalEventService } from '../interfaces';
import type { Newable } from '../../types';
import { APP_ENVIROMENT, EXECUTION_CONTEXT_FACTORY, GLOBAL_APP_CONTAINER, MANGO_REQUEST_FACTORY } from '../constants';
import { isFunction, isNil, isObject } from '../../utils';
import { PipelineHandler } from './pipeline.handler';
import type { EventMetadata } from '../interfaces';
import { EVENT_SERVICE, LOGGER_SERVICE } from '../../constants';
import type { Controller } from './controller';
import { AppEnviroment, ExecutionContextType } from '../enums';
import { ExecutionContextBase, type MangoRequestBase } from '../pipeline';
import * as altServer from '@altv/server';
import { ErrorMessage } from '../../enums';
import type { LoggerService, Pipe } from '../../interfaces';

@injectable()
export class ControllerEventHandler {
    @inject(APP_ENVIROMENT) private readonly appEnv: AppEnviroment;
    @inject(EVENT_SERVICE) private readonly eventService: InternalEventService;
    @inject(GLOBAL_APP_CONTAINER) private readonly globalAppContainer: Container;
    @inject(PipelineHandler) private readonly pipelineHandler: PipelineHandler;
    @inject(LOGGER_SERVICE) private readonly loggerService: LoggerService;
    @inject(MANGO_REQUEST_FACTORY) private readonly createMangoRequest: (body: unknown, player?: altServer.Player) => MangoRequestBase;
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
                await this.handleEvent(guards, interceptors, pipes, mappedErrorFilters, controller, event, body);
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
                const player = this.appEnv === AppEnviroment.Server ? <altServer.Player>args[0] : undefined;
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
        player?: altServer.Player,
    ) {
        const request = this.createMangoRequest(
            body,
            this.appEnv === AppEnviroment.Server &&
                (event.type === 'onPlayer' || event.type === 'oncePlayer' || event.type === 'onWebView' || event.type === 'onceWebView')
                ? player
                : undefined,
        );
        const executionContext = this.createExecutionContext(
            ExecutionContextType.Event,
            controller.metadata.classRef,
            controller.metadata.classRef.prototype[event.method],
            request,
        );

        try {
            await this.pipelineHandler.goTroughGuards(executionContext, guards);
            const postInterceptors = await this.pipelineHandler.goThroughInterceptors(executionContext, interceptors);
            const params = await Promise.all(
                event.params.map(async (param) => {
                    const argumentMetadata = {
                        type: param.type,
                        data: param.data,
                        metatype: param.metatype,
                    };

                    if (param.type === 'body') {
                        // Body
                        return this.pipelineHandler.goTroughPipes(body, [...pipes, ...(param?.pipes ?? [])], argumentMetadata);
                    } else if (param.type === 'param') {
                        // Param
                        if (!isObject(body)) return undefined;
                        return this.pipelineHandler.goTroughPipes(
                            (<Record<string, unknown>>body)[param.data],
                            [...pipes, ...(param?.pipes ?? [])],
                            argumentMetadata,
                        );
                    } else if (param.type === 'request') {
                        return request;
                    } else if (param.type === 'custom') {
                        // Custom
                        return this.pipelineHandler.goTroughPipes(
                            param.factory(param.data, executionContext),
                            [...pipes, ...(param?.pipes ?? [])],
                            argumentMetadata,
                        );
                    } else if (param.type === 'player' && this.appEnv === AppEnviroment.Server) {
                        // Player (Server)
                        return this.pipelineHandler.goTroughPipes(
                            param.data ? player![<keyof altServer.Player>param.data] : player,
                            [...pipes, ...(param?.pipes ?? [])],
                            argumentMetadata,
                        );
                    }
                    return undefined;
                }),
            );
            const result = await Promise.resolve(controller.instance[event.method]!(...params));
            for (const postInterceptor of postInterceptors) await Promise.resolve(postInterceptor(result));
        } catch (error) {
            const errorGroup = mappedErrorFilters.find(
                ([errorType]) =>
                    (isFunction(errorType) && error instanceof errorType) || errorType === 'MANGO_ANY_ERROR' || error === errorType,
            );
            if (isNil(errorGroup)) return;
            const instance = isFunction(errorGroup[1])
                ? this.globalAppContainer.get(errorGroup[1])
                : isObject(errorGroup[1]) && isFunction(errorGroup[1]['catch'])
                ? errorGroup[1]
                : null;
            if (isNil(instance)) {
                this.loggerService.error('An error occurred while trying to go through error filters.');
                throw new Error(ErrorMessage.InvalidErrorFilterDefinition);
            }
            await Promise.resolve(instance.catch(error, executionContext));
        }
    }
}
