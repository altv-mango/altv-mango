import { On as $On } from '@altv-mango/core';
import type { Events as ServerEvents } from '@altv/server';

export function On<E extends keyof ServerEvents.CustomServerEvent>(eventName?: E): MethodDecorator;
export function On<E extends string>(eventName?: Exclude<E, keyof ServerEvents.CustomServerEvent>): MethodDecorator;
export function On<E extends string>(eventName?: Exclude<E, keyof ServerEvents.CustomServerEvent>) {
    return $On(eventName);
}
