import type { Interceptor as $Interceptor } from '@altv-mango/shared/app';
import type { MangoRequest } from './mango-request.interface';
import type { MangoResponse } from './mango-response.interface';

export interface Interceptor<THandlerResult = unknown> extends $Interceptor<THandlerResult, MangoRequest, MangoResponse> {}
