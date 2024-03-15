import { OnRequest as $OnRequest } from '@altv-mango/core';
import type { RPC as ServerRPC } from '@altv/server';

export function OnRequest<E extends keyof ServerRPC.CustomServerRPC>(rpcName?: E): MethodDecorator;
export function OnRequest<E extends string>(rpcName?: Exclude<E, keyof ServerRPC.CustomServerRPC>): MethodDecorator;
export function OnRequest<E extends string>(rpcName?: Exclude<E, keyof ServerRPC.CustomServerRPC>) {
    return $OnRequest(rpcName);
}
