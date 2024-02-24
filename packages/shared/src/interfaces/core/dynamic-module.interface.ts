import type { Newable } from '../../types';
import type { ModuleOptions } from './module-options.interface';

export interface DynamicModule<T = unknown> extends ModuleOptions {
    module: Newable<T>;
    global?: boolean;
}
