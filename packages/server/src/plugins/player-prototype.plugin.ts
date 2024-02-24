import { Container, inject, injectable } from 'inversify';
import type { RPCService } from '../interfaces';
import { RPC_SERVICE, type RPCCallOptions } from '@altv-mango/shared';
import { GLOBAL_APP_CONTAINER, type MangoPlugin } from '@altv-mango/shared/app';
import * as altServer from '@altv/server';

@injectable()
export class PlayerPrototypePlugin implements MangoPlugin {
    @inject(GLOBAL_APP_CONTAINER) private readonly globalAppContainer: Container;

    public beforeCreate() {
        altServer.Player.prototype.emitWebView = function (id: string | number, eventName: string, body?: unknown) {
            this.emitRaw('SERVER::EMIT_WEBVIEW', {
                id,
                eventName,
                payload: body,
            });
        };

        const rpcService = this.globalAppContainer.get<RPCService>(RPC_SERVICE);

        altServer.Player.prototype.call = function (rpcName: string, body?: unknown, options?: RPCCallOptions) {
            return rpcService.callPlayer(this, rpcName, body, options);
        };

        altServer.Player.prototype.callWebView = function (id: string | number, rpcName: string, body?: unknown, options?: RPCCallOptions) {
            return rpcService.callWebView(this, id, rpcName, body, options);
        };
    }
}
