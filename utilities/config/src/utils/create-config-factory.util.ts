import { generateRandomId, type FactoryProvider } from '@altv-mango/server';
import type { ConfigFactory } from '../interfaces';
import { getConfigToken } from './get-config-token.util';
import type { ConfigFactoryKeyHost } from './register-as.util';

/**
 * @publicApi
 */
export function createConfigProvider(factory: ConfigFactory & ConfigFactoryKeyHost): FactoryProvider {
    return {
        provide: factory.KEY || getConfigToken(generateRandomId()),
        useFactory: factory,
        inject: [],
    };
}
