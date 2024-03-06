import type { MethodParameter } from '../params';
import type { PipelineMetadata } from '../pipeline/pipeline-metadata.interface';

export interface EventMetadata extends PipelineMetadata {
    type:
        | 'on'
        | 'once'
        | 'onPlayer'
        | 'oncePlayer'
        | 'onServer'
        | 'onceServer'
        | 'onWebView'
        | 'onceWebView'
        | 'onInternal'
        | 'onceInternal';
    name: string;
    method: string;
    params: MethodParameter[];
    webViewId?: string | number | undefined;
}
