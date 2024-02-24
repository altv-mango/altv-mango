import type { MethodParamType } from '../../enums';
import type { Newable } from '../../../types';
import type { ArgumentMetadata, Pipe } from '../../../interfaces';

export interface ParamParameter extends ArgumentMetadata {
    type: MethodParamType.Param;
    method: string;
    index: number;
    pipes?: (Newable<Pipe> | Pipe)[];
    // metatype?: Newable;
    data: string;
}
