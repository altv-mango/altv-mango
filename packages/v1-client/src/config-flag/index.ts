import * as Enums from '../enums';
import * as altClient from 'alt-client';

export function get(flag: Enums.ConfigFlag) {
    return altClient.getConfigFlag(flag);
}

export function set(flag: Enums.ConfigFlag, state: boolean) {
    altClient.setConfigFlag(flag, state);
}

export function exists(flag: Enums.ConfigFlag) {
    return altClient.doesConfigFlagExist(flag);
}
