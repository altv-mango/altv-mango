import * as altClient from 'alt-client';
import * as Enums from '../enums';

export function set(statName: Enums.StatName, value: number | boolean | string) {
    altClient.setStat(statName, value);
}

export function get(statName: Enums.StatName) {
    return altClient.getStat(statName);
}

export function reset(statName: Enums.StatName) {
    altClient.resetStat(statName);
}
