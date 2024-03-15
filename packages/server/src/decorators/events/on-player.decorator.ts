import { createEventDecorator } from '@altv-mango/core';
import type { Events as SharedEvents } from '@altv/shared';

export function OnPlayer<E extends keyof SharedEvents.CustomPlayerToServerEvent>(eventName?: E): MethodDecorator;
export function OnPlayer<E extends string>(eventName?: Exclude<E, keyof SharedEvents.CustomPlayerToServerEvent>): MethodDecorator;
export function OnPlayer<E extends string>(eventName?: Exclude<E, keyof SharedEvents.CustomPlayerToServerEvent>) {
    return createEventDecorator('onPlayer', eventName);
}
