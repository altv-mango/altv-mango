import type { ErrorFilter as $ErrorFilter } from '@altv-mango/shared/app';
import type { MangoRequest } from './mango-request.interface';
import type { MangoResponse } from './mango-response.interface';

export interface ErrorFilter<T = unknown> extends $ErrorFilter<T, MangoRequest, MangoResponse> {}
