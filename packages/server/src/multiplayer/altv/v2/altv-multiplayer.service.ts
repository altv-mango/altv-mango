import type * as AltShared from '@altv/shared';
import type * as AltServer from '@altv/server';
import type { ServerEventEmmiter, ServerMultiplayerService } from '../../../interfaces';
import { AltMultiplayerServceV2 } from '@altv-mango/core/app';
import { ServerAltVEventEmmiterV2 } from './altv-event-emmiter';

export class ServerAltMultiplayerServceV2 extends AltMultiplayerServceV2 implements ServerMultiplayerService {
    public override Events: ServerEventEmmiter;
    constructor(altShared: typeof AltShared, private readonly altServer: typeof AltServer) {
        super(altShared);
        this.Events = new ServerAltVEventEmmiterV2(altShared, altServer);
    }
    emitUnreliableRaw(player: unknown, eventName: string, ...args: any[]): void {
        this.altServer.Events.emitPlayersUnreliable([player], eventName, ...args)
    }

    public getPlayer() {
        return this.altServer.Player;
    }

    public setBlipFactory(factory: any): void {
        this.altServer.Blip.setFactory(factory);
    }

    public setMarkerFactory(factory: any): void {
        this.altServer.Marker.setFactory(factory);
    }

    public setColShapeFactory(factory: any): void {
        this.altServer.ColShape.setFactory(factory);
    }

    public setCheckpointFactory(factory: any): void {
        this.altServer.Checkpoint.setFactory(factory);
    }

    public setObjectFactory(factory: any): void {
        this.altServer.Object.setFactory(factory);
    }

    public setPedFactory(factory: any): void {
        this.altServer.Ped.setFactory(factory);
    }

    public setPlayerFactory(factory: any): void {
        this.altServer.Player.setFactory(factory);
    }

    public setVehicleFactory(factory: any): void {
        this.altServer.Vehicle.setFactory(factory);
    }

    public setVirtualEntityGroupFactory(factory: any): void {
        this.altServer.VirtualEntityGroup.setFactory(factory);
    }

    public setVirtualEntityFactory(factory: any): void {
        this.altServer.VirtualEntity.setFactory(factory);
    }

    public setVoiceChannelFactory(factory: any): void {
        this.altServer.VoiceChannel.setFactory(factory);
    }
}
