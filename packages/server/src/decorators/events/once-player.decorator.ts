import { createEventDecorator } from '@altv-mango/core';
import type { Events as SharedEvents } from '@altv/shared';

export function OncePlayer<E extends keyof SharedEvents.CustomPlayerToServerEvent>(eventName?: E): MethodDecorator;
export function OncePlayer<E extends string>(eventName?: Exclude<E, keyof SharedEvents.CustomPlayerToServerEvent>): MethodDecorator;
export function OncePlayer<E extends string>(eventName?: Exclude<E, keyof SharedEvents.CustomPlayerToServerEvent>) {
    return createEventDecorator('oncePlayer', eventName);
}
