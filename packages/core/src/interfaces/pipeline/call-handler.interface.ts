export interface CallHandler<T = unknown> {
    handle(options?: { send: boolean }): T;
    return(value: T): void;
}
