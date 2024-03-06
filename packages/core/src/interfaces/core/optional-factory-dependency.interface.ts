import type { InjectionToken } from '../../types';

export type OptionalFactoryDependency = {
    token: InjectionToken;
    optional: boolean;
};
