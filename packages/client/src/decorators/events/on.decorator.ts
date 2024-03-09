import { On as $On } from '@altv-mango/core';
import * as altClient from '@altv/client';

export function On<E extends keyof altClient.Events.CustomClientEvent>(eventName?: E): MethodDecorator;
export function On<E extends string>(eventName?: Exclude<E, keyof altClient.Events.CustomClientEvent>) {
    return $On(eventName);
}
