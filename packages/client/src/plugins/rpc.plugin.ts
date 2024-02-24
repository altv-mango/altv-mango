import { inject, injectable } from 'inversify';
import type { MangoPlugin, RPCPayload } from '@altv-mango/shared/app';
import {
    EVENT_SERVICE,
    RPC_RESULT_HANDLER_NOT_FOUND,
    RPC_RESULT_UNKNOWN,
    RPC_SERVICE,
    RPCResultStatus,
    type RPCResult,
    MangoError,
} from '@altv-mango/shared';
import { WEBVIEW_SERVICE } from '../constants';
import type { ClientEventService, ClientRPCService, ClientWebViewService } from '../services';

@injectable()
export class RpcPlugin implements MangoPlugin {
    @inject(EVENT_SERVICE) private readonly eventService: ClientEventService;
    @inject(WEBVIEW_SERVICE) private readonly webViewService: ClientWebViewService;
    @inject(RPC_SERVICE) private readonly rpcService: ClientRPCService;

    public beforeCreate() {
        this.eventService.onServer('RPC::CALL_CLIENT', async (body) => {
            const rpcHandler = this.rpcService.$serverHandlers.get(body.rpcName);
            if (!rpcHandler) {
                this.eventService.emitServer(`RPC::RETURN_FROM_CLIENT_${body.id}`, RPC_RESULT_HANDLER_NOT_FOUND);
                return;
            }

            try {
                const result = await rpcHandler.handler(body.body);
                const rpcResult: RPCResult = {
                    success: true,
                    status: RPCResultStatus.Success,
                    body: result,
                };
                this.eventService.emitServer(`RPC::RETURN_FROM_CLIENT_${body.id}`, rpcResult);
            } catch (error) {
                if (error instanceof MangoError) {
                    const rpcResult: RPCResult = {
                        success: false,
                        status: error.status,
                        error: { message: error.message, details: error.details },
                    };
                    this.eventService.emitServer(`RPC::RETURN_FROM_CLIENT_${body.id}`, rpcResult);
                    return;
                }

                this.eventService.emitServer(`RPC::RETURN_FROM_CLIENT_${body.id}`, RPC_RESULT_UNKNOWN);
            }
        });
        this.webViewService.$onCreate((webViewId, webView) => {
            webView.on('RPC::CALL_CLIENT', async (...params: unknown[]) => {
                if (!webView.valid) return;

                const payload = <RPCPayload>params[0];
                const rpcHandler = this.rpcService.$webViewHandlers.get(`${webViewId}::${payload.rpcName}`);
                if (!rpcHandler) {
                    webView.emit(`RPC::RETURN_FROM_CLIENT_${payload.id}`, RPC_RESULT_HANDLER_NOT_FOUND);
                    return;
                }

                try {
                    const result = await rpcHandler.handler(payload);
                    webView.emit(`RPC::RETURN_FROM_CLIENT_${payload.id}`, {
                        success: true,
                        status: RPCResultStatus.Success,
                        data: result,
                    });
                } catch (error) {
                    if (error instanceof MangoError) {
                        webView.emit(`RPC::RETURN_FROM_CLIENT_${payload.id}`, {
                            success: false,
                            status: error.status,
                            error: { message: error.message, details: error.details },
                        });
                        return;
                    }

                    webView.emit(`RPC::RETURN_FROM_CLIENT_${payload.id}`, RPC_RESULT_UNKNOWN);
                }
            });

            webView.on('RPC::CALL_SERVER', async (...params: unknown[]) => {
                const data = <RPCPayload>params[0];
                this.eventService.emitServer('RPC::CALL_SERVER', <RPCPayload>{ ...data, webViewId });
            });
        });
    }
}
