import { createEventDecorator } from '@altv-mango/core';
import type { Events as SharedEvents } from '@altv/shared';

export function OnceServer<E extends keyof SharedEvents.CustomServerToPlayerEvent>(eventName?: E): MethodDecorator;
export function OnceServer<E extends string>(eventName?: Exclude<E, keyof SharedEvents.CustomServerToPlayerEvent>): MethodDecorator;
export function OnceServer<E extends string>(eventName?: Exclude<E, keyof SharedEvents.CustomServerToPlayerEvent>) {
    return createEventDecorator('onceServer', eventName);
}
