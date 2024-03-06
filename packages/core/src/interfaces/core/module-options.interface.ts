import type { InjectionToken, Newable } from '../../types';
import type { DynamicModule } from './dynamic-module.interface';
import type { Provider } from './provider.interface';

export interface ModuleOptions {
    imports?: (Newable | DynamicModule | Promise<DynamicModule>)[];
    controllers?: Newable[];
    providers?: Provider[];
    exports?: (InjectionToken | Provider)[];
}
