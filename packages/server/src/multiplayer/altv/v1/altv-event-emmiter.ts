import type * as AltServer from 'alt-server';
import type * as AltShared from 'alt-shared';
import { AltVScriptEvent } from './altv-script-event-handler';
import type { MultiplayerPlayer, ServerEventEmmiter } from '../../../interfaces';
import { AltVEventEmmiterV1 } from '@altv-mango/core/app';
import { Player } from '../../../../dist/index';

export class ServerAltVEventEmmiterV1 extends AltVEventEmmiterV1 implements ServerEventEmmiter {
    constructor(
        altShared: typeof AltShared,
        private readonly altServer: typeof AltServer,
    ) {
        const mapEvents: Record<string, string> = {
            clientObjectRequest: 'clientRequestObject',
            playerSyncedSceneRequest: 'requestSyncedScene',
            playerSyncedSceneStart: 'startSyncedScene',
            playerSyncedSceneStop: 'stopSyncedScene',
            playerSyncedSceneUpdate: 'updateSyncedScene',
            playerVehicleLeft: 'playerLeftVehicle',
            playerVehicleEntered: 'playerEnteredVehicle',
            playerStartVehicleEnter: 'playerEnteringVehicle',
            playerVehicleSeatChange: 'playerChangedVehicleSeat',
        };
        super(altShared, mapEvents);
    }

    emitUnreliableRaw(players: MultiplayerPlayer[], eventName: string, ...args: any[]): void {
        for (const player of players) {
            if (!(player instanceof this.altServer.Player)) throw new Error('Player is not alt server player');
            this.altServer.emitClientUnreliable(player, eventName, ...args);
        }
    }

    public emitAllPlayersRaw(eventName: string, ...args: any[]): void {
        this.altServer.emitAllClientsRaw(eventName, ...args);
    }

    public emitAllPlayersUnreliableRaw(eventName: string, ...args: any[]): void {
        this.altServer.emitAllClientsUnreliable(eventName, ...args);
    }

    public emitPlayer(player: MultiplayerPlayer, eventName: string, ...args: any[]): void {
        player.emit(eventName, ...args);
    }

    public onPlayer(eventName: string, listener: (...args: any[]) => void) {
        this.altServer.onClient(eventName, listener);
        return new AltVScriptEvent(this.altServer, eventName, listener);
    }

    public oncePlayer(eventName: string, listener: (...args: any[]) => void) {
        this.altServer.onceClient(eventName, listener);
        return new AltVScriptEvent(this.altServer, eventName, listener);
    }

    public offPlayer(eventName: string, listener: (...args: any[]) => void): void {
        this.altServer.offClient(eventName, listener);
    }
}
