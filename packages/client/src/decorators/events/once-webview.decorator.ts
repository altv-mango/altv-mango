import { OnceWebView as $OnceWebView } from '@altv-mango/core';
import * as altShared from '@altv/shared';

export function OnceWebView<E extends keyof altShared.Events.WebViewToClientEvent>(id: string | number, eventName?: E): MethodDecorator;
export function OnceWebView<E extends string>(id: string | number, eventName?: Exclude<E, keyof altShared.Events.WebViewToClientEvent>) {
    return $OnceWebView(id, eventName);
}
