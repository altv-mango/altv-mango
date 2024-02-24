import type { Guard as $Guard } from '@altv-mango/shared/app';
import type { MangoRequest } from './mango-request.interface';
import type { MangoResponse } from './mango-response.interface';

export interface Guard extends $Guard<MangoRequest, MangoResponse> {}
