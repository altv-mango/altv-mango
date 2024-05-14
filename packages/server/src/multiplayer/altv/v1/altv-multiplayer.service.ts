import type * as AltShared from 'alt-shared';
import type * as AltServer from 'alt-server';
import type { ServerEventEmmiter, ServerMultiplayerService } from '../../../interfaces';
import { ServerAltVEventEmmiterV1 } from './altv-event-emmiter';
import { AltMultiplayerServceV1 } from '@altv-mango/core/app';

export class ServerAltMultiplayerServceV1 extends AltMultiplayerServceV1 implements ServerMultiplayerService {
    public override Events: ServerEventEmmiter;
    constructor(altShared: typeof AltShared, private readonly altServer: typeof AltServer) {
        super(altShared);
        this.Events = new ServerAltVEventEmmiterV1(altShared, altServer);
    }
    
    public getPlayer() {
        return this.altServer.Player;
    }
}
