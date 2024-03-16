import { OnRequest as $OnRequest } from '@altv-mango/core';
import type { RPC as ClientRPC } from '@altv/client';

export function OnRequest<E extends keyof ClientRPC.CustomClientRPC>(rpcName?: E): MethodDecorator;
export function OnRequest<E extends string>(rpcName?: Exclude<E, keyof ClientRPC.CustomClientRPC>): MethodDecorator;
export function OnRequest<E extends string>(rpcName?: Exclude<E, keyof ClientRPC.CustomClientRPC>) {
    return $OnRequest(rpcName);
}
