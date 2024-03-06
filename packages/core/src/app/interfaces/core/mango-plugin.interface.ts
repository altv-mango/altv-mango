export interface MangoPlugin {
    beforeCreate?(): Promise<void> | void;

    beforeStart?(): Promise<void> | void;
    afterStart?(): Promise<void> | void;

    // beforeResolve?(): Promise<void> | void;
    // afterResolve?(): Promise<void> | void;

    // beforeLoad?(): Promise<void> | void;
    // afterLoad?(): Promise<void> | void;

    beforeStop?(): Promise<void> | void;
    afterStop?(): Promise<void> | void;
}
