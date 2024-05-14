import type { ClassProvider, ExistingProvider, Provider } from '@altv-mango/server';
import type { CacheManagerOptions } from './cache-manager.interface';

export type CacheOptions<StoreConfig extends Record<any, any> = Record<string, any>> = CacheManagerOptions & StoreConfig;

export type CacheModuleOptions<StoreConfig extends Record<any, any> = Record<string, any>> = CacheOptions<StoreConfig> & {
    isGlobal?: boolean;
};

export interface CacheOptionsFactory<StoreConfig extends Record<any, any> = Record<string, any>> {
    createCacheOptions(): Promise<CacheOptions<StoreConfig>> | CacheOptions<StoreConfig>;
}

export interface CacheModuleAsyncOptions<StoreConfig extends Record<any, any> = Record<string, any>> {
    useExisting?: ExistingProvider['useExisting'];
    useClass?: ClassProvider['useClass'];
    useFactory?: (...args: any[]) => Promise<CacheOptions<StoreConfig>> | CacheOptions<StoreConfig>;
    inject?: any[];
    extraProviders?: Provider[];
    isGlobal?: boolean;
}
