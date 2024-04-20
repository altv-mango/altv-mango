import * as altClient from 'alt-client';

export function add(nameOrHash: number | string, value: string) {
    altClient.addGxtText(nameOrHash, value);
}

export function remove(nameOrHash: number | string) {
    if (typeof nameOrHash === 'number') throw new Error('Number is not supported. Please use string.');
    altClient.removeGxtText(nameOrHash);
}

export function get(nameOrHash: number | string) {
    return altClient.getGxtText(nameOrHash);
}
