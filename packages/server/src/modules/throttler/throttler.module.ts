import { Global, Module, type DynamicModule, type Provider, type FactoryProvider } from '@altv-mango/shared';
import { THROTTLER_OPTIONS, THROTTLER_STORAGE } from './throttler.constants';
import type { ThrottlerAsyncOptions, ThrottlerModuleOptions, ThrottlerOptionsFactory } from './interfaces';
import { ThrottlerStorageService } from './services/throttler-storage.service';

@Global()
@Module()
export class ThrottlerModule {
    public static forRoot(options: ThrottlerModuleOptions = []) {
        return {
            module: ThrottlerModule,
            providers: [
                {
                    provide: THROTTLER_OPTIONS,
                    useValue: options,
                },
                {
                    provide: THROTTLER_STORAGE,
                    useClass: ThrottlerStorageService,
                },
            ],
            exports: [THROTTLER_STORAGE, THROTTLER_OPTIONS],
        } as DynamicModule<ThrottlerModule>;
    }

    public static forRootAsync(options: ThrottlerAsyncOptions) {
        const providers = [
            ...this.createAsyncProviders(options),
            {
                provide: THROTTLER_STORAGE,
                useClass: ThrottlerStorageService,
            },
        ];
        return {
            module: ThrottlerModule,
            imports: options.imports ?? [],
            providers,
            exports: providers,
        } as DynamicModule<ThrottlerModule>;
    }

    private static createAsyncProviders(options: ThrottlerAsyncOptions) {
        if (options.useExisting || options.useFactory) {
            return [this.createAsyncOptionsProvider(options)];
        }
        return [
            this.createAsyncOptionsProvider(options),
            {
                provide: options.useClass,
                useClass: options.useClass,
            },
        ] as Provider[];
    }

    private static createAsyncOptionsProvider(options: ThrottlerAsyncOptions) {
        if (options.useFactory) {
            return {
                provide: THROTTLER_OPTIONS,
                useFactory: options.useFactory,
                inject: options.inject ?? [],
            } as FactoryProvider;
        }
        return {
            provide: THROTTLER_OPTIONS,
            useFactory: async (optionsFactory: ThrottlerOptionsFactory) => await optionsFactory.createThrottlerOptions(),
            inject: options.useClass ? [options.useClass] : options.useExisting ? [options.useExisting] : [],
        } as FactoryProvider;
    }
}
