import {
    Controller,
    Inject,
    LOGGER_SERVICE,
    Module,
    OnPlayer,
    type LoggerService,
    Injectable,
    type Guard,
    UseGuards,
} from '@altv-mango/server';

@Injectable()
export class TestGuard implements Guard {
    @Inject(LOGGER_SERVICE) private readonly loggerService: LoggerService;

    public async canActivate() {
        this.loggerService.debug('Test guard was triggered');
        return true;
    }
}

@Controller()
export class RootController {
    @Inject(LOGGER_SERVICE) private readonly loggerService: LoggerService;

    @UseGuards(TestGuard)
    @OnPlayer('testEvent')
    public async onTestEvent() {
        this.loggerService.debug('Test event was triggered');
    }
}

@Module({
    controllers: [RootController],
    providers: [TestGuard],
})
export class RootModule {}
