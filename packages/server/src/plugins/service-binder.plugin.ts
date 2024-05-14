import { Container, inject, injectable } from 'inversify';
import { GLOBAL_APP_CONTAINER, INTERNAL_APP_CONTAINER, MULTIPLAYER_SERVICE, type MangoPlugin } from '@altv-mango/core/app';
import { EVENT_SERVICE, LOGGER_SERVICE, RPC_SERVICE } from '@altv-mango/core';
import { ServerEventService, ServerLoggerService, ServerRPCService } from '../services';
import type { ServerMultiplayerService } from '../interfaces';
import { ServerAltMultiplayerServceV1, ServerAltMultiplayerServceV2 } from '../multiplayer';

@injectable()
export class ServiceBinderPlugin implements MangoPlugin {
    @inject(INTERNAL_APP_CONTAINER) private readonly internalAppContainer: Container;
    @inject(GLOBAL_APP_CONTAINER) private readonly globalAppContainer: Container;

    public async onBuild() {
        const time = Date.now();

        const sharedV2 = await import('@altv/shared').catch(() => false);
        const multiplayerService: ServerMultiplayerService =
            sharedV2 !== false && typeof sharedV2 !== 'boolean'
                ? new ServerAltMultiplayerServceV2(sharedV2, await import('@altv/server'))
                : new ServerAltMultiplayerServceV1(await import('alt-shared'), await import('alt-server'));

        this.globalAppContainer.bind(MULTIPLAYER_SERVICE).toConstantValue(multiplayerService);
        this.globalAppContainer.bind(LOGGER_SERVICE).to(ServerLoggerService).inSingletonScope();
        this.globalAppContainer.bind(EVENT_SERVICE).to(ServerEventService).inSingletonScope();
        this.globalAppContainer.bind(RPC_SERVICE).to(ServerRPCService).inSingletonScope();

        this.internalAppContainer.bind(MULTIPLAYER_SERVICE).toConstantValue(multiplayerService);
        this.internalAppContainer.bind(LOGGER_SERVICE).toConstantValue(this.globalAppContainer.get(LOGGER_SERVICE));
        this.internalAppContainer.bind(EVENT_SERVICE).toConstantValue(this.globalAppContainer.get(EVENT_SERVICE));
        this.internalAppContainer.bind(RPC_SERVICE).toConstantValue(this.globalAppContainer.get(RPC_SERVICE));

        const loggerService = this.globalAppContainer.get<ServerLoggerService>(LOGGER_SERVICE);
        loggerService.log(`~lw~Internal services binded ~lk~(${Date.now() - time}ms)`);
    }
}
