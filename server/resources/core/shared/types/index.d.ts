import type { MyEvent } from '../src/enums';

declare module '@altv/shared' {
    export namespace Events {
        export interface CustomServerToWebViewEvent {
            [MyEvent.EatMango]: (body: { mangoId: number }) => boolean;
        }
    }
}
