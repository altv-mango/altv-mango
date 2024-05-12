import { CACHE_MANAGER, CACHE_MANAGER_OPTIONS } from './cache.constants';
import { Module, isFunction, isObject, isString, type DynamicModule, type Provider } from '@altv-mango/core';
import type { CacheModuleOptions } from './interfaces';
import cacheManager, { type Cache, type FactoryStore, type MemoryConfig, type MemoryStore, type Store, type Stores } from 'cache-manager';

@Module()
export class CacheModule {
    public static register<S extends Store = MemoryStore, T extends Record<string, unknown> = MemoryConfig>(
        options: CacheModuleOptions<S, T>,
    ): DynamicModule {
        return {
            module: CacheModule,
            // global: options.isGlobal,
            providers: [createCacheManager(), { useValue: options, provide: CACHE_MANAGER_OPTIONS }],
            exports: [CACHE_MANAGER],
        };
    }

    public static registerAsync<S extends Store = MemoryStore, T extends Record<string, unknown> = MemoryConfig>(
        options: CacheModuleOptions<S, T>,
    ): DynamicModule {
        return {
            module: CacheModule,
            // global: options.isGlobal,
            providers: [createCacheManager(), { useValue: options, provide: CACHE_MANAGER_OPTIONS }],
            exports: [CACHE_MANAGER],
        };
    }
}

function createCacheManager(): Provider {
    return {
        provide: CACHE_MANAGER,
        useFactory: async (options: CacheModuleOptions) => {
            const defaultCacheOptions = {
                ttl: 5,
                max: 100,
                store: 'memory',
            };
            const cachingFactory = async (
                store: CacheModuleOptions['store'],
                options: Omit<CacheModuleOptions, 'store'>,
            ): Promise<Cache> => {
                let cache: Stores<MemoryStore, MemoryConfig> = 'memory';
                defaultCacheOptions.ttl *= 1000;
                if (isObject(store)) {
                    cache = store as MemoryStore;
                } else if (isString(store)) {
                    cache = store;
                } else if (isFunction(store)) {
                    cache = store as FactoryStore<MemoryStore, MemoryConfig>;
                }
                return cacheManager.caching(cache as any, {
                    ...defaultCacheOptions,
                    ...options,
                });
            };

            return Array.isArray(options)
                ? cacheManager.multiCaching(await Promise.all(options.map((option) => cachingFactory(option.store, option))))
                : cachingFactory(options.store, options);
        },
        inject: [CACHE_MANAGER_OPTIONS],
    };
}
