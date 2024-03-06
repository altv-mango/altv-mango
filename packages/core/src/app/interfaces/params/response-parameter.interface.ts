import type { ArgumentMetadata } from '../../../interfaces';
import type { MethodParamType } from '../../enums';

export interface ResponseParameter extends ArgumentMetadata {
    type: MethodParamType.Response;
    method: string;
    index: number;
}
