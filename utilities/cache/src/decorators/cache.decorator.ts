import { SetMetadata } from '@altv-mango/server';
import { CACHE_METADATA } from '../cache.constants';
import type { CacheOptions } from '../interfaces';

export function Cache(options: CacheOptions) {
    return SetMetadata(CACHE_METADATA, options);
}
