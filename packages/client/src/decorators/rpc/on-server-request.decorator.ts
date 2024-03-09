import { createRPCDecorator } from '@altv-mango/core';
import * as altShared from '@altv/shared';

export function OnServerRequest<E extends keyof altShared.RPC.CustomServerToClientRPC>(rpcName?: E): MethodDecorator;
export function OnServerRequest<E extends string>(rpcName?: Exclude<E, keyof altShared.RPC.CustomServerToClientRPC>): MethodDecorator;
export function OnServerRequest<E extends string>(rpcName?: Exclude<E, keyof altShared.RPC.CustomServerToClientRPC>) {
    return createRPCDecorator('onServerRequest', rpcName);
}
