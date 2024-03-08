import { inject, injectable } from 'inversify';
import type { InjectionToken, Newable } from '../../types';
import { CoreMetadataKey } from '../enums';
import type { InjectableMetadata, ErrorFilter, Guard, Interceptor } from '../interfaces';
import type { ModuleMetadata } from '../interfaces';
import type { ClassProvider, DynamicModule, LoggerService, ModuleOptions, Pipe, Provider } from '../../interfaces';
import { isFunction, isNil, isString, isSymbol } from '../../utils';
import { ErrorMessage } from '../../enums';
import { LOGGER_SERVICE } from '../../constants';

@injectable()
export class ModuleMetadataReader {
    @inject(LOGGER_SERVICE) private readonly loggerService: LoggerService;

    public async read(module: Newable | DynamicModule | Promise<DynamicModule>) {
        // Class reference
        if (isFunction(module)) {
            const options = Reflect.getMetadata<Required<ModuleOptions>>(CoreMetadataKey.Module, module) ?? <Required<ModuleOptions>>{};
            const exportTokens = this.getExportTokens(options.exports);
            const separatedProviders = this.separateProviders(options.providers, exportTokens);

            return <ModuleMetadata>{
                controllers: options.controllers,
                imports: options.imports,
                ...this.getPipeline(module),
                ...separatedProviders,
                classRef: module,
                global: Reflect.getMetadata<boolean>(CoreMetadataKey.GlobalModule, module) ?? false,
            };
        }
        // Dynamic module
        if (module instanceof Promise) module = await module;
        if (!('module' in module)) {
            this.loggerService.error('An error occurred while reading module metadata.');
            throw new Error(ErrorMessage.InvalidModuleDefinition);
        }

        const { module: classRef, global, ...options } = <Required<DynamicModule>>module;
        const exportTokens = this.getExportTokens(options.exports);
        const separatedProviders = this.separateProviders(options.providers, exportTokens);

        return <ModuleMetadata>{
            controllers: options.controllers,
            imports: options.imports,
            ...this.getPipeline(classRef),
            ...separatedProviders,
            classRef,
            global: global ?? false,
        };
    }

    private getPipeline(classRef: Newable) {
        const guards = Reflect.getMetadata<Newable<Guard>[]>(CoreMetadataKey.Guards, classRef) ?? [];
        const interceptors = Reflect.getMetadata<Newable<Interceptor>[]>(CoreMetadataKey.Interceptors, classRef) ?? [];
        const pipes = Reflect.getMetadata<Newable<Pipe>[]>(CoreMetadataKey.Pipes, classRef) ?? [];
        const errorFilters = Reflect.getMetadata<Newable<ErrorFilter>[]>(CoreMetadataKey.ErrorFilters, classRef) ?? [];

        return { guards, interceptors, pipes, errorFilters };
    }

    private getExportTokens(exports: Required<ModuleOptions>['exports']) {
        return exports.map<InjectionToken>((providerExport) => {
            if (isFunction(providerExport)) {
                if (!Reflect.hasOwnMetadata(CoreMetadataKey.Injectable, providerExport)) {
                    this.loggerService.error('An error occurred while reading module metadata.');
                    throw new Error(ErrorMessage.InvalidExportDefinition);
                }
                return providerExport;
            } else if (isString(providerExport) || isSymbol(providerExport)) {
                return providerExport;
            } else if ('provide' in providerExport) {
                return providerExport.provide;
            }

            this.loggerService.error('An error occurred while reading module metadata.');
            throw new Error(ErrorMessage.InvalidExportDefinition);
        });
    }

    private separateProviders(providers: Required<ModuleOptions>['providers'], exportTokens: InjectionToken[]) {
        return providers
            .map((provider) => {
                if (isFunction(provider)) {
                    const injectableMetadata = Reflect.getMetadata<InjectableMetadata>(CoreMetadataKey.Injectable, provider);
                    if (isNil(injectableMetadata)) {
                        this.loggerService.error('An error occurred while reading module metadata.');
                        throw new Error(ErrorMessage.InvalidProviderDefinition);
                    }
                    return <ClassProvider>{ provide: provider, useClass: provider, scope: injectableMetadata.scope };
                } else if ('useClass' in provider || 'useValue' in provider || 'useFactory' in provider || 'useExisting' in provider) {
                    return provider;
                }

                this.loggerService.error('An error occurred while reading module metadata.');
                throw new Error(ErrorMessage.InvalidProviderDefinition);
            })
            .reduce(
                (acc, provider) => {
                    if (exportTokens.includes(provider.provide)) {
                        acc.externalProviders.set(provider.provide, provider);
                    } else {
                        acc.internalProviders.set(provider.provide, provider);
                    }
                    return acc;
                },
                {
                    internalProviders: new Map<InjectionToken, Exclude<Provider, Newable>>(),
                    externalProviders: new Map<InjectionToken, Exclude<Provider, Newable>>(),
                },
            );
    }
}
