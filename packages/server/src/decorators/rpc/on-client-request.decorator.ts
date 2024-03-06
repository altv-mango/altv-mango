import { createRPCDecorator } from '@altv-mango/core';

export function OnPlayerRequest(rpcName?: string) {
    return createRPCDecorator('onPlayerRequest', rpcName);
}
