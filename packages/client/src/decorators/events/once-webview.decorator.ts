import { OnceWebView as $OnceWebView } from '@altv-mango/core';
import type { Events as SharedEvents } from '@altv/shared';

export function OnceWebView<E extends keyof SharedEvents.WebViewToClientEvent>(id: string | number, eventName?: E): MethodDecorator;
export function OnceWebView<E extends string>(
    id: string | number,
    eventName?: Exclude<E, keyof SharedEvents.WebViewToClientEvent>,
): MethodDecorator;
export function OnceWebView<E extends string>(id: string | number, eventName?: Exclude<E, keyof SharedEvents.WebViewToClientEvent>) {
    return $OnceWebView(id, eventName);
}
