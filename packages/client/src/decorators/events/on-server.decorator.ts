import { createEventDecorator } from '@altv-mango/core';
import type { Events as SharedEvents } from '@altv/shared';

export function OnServer<E extends keyof SharedEvents.CustomServerToPlayerEvent>(eventName?: E): MethodDecorator;
export function OnServer<E extends string>(eventName?: Exclude<E, keyof SharedEvents.CustomServerToPlayerEvent>): MethodDecorator;
export function OnServer<E extends string>(eventName?: Exclude<E, keyof SharedEvents.CustomServerToPlayerEvent>) {
    return createEventDecorator('onServer', eventName);
}
