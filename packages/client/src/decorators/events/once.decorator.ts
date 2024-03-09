import { Once as $Once } from '@altv-mango/core';
import * as altClient from '@altv/client';

export function Once<E extends keyof altClient.Events.CustomClientEvent>(eventName?: E): MethodDecorator;
export function Once<E extends string>(eventName?: Exclude<E, keyof altClient.Events.CustomClientEvent>): MethodDecorator;
export function Once<E extends string>(eventName?: Exclude<E, keyof altClient.Events.CustomClientEvent>) {
    return $Once(eventName);
}
