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
    
    public getPlayer() {
        return this.altServer.Player;
    }
}
