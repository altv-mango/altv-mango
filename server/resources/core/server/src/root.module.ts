import { Controller, Inject, Injectable, LOGGER_SERVICE, Module, type LoggerService, type OnModuleInit } from '@altv-mango/server';

@Controller()
export class RootController implements OnModuleInit {
    @Inject(LOGGER_SERVICE) private readonly loggerService: LoggerService;
    @Inject('TEST_FACTORY') private readonly testFactory: string;

    public onModuleInit() {
        this.loggerService.log(this.testFactory);
    }
}

@Injectable()
class TestClass {}

@Module({
    controllers: [RootController],
    providers: [
        {
            provide: 'TEST_FACTORY',
            useFactory: () => {
                return 'test';
            },
            inject: [],
        },
        { useClass: TestClass, provide: 'TEST_CLASS' },
        { useExisting: 'TEST_CLASS', provide: 'TEST_EXISTING' },
        { useValue: 'TEST_VALUE', provide: 'TEST_VALUE' },
        TestClass,
    ],
})
export class RootModule {}
