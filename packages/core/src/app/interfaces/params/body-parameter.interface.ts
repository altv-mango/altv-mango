import type { ArgumentMetadata, Pipe } from '../../../interfaces';
import type { Newable } from '../../../types';
import type { MethodParamType } from '../../enums';

export interface BodyParameter extends ArgumentMetadata {
    type: MethodParamType.Body;
    method: string;
    index: number;
    pipes?: (Newable<Pipe> | Pipe)[];
    data?: string | undefined;
}
