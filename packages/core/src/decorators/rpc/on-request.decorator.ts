import { createRPCDecorator } from '../create-rpc-decorator';

export function OnRequest(rpcName?: string) {
    return createRPCDecorator('onRequest', rpcName);
}
