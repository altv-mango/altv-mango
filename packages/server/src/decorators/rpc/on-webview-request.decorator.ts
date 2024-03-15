import { OnWebViewRequest as $OnWebViewRequest } from '@altv-mango/core';
import type { RPC as SharedRPC } from '@altv/shared';

export function OnWebViewRequest<E extends keyof SharedRPC.CustomWebViewToServerRPC>(id: string | number, rpcName?: E): MethodDecorator;
export function OnWebViewRequest<E extends string>(
    id: string | number,
    rpcName?: Exclude<E, keyof SharedRPC.CustomWebViewToServerRPC>,
): MethodDecorator;
export function OnWebViewRequest<E extends string>(id: string | number, rpcName?: Exclude<E, keyof SharedRPC.CustomWebViewToServerRPC>) {
    return $OnWebViewRequest(id, rpcName);
}
