import type { Newable } from '../../../types';
import type { EventMetadata } from '../event';
import type { PipelineMetadata } from '../pipeline';
import type { RPCMetadata } from '../rpc';
import type { TimerMetadata } from '../timers';

export interface ControllerMetadata extends PipelineMetadata {
    prefix: string;
    classRef: Newable;
    events: EventMetadata[];
    rpcs: RPCMetadata[];
    timers: TimerMetadata[];
}
