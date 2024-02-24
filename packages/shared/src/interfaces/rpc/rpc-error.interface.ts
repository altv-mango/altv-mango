export interface RPCError<T = unknown> {
    message: string;
    details?: T;
}
