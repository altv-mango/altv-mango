import {
    Catch,
    Controller,
    EVENT_SERVICE,
    Inject,
    Injectable,
    LOGGER_SERVICE,
    Module,
    On,
    OnPlayerDisconnect,
    Player,
    UseFilters,
    type ErrorFilter,
    type EventService,
    type ExecutionContext,
    type LoggerService,
    type OnModuleInit,
} from '@altv-mango/server';
import * as alt from '@altv/server';

@Catch('sss')
@Injectable()
export class Test1ErrorFilter implements ErrorFilter {
    public catch(error: unknown, context: ExecutionContext) {
        context.response?.send('Error');
        console.log('Error:', error);
    }
}

@Catch(5)
@Injectable()
export class Test2ErrorFilter implements ErrorFilter {
    public catch(error: unknown, context: ExecutionContext) {
        context.response?.send('Error');
        console.log('Error:', error);
    }
}

@UseFilters(Test1ErrorFilter)
@Controller()
export class RootController implements OnModuleInit {
    @Inject(LOGGER_SERVICE) private readonly loggerService: LoggerService;
    @Inject(EVENT_SERVICE) private readonly eventService: EventService;

    @OnPlayerDisconnect()
    public onPlayerDisconnect(@Player() player: alt.Player) {
        this.loggerService.debug(`Player ${player.name} disconnected`);
    }

    @UseFilters(Test2ErrorFilter)
    @On('testEvent')
    public onTestEvent() {
        this.loggerService.debug('Test event received');
        throw 5;
    }

    public onModuleInit() {
        this.loggerService.debug('Root module initialized');
        setTimeout(() => {
            this.eventService.emit('testEvent');
        }, 5000);
    }
}

@Module({
    controllers: [RootController],
    providers: [Test1ErrorFilter, Test2ErrorFilter],
})
export class RootModule {}