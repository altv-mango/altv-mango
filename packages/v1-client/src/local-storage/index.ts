import * as altClient from 'alt-client';

export function get<K extends keyof import('@altv/client').LocalStorage.LocalStorage>(
    key: K,
): import('@altv/client').LocalStorage.LocalStorage[K];
export function get<K extends string>(key: Exclude<K, keyof import('@altv/client').LocalStorage.LocalStorage>): unknown {
    return altClient.LocalStorage.get(key);
}

export function set<K extends keyof import('@altv/client').LocalStorage.LocalStorage>(
    key: K,
    value: import('@altv/client').LocalStorage.LocalStorage[K],
): void;
export function set<K extends string>(key: Exclude<K, keyof import('@altv/client').LocalStorage.LocalStorage>, value: unknown): void {
    altClient.LocalStorage.set(key, value);
}

export function has<K extends keyof import('@altv/client').LocalStorage.LocalStorage>(key: K): boolean;
export function has<K extends string>(key: Exclude<K, keyof import('@altv/client').LocalStorage.LocalStorage>) {
    return altClient.LocalStorage.has(key);
}

export function remove<K extends keyof import('@altv/client').LocalStorage.LocalStorage>(key: K): void;
export function remove<K extends string>(key: Exclude<K, keyof import('@altv/client').LocalStorage.LocalStorage>) {
    altClient.LocalStorage.delete(key);
}

export function clear() {
    altClient.LocalStorage.clear();
}

export function save() {
    altClient.LocalStorage.save();
}
