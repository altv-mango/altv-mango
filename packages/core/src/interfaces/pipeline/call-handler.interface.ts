export interface CallHandler<T = unknown> {
    handle(): T;
    return(value: T): void;
}
