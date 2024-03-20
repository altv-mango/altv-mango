import { OnceWebView as $OnceWebView } from '@altv-mango/core';
import type { Events as SharedEvents } from '@altv/shared';

export function OnceWebView<E extends keyof SharedEvents.CustomWebViewToClientEvent>(id: string | number, eventName?: E): MethodDecorator;
export function OnceWebView<E extends string>(
    id: string | number,
    eventName?: Exclude<E, keyof SharedEvents.CustomWebViewToClientEvent>,
): MethodDecorator;
export function OnceWebView<E extends string>(id: string | number, eventName?: Exclude<E, keyof SharedEvents.CustomWebViewToClientEvent>) {
    return $OnceWebView(id, eventName);
}
