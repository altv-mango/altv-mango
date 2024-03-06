import type { ErrorFilter as $ErrorFilter } from '@altv-mango/core/app';
import type { MangoRequest } from './mango-request.interface';
import type { MangoResponse } from './mango-response.interface';

export interface ErrorFilter<T = any> extends $ErrorFilter<T, MangoRequest, MangoResponse> {}
