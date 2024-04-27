import { z } from 'zod';
import { GuardSchema, InterceptorSchema, PipeSchema } from '../schemas/events';
import {
    INTERNAL_APP_CONTAINER,
    GLOBAL_ERROR_FILTERS,
    GLOBAL_GUARDS,
    GLOBAL_INTERCEPTORS,
    GLOBAL_PIPES,
    ENABLE_SHUTDOWN_HOOKS,
    PLUGINS,
    GLOBAL_APP_CONTAINER,
    APP_ENVIROMENT,
    MANGO_REQUEST_FACTORY,
    MANGO_RESPONSE_FACTORY,
    EXECUTION_CONTEXT_FACTORY,
    CONTAINER_OPTIONS,
} from './constants';
import type { Newable } from '../types';
import { inject, Container, injectable, type interfaces } from 'inversify';
import { App } from './app';
import type { ErrorFilter, Guard, Interceptor, MangoPlugin } from './interfaces';
import { ErrorFilterSchema } from '../schemas';
import type { Pipe } from '../interfaces';
import {
    ControllerEventHandler,
    ControllerFlowHandler,
    ControllerMetadataReader,
    ControllerRPCHandler,
    PipelineHandler,
} from './controller';
import { Module, ModuleMetadataReader } from './module';
import { AppRuntime, ModuleDependencyBinder, ModuleTreeScanner } from './module-tree';
import { Controller } from './controller';
import { ExecutionContextBase, MangoRequestBase, MangoResponseBase } from './pipeline';
import type { ExecutionContextType } from './enums';
import type { Player } from '@altv/server';

@injectable()
export class AppBuilder<G extends Guard = Guard, I extends Interceptor = Interceptor, EF extends ErrorFilter = ErrorFilter> {
    @inject(APP_ENVIROMENT) protected readonly enviroment: string;
    @inject(INTERNAL_APP_CONTAINER) protected readonly internalAppContainer: Container;
    @inject(PLUGINS) protected readonly plugins: Newable<MangoPlugin>[];

    private globalContainerOptions: interfaces.ContainerOptions = {};

    public useGlobalGuards(...guards: (Newable<G> | G)[]) {
        const parsedGuards = z.array(GuardSchema).parse(guards);
        this.internalAppContainer.bind(GLOBAL_GUARDS).toConstantValue(parsedGuards);
        return this;
    }

    public useGlobalInterceptors(...interceptors: (Newable<I> | I)[]) {
        const parsedInterceptors = z.array(InterceptorSchema).parse(interceptors);
        this.internalAppContainer.bind(GLOBAL_INTERCEPTORS).toConstantValue(parsedInterceptors);
        return this;
    }

    public useGlobalPipes(...pipes: (Newable<Pipe> | Pipe)[]) {
        const parsedPipes = z.array(PipeSchema).parse(pipes);
        this.internalAppContainer.bind(GLOBAL_PIPES).toConstantValue(parsedPipes);
        return this;
    }

    public useGlobalFilters(...filters: (Newable<EF> | EF)[]) {
        const parsedFilters = z.array(ErrorFilterSchema).parse(filters);
        this.internalAppContainer.bind(GLOBAL_ERROR_FILTERS).toConstantValue(parsedFilters);
        return this;
    }

    public usePlugins(...plugins: Newable<MangoPlugin>[]) {
        plugins.forEach((p) => this.internalAppContainer.bind(p).toSelf().inSingletonScope());
        const internalPlugins = this.internalAppContainer.get<Newable<MangoPlugin>[]>(PLUGINS);
        this.internalAppContainer.rebind(PLUGINS).toConstantValue([...internalPlugins, ...plugins]);
        return this;
    }

    public enableShutdownHooks() {
        this.internalAppContainer.bind(ENABLE_SHUTDOWN_HOOKS).toConstantValue(true);
        return this;
    }

