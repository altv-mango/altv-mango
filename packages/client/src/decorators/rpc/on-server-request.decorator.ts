import { createRPCDecorator } from '@altv-mango/core';

export function OnServerRequest(rpcName?: string) {
    return createRPCDecorator('onServerRequest', rpcName);
}
