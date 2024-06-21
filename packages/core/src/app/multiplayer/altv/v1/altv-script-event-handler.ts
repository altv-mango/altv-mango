
import type { ScriptEventHandler } from '../../../interfaces';
import type * as Alt from 'alt-shared';

export class AltVScriptEvent implements ScriptEventHandler {
    constructor(
        private readonly alt: typeof Alt,
        private eventName: string,
        private listener: (...args: any[]) => void,
    ) {}

    destroy(): void {
        this.alt.off(this.eventName, this.listener);
    }
}
