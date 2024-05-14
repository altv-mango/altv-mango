import { createAppBuilder as $createAppBuilder, AppBuilder, AppEnviroment } from '@altv-mango/core/app';
import { PlayerPrototypePlugin, RPCPlugin, ServiceBinderPlugin } from './plugins';
import type { ErrorFilter, Guard, Interceptor, ServerMultiplayerService } from './interfaces';

const sharedV1 = await import('alt-shared').catch(() => false);
const multiplayerService: ServerMultiplayerService =
    sharedV1 !== false && typeof sharedV1 !== 'boolean'
        ? new ServerAltMultiplayerServceV1(sharedV1, await import('alt-server'))
        : new ServerAltMultiplayerServceV2(await import('@altv/shared'), await import('@altv/server'));

class ServerAppBuilder extends AppBuilder<Guard, Interceptor, ErrorFilter> {
    public setBlipFactory(factory: unknown) {
        multiplayerService.setBlipFactory(factory);
    }

    public setMarkerFactory(factory: unknown) {
        multiplayerService.setMarkerFactory(factory);
    }

    public setColShapeFactory(factory: unknown) {
        multiplayerService.setColShapeFactory(factory);
    }

    public setCheckpointFactory(factory: unknown) {
        multiplayerService.setCheckpointFactory(factory);
    }

    public setObjectFactory(factory: unknown) {
        multiplayerService.setObjectFactory(factory);
    }

    public setPedFactory(factory: unknown) {
        multiplayerService.setPedFactory(factory);
    }

    public setPlayerFactory(factory: unknown) {
        multiplayerService.setPlayerFactory(factory);
    }

    public setVehicleFactory(factory: unknown) {
        multiplayerService.setVehicleFactory(factory);
    }

    public setVirtualEntityGroupFactory(factory: unknown) {
        multiplayerService.setVirtualEntityGroupFactory(factory);
    }

    public setVirtualEntityFactory(factory: unknown) {
        multiplayerService.setVirtualEntityFactory(factory);
    }

    public setVoiceChannelFactory(factory: unknown) {
        multiplayerService.setVoiceChannelFactory(factory);
    }
}

export async function createAppBuilder() {
    return await $createAppBuilder({
        enviroment: AppEnviroment.Server,
        plugins: [ServiceBinderPlugin, PlayerPrototypePlugin, RPCPlugin],
        appBuilderInherit: ServerAppBuilder,
        multiplayerService
    });
}

export * from './exports';

import './extension.d.ts';
import { ServerAltMultiplayerServceV1, ServerAltMultiplayerServceV2 } from './multiplayer';
