import { OnRequest as $OnRequest } from '@altv-mango/core';
import * as altServer from '@altv/server';

export function OnRequest<E extends keyof altServer.RPC.CustomServerRPC>(rpcName?: E): MethodDecorator;
export function OnRequest<E extends string>(rpcName?: Exclude<E, keyof altServer.RPC.CustomServerRPC>) {
    return $OnRequest(rpcName);
}
