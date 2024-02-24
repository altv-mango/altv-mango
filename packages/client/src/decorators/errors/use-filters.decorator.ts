import { UseFilters as $UseFilters, type Newable } from '@altv-mango/core';
import type { ErrorFilter } from '../../interfaces';

export function UseFilters(...filters: (Newable<ErrorFilter> | ErrorFilter)[]) {
    return $UseFilters(...filters);
}
