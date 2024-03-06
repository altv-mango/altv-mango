import { inject, injectable } from 'inversify';
import type { MangoPlugin, RPC_RESULT_HANDLER_NOT_FOUND, RPC_RESULT_UNKNOWN } from '@altv-mango/core/app';
import { EVENT_SERVICE, MangoError, RPC_SERVICE, RPCResultStatus, type RPCResult } from '@altv-mango/core';
import type { ClientEventService, ClientRPCService } from '../services';

@injectable()
export class RPCPlugin implements MangoPlugin {
    @inject(EVENT_SERVICE) private readonly eventService: ClientEventService;
    @inject(RPC_SERVICE) private readonly rpcService: ClientRPCService;

    public beforeCreate() {
        this.eventService.onPlayer('RPC::CALL_SERVER', async (player, body) => {
            if (!player.valid) return;

            const rpcHandler =
                body.source === 'client'
                    ? this.rpcService.$clientHandlers.get(body.rpcName)
                    : body.source === 'webview'
                    ? this.rpcService.$webViewHandlers.get(`${body.webViewId}::${body.rpcName}`)
                    : undefined;
            if (!rpcHandler) {
                if (body.source === 'webview') {
                    this.eventService.emitWebViews(
                        [player],
                        body.webViewId as string | number,
                        `RPC::RETURN_FROM_SERVER_${body.id}`,
                        RPC_RESULT_HANDLER_NOT_FOUND,
                    );
                } else if (body.source === 'client') {
                    this.eventService.emitPlayers([player], `RPC::RETURN_FROM_SERVER_${body.id}`, RPC_RESULT_HANDLER_NOT_FOUND);
                }
                return;
            }

            try {
                const handlerResult = await rpcHandler.handler(player, body.body);
                const rpcResult: RPCResult = {
                    success: true,
                    status: RPCResultStatus.Success,
                    body: handlerResult,
                };
                if (body.source === 'webview') {
                    this.eventService.emitWebViews(
                        [player],
                        body.webViewId as string | number,
                        `RPC::RETURN_FROM_SERVER_${body.id}`,
                        rpcResult,
                    );
                } else if (body.source === 'client') {
                    this.eventService.emitPlayers([player], `RPC::RETURN_FROM_SERVER_${body.id}`, rpcResult);
                }
            } catch (error) {
                if (body.source === 'webview') {
                    if (error instanceof MangoError) {
                        const rpcResult: RPCResult = {
                            success: false,
                            status: error.status,
                            error: { message: error.message, details: error.details },
                        };
                        this.eventService.emitWebViews(
                            [player],
                            body.webViewId as string | number,
                            `RPC::RETURN_FROM_SERVER_${body.id}`,
                            rpcResult,
                        );
                    } else {
                        this.eventService.emitWebViews(
                            [player],
                            body.webViewId as string | number,
                            `RPC::RETURN_FROM_SERVER_${body.id}`,
                            RPC_RESULT_UNKNOWN,
                        );
                    }
                } else if (body.source === 'client') {
                    if (error instanceof MangoError) {
                        const rpcResult: RPCResult = {
                            success: false,
                            status: error.status,
                            error: { message: error.message, details: error.details },
                        };
                        this.eventService.emitPlayers([player], `RPC::RETURN_FROM_SERVER_${body.id}`, rpcResult);
                    } else {
                        this.eventService.emitPlayers([player], `RPC::RETURN_FROM_SERVER_${body.id}`, RPC_RESULT_UNKNOWN);
                    }
                }
            }
        });
    }
}
