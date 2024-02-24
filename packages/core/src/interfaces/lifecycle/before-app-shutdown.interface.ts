export interface BeforeAppShutdown {
    beforeAppShutdown(): Promise<void> | void;
}
