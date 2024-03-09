import { Container, inject, injectable } from 'inversify';
import { ModuleDependencyBinder, ModuleTreeScanner } from './module-tree';
import { Module } from './module/module';
import type { Newable } from '../types';
import { INTERNAL_APP_CONTAINER, PLUGINS } from './constants';
import { AppRuntime } from './module-tree';
import type { MangoPlugin } from './interfaces/core/mango-plugin.interface';
import { ErrorMessage } from '../enums';
import type { Tree } from './utils';
import { type LoggerService } from '../interfaces';
import { LOGGER_SERVICE } from '../constants';

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
    @inject(PLUGINS) private readonly plugins: Newable<MangoPlugin>[];
    /**
     * @internal
     */
    @inject(LOGGER_SERVICE) private readonly loggerService: LoggerService;
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
        this.loggerService.log('~lw~Starting app...');
        this.runPluginMethods('beforeStart');

        this.loggerService.log('~lw~Scanning module tree...');
        this.runPluginMethods('beforeScan');
        this.moduleTree = await this.moduleTreeScanner.scan(rootModule);
        this.runPluginMethods('afterScan');

        this.loggerService.log('~lw~Binding module dependencies...');
        this.runPluginMethods('beforeBind');
        await this.moduleDependencyBinder.bind(this.moduleTree);
        this.runPluginMethods('afterBind');

        this.loggerService.log('~lw~Loading app...');
        this.runPluginMethods('beforeLoad');
        await this.appRuntime.boot(this.moduleTree);
        this.loaded = true;
        this.runPluginMethods('afterLoad');

        this.loggerService.log('~lw~App loaded');

        this.runPluginMethods('afterStart');
    }

    public async stop() {
        if (!this.loaded) {
            this.loggerService.error('Error occurred while stopping the app.');
            throw new Error(ErrorMessage.AppNotLoaded);
        }
        this.runPluginMethods('beforeStop');
        this.loggerService.log('~lw~Stopping app...');
        await this.appRuntime.shutdown(this.moduleTree);
        this.loaded = false;
        this.loggerService.log('~lw~App stopped');
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
