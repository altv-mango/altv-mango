import { Once as $Once } from '@altv-mango/core';
import type { Events as ClientEvents } from '@altv/client';

export function Once<E extends keyof ClientEvents.CustomClientEvent>(eventName?: E): MethodDecorator;
export function Once<E extends string>(eventName?: Exclude<E, keyof ClientEvents.CustomClientEvent>): MethodDecorator;
export function Once<E extends string>(eventName?: Exclude<E, keyof ClientEvents.CustomClientEvent>) {
    return $Once(eventName);
}
