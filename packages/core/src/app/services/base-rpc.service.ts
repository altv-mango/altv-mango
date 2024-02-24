import { inject, injectable } from 'inversify';
import type { RPCResult, RPCCallOptions, ScriptRPCHandler } from '../../interfaces';
import { RPC_RESULT_HANDLER_NOT_FOUND, RPC_RESULT_TIMEOUT, RPC_RESULT_UNKNOWN } from '../../constants';
import { ErrorMessage, RPCResultStatus } from '../../enums';
import { MangoError } from '../../errors';
import { InternalLoggerService } from './internal-logger.service';

@injectable()
export class BaseRPCService<T extends Record<string, any>> {
    @inject(InternalLoggerService) protected readonly $loggerService: InternalLoggerService;
    protected readonly $TIMEOUT = 2000;
    private readonly $localHandlers = new Map<string, ScriptRPCHandler>();

    public async call<E extends keyof T>(
        rpcName: E,
        body?: Parameters<T[E]>[0],
        options?: RPCCallOptions,
    ): Promise<RPCResult<ReturnType<T[E]>>>;
    public async call<E extends string>(rpcName: E, body?: unknown, options?: RPCCallOptions): Promise<RPCResult<unknown>>;
    public async call<E extends string>(
        rpcName: E,
        body?: unknown,
        options: RPCCallOptions = { timeout: this.$TIMEOUT },
    ): Promise<RPCResult<unknown>> {
        return new Promise(async (resolve) => {
            const handler = this.$localHandlers.get(<string>rpcName)?.handler;
            if (!handler) {
                return resolve(RPC_RESULT_HANDLER_NOT_FOUND);
            }

            const timeoutId = setTimeout(() => {
                resolve(RPC_RESULT_TIMEOUT);
            }, options.timeout ?? this.$TIMEOUT);

            try {
                const result = await handler(body);
                clearTimeout(timeoutId);
                resolve({ success: true, status: RPCResultStatus.Success, body: result });
            } catch (error) {
                clearTimeout(timeoutId);

                if (error instanceof MangoError) {
                    return resolve({
                        success: false,
                        status: error.status,
                        error: { message: error.message, details: error.details },
                    });
                }

                resolve(RPC_RESULT_UNKNOWN);
            }
        });
    }
    public onRequest<E extends keyof T>(rpcName: E, handler: (body: Parameters<T[E]>[0]) => ReturnType<T[E]>): ScriptRPCHandler;
    public onRequest<E extends string>(rpcName: E, handler: (body: unknown) => unknown | Promise<unknown>): ScriptRPCHandler;
    public onRequest<E extends string>(rpcName: E, handler: (body: unknown) => unknown | Promise<unknown>): ScriptRPCHandler {
        if (this.$localHandlers.has(rpcName)) {
            this.$loggerService.error('An error occurred while trying to register RPC.');
            throw new Error(ErrorMessage.RPCHandlerAlreadyExists);
        }

        const rpcHandler: ScriptRPCHandler = {
            destroy: () => {
                this.$localHandlers.delete(rpcName);
                // @ts-ignore
                rpcHandler.valid = false;
            },
            rpcName: rpcName,
            handler,
            valid: true,
        };

        this.$localHandlers.set(rpcName, rpcHandler);

        return rpcHandler;
    }
}
