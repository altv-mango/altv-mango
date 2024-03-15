import { OnWebView as $OnWebView } from '@altv-mango/core';
import type { Events as SharedEvents } from '@altv/shared';

export function OnWebView<E extends keyof SharedEvents.CustomClientToWebViewEvent>(id: string | number, eventName?: E): MethodDecorator;
export function OnWebView<E extends string>(
    id: string | number,
    eventName?: Exclude<E, keyof SharedEvents.CustomClientToWebViewEvent>,
): MethodDecorator;
export function OnWebView<E extends string>(id: string | number, eventName?: Exclude<E, keyof SharedEvents.CustomClientToWebViewEvent>) {
    return $OnWebView(id, eventName);
}
