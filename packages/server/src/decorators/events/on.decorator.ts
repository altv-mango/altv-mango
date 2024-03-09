import { On as $On } from '@altv-mango/core';
import * as altServer from '@altv/server';

export function On<E extends keyof altServer.Events.CustomServerEvent>(eventName?: E): MethodDecorator;
export function On<E extends string>(eventName?: Exclude<E, keyof altServer.Events.CustomServerEvent>) {
    return $On(eventName);
}
