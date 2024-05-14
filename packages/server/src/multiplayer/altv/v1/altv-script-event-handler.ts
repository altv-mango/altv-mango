import type { ScriptEventHandler } from '@altv-mango/core/app';
import type * as AlttServer from 'alt-server';

export class AltVScriptEvent implements ScriptEventHandler {
    constructor(
        private readonly altServer: typeof AlttServer,
        private readonly eventName: string,
        private readonly listener: (...args: any[]) => void,
    ) {}

    public destroy(): void {
        this.altServer.offClient(this.eventName, this.listener);
    }
}
