import { OnWebView as $OnWebView } from '@altv-mango/core';
import * as altShared from '@altv/shared';

export function OnWebView<E extends keyof altShared.Events.CustomWebViewToServerEvent>(id: string | number, eventName?: E): MethodDecorator;
export function OnWebView<E extends string>(
    id: string | number,
    eventName?: Exclude<E, keyof altShared.Events.CustomWebViewToServerEvent>,
): MethodDecorator;
export function OnWebView<E extends string>(
    id: string | number,
    eventName?: Exclude<E, keyof altShared.Events.CustomWebViewToServerEvent>,
) {
    return $OnWebView(id, eventName);
}
