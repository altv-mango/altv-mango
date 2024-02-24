import type { MethodParamType } from '../../enums';
import type { Newable } from '../../../types';
import type { ArgumentMetadata, Pipe } from '../../../interfaces';

export interface PlayerParameter extends ArgumentMetadata {
    type: MethodParamType.Player;
    method: string;
    index: number;
    pipes?: (Newable<Pipe> | Pipe)[];
    // metatype?: Newable;
    data?: string | undefined;
}
