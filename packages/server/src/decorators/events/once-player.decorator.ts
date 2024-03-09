import { createEventDecorator } from '@altv-mango/core';
import * as altShared from '@altv/shared';

export function OncePlayer<E extends keyof altShared.Events.CustomPlayerToServerEvent>(eventName?: E): MethodDecorator;
export function OncePlayer<E extends string>(eventName?: Exclude<E, keyof altShared.Events.CustomPlayerToServerEvent>): MethodDecorator;
export function OncePlayer<E extends string>(eventName?: Exclude<E, keyof altShared.Events.CustomPlayerToServerEvent>) {
    return createEventDecorator('oncePlayer', eventName);
}
