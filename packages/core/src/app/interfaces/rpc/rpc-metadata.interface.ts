import type { MethodParameter } from '../params';
import type { PipelineMetadata } from '../pipeline/pipeline-metadata.interface';

export interface RPCMetadata extends PipelineMetadata {
    type: 'onRequest' | 'onServerRequest' | 'onPlayerRequest' | 'onWebViewRequest';
    name: string;
    method: string;
    params: MethodParameter[];
    webViewId?: string | number;
}
