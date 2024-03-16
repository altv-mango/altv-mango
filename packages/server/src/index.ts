import { createAppBuilder as $createAppBuilder, AppBuilder, AppEnviroment } from '@altv-mango/core/app';
import { PlayerPrototypePlugin, RPCPlugin, ServiceBinderPlugin } from './plugins';
import type { ErrorFilter, Guard, Interceptor } from './interfaces';
import {
    Blip,
    Marker,
    ColShape,
    Checkpoint,
    Object,
    Ped,
    Player,
    Vehicle,
    VirtualEntityGroup,
    VirtualEntity,
    VoiceChannel,
} from '@altv/server';

class ServerAppBuilder extends AppBuilder<Guard, Interceptor, ErrorFilter> {
    public setBlipFactory(factory: typeof Blip) {
        Blip.setFactory(factory);
    }

    public setMarkerFactory(factory: typeof Marker) {
        Marker.setFactory(factory);
    }

    public setColShapeFactory(factory: typeof ColShape) {
        ColShape.setFactory(factory);
    }

    public setCheckpointFactory(factory: typeof Checkpoint) {
        Checkpoint.setFactory(factory);
    }

    public setObjectFactory(factory: typeof Object) {
        Object.setFactory(factory);
    }

    public setPedFactory(factory: typeof Ped) {
        Ped.setFactory(factory);
    }

    public setPlayerFactory(factory: typeof Player) {
        Player.setFactory(factory);
    }

    public setVehicleFactory(factory: typeof Vehicle) {
        Vehicle.setFactory(factory);
    }

    public setVirtualEntityGroupFactory(factory: typeof VirtualEntityGroup) {
        VirtualEntityGroup.setFactory(factory);
    }

    public setVirtualEntityFactory(factory: typeof VirtualEntity) {
        VirtualEntity.setFactory(factory);
    }

    public setVoiceChannelFactory(factory: typeof VoiceChannel) {
        VoiceChannel.setFactory(factory);
    }
}

export async function createAppBuilder() {
    return await $createAppBuilder({
        enviroment: AppEnviroment.Server,
        plugins: [ServiceBinderPlugin, PlayerPrototypePlugin, RPCPlugin],
        appBuilderInherit: ServerAppBuilder,
    });
}

export * from './exports';

import './extension.d.ts';
