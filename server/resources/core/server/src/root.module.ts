import { Controller, Inject, LOGGER_SERVICE, Module, OnPlayer, type LoggerService } from '@altv-mango/server';

@Controller()
export class RootController {
    @Inject(LOGGER_SERVICE) private readonly loggerService: LoggerService;

    @OnPlayer('testEvent')
    public async onTestEvent() {
        this.loggerService.debug('Test event was triggered');
    }
}

@Module({
    controllers: [RootController],
})
export class RootModule {}
