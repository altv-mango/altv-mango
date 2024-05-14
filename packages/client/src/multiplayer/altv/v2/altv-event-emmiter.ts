import type * as AltClient from '@altv/client';
import type * as AltShared from '@altv/shared';
import type { ClientEventEmmiter } from '../../../interfaces';
import { AltVEventEmmiterV2 as $AltVEventEmmiterV2 } from '@altv-mango/core/app';

export class ClientAltVEventEmmiterV2 extends $AltVEventEmmiterV2 implements ClientEventEmmiter {
    constructor(
        altShared: typeof AltShared,
        private readonly altClient: typeof AltClient,
    ) {
        super(altShared);
    }

    public emitServer(eventName: string, ...args: any[]): void {
        this.altClient.Events.emitServerRaw(eventName, ...args);
    }

    public onServer(eventName: string, listener: (...args: any[]) => void) {
        return this.altClient.Events.onServer(eventName, listener);
    }

    public onceServer(eventName: string, listener: (...args: any[]) => void) {
        return this.altClient.Events.onceServer(eventName, listener);
    }

    public offServer(eventName: string, listener: (...args: any[]) => void): void {
        this.off(eventName, listener);
    }
}
