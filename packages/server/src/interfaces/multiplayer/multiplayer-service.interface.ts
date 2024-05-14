import type { MultiplayerService } from '@altv-mango/core/app';
import type { ServerEventEmmiter } from '../event';

export interface ServerMultiplayerService extends MultiplayerService {
    Events: ServerEventEmmiter;
    getPlayer(): any;
    setBlipFactory(factory: unknown): void;
    setMarkerFactory(factory: unknown): void;
    setColShapeFactory(factory: unknown): void;
    setCheckpointFactory(factory: unknown): void;
    setObjectFactory(factory: unknown): void;
    setPedFactory(factory: unknown): void;
    setPlayerFactory(factory: unknown): void;
    setVehicleFactory(factory: unknown): void;
    setVirtualEntityGroupFactory(factory: unknown): void;
    setVirtualEntityFactory(factory: unknown): void;
    setVoiceChannelFactory(factory: unknown): void;
}
