import { OnRequest as $OnRequest } from '@altv-mango/core';
import * as altShared from '@altv/shared';

export function OnRequest<E extends keyof altShared.RPC.CustomServerRPC>(rpcName?: E): MethodDecorator;
export function OnRequest<E extends string>(rpcName?: Exclude<E, keyof altShared.RPC.CustomServerRPC>) {
    return $OnRequest(rpcName);
}
