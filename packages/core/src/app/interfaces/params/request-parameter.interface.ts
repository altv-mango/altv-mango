import type { ArgumentMetadata } from '../../../interfaces';
import type { MethodParamType } from '../../enums';

export interface RequestParameter extends ArgumentMetadata {
    type: MethodParamType.Request;
    method: string;
    index: number;
}
