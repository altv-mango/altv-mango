import { inject, injectable } from 'inversify';
import { type MangoPlugin, type RPCPayload, RPC_RESULT_HANDLER_NOT_FOUND, RPC_RESULT_UNKNOWN } from '@altv-mango/core/app';
import {
    EVENT_SERVICE,
    RPC_SERVICE,
    RPCResultStatus,
    type RPCResult,
    MangoError,
    LOGGER_SERVICE,
    isNil,
    type LoggerService,
} from '@altv-mango/core';
import { WEBVIEW_SERVICE } from '../constants';
import type { ClientWebViewService } from '../services';
import type { EventService, RPCService } from '../interfaces';

@injectable()
export class RPCPlugin implements MangoPlugin {
    @inject(EVENT_SERVICE) private readonly eventService: EventService;
    @inject(WEBVIEW_SERVICE) private readonly webViewService: ClientWebViewService;
    @inject(RPC_SERVICE) private readonly rpcService: RPCService;
    @inject(LOGGER_SERVICE) private readonly loggerService: LoggerService;

    public beforeLoad() {
        const time = Date.now();

        this.eventService.onServer('RPC::CALL_CLIENT', async (payload) => {
            const rpcHandler = this.rpcService.$serverHandlers.get(payload.rpcName);
            if (isNil(rpcHandler)) {
                this.eventService.emitServer(`RPC::RETURN_FROM_CLIENT_${payload.id}`, RPC_RESULT_HANDLER_NOT_FOUND);
                return;
            }

            try {
                const result = await rpcHandler.handler(payload.body);
                const rpcResult: RPCResult = {
                    success: true,
                    status: RPCResultStatus.Success,
                    body: result,
                };
                this.eventService.emitServer(`RPC::RETURN_FROM_CLIENT_${payload.id}`, rpcResult);
            } catch (error) {
                if (error instanceof MangoError) {
                    const rpcResult: RPCResult = {
                        success: false,
                        status: error.status,
                        error: { message: error.message, details: error.details },
                    };
                    this.eventService.emitServer(`RPC::RETURN_FROM_CLIENT_${payload.id}`, rpcResult);
                    return;
                }

                this.eventService.emitServer(`RPC::RETURN_FROM_CLIENT_${payload.id}`, RPC_RESULT_UNKNOWN);
            }
        });
        this.webViewService.$onCreate((webViewId, webView) => {
            webView.on('RPC::CALL_CLIENT', async (payload) => {
                if (!webView.valid) return;

                const rpcHandler = this.rpcService.$webViewHandlers.get(`${webViewId}::${payload.rpcName}`);
                if (isNil(rpcHandler)) {
                    webView.emit(`RPC::RETURN_FROM_CLIENT_${payload.id}`, RPC_RESULT_HANDLER_NOT_FOUND);
                    return;
                }

                try {
                    const result = await rpcHandler.handler(payload.body);
                    webView.emit(`RPC::RETURN_FROM_CLIENT_${payload.id}`, <RPCResult>{
                        success: true,
                        status: RPCResultStatus.Success,
                        body: result,
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

            webView.on('RPC::CALL_SERVER', (payload) => {
                this.eventService.emitServer('RPC::CALL_SERVER', <RPCPayload>{ ...payload, webViewId });
            });
        });

        this.loggerService.log(`~lw~RPC handlers registered ~lk~(${Date.now() - time}ms)`);
    }
}
