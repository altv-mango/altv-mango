import { Container, inject, injectable } from 'inversify';
import type { ErrorFilter, Guard, Interceptor, InternalRPCService } from '../interfaces';
import { RPC_SERVICE } from '../../constants';
import {
    APP_ENVIROMENT,
    EXECUTION_CONTEXT_FACTORY,
    GLOBAL_APP_CONTAINER,
    MANGO_REQUEST_FACTORY,
    MANGO_RESPONSE_FACTORY,
} from '../constants';
import type { Newable } from '../../types';
import { isFunction, isNil, isObject } from '../../utils';
import { PipelineHandler } from './pipeline.handler';
import type { ControllerMetadata, RPCMetadata } from '../interfaces';
import { AppEnviroment, ExecutionContextType } from '../enums';
import { ExecutionContextBase, type MangoRequestBase, type MangoResponseBase } from '../pipeline';
import type { Player } from '@altv/server';
import { InternalLoggerService } from '../services';
import { ErrorMessage } from '../../enums';
import type { Pipe } from '../../interfaces';

@injectable()
export class ControllerRPCHandler {
    @inject(APP_ENVIROMENT) private readonly appEnv: AppEnviroment;
    @inject(RPC_SERVICE) private readonly rpcService: InternalRPCService;
    @inject(GLOBAL_APP_CONTAINER) private readonly globalAppContainer: Container;
    @inject(PipelineHandler) private readonly pipelineHandler: PipelineHandler;
    @inject(InternalLoggerService) private readonly loggerService: InternalLoggerService;
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
        controller: ControllerMetadata,
        rpc: RPCMetadata,
    ) {
        if (rpc.type === 'onRequest') {
            return this.rpcService[rpc.type](rpc.name, async (body) => {
                await this.handleRPC(guards, interceptors, pipes, mappedErrorFilters, controller, rpc, body);
            });
        } else if (rpc.type === 'onPlayerRequest') {
            return this.rpcService[rpc.type](rpc.name, async (player, body) => {
                return this.handleRPC(guards, interceptors, pipes, mappedErrorFilters, controller, rpc, body, player);
            });
        } else if (rpc.type === 'onServerRequest') {
            return this.rpcService[rpc.type](rpc.name, async (body) => {
                await this.handleRPC(guards, interceptors, pipes, mappedErrorFilters, controller, rpc, body);
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
        controller: ControllerMetadata,
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
                controller.classRef,
                controller.classRef.prototype[rpc.method],
                request,
                response,
            );

            try {
                await this.pipelineHandler.goTroughGuards(executionContext, guards);
                const postInterceptors = await this.pipelineHandler.goThroughInterceptors(executionContext, interceptors);
                const params = await Promise.all(
                    rpc.params.map(async (param) => {
                        const argumentMetadata = {
                            type: param.type,
                            data: param.data,
                            metatype: param.metatype,
                        };

                        if (param.type === 'body') {
                            return this.pipelineHandler.goTroughPipes(body, [...pipes, ...(param?.pipes ?? [])], argumentMetadata);
                        } else if (param.type === 'param') {
                            return this.pipelineHandler.goTroughPipes(
                                (<Record<string, unknown>>body)[param.data],
                                [...pipes, ...(param?.pipes ?? [])],
                                argumentMetadata,
                            );
                        } else if (param.type === 'request') {
                            return request;
                        } else if (param.type === 'response') {
                            return response;
                        } else if (param.type === 'custom') {
                            // Custom
                            return this.pipelineHandler.goTroughPipes(
                                param.factory(param.data, executionContext),
                                [...pipes, ...(param?.pipes ?? [])],
                                argumentMetadata,
                            );
                        } else if (param.type === 'player' && this.appEnv === AppEnviroment.Server) {
                            return this.pipelineHandler.goTroughPipes(player, [...pipes, ...(param?.pipes ?? [])], argumentMetadata);
                        }
                        return undefined;
                    }),
                );
                const instance = this.globalAppContainer.get<{ [key: string]: Function }>(controller.classRef);
                const result = await Promise.resolve(instance[rpc.method]!.apply(instance, params));
                for (const postInterceptor of postInterceptors) await Promise.resolve(postInterceptor(result));

                if (!response.$isSent) response.send(result);
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
                    return this.loggerService.error(ErrorMessage.InvalidErrorFilterDefinition);
                }
                await Promise.resolve(instance.catch(error, executionContext));
            }
        });
    }
}