    public setContainerOptions(options: interfaces.ContainerOptions, onlyGlobal = false) {
        this.globalContainerOptions = options;
        if (onlyGlobal) return this;
        this.internalAppContainer.bind(CONTAINER_OPTIONS).toConstantValue(options);
        return this;
    }

    public async build() {
        const globalAppContainer = new Container(this.globalContainerOptions);

        // App bindings
        this.internalAppContainer.bind(App).toSelf().inSingletonScope();
        this.internalAppContainer.bind(GLOBAL_APP_CONTAINER).toConstantValue(globalAppContainer);

        // Module tree bindings
        this.internalAppContainer.bind(ModuleTreeScanner).toSelf().inSingletonScope();
        this.internalAppContainer.bind(ModuleDependencyBinder).toSelf().inSingletonScope();
        this.internalAppContainer.bind(AppRuntime).toSelf().inSingletonScope();

        // App bindings
        this.internalAppContainer.bind(PipelineHandler).toSelf().inSingletonScope();

        // Module bindings
        this.internalAppContainer.bind(Module).toSelf().inTransientScope();
        this.internalAppContainer.bind(ModuleMetadataReader).toSelf().inSingletonScope();

        // Controller bindings
        this.internalAppContainer.bind(Controller).toSelf().inTransientScope();
        this.internalAppContainer.bind(ControllerMetadataReader).toSelf().inSingletonScope();
        this.internalAppContainer.bind(ControllerFlowHandler).toSelf().inSingletonScope();
        this.internalAppContainer.bind(ControllerEventHandler).toSelf().inSingletonScope();
        this.internalAppContainer.bind(ControllerRPCHandler).toSelf().inSingletonScope();

        // Mango Request and Response bindings
        this.internalAppContainer.bind(MangoRequestBase).toSelf().inTransientScope();
        this.internalAppContainer.bind(MANGO_REQUEST_FACTORY).toFactory((context) => {
            return (body: unknown, player: Player) => {
                const request = context.container.get(MangoRequestBase);
                request.$body = body;
                request.$player = player;
                return request;
            };
        });
        this.internalAppContainer.bind(MangoResponseBase).toSelf().inTransientScope();
        this.internalAppContainer.bind(MANGO_RESPONSE_FACTORY).toFactory((context) => {
            return () => {
                return context.container.get(MangoResponseBase);
            };
        });
        this.internalAppContainer.bind(ExecutionContextBase).toSelf().inTransientScope();
        this.internalAppContainer.bind(EXECUTION_CONTEXT_FACTORY).toFactory((context) => {
            return (
                type: ExecutionContextType,
                classRef: Newable,
                handler: Function,
                request: MangoRequestBase,
                response: MangoResponseBase,
            ) => {
                const executionContext = context.container.get(ExecutionContextBase);
                executionContext.$type = type;
                executionContext.$request = request;
                executionContext.$response = response;
                executionContext.$handler = handler;
                executionContext.$classRef = classRef;
                return executionContext;
            };
        });

        // Plugins bindings
        for (const plugin of this.plugins) {
            this.internalAppContainer.bind(plugin).toSelf().inSingletonScope();
            const pluginInstance = this.internalAppContainer.get(plugin);
            if (!pluginInstance.onBuild) continue;
            await pluginInstance.onBuild();
        }

        if (!this.internalAppContainer.isBound(GLOBAL_GUARDS)) this.internalAppContainer.bind(GLOBAL_GUARDS).toConstantValue([]);
        if (!this.internalAppContainer.isBound(GLOBAL_INTERCEPTORS))
            this.internalAppContainer.bind(GLOBAL_INTERCEPTORS).toConstantValue([]);
        if (!this.internalAppContainer.isBound(GLOBAL_PIPES)) this.internalAppContainer.bind(GLOBAL_PIPES).toConstantValue([]);
        if (!this.internalAppContainer.isBound(GLOBAL_ERROR_FILTERS))
            this.internalAppContainer.bind(GLOBAL_ERROR_FILTERS).toConstantValue([]);

        return this.internalAppContainer.get(App);
    }
}
