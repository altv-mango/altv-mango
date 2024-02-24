import { UseFilters as $UseFilters, type Newable } from '@altv-mango/shared';
import type { ErrorFilter } from '../../interfaces';

export function UseFilters(...filters: (Newable<ErrorFilter> | ErrorFilter)[]) {
    return $UseFilters(...filters);
}
