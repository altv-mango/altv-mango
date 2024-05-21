import type * as AltShared from 'alt-shared';
import type * as AltServer from 'alt-server';
import type { ServerEventEmmiter, ServerMultiplayerService } from '../../../interfaces';
import { ServerAltVEventEmmiterV1 } from './altv-event-emmiter';
import { AltMultiplayerServceV1 } from '@altv-mango/core/app';

export class ServerAltMultiplayerServceV1 extends AltMultiplayerServceV1 implements ServerMultiplayerService {
    public override Events: ServerEventEmmiter;
    constructor(
        altShared: typeof AltShared,
        private readonly altServer: typeof AltServer,
    ) {
        super(altShared);
        this.Events = new ServerAltVEventEmmiterV1(altShared, altServer);
    }

    public getPlayer() {
        return this.altServer.Player;
    }

    public setBlipFactory(factory: any): void {
        this.altServer.Blip.prototype = factory;
    }

    public setMarkerFactory(factory: any): void {
        this.altServer.Marker.prototype = factory;
    }

    public setColShapeFactory(factory: any): void {
        this.altServer.Colshape.prototype = factory;
    }

    public setCheckpointFactory(factory: any): void {
        this.altServer.Checkpoint.prototype = factory;
    }

    public setObjectFactory(factory: any): void {
        this.altServer.Object.prototype = factory;
    }

    public setPedFactory(factory: any): void {
        this.altServer.Ped.prototype = factory;
    }

    public setPlayerFactory(factory: any): void {
        this.altServer.Player.prototype = factory;
    }

    public setVehicleFactory(factory: any): void {
        this.altServer.Vehicle.prototype = factory;
    }

    public setVirtualEntityGroupFactory(factory: any): void {
        this.altServer.VirtualEntityGroup.prototype = factory;
    }

    public setVirtualEntityFactory(factory: any): void {
        this.altServer.VirtualEntity.prototype = factory;
    }

    public setVoiceChannelFactory(factory: any): void {
        this.altServer.VoiceChannel.prototype = factory;
    }
}
