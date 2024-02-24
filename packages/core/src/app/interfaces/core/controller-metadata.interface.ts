import type { Newable } from '../../../types';
import type { EventMetadata } from '../event/event-metadata.interface';
import type { PipelineMetadata } from '../pipeline/pipeline-metadata.interface';
import type { RPCMetadata } from '../rpc/rpc-metadata.interface';

export interface ControllerMetadata extends PipelineMetadata {
    prefix: string;
    classRef: Newable;
    events: EventMetadata[];
    rpcs: RPCMetadata[];
}
