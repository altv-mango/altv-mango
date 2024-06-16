import * as alt from 'alt-client';
import { RPC } from '@altv/client';

export function send(rpcName: string, ...args: unknown[]) {
    alt.emitRpc(rpcName, ...args);
}

export function register(rpcName: string, handler: RPC.GenericRpcEventHandler) {
    alt.onRpc(rpcName, handler);

    return {
        name: rpcName,
        handler,
        valid: true,
        destroy() {
            alt.offRpc(rpcName, handler);
            this.valid = false;
        },
    };
}
