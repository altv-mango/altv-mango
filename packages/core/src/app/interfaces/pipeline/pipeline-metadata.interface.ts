import type { Pipe } from '../../../interfaces';
import type { Newable } from '../../../types';
import type { ErrorFilter } from './exception-filter.interface';
import type { Guard } from './guard.interface';
import type { Interceptor } from './interceptor.interface';

export interface PipelineMetadata {
    guards: (Newable<Guard> | Guard)[];
    interceptors: (Newable<Interceptor> | Interceptor)[];
    pipes: (Newable<Pipe> | Pipe)[];
    errorFilters: (Newable<ErrorFilter> | ErrorFilter)[];
}
