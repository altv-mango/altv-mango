import { Container, inject, injectable } from 'inversify';
import { ModuleDependencyBinder, ModuleTreeScanner } from './module-tree';
import { Module } from './module/module';
import type { Newable } from '../types';
import { EXTERNAL_PLUGINS, INTERNAL_APP_CONTAINER } from './constants';
import { AppRuntime } from './module-tree';
import type { MangoPlugin } from './interfaces/core/mango-plugin.interface';
import { InternalLoggerService } from './services';
import { ErrorMessage } from '../enums';
import chalk from 'chalk';
import type { Tree } from './utils';

@injectable()
export class App {
    /**
     * @internal
     */
    @inject(ModuleTreeScanner) private readonly moduleTreeScanner: ModuleTreeScanner;
    /**
     * @internal
     */
    @inject(ModuleDependencyBinder) private readonly moduleDependencyBinder: ModuleDependencyBinder;
    /**
     * @internal
     */
    @inject(AppRuntime) private readonly appRuntime: AppRuntime;
    /**
     * @internal
     */
    @inject(INTERNAL_APP_CONTAINER) private readonly internalAppContainer: Container;
    /**
     * @internal
     */
    @inject(EXTERNAL_PLUGINS) private readonly plugins: Newable<MangoPlugin>[];
    /**
     * @internal
     */
    @inject(InternalLoggerService) private readonly loggerService: InternalLoggerService;
    /**
     * @internal
     */
    private moduleTree: Tree<Module>;
    /**
     * @internal
     */
    private loaded = false;

    public async start<T>(rootModule: Newable<T>) {
        if (this.loaded) {
            this.loggerService.error('Error occurred while starting the app.');
            throw new Error(ErrorMessage.AppAlreadyLoaded);
        }

        this.runPluginMethods('beforeStart');
        this.loggerService.log([chalk.magentaBright('Start')], 'Starting app...');

        this.loggerService.log([chalk.magentaBright('Start')], 'Scanning module tree...');
        this.moduleTree = await this.moduleTreeScanner.scan(rootModule);
        this.loggerService.log([chalk.magentaBright('Start')], 'Binding module dependencies...');
        await this.moduleDependencyBinder.bind(this.moduleTree);
        this.loggerService.log([chalk.magentaBright('Start')], 'Loading app...');
        await this.appRuntime.boot(this.moduleTree);
        this.loaded = true;

        this.loggerService.log([chalk.magentaBright('Start')], 'App loaded');

        this.runPluginMethods('afterStart');
    }

    public async stop() {
        if (!this.loaded) {
            this.loggerService.error('Error occurred while stopping the app.');
            throw new Error(ErrorMessage.AppNotLoaded);
        }
        this.runPluginMethods('beforeStop');
        this.loggerService.log([chalk.magentaBright('Start')], 'Stopping app...');
        await this.appRuntime.shutdown(this.moduleTree);
        this.loaded = false;
        this.loggerService.log([chalk.magentaBright('Start')], 'App stopped');
        this.runPluginMethods('afterStop');
    }

    /**
     * @internal
     */
    private runPluginMethods(method: keyof MangoPlugin) {
        this.plugins.forEach(async (p) => {
            const plugin = this.internalAppContainer.get(p);
            if (!plugin[method]) return;
            await plugin[method]!();
        });
    }
}
