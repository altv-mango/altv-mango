import type { InjectableScope } from '../../enums';
import type { InjectionToken, Newable } from '../../types';
import type { OptionalFactoryDependency } from './optional-factory-dependency.interface';

export type Provider<T = unknown> =
    | Newable<T>
    | ClassProvider<T>
    | ValueProvider<T>
    | FactoryProvider<T>
    | ExistingProvider;

export interface ClassProvider<T = unknown> {
    provide: InjectionToken;
    useClass: Newable<T>;
    scope?: `${InjectableScope}`;
}

export interface ValueProvider<T = unknown> {
    provide: InjectionToken;
    useValue: T;
}

export interface FactoryProvider<T = unknown> {
    provide: InjectionToken;
    useFactory: (...args: unknown[]) => T | Promise<T>;
    inject?: (InjectionToken | OptionalFactoryDependency)[];
    scope?: `${InjectableScope}`;
}

export interface ExistingProvider {
    provide: InjectionToken;
    useExisting: InjectionToken;
}
