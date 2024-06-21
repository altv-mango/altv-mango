import type { ScriptEventHandler } from '@altv-mango/core/app';
import type * as Alt from 'alt-client';

export class AltVScriptEvent implements ScriptEventHandler {
    constructor(
        private readonly alt: typeof Alt,
        private readonly eventName: string,
        private readonly listener: (...args: any[]) => void,
    ) {}

    destroy(): void {
        this.alt.offServer(this.eventName, this.listener);
    }
}
