import type { Guard } from '../../interfaces';
import { UseGuards as $UseGuards, type Newable } from '@altv-mango/core';

export function UseGuards(...guards: (Newable<Guard> | Guard)[]) {
    return $UseGuards(...guards);
}
