import { createEventDecorator } from '@altv-mango/core';
import * as altShared from '@altv/shared';

export function OnServer<E extends keyof altShared.Events.CustomServerToPlayerEvent>(eventName?: E): MethodDecorator;
export function OnServer<E extends string>(eventName?: Exclude<E, keyof altShared.Events.CustomServerToPlayerEvent>): MethodDecorator;
export function OnServer<E extends string>(eventName?: Exclude<E, keyof altShared.Events.CustomServerToPlayerEvent>) {
    return createEventDecorator('onServer', eventName);
}
