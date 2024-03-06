import type { Provider } from '../../interfaces';
import type { Newable } from '../../types';
import { isObject } from '../../utils';
import { GLOBAL_APP_CONTAINER } from '../constants';
import { Module } from '../module';
import { Container, inject, injectable } from 'inversify';
import { InternalLoggerService } from '../services';
import { MODULE_CONTAINER } from '../../constants';
import type { Tree } from '../utils';

@injectable()
export class ModuleDependencyBinder {
    @inject(GLOBAL_APP_CONTAINER) private readonly globalAppContainer: Container;
    @inject(InternalLoggerService) private readonly loggerService: InternalLoggerService;

    public async bind(resolvedTree: Tree<Module>) {
        await resolvedTree.asyncTraverse(async (node) => {
            const startTime = Date.now();

            const module = node.value;
            // Attach the global container to the module container, so it can be used to resolve dependencies.
            module.container.parent = this.globalAppContainer;
            this.globalAppContainer.bind(module.metadata.classRef).toSelf().inSingletonScope();

            // If the module is global, we want to bind it to the global container.
            if (module.metadata.global) {
                // Bind external providers to the global container, so they can be injected in other modules.
                for (const [_, provider] of module.metadata.externalProviders) {
                    this.bindProvider(provider, this.globalAppContainer);
                }
            } else {
                // If the module is not global, we want to bind it to its own container.
                for (const [token, provider] of module.metadata.externalProviders) {
                    this.bindProvider(provider, module.container);
                    module.parent?.container.bind(token).toDynamicValue(() => module.container.get(token));
                }
            }

            // Bind internal providers.
            for (const [_, provider] of module.metadata.internalProviders) {
                this.bindProvider(provider, module.container);
            }

            // Bind container to itself so it can be injected.
            module.container.bind(MODULE_CONTAINER).toConstantValue(module.container);

            // Bind controllers to the container.
            for (const classRef of module.metadata.controllers) {
                module.container.bind(classRef).toSelf().inSingletonScope();
            }

            this.loggerService.log(
                ['~lm~Bind', `~lb~${module.metadata.classRef.name}`],
                `~lw~Module dependencies binded ~lk~(${Date.now() - startTime}ms)`,
            );
        });
    }

    private bindProvider(provider: Exclude<Provider, Newable>, container: Container) {
        if ('useValue' in provider) {
            container.bind(provider.provide).toConstantValue(provider.useValue);
        } else if ('useFactory' in provider) {
            const binding = container.bind(provider.provide).toDynamicValue((ctx) => {
                const deps =
                    provider.inject?.map((dep) => {
                        if (isObject(dep) && 'token' in dep && 'optional' in dep) {
                            try {
                                return ctx.container.get(dep.token);
                            } catch (err) {
                                if (dep.optional) return undefined;
                                this.loggerService.error('An error occurred while trying to resolve a dependency.');
                                throw err;
                            }
                        }
                        return ctx.container.get(dep);
                    }) ?? [];
                return provider.useFactory(...deps);
            });
            if (provider.scope === 'transient') binding.inTransientScope();
            else if (provider.scope === 'request') binding.inRequestScope();
            else binding.inSingletonScope();
        } else if ('useClass' in provider) {
            const binding = container.bind(provider.provide).to(provider.useClass);
            if (provider.scope === 'transient') binding.inTransientScope();
            else if (provider.scope === 'request') binding.inRequestScope();
            else binding.inSingletonScope();
        } else if ('useExisting' in provider) {
            container.bind(provider.provide).toService(provider.useExisting);
        }
    }
}
