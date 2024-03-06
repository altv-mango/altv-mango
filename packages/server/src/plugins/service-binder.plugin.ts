import { Container, inject, injectable } from 'inversify';
import { GLOBAL_APP_CONTAINER, INTERNAL_APP_CONTAINER, type MangoPlugin } from '@altv-mango/core/app';
import { EVENT_SERVICE, LOGGER_SERVICE, RPC_SERVICE } from '@altv-mango/core';
import { ServerEventService, ServerLoggerService, ServerRPCService } from '../services';

@injectable()
export class ServiceBinderPlugin implements MangoPlugin {
    @inject(INTERNAL_APP_CONTAINER) private readonly internalAppContainer: Container;
    @inject(GLOBAL_APP_CONTAINER) private readonly globalAppContainer: Container;

    public beforeCreate() {
        this.globalAppContainer.bind(LOGGER_SERVICE).to(ServerLoggerService).inSingletonScope();
        this.globalAppContainer.bind(EVENT_SERVICE).to(ServerEventService).inSingletonScope();
        this.globalAppContainer.bind(RPC_SERVICE).to(ServerRPCService).inSingletonScope();

        this.internalAppContainer.bind(LOGGER_SERVICE).toConstantValue(this.globalAppContainer.get(LOGGER_SERVICE));
        this.internalAppContainer.bind(EVENT_SERVICE).toConstantValue(this.globalAppContainer.get(EVENT_SERVICE));
        this.internalAppContainer.bind(RPC_SERVICE).toConstantValue(this.globalAppContainer.get(RPC_SERVICE));
    }
}
