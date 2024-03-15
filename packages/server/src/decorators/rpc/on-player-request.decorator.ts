import { createRPCDecorator } from '@altv-mango/core';
import type { RPC as SharedRPC } from '@altv/shared';

export function OnPlayerRequest<E extends keyof SharedRPC.CustomClientToServerRPC>(rpcName?: E): MethodDecorator;
export function OnPlayerRequest<E extends string>(rpcName?: Exclude<E, keyof SharedRPC.CustomClientToServerRPC>): MethodDecorator;
export function OnPlayerRequest<E extends string>(rpcName?: Exclude<E, keyof SharedRPC.CustomClientToServerRPC>) {
    return createRPCDecorator('onPlayerRequest', rpcName);
}
