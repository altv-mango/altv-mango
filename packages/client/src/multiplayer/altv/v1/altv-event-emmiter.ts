import type * as AltClient from 'alt-client';
import type * as AltShared from 'alt-shared';
import { AltVScriptEvent } from './altv-script-event-handler';
import type { ClientEventEmmiter } from '../../../interfaces/event';
import { AltVEventEmmiterV1 } from '@altv-mango/core/app';

export class ClientAltVEventEmmiterV1 extends AltVEventEmmiterV1 implements ClientEventEmmiter {
    constructor(altShared: typeof AltShared, private readonly altClient: typeof AltClient) {
        const mapEvents: Record<string, string> = {
            "keyUp": "keyup",
            "keyDown": "keydown",
            "playerVehicleLeft": "leftVehicle",
            "playerVehicleEntered": "enteredVehicle",
            "playerStartVehicleEnter": "startEnteringVehicle",
            "playerVehicleSeatChange": "changedVehicleSeat",
            "projectileStart": "startProjectile",
            "vehicleSirenStateChange": "vehicleSiren",
            "vehicleHornStateChange": "vehicleHorn",
        }
        super(altShared, mapEvents);
    }

    emitServer(eventName: string, ...args: any[]): void {
        this.altClient.emitServerRaw(eventName, ...args);
    }

    onServer(eventName: string, listener: (...args: any[]) => void) {
        this.altClient.onServer(eventName, listener);
        return new AltVScriptEvent(this.altClient, eventName, listener);
    }

    onceServer(eventName: string, listener: (...args: any[]) => void) {
        this.altClient.onceServer(eventName, listener);
        return new AltVScriptEvent(this.altClient, eventName, listener);
    }

    offServer(eventName: string, listener: (...args: any[]) => void): void {
        this.altClient.offServer(eventName, listener);
    }
}
