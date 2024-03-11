import { inject, injectable } from 'inversify';
import type { RPCResult, RPCCallOptions, ScriptRPCHandler, LoggerService } from '../../interfaces';
import { RPC_RESULT_HANDLER_NOT_FOUND, RPC_RESULT_TIMEOUT, RPC_RESULT_UNKNOWN } from '../../app/constants';
import { ErrorMessage, RPCResultStatus } from '../../enums';
import { MangoError } from '../../errors';
import { LOGGER_SERVICE } from '../../constants';

@injectable()
export class BaseRPCService<T extends Record<string, any>> {
    @inject(LOGGER_SERVICE) protected readonly $loggerService: LoggerService;
    protected readonly $TIMEOUT = 2000;
    private readonly $localHandlers = new Map<string, ScriptRPCHandler>();

    public async call<E extends keyof T>(
        rpcName: E,
        body?: Parameters<T[E]>[0],
        options?: RPCCallOptions,
    ): Promise<RPCResult<ReturnType<T[E]>>>;
    public async call<E extends string>(rpcName: E, body?: unknown, options?: RPCCallOptions): Promise<RPCResult<unknown>>;
    public async call<E extends string>(rpcName: E, body?: unknown, options: RPCCallOptions = { timeout: this.$TIMEOUT }) {
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
    public onRequest<E extends string>(rpcName: E, handler: (body: unknown) => unknown | Promise<unknown>) {
        if (this.$localHandlers.has(rpcName)) {
            this.$loggerService.error('An error occurred while trying to register RPC.');
            throw new Error(ErrorMessage.RPCHandlerAlreadyExists);
        }

        const rpcHandler: ScriptRPCHandler = {
            destroy: () => {
                // @ts-ignore
                rpcHandler.valid = false;
                this.$localHandlers.delete(rpcName);
            },
            rpcName: rpcName,
            handler,
            valid: true,
        };

        this.$localHandlers.set(rpcName, rpcHandler);

        return rpcHandler;
    }
}
