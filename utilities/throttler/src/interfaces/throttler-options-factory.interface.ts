import type { ThrottlerModuleOptions } from './throttler-module-options.interface';

export interface ThrottlerOptionsFactory {
    createThrottlerOptions(): Promise<ThrottlerModuleOptions> | ThrottlerModuleOptions;
}
