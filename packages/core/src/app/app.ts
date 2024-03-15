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
    @inject(ModuleTreeScanner) private readonly moduleTreeScanner: ModuleTreeScanner;
    @inject(ModuleDependencyBinder) private readonly moduleDependencyBinder: ModuleDependencyBinder;
    @inject(AppRuntime) private readonly appRuntime: AppRuntime;
    @inject(INTERNAL_APP_CONTAINER) private readonly internalAppContainer: Container;
    @inject(PLUGINS) private readonly plugins: Newable<MangoPlugin>[];
    @inject(LOGGER_SERVICE) private readonly loggerService: LoggerService;
    private moduleTree: Tree<Module>;
    private loaded = false;

    public async start<T>(rootModule: Newable<T>) {
        if (this.loaded) {
            this.loggerService.error('Error occurred while starting the app.');
            throw new Error(ErrorMessage.AppAlreadyLoaded);
        }
        this.loggerService.log('~lw~Starting app...');
        await this.runPluginMethods('beforeStart');

        this.loggerService.log('~lw~Scanning module tree...');
        await this.runPluginMethods('beforeScan');
        this.moduleTree = await this.moduleTreeScanner.scan(rootModule);
        await this.runPluginMethods('afterScan');

        this.loggerService.log('~lw~Binding module dependencies...');
        await this.runPluginMethods('beforeBind');
        await this.moduleDependencyBinder.bind(this.moduleTree);
        await this.runPluginMethods('afterBind');

        this.loggerService.log('~lw~Loading app...');
        await this.runPluginMethods('beforeLoad');
        await this.appRuntime.boot(this.moduleTree);
        this.loaded = true;
        await this.runPluginMethods('afterLoad');

        this.loggerService.log('~lw~App loaded');

        await this.runPluginMethods('afterStart');
    }

    public async stop() {
        if (!this.loaded) {
            this.loggerService.error('Error occurred while stopping the app.');
            throw new Error(ErrorMessage.AppNotLoaded);
        }
        await this.runPluginMethods('beforeStop');
        this.loggerService.log('~lw~Stopping app...');
        await this.appRuntime.shutdown(this.moduleTree);
        this.loaded = false;
        this.loggerService.log('~lw~App stopped');
        await this.runPluginMethods('afterStop');
    }

    private async runPluginMethods(method: keyof MangoPlugin) {
        await Promise.all(
            this.plugins.map(async (p) => {
                const plugin = this.internalAppContainer.get(p);
                if (!plugin[method]) return Promise.resolve();
                return Promise.resolve(plugin[method]!());
            }),
        );
    }
}
