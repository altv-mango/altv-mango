import { On as $On } from '@altv-mango/core';
import type { Events as ClientEvents } from '@altv/client';

export function On<E extends keyof ClientEvents.CustomClientEvent>(eventName?: E): MethodDecorator;
export function On<E extends string>(eventName?: Exclude<E, keyof ClientEvents.CustomClientEvent>): MethodDecorator;
export function On<E extends string>(eventName?: Exclude<E, keyof ClientEvents.CustomClientEvent>) {
    return $On(eventName);
}
