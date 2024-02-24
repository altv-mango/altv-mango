import type { Newable } from '../../types';
import { isNil, isObject } from '../../utils';
import { ENABLE_SHUTDOWN_HOOKS, GLOBAL_ERROR_FILTERS, GLOBAL_GUARDS, GLOBAL_INTERCEPTORS, GLOBAL_PIPES } from '../constants';
import type { ErrorFilter, Guard, Interceptor, InternalEventService } from '../interfaces';
import { Module } from '../module';
import { inject, injectable, optional } from 'inversify';
import { Controller, ControllerEventHandler, ControllerRPCHandler } from '../controller';
import { EVENT_SERVICE } from '../../constants';
import { CoreMetadataKey } from '../enums';
import { InternalLoggerService } from '../services';
import { ErrorMessage } from '../../enums';
import type { Pipe } from '../../interfaces';
import type { Tree } from '../utils';
import chalk from 'chalk';

@injectable()
export class AppRuntime {
    @inject(ControllerEventHandler) private readonly eventHandler: ControllerEventHandler;
    @inject(ControllerRPCHandler) private readonly rpcHandler: ControllerRPCHandler;
    @inject(EVENT_SERVICE) private readonly eventService: InternalEventService;
    @inject(GLOBAL_GUARDS) private readonly globalGuards: (Newable<Guard> | Guard)[];
    @inject(GLOBAL_INTERCEPTORS) private readonly globalInterceptors: (Newable<Interceptor> | Interceptor)[];
    @inject(GLOBAL_PIPES) private readonly globalPipes: (Newable<Pipe> | Pipe)[];
    @inject(GLOBAL_ERROR_FILTERS) private readonly globalErrorFilters: (Newable<ErrorFilter> | ErrorFilter)[];
    @inject(InternalLoggerService) private readonly loggerService: InternalLoggerService;
    @inject(ENABLE_SHUTDOWN_HOOKS) @optional() private readonly enableShutdownHooks: boolean;

    public async boot(resolvedTree: Tree<Module>) {
        await resolvedTree.asyncTraverse(async (node) => {
            const startTime = Date.now();
            // Initialize module, controllers and providers.
            const module = node.value;
            module.instance = module.container.get<{ [key: string]: Function }>(module.metadata.classRef);
            module.controllers.forEach(
                (controller) => (controller.instance = module.container.get<{ [key: string]: Function }>(controller.metadata.classRef)),
            );
            [...module.metadata.internalProviders, ...module.metadata.externalProviders].forEach(([token]) =>
                module.container.get<any>(token),
            );

            // Log module loaded.
            this.loggerService.log(
                [chalk.magentaBright('Boot'), chalk.blueBright(module.metadata.classRef.name)],
                'Module loaded' + chalk.gray(` (${Date.now() - startTime}ms)`),
            );
        });
        this.runLifecycleMethods(resolvedTree, 'onModuleInit');
        this.runLifecycleMethods(resolvedTree, 'onAppBootstrap');

        // Register event and rpc listeners.
        resolvedTree.traverse((node) => {
            const module = node.value;
            module.controllers.forEach((controller) => this.registerListeners(controller));
        });
    }

    public async shutdown(resolvedTree: Tree<Module>) {
        if (this.enableShutdownHooks) {
            this.runLifecycleMethods(resolvedTree, 'onModuleDestroy');
            this.runLifecycleMethods(resolvedTree, 'beforeAppShutdown');
        }

        // Destroy all script event handlers.
        this.eventService.$localHandlers.forEach((handler) => handler.destroy());
        this.eventService.$internalHandlers.forEach((handler) => handler.destroy());
        this.eventService.$remoteHandlers.forEach((handler) => handler.destroy());

        if (this.enableShutdownHooks) {
            this.runLifecycleMethods(resolvedTree, 'onAppShutdown');
        }
    }

    private registerListeners(controller: Controller) {
        const module = controller.owner;
        controller.metadata.events.forEach((event) => {
            const guards = [...this.globalGuards, ...module.metadata.guards, ...controller.metadata.guards, ...event.guards];
            const interceptors = [
                ...this.globalInterceptors,
                ...module.metadata.interceptors,
                ...controller.metadata.interceptors,
                ...event.interceptors,
            ];
            const pipes = [...this.globalPipes, ...module.metadata.pipes, ...controller.metadata.pipes, ...event.pipes];
            const mappedErrorFilters = this.mapErrorFilters([
                ...this.globalErrorFilters,
                ...module.metadata.errorFilters,
                ...controller.metadata.errorFilters,
                ...event.errorFilters,
            ]);

            const handler = this.eventHandler.registerEvent(guards, interceptors, pipes, mappedErrorFilters, controller, event);
            controller.eventHandlers.push(handler);
        });

        controller.metadata.rpcs.forEach(async (rpc) => {
            const guards = [...this.globalGuards, ...module.metadata.guards, ...controller.metadata.guards, ...rpc.guards];
            const interceptors = [
                ...this.globalInterceptors,
                ...module.metadata.interceptors,
                ...controller.metadata.interceptors,
                ...rpc.interceptors,
            ];
            const pipes = [...this.globalPipes, ...module.metadata.pipes, ...controller.metadata.pipes, ...rpc.pipes];
            const mappedErrorFilters = this.mapErrorFilters([
                ...this.globalErrorFilters,
                ...module.metadata.errorFilters,
                ...controller.metadata.errorFilters,
                ...rpc.errorFilters,
            ]);

            const handler = await this.rpcHandler.registerRPC(guards, interceptors, pipes, mappedErrorFilters, controller.metadata, rpc);
            controller.rpcHandlers.push(handler);
        });
    }

    private mapErrorFilters(errorFilters: (Newable<ErrorFilter> | ErrorFilter)[]) {
        const filterMap: [unknown | 'MANGO_ANY_ERROR', Newable<ErrorFilter> | ErrorFilter][] = [];

        for (const filter of errorFilters) {
            const errors = Reflect.getMetadata<any[]>(CoreMetadataKey.Catch, filter) ?? [];
            if (errors.length === 0) {
                errors.push('MANGO_ANY_ERROR');
            }
            for (const error of errors) {
                if (!isNil(filterMap.find((filterError) => filterError[0] === error))) {
                    this.loggerService.error('An error occurred while trying to map error filters.');
                    throw new Error(ErrorMessage.ErrorAlreadyHandledByFilter);
                }
                filterMap.push([error, filter]);
            }
        }

        return filterMap;
    }

    private async runLifecycleMethods(
        resolvedTree: Tree<Module>,
        method: 'onModuleInit' | 'onModuleDestroy' | 'onAppBootstrap' | 'beforeAppShutdown' | 'onAppShutdown',
    ) {
        return resolvedTree.asyncTraverse(async (node) => {
            const module = node.value;
            await Promise.all(
                module.controllers.map(async (controller) => {
                    if (!isObject(controller.instance) || isNil(controller.instance[method])) return;
                    await controller.instance[method]!();
                }),
            );
            await Promise.all(
                [...module.metadata.internalProviders, ...module.metadata.externalProviders].map(async ([token]) => {
                    const providerInstance = <{ [key: string]: Function }>module.container.get(token);
                    if (!isObject(providerInstance) || isNil(providerInstance[method])) return;
                    await providerInstance[method]!();
                }),
            );
            if (!isObject(module.instance) || isNil(module.instance[method])) return;
            await module.instance[method]!();
        });
    }
}
