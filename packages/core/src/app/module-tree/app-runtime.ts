import type { Newable } from '../../types';
import { isNil, isObject } from '../../utils';
import { ENABLE_SHUTDOWN_HOOKS, GLOBAL_ERROR_FILTERS, GLOBAL_GUARDS, GLOBAL_INTERCEPTORS, GLOBAL_PIPES } from '../constants';
import type { ErrorFilter, Guard, Interceptor } from '../interfaces';
import { Module } from '../module';
import { inject, injectable, optional } from 'inversify';
import { Controller, ControllerEventHandler, ControllerRPCHandler } from '../controller';
import { LOGGER_SERVICE, TIMER_SERVICE } from '../../constants';
import { CoreMetadataKey } from '../enums';
import { ErrorMessage } from '../../enums';
import type { LoggerService, Pipe } from '../../interfaces';
import type { Tree } from '../utils';
import type { TimerService } from '../../services';

@injectable()
export class AppRuntime {
    @inject(ControllerEventHandler) private readonly eventHandler: ControllerEventHandler;
    @inject(ControllerRPCHandler) private readonly rpcHandler: ControllerRPCHandler;
    @inject(GLOBAL_GUARDS) private readonly globalGuards: (Newable<Guard> | Guard)[];
    @inject(GLOBAL_INTERCEPTORS) private readonly globalInterceptors: (Newable<Interceptor> | Interceptor)[];
    @inject(GLOBAL_PIPES) private readonly globalPipes: (Newable<Pipe> | Pipe)[];
    @inject(GLOBAL_ERROR_FILTERS) private readonly globalErrorFilters: (Newable<ErrorFilter> | ErrorFilter)[];
    @inject(LOGGER_SERVICE) private readonly loggerService: LoggerService;
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
            this.loggerService.log(`~lw~Module ~lb~${module.metadata.classRef.name} ~lw~loaded ~lk~(${Date.now() - startTime}ms)`);
            await this.runLifecycleMethod(module, 'onModuleInit');
        });
        // await this.runLifecycleMethods(resolvedTree, 'onModuleInit');
        await this.runLifecycleMethods(resolvedTree, 'onAppBootstrap');

        // Register event and rpc listeners.
        resolvedTree.traverse((node) => {
            const module = node.value;
            module.controllers.forEach((controller) => {
                const time = Date.now();
                this.registerTimers(controller);
                this.registerListeners(controller);
                this.loggerService.log(
                    `~lw~Controller ~lc~${controller.metadata.classRef.name} ~lw~timers and listeners registered ~lk~(${Date.now() - time}ms)`,
                );
            });
        });
    }

    public async shutdown(resolvedTree: Tree<Module>) {
        if (this.enableShutdownHooks) {
            await this.runLifecycleMethods(resolvedTree, 'onModuleDestroy');
            await this.runLifecycleMethods(resolvedTree, 'beforeAppShutdown');
        }

        await resolvedTree.asyncTraverse(async (node) => {
            const module = node.value;
            module.controllers.forEach((controller) => {
                const timerService = controller.owner.container.get<TimerService>(TIMER_SERVICE);

                // Destroy all timers.
                timerService.everyticks.forEach((timer) => timer.destroy());
                timerService.intervals.forEach((timer) => timer.destroy());
                timerService.timeouts.forEach((timer) => timer.destroy());
                timerService.cronJobs.forEach((cronJob) => cronJob.stop());

                // Destroy all script event handlers.
                controller.eventHandlers.forEach((handler) => handler.destroy());
                controller.rpcHandlers.forEach((handler) => handler.destroy());
            });
        });

        // // Destroy all timers.
        // this.timerService.everyticks.forEach((timer) => timer.destroy());
        // this.timerService.intervals.forEach((timer) => timer.destroy());
        // this.timerService.timeouts.forEach((timer) => timer.destroy());
        // this.timerService.cronJobs.forEach((cronJob) => cronJob.stop());

        // // Destroy all script event handlers.
        // this.eventService.$localHandlers.forEach((handler) => handler.destroy());
        // this.eventService.$internalHandlers.forEach((handler) => handler.destroy());
        // this.eventService.$remoteHandlers.forEach((handler) => handler.destroy());

        if (this.enableShutdownHooks) {
            await this.runLifecycleMethods(resolvedTree, 'onAppShutdown');
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

            const handler = await this.rpcHandler.registerRPC(guards, interceptors, pipes, mappedErrorFilters, controller, rpc);
            controller.rpcHandlers.push(handler);
        });
    }

    public registerTimers(controller: Controller) {
        const timerService = controller.owner.container.get<TimerService>(TIMER_SERVICE);

        controller.metadata.timers.forEach((timer) => {
            if (timer.type === 'cron') {
                timerService.createCronJob(controller.instance[timer.method]!, timer.options);
            } else if (timer.type === 'everytick') {
                timerService.createEveryTick(controller.instance[timer.method]!, timer.name);
            } else if (timer.type === 'interval') {
                timerService.createInterval(controller.instance[timer.method]!, timer.options.timeout, timer.name);
            } else if (timer.type === 'timeout') {
                timerService.createTimeout(controller.instance[timer.method]!, timer.options.timeout, timer.name);
            }
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
        return resolvedTree.asyncTraverse(async (node) => await this.runLifecycleMethod(node.value, method));
    }

    private async runLifecycleMethod(
        module: Module,
        method: 'onModuleInit' | 'onModuleDestroy' | 'onAppBootstrap' | 'beforeAppShutdown' | 'onAppShutdown',
    ) {
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
    }
}
