import type * as AltServer from '@altv/server';
import type * as AltShared from '@altv/shared';
import type { MultiplayerPlayer, ServerEventEmmiter } from '../../../interfaces';
import { AltVEventEmmiterV2 } from '@altv-mango/core/app';

export class ServerAltVEventEmmiterV2 extends AltVEventEmmiterV2 implements ServerEventEmmiter {
    constructor(
        altShared: typeof AltShared,
        private readonly altServer: typeof AltServer,
    ) {
        super(altShared);
    }

    public emitUnreliableRaw(players: MultiplayerPlayer[], eventName: string, ...args: any[]): void {
        for (const player of players) {
            if (!(player instanceof this.altServer.Player)) throw new Error('Player is not alt server player');
            player.emitUnreliableRaw(eventName, ...args);
        }
    }

    public emitAllPlayersRaw(eventName: string, ...args: any[]): void {
        this.altServer.Events.emitAllPlayersRaw(eventName, ...args);
    }

    public emitAllPlayersUnreliableRaw(eventName: string, ...args: any[]): void {
        this.altServer.Events.emitAllPlayersUnreliableRaw(eventName, ...args);
    }

    public emitPlayer(player: MultiplayerPlayer, eventName: string, ...args: any[]): void {
        player.emit(eventName, ...args);
    }

    public onPlayer(eventName: string, listener: (...args: any[]) => void) {
        return this.altServer.Events.onPlayer(eventName, listener);
    }

    public oncePlayer(eventName: string, listener: (...args: any[]) => void) {
        return this.altServer.Events.oncePlayer(eventName, listener);
    }

    public offPlayer(eventName: string, listener: (...args: any[]) => void): void {
        this.off(eventName, listener);
    }
}
