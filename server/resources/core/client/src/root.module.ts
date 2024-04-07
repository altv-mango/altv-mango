import { Controller, Cron, Inject, LOGGER_SERVICE, Module, type LoggerService } from '@altv-mango/client';

@Controller()
export class RootController {
    @Inject(LOGGER_SERVICE) private readonly loggerService: LoggerService;

    @Cron('*/5 * * * * *')
    public async testInterval() {
        // console.log('Interval test', this);
        this.loggerService.debug('Interval test');
    }
}

@Module({
    controllers: [RootController],
})
export class RootModule {}
