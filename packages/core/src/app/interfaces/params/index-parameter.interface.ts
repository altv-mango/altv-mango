import type { ArgumentMetadata, Pipe } from '../../../interfaces';
import type { Newable } from '../../../types';
import type { MethodParamType } from '../../enums';

export interface IndexParameter extends ArgumentMetadata {
    type: MethodParamType.Index;
    method: string;
    index: number;
    pipes?: (Newable<Pipe> | Pipe)[];
    // metatype?: Newable;
    data: number;
}
