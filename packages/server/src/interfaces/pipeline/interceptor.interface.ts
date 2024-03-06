import type { Interceptor as $Interceptor } from '@altv-mango/core/app';
import type { MangoRequest } from './mango-request.interface';
import type { MangoResponse } from './mango-response.interface';

export interface Interceptor<THandlerResult = any> extends $Interceptor<THandlerResult, MangoRequest, MangoResponse> {}
