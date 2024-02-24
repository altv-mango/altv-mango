import type { RPCError } from './rpc-error.interface';

export interface RPCResult<TBody = unknown, TErrorDetails = unknown> {
    success: boolean;
    status: number;
    body?: TBody;
    error?: RPCError<TErrorDetails> | undefined;
}
