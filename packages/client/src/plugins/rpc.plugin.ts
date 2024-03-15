import { inject, injectable } from 'inversify';
import { type MangoPlugin, type RPCPayload, RPC_RESULT_HANDLER_NOT_FOUND, RPC_RESULT_UNKNOWN } from '@altv-mango/core/app';
import { EVENT_SERVICE, RPC_SERVICE, RPCResultStatus, type RPCResult, MangoError, LOGGER_SERVICE, isNil } from '@altv-mango/core';
import { WEBVIEW_SERVICE } from '../constants';
import type { ClientEventService, ClientLoggerService, ClientRPCService, ClientWebViewService } from '../services';

@injectable()
export class RPCPlugin implements MangoPlugin {
    @inject(EVENT_SERVICE) private readonly eventService: ClientEventService;
    @inject(WEBVIEW_SERVICE) private readonly webViewService: ClientWebViewService;
    @inject(RPC_SERVICE) private readonly rpcService: ClientRPCService;
    @inject(LOGGER_SERVICE) private readonly loggerService: ClientLoggerService;

    public beforeLoad() {
        const time = Date.now();

        this.eventService.onServer('RPC::CALL_CLIENT', async (body) => {
            const rpcHandler = this.rpcService.$serverHandlers.get(body.rpcName);
            if (isNil(rpcHandler)) {
                this.eventService.emitServer(`RPC::RETURN_FROM_CLIENT_${body.id}`, RPC_RESULT_HANDLER_NOT_FOUND);
                return;
            }

            try {
                this.loggerService.debug(`RPC::RETURN_FROM_CLIENT_${body.id}`, body);
                const result = await rpcHandler.handler(body.body);
                this.loggerService.debug(`RPC::RETURN_FROM_CLIENT_${body.id}`, result);
                const rpcResult: RPCResult = {
                    success: true,
                    status: RPCResultStatus.Success,
                    body: result,
                };
                this.loggerService.debug(`RPC::RETURN_FROM_CLIENT_${body.id}`, rpcResult);
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
            webView.on('RPC::CALL_CLIENT', async (body) => {
                if (!webView.valid) return;

                const rpcHandler = this.rpcService.$webViewHandlers.get(`${webViewId}::${body.rpcName}`);
                if (isNil(rpcHandler)) {
                    webView.emit(`RPC::RETURN_FROM_CLIENT_${body.id}`, RPC_RESULT_HANDLER_NOT_FOUND);
                    return;
                }

                try {
                    const result = await rpcHandler.handler(body);
                    webView.emit(`RPC::RETURN_FROM_CLIENT_${body.id}`, <RPCResult>{
                        success: true,
                        status: RPCResultStatus.Success,
                        body: result,
                    });
                } catch (error) {
                    if (error instanceof MangoError) {
                        webView.emit(`RPC::RETURN_FROM_CLIENT_${body.id}`, {
                            success: false,
                            status: error.status,
                            error: { message: error.message, details: error.details },
                        });
                        return;
                    }

                    webView.emit(`RPC::RETURN_FROM_CLIENT_${body.id}`, RPC_RESULT_UNKNOWN);
                }
            });

            webView.on('RPC::CALL_SERVER', (body) => {
                this.eventService.emitServer('RPC::CALL_SERVER', <RPCPayload>{ ...body, webViewId });
            });
        });

        this.loggerService.log(`~lw~RPC handlers registered ~lk~(${Date.now() - time}ms)`);
    }
}
