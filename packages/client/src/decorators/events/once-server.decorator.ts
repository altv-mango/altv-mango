import { createEventDecorator } from '@altv-mango/core';
import * as altShared from '@altv/shared';

export function OnceServer<E extends keyof altShared.Events.CustomServerToPlayerEvent>(eventName?: E): MethodDecorator;
export function OnceServer<E extends string>(eventName?: Exclude<E, keyof altShared.Events.CustomServerToPlayerEvent>) {
    return createEventDecorator('onceServer', eventName);
}
