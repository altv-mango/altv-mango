import { OnceWebView as $OnceWebView } from '@altv-mango/core';
import type { Events as SharedEvents } from '@altv/shared';

export function OnceWebView<E extends keyof SharedEvents.CustomWebViewToServerEvent>(id: string | number, eventName?: E): MethodDecorator;
export function OnceWebView<E extends string>(
    id: string | number,
    eventName?: Exclude<E, keyof SharedEvents.CustomWebViewToServerEvent>,
): MethodDecorator;
export function OnceWebView<E extends string>(id: string | number, eventName?: Exclude<E, keyof SharedEvents.CustomWebViewToServerEvent>) {
    return $OnceWebView(id, eventName);
}
