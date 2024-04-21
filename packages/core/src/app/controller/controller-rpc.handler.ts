import { inject, injectable } from 'inversify';
import type { ErrorFilter, Guard, Interceptor, InternalRPCService } from '../interfaces';
import { LOGGER_SERVICE, RPC_SERVICE } from '../../constants';
import { APP_ENVIROMENT, EXECUTION_CONTEXT_FACTORY, MANGO_REQUEST_FACTORY, MANGO_RESPONSE_FACTORY } from '../constants';
import type { Newable } from '../../types';
import { isAsyncFunction, isFunction, isNil, isObject } from '../../utils';
import { PipelineHandler } from './pipeline.handler';
import type { RPCMetadata } from '../interfaces';
import { AppEnviroment, ExecutionContextType } from '../enums';
import { ExecutionContextBase, type MangoRequestBase, type MangoResponseBase } from '../pipeline';
import type { Player } from '@altv/server';
import { ErrorMessage } from '../../enums';
import type { LoggerService, Pipe } from '../../interfaces';
import type { Controller } from './controller';

@injectable()
export class ControllerRPCHandler {
    @inject(APP_ENVIROMENT) private readonly appEnv: AppEnviroment;
    @inject(RPC_SERVICE) private readonly rpcService: InternalRPCService;
    @inject(PipelineHandler) private readonly pipelineHandler: PipelineHandler;
    @inject(LOGGER_SERVICE) private readonly loggerService: LoggerService;
    @inject(MANGO_REQUEST_FACTORY) private readonly createMangoRequest: (data: unknown, player?: Player) => MangoRequestBase;
    @inject(MANGO_RESPONSE_FACTORY) private readonly createMangoResponse: () => MangoResponseBase;
    @inject(EXECUTION_CONTEXT_FACTORY) private readonly createExecutionContext: (
        type: ExecutionContextType,
        classRef: Newable,
        handler: Function,
        request: MangoRequestBase,
        response: MangoResponseBase,
    ) => ExecutionContextBase;

    public async registerRPC(
        guards: (Newable<Guard> | Guard)[],
        interceptors: (Newable<Interceptor> | Interceptor)[],
        pipes: (Newable<Pipe> | Pipe)[],
        mappedErrorFilters: [any | 'MANGO_ANY_ERROR', Newable<ErrorFilter> | ErrorFilter][],
        controller: Controller,
        rpc: RPCMetadata,
    ) {
        if (rpc.type === 'onRequest') {
            return this.rpcService[rpc.type](rpc.name, async (body) => {
                return this.handleRPC(guards, interceptors, pipes, mappedErrorFilters, controller, rpc, body);
            });
        } else if (rpc.type === 'onPlayerRequest') {
            return this.rpcService[rpc.type](rpc.name, async (player, body) => {
                return this.handleRPC(guards, interceptors, pipes, mappedErrorFilters, controller, rpc, body, player);
            });
        } else if (rpc.type === 'onServerRequest') {
            return this.rpcService[rpc.type](rpc.name, async (body) => {
                return this.handleRPC(guards, interceptors, pipes, mappedErrorFilters, controller, rpc, body);
            });
        } else if (rpc.type === 'onWebViewRequest') {
            return this.rpcService[rpc.type](rpc.webViewId!, rpc.name, async (...args: unknown[]) => {
                const body = this.appEnv === AppEnviroment.Server ? args[1] : args[0];
                const player = this.appEnv === AppEnviroment.Server ? <Player>args[0] : undefined;
                return this.handleRPC(guards, interceptors, pipes, mappedErrorFilters, controller, rpc, body, player);
            });
        }

        this.loggerService.error('An error occurred while trying to register RPC.');
        throw new Error(ErrorMessage.InvalidRPCType);
    }

