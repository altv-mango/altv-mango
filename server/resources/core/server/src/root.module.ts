import { Controller, Inject, Interval, LOGGER_SERVICE, Module, type LoggerService } from '@altv-mango/server';

@Controller()
export class RootController {
    @Inject(LOGGER_SERVICE) private readonly loggerService: LoggerService;

    @Interval(1000)
    public async testInterval() {
        this.loggerService.debug('Interval test');
    }
}

@Module({
    controllers: [RootController],
})
export class RootModule {}
