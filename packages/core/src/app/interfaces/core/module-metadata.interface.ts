import type { DynamicModule, Provider } from '../../../interfaces';
import type { InjectionToken, Newable } from '../../../types';
import type { PipelineMetadata } from '../pipeline/pipeline-metadata.interface';

export interface ModuleMetadata extends PipelineMetadata {
    imports: (Newable | DynamicModule | Promise<DynamicModule>)[];
    controllers: Newable[];
    classRef: Newable;
    internalProviders: Map<InjectionToken, Exclude<Provider, Newable>>;
    externalProviders: Map<InjectionToken, Exclude<Provider, Newable>>;
    global: boolean;
}
