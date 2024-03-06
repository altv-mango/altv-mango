/// <reference types="@altv-mango/core" />

import { InternalLoggerService, WebViewEventService, WebViewRPCService } from './services';
import { isNil } from '@altv-mango/core/utils';
import { RPC_RESULT_HANDLER_NOT_FOUND, RPC_RESULT_UNKNOWN } from '@altv-mango/core/app/constants';
import type { EventService, RPCService } from './interfaces';
import { RPCResultStatus } from '@altv-mango/core/enums';
import type { RPCResult } from '@altv-mango/core/interfaces';
import { MangoError } from '@altv-mango/core/errors';

export function initMango() {
    if (!isNil(window.mango)) {
        return window.mango;
    }

    const event = new WebViewEventService();
    const logger = new InternalLoggerService();
    const rpc = new WebViewRPCService(event, logger);

    event.onServer('RPC::CALL_WEBVIEW', async (body) => {
        const id = body.id;
        const name = body.rpcName;
        const payload = body.body;

        const rpcHandler = rpc.$serverHandlers.get(name);
        if (!rpcHandler) {
            event.emitServer(`RPC::RETURN_FROM_WEBVIEW_${id}`, RPC_RESULT_HANDLER_NOT_FOUND);
            return;
        }

        try {
            const result = await rpcHandler.handler(payload);
            const rpcResult: RPCResult = {
                success: true,
                status: RPCResultStatus.Success,
                body: result,
            };
            event.emitServer(`RPC::RETURN_FROM_WEBVIEW_${id}`, rpcResult);
        } catch (error) {
            if (error instanceof MangoError) {
                const rpcResult: RPCResult = {
                    success: false,
                    status: error.status,
                    error: { message: error.message, details: error.details },
                };
                event.emitServer(`RPC::RETURN_FROM_WEBVIEW_${id}`, rpcResult);
                return;
            }

            event.emitServer(`RPC::RETURN_FROM_WEBVIEW_${id}`, RPC_RESULT_UNKNOWN);
        }
    });
    event.onPlayer('RPC::CALL_WEBVIEW', async (body) => {
        const id = body.id;
        const name = body.rpcName;
        const payload = body.body;

        const rpcHandler = rpc.$clientHandlers.get(name);
        if (!rpcHandler) {
            event.emitPlayer(`RPC::RETURN_FROM_WEBVIEW_${id}`, RPC_RESULT_HANDLER_NOT_FOUND);
            return;
        }

        try {
            const result = await rpcHandler.handler(payload);
            const rpcResult: RPCResult = {
                success: true,
                status: RPCResultStatus.Success,
                body: result,
            };
            event.emitPlayer(`RPC::RETURN_FROM_WEBVIEW_${id}`, rpcResult);
        } catch (error) {
            event.emitPlayer(`RPC::RETURN_FROM_WEBVIEW_${id}`, RPC_RESULT_UNKNOWN);
        }
    });

    const mango = { event, rpc };

    window.mango = mango;

    logger.log(['WebView'], 'Initialized');

    return mango;
}

declare global {
    interface Window {
        mango: {
            event: EventService;
            rpc: RPCService;
        };
    }
}
