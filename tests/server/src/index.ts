import '@abraham/reflection';
import {
    Inject,
    Module,
    type OnAppBootstrap,
    createAppBuilder,
    Global,
    EVENT_SERVICE,
    On,
    Controller,
    LOGGER_SERVICE,
    type EventService,
    type LoggerService,
    Body,
} from '@altv-mango/server';

@Global()
@Module({
    providers: [{ provide: 'HELLO', useValue: 'HELLO WORLD', scope: 'singleton' }],
    exports: ['HELLO'],
})
class ModuleB implements OnAppBootstrap {
    @Inject(EVENT_SERVICE) private readonly eventService: EventService;
    @Inject('HELLO') private readonly hello: string;
    @Inject(LOGGER_SERVICE) private readonly loggerService: LoggerService;

    public async onAppBootstrap() {
        this.loggerService.log('ModuleB.onApplicationBootstrap', this.hello);
        setTimeout(() => {
            this.eventService.emit('local_test_event');
        }, 1000);
    }
}

@Controller()
class ControllerA {
    @Inject(LOGGER_SERVICE) private readonly loggerService: LoggerService;
    private readonly hello = 'HELLO WORLD';

    @On('local_test_event')
    public onTestEvent(@Body() body: string) {
        this.loggerService.log('local_test_event received' + this.hello + body);
    }
}

@Module({ imports: [ModuleB], controllers: [ControllerA] })
class ModuleA implements OnAppBootstrap {
    @Inject(LOGGER_SERVICE) private readonly loggerService: LoggerService;
    public async onAppBootstrap() {
        this.loggerService.log('ModuleA.onApplicationBootstrap');
    }
}

const appBuilder = await createAppBuilder();
const app = appBuilder.build();
await app.start(ModuleA);
