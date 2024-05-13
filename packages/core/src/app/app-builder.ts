import { validateErrorFilter, validateGuard, validateInterceptor, validatePipe } from '../schemas/events';
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
import { REFLECTOR_SERVICE } from '../constants';
import { ReflectorService } from '../services';

@injectable()
export class AppBuilder<G extends Guard = Guard, I extends Interceptor = Interceptor, EF extends ErrorFilter = ErrorFilter> {
    @inject(APP_ENVIROMENT) protected readonly enviroment: string;
    @inject(INTERNAL_APP_CONTAINER) protected readonly internalAppContainer: Container;
    @inject(PLUGINS) protected readonly plugins: Newable<MangoPlugin>[];

    private globalContainerOptions: interfaces.ContainerOptions = {};

    public useGlobalGuards(...guards: (Newable<G> | G)[]) {
        const validatedGuards: (Newable<G> | G)[] = [];
        for (const guard of guards) {
            const { valid, value, error } = validateGuard(guard);
            if (!valid) throw new Error(error);
            validatedGuards.push(value);
        }

        this.internalAppContainer.bind(GLOBAL_GUARDS).toConstantValue(validatedGuards);
        return this;
    }

    public useGlobalInterceptors(...interceptors: (Newable<I> | I)[]) {
        const validatedInterceptors: (Newable<I> | I)[] = [];
        for (const interceptor of interceptors) {
            const { valid, value, error } = validateInterceptor(interceptor);
            if (!valid) throw new Error(error);
            validatedInterceptors.push(value);
        }

        this.internalAppContainer.bind(GLOBAL_INTERCEPTORS).toConstantValue(validatedInterceptors);
        return this;
    }

    public useGlobalPipes(...pipes: (Newable<Pipe> | Pipe)[]) {
        const validatedPipes: (Newable<Pipe> | Pipe)[] = [];
        for (const pipe of pipes) {
            const { valid, value, error } = validatePipe(pipe);
            if (!valid) throw new Error(error);
            validatedPipes.push(value);
        }

        this.internalAppContainer.bind(GLOBAL_PIPES).toConstantValue(validatedPipes);
        return this;
    }

    public useGlobalFilters(...filters: (Newable<EF> | EF)[]) {
        const validatedFIlters: (Newable<EF> | EF)[] = [];
        for (const filter of filters) {
            const { valid, value, error } = validateErrorFilter(filter);
            if (!valid) throw new Error(error);
            validatedFIlters.push(value);
        }

        this.internalAppContainer.bind(GLOBAL_ERROR_FILTERS).toConstantValue(validatedFIlters);
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
        // GLobal service bindings
        globalAppContainer.bind(REFLECTOR_SERVICE).toConstantValue(ReflectorService);
        globalAppContainer.bind(ReflectorService).toService(REFLECTOR_SERVICE);

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
                name: string,
            ) => {
                const executionContext = context.container.get(ExecutionContextBase);
                executionContext.$type = type;
                executionContext.$request = request;
                executionContext.$response = response;
                executionContext.$handler = handler;
                executionContext.$classRef = classRef;
                executionContext.$name = name;
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
