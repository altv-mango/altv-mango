import { createRPCDecorator } from '@altv-mango/core';
import type { RPC as SharedRPC } from '@altv/shared';

export function OnServerRequest<E extends keyof SharedRPC.CustomServerToClientRPC>(rpcName?: E): MethodDecorator;
export function OnServerRequest<E extends string>(rpcName?: Exclude<E, keyof SharedRPC.CustomServerToClientRPC>): MethodDecorator;
export function OnServerRequest<E extends string>(rpcName?: Exclude<E, keyof SharedRPC.CustomServerToClientRPC>) {
    return createRPCDecorator('onServerRequest', rpcName);
}
