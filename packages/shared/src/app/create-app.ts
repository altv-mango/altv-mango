import { Container } from 'inversify';
import { App } from './app';
import { AppRuntime, ModuleDependencyBinder, ModuleTreeScanner } from './module-tree';
import { Module } from './module/module';
import {
    INTERNAL_APP_CONTAINER,
    APP_ENVIROMENT,
    GLOBAL_APP_CONTAINER,
    INTERNAL_PLUGINS,
    EXTERNAL_PLUGINS,
    MANGO_REQUEST_FACTORY,
    MANGO_RESPONSE_FACTORY,
    EXECUTION_CONTEXT_FACTORY,
} from './constants';
import type { Newable } from '../types';
import type { MangoPlugin } from './interfaces';
import { Controller, ControllerEventHandler, ControllerMetadataReader, ControllerRPCHandler, PipelineHandler } from './controller';
import { ModuleMetadataReader } from './module';
import type { AppEnviroment, ExecutionContextType } from './enums';
import { InternalLoggerService } from './services';
import { ExecutionContextBase, MangoRequestBase, MangoResponseBase } from './pipeline';
import type { Player } from '@altv/server';
import type { AppBuilder } from './app-builder';

export async function createAppBuilder<T extends AppBuilder>({
    enviroment,
    plugins,
    appBuilderInherit,
}: {
    enviroment: AppEnviroment;
    plugins: Newable<MangoPlugin>[];
    appBuilderInherit: Newable<T>;
}) {
    const internalAppContainer = new Container();
    const globalAppContainer = new Container();

    // App bindings
    internalAppContainer.bind(App).toSelf().inSingletonScope();
    internalAppContainer.bind(appBuilderInherit).toSelf().inSingletonScope();
    internalAppContainer.bind(INTERNAL_APP_CONTAINER).toConstantValue(internalAppContainer);
    internalAppContainer.bind(GLOBAL_APP_CONTAINER).toConstantValue(globalAppContainer);

    // Module tree bindings
    internalAppContainer.bind(ModuleTreeScanner).toSelf().inSingletonScope();
    internalAppContainer.bind(ModuleDependencyBinder).toSelf().inSingletonScope();
    internalAppContainer.bind(AppRuntime).toSelf().inSingletonScope();

    // App bindings
    internalAppContainer.bind(APP_ENVIROMENT).toConstantValue(enviroment);
    internalAppContainer.bind(PipelineHandler).toSelf().inSingletonScope();

    // Module bindings
    internalAppContainer.bind(Module).toSelf().inTransientScope();
    internalAppContainer.bind(ModuleMetadataReader).toSelf().inSingletonScope();

    // Controller bindings
    internalAppContainer.bind(Controller).toSelf().inTransientScope();
    internalAppContainer.bind(ControllerMetadataReader).toSelf().inSingletonScope();
    internalAppContainer.bind(ControllerEventHandler).toSelf().inSingletonScope();
    internalAppContainer.bind(ControllerRPCHandler).toSelf().inSingletonScope();

    // Mango Request and Response bindings
    internalAppContainer.bind(MangoRequestBase).toSelf().inTransientScope();
    internalAppContainer.bind(MANGO_REQUEST_FACTORY).toFactory((context) => {
        return (body: unknown, player: Player) => {
            const request = context.container.get(MangoRequestBase);
            request.$body = body;
            request.$player = player;
            return request;
        };
    });
    internalAppContainer.bind(MangoResponseBase).toSelf().inTransientScope();
    internalAppContainer.bind(MANGO_RESPONSE_FACTORY).toFactory((context) => {
        return () => {
            return context.container.get(MangoResponseBase);
        };
    });
    internalAppContainer.bind(ExecutionContextBase).toSelf().inTransientScope();
    internalAppContainer.bind(EXECUTION_CONTEXT_FACTORY).toFactory((context) => {
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

    // Logger bindings
    internalAppContainer.bind(InternalLoggerService).toSelf().inSingletonScope();
    globalAppContainer.bind(InternalLoggerService).toSelf().inSingletonScope();

    // Plugins bindings
    for (const plugin of plugins) {
        internalAppContainer.bind(plugin).toSelf().inSingletonScope();
        const pluginInstance = internalAppContainer.get(plugin);
        if (!pluginInstance.beforeCreate) continue;
        await Promise.resolve(pluginInstance.beforeCreate());
    }
    internalAppContainer.bind(INTERNAL_PLUGINS).toConstantValue(plugins);
    internalAppContainer.bind(EXTERNAL_PLUGINS).toConstantValue([]);

    return internalAppContainer.get(appBuilderInherit);
}
