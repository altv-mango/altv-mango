import type { Resolvable, ThrottlerLimitDetail, ThrottlerModuleOptions, ThrottlerOptions } from './interfaces';
import { THROTTLER_LIMIT, THROTTLER_OPTIONS, THROTTLER_SKIP, THROTTLER_STORAGE, THROTTLER_TTL } from './throttler.constants';
import { createHash } from 'crypto';
import type { ThrottlerStorageService } from './services';
import {
    isFunction,
    TooManyRequests,
    type OnModuleInit,
    type ReflectorService,
    Injectable,
    Inject,
    REFLECTOR_SERVICE,
    type Guard,
    type ExecutionContext,
} from '@altv-mango/server';
import { ErrorMessage } from '@altv-mango/core';

@Injectable()
export class ThrottlerGuard implements Guard, OnModuleInit {
    @Inject(THROTTLER_OPTIONS) protected readonly options: ThrottlerModuleOptions;
    @Inject(THROTTLER_STORAGE) protected readonly storageService: ThrottlerStorageService;
    @Inject(REFLECTOR_SERVICE) protected readonly reflector: ReflectorService;
    protected throttlers: Array<ThrottlerOptions>;
    protected commonOptions: Pick<ThrottlerOptions, 'skipIf'>;

    public async onModuleInit() {
        this.throttlers = (Array.isArray(this.options) ? this.options : this.options.throttlers)
            .sort((first, second) => {
                if (isFunction(first.ttl)) {
                    return 1;
                }
                if (isFunction(second.ttl)) {
                    return 0;
                }
                return first.ttl - second.ttl;
            })
            .map((opt) => ({ ...opt, name: opt.name ?? 'default' }));
        if (Array.isArray(this.options)) {
            this.commonOptions = {};
        } else {
            this.commonOptions = {
                skipIf: this.options.skipIf!,
            };
        }
    }

    public async canActivate(context: ExecutionContext) {
        const continues: boolean[] = [];
        for (const namedThrottler of this.throttlers) {
            // Return early if the current route should be skipped.
            const skip = this.reflector.getAllAndOverride<boolean>(THROTTLER_SKIP + namedThrottler.name, [
                context.handler,
                context.classRef,
            ]);
            const skipIf = namedThrottler.skipIf || this.commonOptions.skipIf;
            if (skip || skipIf?.(context)) {
                continues.push(true);
                continue;
            }

            // Return early when we have no limit or ttl data.
            const routeOrClassLimit = this.reflector.getAllAndOverride<Resolvable<number>>(THROTTLER_LIMIT + namedThrottler.name, [
                context.handler,
                context.classRef,
            ]);
            const routeOrClassTtl = this.reflector.getAllAndOverride<Resolvable<number>>(THROTTLER_TTL + namedThrottler.name, [
                context.handler,
                context.classRef,
            ]);

            // Check if specific limits are set at class or route level, otherwise use global options.
            const limit = await this.resolveValue(context, routeOrClassLimit || namedThrottler.limit);
            const ttl = await this.resolveValue(context, routeOrClassTtl || namedThrottler.ttl);
            continues.push(await this.handleRequest(context, limit, ttl, namedThrottler));
        }
        return continues.every((cont) => cont);
    }

    protected async handleRequest(context: ExecutionContext, limit: number, ttl: number, throttler: ThrottlerOptions) {
        const player = context.request.player;
        const key = this.generateKey(context, throttler.name!);
        const { totalHits, timeToExpire } = await this.storageService.increment(player, key, ttl);

        if (totalHits > limit) {
            await this.throwThrottlingException(context, {
                limit,
                ttl,
                key,
                player,
                totalHits,
                timeToExpire,
            });
        }

        return true;
    }

    protected generateKey(context: ExecutionContext, name: string) {
        const prefix = `${context.classRef.name}-${context.handler.name}-${name}`;
        return createHash('md5').update(prefix).digest('hex').toString();
    }

    protected async throwThrottlingException(context: ExecutionContext, _throttlerLimitDetail: ThrottlerLimitDetail) {
        throw new TooManyRequests(await this.getErrorMessage(context));
    }

    protected async getErrorMessage(_context: ExecutionContext) {
        if (!Array.isArray(this.options)) {
            return this.options.errorMessage ?? ErrorMessage.TooManyRequests;
        }
        return ErrorMessage.TooManyRequests;
    }

    private async resolveValue<T extends number | string | boolean>(context: ExecutionContext, resolvableValue: Resolvable<T>) {
        return isFunction(resolvableValue) ? resolvableValue(context) : resolvableValue;
    }
}
