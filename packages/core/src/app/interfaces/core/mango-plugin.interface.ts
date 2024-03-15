export interface MangoPlugin {
    onBuild?(): Promise<void> | void;

    beforeStart?(): Promise<void> | void;
    afterStart?(): Promise<void> | void;

    beforeScan?(): Promise<void> | void;
    afterScan?(): Promise<void> | void;

    beforeBind?(): Promise<void> | void;
    afterBind?(): Promise<void> | void;

    beforeLoad?(): Promise<void> | void;
    afterLoad?(): Promise<void> | void;

    beforeStop?(): Promise<void> | void;
    afterStop?(): Promise<void> | void;
}
