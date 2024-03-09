import { Once as $Once } from '@altv-mango/core';
import * as altServer from '@altv/server';

export function Once<E extends keyof altServer.Events.CustomServerEvent>(eventName?: E): MethodDecorator;
export function Once<E extends string>(eventName?: Exclude<E, keyof altServer.Events.CustomServerEvent>) {
    return $Once(eventName);
}
