import { inject, injectable } from 'inversify';
import type { Controller } from './controller';
import type { ExecutionContextBase } from '../pipeline';
import type { EventMetadata } from '../interfaces';
import type { Newable } from '../../types';
import type { Pipe } from '../../interfaces';
import type { Player } from '@altv/server';
import { PipelineHandler } from './pipeline.handler';
import { isObject } from '../../utils';
import { AppEnviroment } from '../enums';
import { APP_ENVIROMENT } from '../constants';

@injectable()
export class ControllerFlowHandler {
    @inject(APP_ENVIROMENT) private readonly appEnv: AppEnviroment;
    @inject(PipelineHandler) private readonly pipelineHandler: PipelineHandler;

    public async createArgs(
        controller: Controller,
        executionContext: ExecutionContextBase,
        event: EventMetadata,
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
