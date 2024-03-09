import { createRPCDecorator } from '@altv-mango/core';
import * as altShared from '@altv/shared';

export function OnPlayerRequest<E extends keyof altShared.RPC.CustomClientToServerRPC>(rpcName?: E): MethodDecorator;
export function OnPlayerRequest<E extends string>(rpcName?: Exclude<E, keyof altShared.RPC.CustomClientToServerRPC>) {
    return createRPCDecorator('onPlayerRequest', rpcName);
}
