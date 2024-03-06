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
    // LOG_ERROR_STACKTRACE,
} from './constants';
import type { Newable } from '../types';
import { inject, type Container, injectable } from 'inversify';
import { App } from './app';
import type { ErrorFilter, Guard, Interceptor, MangoPlugin } from './interfaces';
import { ErrorFilterSchema } from '../schemas';
import type { Pipe } from '../interfaces';

@injectable()
export class AppBuilder<G extends Guard = Guard, I extends Interceptor = Interceptor, EF extends ErrorFilter = ErrorFilter> {
    @inject(INTERNAL_APP_CONTAINER) protected readonly internalAppContainer: Container;

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

    // public logErrorStacktrace() {
    //     this.internalAppContainer.bind(LOG_ERROR_STACKTRACE).toConstantValue(true);
    //     return this;
    // }

    public build() {
        if (!this.internalAppContainer.isBound(GLOBAL_GUARDS)) this.internalAppContainer.bind(GLOBAL_GUARDS).toConstantValue([]);
        if (!this.internalAppContainer.isBound(GLOBAL_INTERCEPTORS))
            this.internalAppContainer.bind(GLOBAL_INTERCEPTORS).toConstantValue([]);
        if (!this.internalAppContainer.isBound(GLOBAL_PIPES)) this.internalAppContainer.bind(GLOBAL_PIPES).toConstantValue([]);
        if (!this.internalAppContainer.isBound(GLOBAL_ERROR_FILTERS))
            this.internalAppContainer.bind(GLOBAL_ERROR_FILTERS).toConstantValue([]);

        return this.internalAppContainer.get(App);
    }
}
