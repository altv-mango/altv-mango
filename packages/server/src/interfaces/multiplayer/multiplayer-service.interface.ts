import type { MultiplayerService } from '@altv-mango/core/app';
import type { ServerEventEmmiter } from '../event';

export interface ServerMultiplayerService extends MultiplayerService {
    Events: ServerEventEmmiter;
    getPlayer(): any;
}
