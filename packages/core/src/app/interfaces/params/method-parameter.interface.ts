import type { BodyParameter } from './body-parameter.interface';
import type { CustomParameter } from './custom-parameter.interface';
import type { IndexParameter } from './index-parameter.interface';
import type { ParamParameter } from './param-parameter.interface';
import type { PlayerParameter } from './player-parameter.interface';
import type { RequestParameter } from './request-parameter.interface';
import type { ResponseParameter } from './response-parameter.interface';

export type MethodParameter =
    | BodyParameter
    | CustomParameter
    | ParamParameter
    | PlayerParameter
    | RequestParameter
    | ResponseParameter
    | IndexParameter;
