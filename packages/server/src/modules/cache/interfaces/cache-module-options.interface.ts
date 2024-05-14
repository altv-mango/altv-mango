import type { ClassProvider, ExistingProvider, InjectionToken, Provider } from '@altv-mango/core';
import type { MemoryConfig, MemoryStore, Store, StoreConfig, Stores } from 'cache-manager';

export type CacheModuleOptions<S extends Store = MemoryStore, T extends Record<string, unknown> = MemoryConfig> = StoreConfig & {
    store: Stores<S, T>;
} & T;

export interface CacheModuleAsyncOptions<T extends Record<string, unknown> = MemoryConfig> {
    useExisting?: ExistingProvider['useExisting'];
    useClass?: ClassProvider['useClass'];
    useFactory?: (...args: any[]) => Promise<T> | T;
    inject?: InjectionToken[];
    providers?: Provider[];
    global?: boolean;
}
