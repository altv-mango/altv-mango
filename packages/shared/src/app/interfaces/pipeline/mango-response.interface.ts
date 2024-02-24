export interface MangoResponse {
    send<TData = unknown>(data: TData): void;
    error<TDetails = unknown>(message: string, details?: TDetails): void;
}
