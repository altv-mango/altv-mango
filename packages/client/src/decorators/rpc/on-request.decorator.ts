import { OnRequest as $OnRequest } from '@altv-mango/core';
import * as altClient from '@altv/client';

export function OnRequest<E extends keyof altClient.RPC.CustomClientRPC>(rpcName?: E): MethodDecorator;
export function OnRequest<E extends string>(rpcName?: Exclude<E, keyof altClient.RPC.CustomClientRPC>): MethodDecorator;
export function OnRequest<E extends string>(rpcName?: Exclude<E, keyof altClient.RPC.CustomClientRPC>) {
    return $OnRequest(rpcName);
}
