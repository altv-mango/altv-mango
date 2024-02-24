export interface OnAppShutdown {
    onAppShutdown(): void | Promise<void>;
}
