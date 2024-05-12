export interface CacheStore {
    set<T>(key: string, value: T, options?: CacheStoreSetOptions<T> | number): Promise<void> | void;
    get<T>(key: string): Promise<T | undefined> | T | undefined;
    del?(key: string): void | Promise<void>;
}

export interface CacheStoreSetOptions<T> {
    ttl?: ((value: T) => number) | number;
}

export type CacheStoreFactory =
    | {
          create<T extends Record<string, unknown> = Record<string, unknown>>(args: T): CacheStore;
      }
    | (<T extends Record<string, unknown> = Record<string, unknown>>(args: T) => CacheStore | Promise<CacheStore>);

export interface CacheManagerOptions {
    store?: string | CacheStoreFactory | CacheStore;
    ttl?: number;
    refreshThreshold?: number;
    isCacheable?: (value: unknown) => boolean;
    onBackgroundRefreshError?: (error: unknown) => void;
}
