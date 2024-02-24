import type { ErrorFilter } from '../../interfaces';
import { UseFilters as $UseFilters, type Newable } from '@altv-mango/shared';

export function UseFilters(...filters: (Newable<ErrorFilter> | ErrorFilter)[]) {
    return $UseFilters(...filters);
}
