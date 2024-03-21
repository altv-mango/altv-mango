import { Inject, Injectable, Module, type OnModuleInit } from '@altv-mango/server';

@Injectable()
export class TestService {
    public value = 55;
}

@Module({ providers: [TestService], exports: [TestService] })
export class TestModule {
    @Inject(TestService) private readonly testService: TestService;

    public onModuleInit() {
        console.log('TestModule', this.testService.value++);
    }
}

@Module({
    imports: [TestModule],
})
export class FooModule implements OnModuleInit {
    @Inject(TestService) private readonly testService: TestService;

    public onModuleInit() {
        console.log('FooModule', this.testService.value++);
    }
}

@Module({
    imports: [FooModule],
})
export class RootModule {}