    private async handleRPC(
        guards: (Newable<Guard> | Guard)[],
        interceptors: (Newable<Interceptor> | Interceptor)[],
        pipes: (Newable<Pipe> | Pipe)[],
        mappedErrorFilters: [any | 'MANGO_ANY_ERROR', Newable<ErrorFilter> | ErrorFilter][],
        controller: Controller,
        rpc: RPCMetadata,
        body: unknown,
        player?: Player,
    ) {
        return new Promise(async (resolve) => {
            const request = this.createMangoRequest(
                body,
                this.appEnv === AppEnviroment.Server && (rpc.type === 'onPlayerRequest' || rpc.type === 'onWebViewRequest')
                    ? player
                    : undefined,
            );
            const response = this.createMangoResponse();
            response.$onSend((data) => resolve(data));
            response.$onError((error) => resolve(error));
            const executionContext = this.createExecutionContext(
                ExecutionContextType.RPC,
                controller.metadata.classRef,
                controller.metadata.classRef.prototype[rpc.method],
                request,
                response,
            );

            try {
                await this.pipelineHandler.goTroughGuards(executionContext, guards, controller.owner.container);
                const args = await this.createArgs(executionContext, controller, rpc, pipes, player);
                const controllerMethod = controller.instance[rpc.method]!;
                const callHandler = isAsyncFunction(controllerMethod)
                    ? () => {
                          const result = controllerMethod(...args);
                          if (!response.$isSent) {
                              response.send(result);
                          }
                      }
                    : async () => {
                          const result = await (<Function>controllerMethod)(...args);
                          if (!response.$isSent) {
                              response.send(result);
                          }
                      };

                if (interceptors.length > 0) {
                    await this.pipelineHandler.goThroughInterceptors(
                        executionContext,
                        interceptors,
                        controller.owner.container,
                        callHandler,
                    );
                } else {
                    await Promise.resolve(callHandler);
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
                    return this.loggerService.error(ErrorMessage.InvalidErrorFilterDefinition);
                }
                await Promise.resolve(instance.catch(error, executionContext));
            }
        });
    }

    private async createArgs(
        executionContext: ExecutionContextBase,
        controller: Controller,
        event: RPCMetadata,
        pipes: (Newable<Pipe> | Pipe)[],
        player?: Player,
    ) {
        return Promise.all(
            event.params.map(async (param) => {
                const argumentMetadata = {
                    type: param.type,
                    data: param.data,
                    metatype: param.metatype,
                };

                if (param.type === 'body') {
                    // Body
                    return this.pipelineHandler.goTroughPipes(
                        executionContext.request.body,
                        [...pipes, ...(param?.pipes ?? [])],
                        argumentMetadata,
                        controller.owner.container,
                    );
                } else if (param.type === 'param') {
                    // Param
                    if (!isObject(executionContext.request.body)) return undefined;
                    return this.pipelineHandler.goTroughPipes(
                        (<Record<string, unknown>>executionContext.request.body)[param.data],
                        [...pipes, ...(param?.pipes ?? [])],
                        argumentMetadata,
                        controller.owner.container,
                    );
                } else if (param.type === 'index') {
                    if (!Array.isArray(executionContext.request.body)) return undefined;
                    return this.pipelineHandler.goTroughPipes(
                        executionContext.request.body[param.data],
                        [...pipes, ...(param?.pipes ?? [])],
                        argumentMetadata,
                        controller.owner.container,
                    );
                } else if (param.type === 'request') {
                    return executionContext.request;
                } else if (param.type === 'custom') {
                    // Custom
                    return this.pipelineHandler.goTroughPipes(
                        param.factory(param.data, executionContext),
                        [...pipes, ...(param?.pipes ?? [])],
                        argumentMetadata,
                        controller.owner.container,
                    );
                } else if (param.type === 'player' && this.appEnv === AppEnviroment.Server) {
                    // Player (Server)
                    return this.pipelineHandler.goTroughPipes(
                        param.data ? player![<keyof Player>param.data] : player,
                        [...pipes, ...(param?.pipes ?? [])],
                        argumentMetadata,
                        controller.owner.container,
                    );
                }
                return undefined;
            }),
        );
    }
}
