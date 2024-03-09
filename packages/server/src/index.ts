import '@abraham/reflection';
import { createAppBuilder as $createAppBuilder, AppBuilder, AppEnviroment } from '@altv-mango/core/app';
import { PlayerPrototypePlugin, RPCPlugin, ServiceBinderPlugin } from './plugins';
import type { ErrorFilter, Guard, Interceptor } from './interfaces';
import * as altServer from '@altv/server';

class ServerAppBuilder extends AppBuilder<Guard, Interceptor, ErrorFilter> {
    public setBlipFactory(factory: typeof altServer.Blip) {
        altServer.Blip.setFactory(factory);
    }

    public setMarkerFactory(factory: typeof altServer.Marker) {
        altServer.Marker.setFactory(factory);
    }

    public setColShapeFactory(factory: typeof altServer.ColShape) {
        altServer.ColShape.setFactory(factory);
    }

    public setCheckpointFactory(factory: typeof altServer.Checkpoint) {
        altServer.Checkpoint.setFactory(factory);
    }

    public setObjectFactory(factory: typeof altServer.Object) {
        altServer.Object.setFactory(factory);
    }

    public setPedFactory(factory: typeof altServer.Ped) {
        altServer.Ped.setFactory(factory);
    }

    public setPlayerFactory(factory: typeof altServer.Player) {
        altServer.Player.setFactory(factory);
    }

    public setVehicleFactory(factory: typeof altServer.Vehicle) {
        altServer.Vehicle.setFactory(factory);
    }

    public setVirtualEntityGroupFactory(factory: typeof altServer.VirtualEntityGroup) {
        altServer.VirtualEntityGroup.setFactory(factory);
    }

    public setVirtualEntityFactory(factory: typeof altServer.VirtualEntity) {
        altServer.VirtualEntity.setFactory(factory);
    }

    public setVoiceChannelFactory(factory: typeof altServer.VoiceChannel) {
        altServer.VoiceChannel.setFactory(factory);
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
