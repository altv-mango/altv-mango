import { CACHE_MANAGER, CACHE_METADATA } from '../cache.constants';
import {
    Inject,
    Injectable,
    LOGGER_SERVICE,
    REFLECTOR_SERVICE,
    isNil,
    type CallHandler,
    type LoggerService,
    type ReflectorService,
} from '@altv-mango/core';
import type { ExecutionContext, Interceptor } from '../../../interfaces';
import type { CacheOptions } from '../interfaces';
import type { Cache } from 'cache-manager';

@Injectable()
export class CacheInterceptor implements Interceptor {
    @Inject(LOGGER_SERVICE) private readonly loggerService: LoggerService;
    @Inject(CACHE_MANAGER) protected readonly cacheManager: Cache;
    @Inject(REFLECTOR_SERVICE) protected readonly reflector: ReflectorService;

    public async intercept(context: ExecutionContext, next: CallHandler) {
        const cacheOptions =
            this.reflector.get<CacheOptions>(CACHE_METADATA, context.handler) ??
            this.reflector.get<CacheOptions>(CACHE_METADATA, context.classRef) ??
            null;

        if (isNil(cacheOptions)) {
            next.handle();
            return;
        }

        const key = cacheOptions.key ?? `${context.classRef.name}.${cacheOptions.key}`;

        try {
            const value = await this.cacheManager.get(key);
            if (!isNil(value)) {
                return next.return(value);
            }

            const cacheValue = next.handle();

            try {
                await this.cacheManager.set(key, cacheValue, cacheOptions.ttl);
            } catch (err) {
                this.loggerService.error('An error occurred while trying to cache the response.');
            }
        } catch {
            next.handle();
        }
    }
}
