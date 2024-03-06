import { createRPCDecorator } from '../create-rpc-decorator';

export function OnWebViewRequest(id: string | number, rpcName?: string) {
    return createRPCDecorator('onWebViewRequest', rpcName, id);
}
