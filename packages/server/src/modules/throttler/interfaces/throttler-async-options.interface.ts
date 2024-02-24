import type { ThrottlerModuleOptions } from './throttler-module-options.interface';
import type { ThrottlerOptionsFactory } from './throttler-options-factory.interface';
import type { InjectionToken, ModuleOptions, Newable } from '@altv-mango/core';

export interface ThrottlerAsyncOptions extends Pick<ModuleOptions, 'imports'> {
    useExisting?: Newable<ThrottlerOptionsFactory>;
    useClass?: Newable<ThrottlerOptionsFactory>;
    useFactory?: (...args: unknown[]) => Promise<ThrottlerModuleOptions> | ThrottlerModuleOptions;
    inject?: InjectionToken[];
}
