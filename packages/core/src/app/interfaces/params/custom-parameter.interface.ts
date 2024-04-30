import type { MethodParamType } from '../../enums';
import type { Newable } from '../../../types';
import type { ExecutionContextBase } from '../../pipeline';
import type { ArgumentMetadata, Pipe } from '../../../interfaces';

export interface CustomParameter extends ArgumentMetadata {
    type: MethodParamType.Custom;
    method: string;
    index: number;
    pipes?: (Newable<Pipe> | Pipe)[];
    factory: (data: unknown, context: ExecutionContextBase) => unknown;
    data?: unknown;
}
