import { inject, injectable } from 'inversify';
import type { Guard, Interceptor, ErrorFilter, TimerMetadata } from '../interfaces';
import type { Newable } from '../../types';
import type { ControllerMetadata, EventMetadata, MethodParameter, RPCMetadata } from '../interfaces';
import { AppEnviroment, CoreMetadataKey } from '../enums';
import { APP_ENVIROMENT } from '../constants';
import { ErrorMessage } from '../../enums';
import type { LoggerService, Pipe } from '../../interfaces';
import { LOGGER_SERVICE } from '../../constants';

@injectable()
export class ControllerMetadataReader {
    @inject(APP_ENVIROMENT) private readonly appEnv: AppEnviroment;
    @inject(LOGGER_SERVICE) private readonly loggerService: LoggerService;

    public async read(classRef: Newable) {
        const options =
            Reflect.getMetadata<Pick<ControllerMetadata, 'prefix'>>(CoreMetadataKey.Controller, classRef) ??
            <Pick<ControllerMetadata, 'prefix'>>{};
        const events = this.getEvents(classRef);
        const rpcs = this.getRPCs(classRef);
        const timers = this.getTimers(classRef);

        return <ControllerMetadata>{
            ...options,
            classRef,
            events,
            rpcs,
            ...this.getPipeline(classRef),
            timers,
        };
    }

    private getEvents(classRef: Newable) {
        const events = Reflect.getMetadata<EventMetadata[]>(CoreMetadataKey.ControllerEvents, classRef.prototype) ?? [];

        return events.map((event) => {
            return <EventMetadata>{
                ...event,
                params: this.getMethodParams(classRef, event),
                ...this.getPipeline(classRef, event.method),
            };
        });
    }

    private getRPCs(classRef: Newable) {
        const rpcs = Reflect.getMetadata<RPCMetadata[]>(CoreMetadataKey.ControllerRPCs, classRef.prototype) ?? [];

        return rpcs.map((rpc) => {
            return <RPCMetadata>{
                ...rpc,
                params: this.getMethodParams(classRef, rpc),
                ...this.getPipeline(classRef, rpc.method),
            };
        });
    }

    private getMethodParams(classRef: Newable, metadata: EventMetadata | RPCMetadata) {
        const params = Reflect.getMetadata<MethodParameter[]>(CoreMetadataKey.ControllerParams, classRef.prototype, metadata.method) ?? [];

        params.sort((a, b) => a.index - b.index);
        params.forEach((param, index) => {
            if (param.index !== index) {
                this.loggerService.error('An error occurred while reading controller metadata.');
                throw new Error(ErrorMessage.InvalidParameterDecoratorUsage);
            } else if (
                (metadata.type === 'on' ||
                    metadata.type === 'onPlayer' ||
                    metadata.type === 'onInternal' ||
                    metadata.type === 'onServer' ||
                    metadata.type === 'onWebView' ||
                    metadata.type === 'once' ||
                    metadata.type === 'oncePlayer' ||
                    metadata.type === 'onceInternal' ||
                    metadata.type === 'onceServer' ||
                    metadata.type === 'onceWebView') &&
                param.type === 'response'
            ) {
                // Response
                this.loggerService.error('An error occurred while reading controller metadata.');
                throw new Error(ErrorMessage.ResponseDecoratorNotAllowedOnEvents);
            } else if (param.type === 'player' && this.appEnv === AppEnviroment.Client) {
                // Player (Client) - Not allowed
                this.loggerService.error('An error occurred while reading controller metadata.');
                throw new Error(ErrorMessage.PlayerDecoratorNotAllowedOnClientEvents);
            } else if (metadata.type === 'onPlayerRequest' && this.appEnv === AppEnviroment.Client) {
                this.loggerService.error('An error occurred while reading controller metadata.');
                throw new Error(ErrorMessage.RPCNotAllowedInClient);
            } else if (metadata.type === 'onServerRequest' && this.appEnv === AppEnviroment.Server) {
                this.loggerService.error('An error occurred while reading controller metadata.');
                throw new Error(ErrorMessage.RPCNotAllowedInServer);
            } else if ((metadata.type === 'onPlayer' || metadata.type === 'oncePlayer') && this.appEnv === AppEnviroment.Client) {
                this.loggerService.error('An error occurred while reading controller metadata.');
                throw new Error(ErrorMessage.EventNotAllowedInClient);
            } else if ((metadata.type === 'onServer' || metadata.type === 'onceServer') && this.appEnv === AppEnviroment.Server) {
                this.loggerService.error('An error occurred while reading controller metadata.');
                throw new Error(ErrorMessage.EventNotAllowedInServer);
            }
        });

        return params;
    }

    private getPipeline(target: Newable | object, method?: string) {
        const guards = Reflect.getMetadata<Newable<Guard>[]>(CoreMetadataKey.Guards, target, method) ?? [];
        const interceptors = Reflect.getMetadata<Newable<Interceptor>[]>(CoreMetadataKey.Interceptors, target, method) ?? [];
        const pipes = Reflect.getMetadata<Newable<Pipe>[]>(CoreMetadataKey.Pipes, target, method) ?? [];
        const errorFilters = Reflect.getMetadata<Newable<ErrorFilter>[]>(CoreMetadataKey.ErrorFilters, target, method) ?? [];

        return { guards, interceptors, pipes, errorFilters };
    }

    private getTimers(classRef: Newable) {
        return Reflect.getMetadata<TimerMetadata[]>(CoreMetadataKey.Timers, classRef.prototype) ?? [];
    }
}
