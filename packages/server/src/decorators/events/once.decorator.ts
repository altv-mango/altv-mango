import { Once as $Once } from '@altv-mango/core';
import type { Events as ServerEvents } from '@altv/server';

export function Once<E extends keyof ServerEvents.CustomServerEvent>(eventName?: E): MethodDecorator;
export function Once<E extends string>(eventName?: Exclude<E, keyof ServerEvents.CustomServerEvent>): MethodDecorator;
export function Once<E extends string>(eventName?: Exclude<E, keyof ServerEvents.CustomServerEvent>) {
    return $Once(eventName);
}
