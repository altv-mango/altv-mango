import type { MethodParamType } from '../../app/enums';
import type { Newable } from '../../types';

export interface ArgumentMetadata {
    type: MethodParamType;
    metatype?: Newable | undefined;
    data?: unknown | undefined;
}
