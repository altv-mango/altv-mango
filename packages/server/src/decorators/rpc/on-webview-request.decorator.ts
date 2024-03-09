import { OnWebViewRequest as $OnWebViewRequest } from '@altv-mango/core';
import * as altShared from '@altv/shared';

export function OnWebViewRequest<E extends keyof altShared.RPC.CustomWebViewToServerRPC>(id: string | number, rpcName?: E): MethodDecorator;
export function OnWebViewRequest<E extends string>(
    id: string | number,
    rpcName?: Exclude<E, keyof altShared.RPC.CustomWebViewToServerRPC>,
) {
    return $OnWebViewRequest(id, rpcName);
}
