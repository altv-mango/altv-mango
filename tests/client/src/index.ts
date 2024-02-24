import '@abraham/reflection';
import {
    Module,
    Controller,
    OnServer,
    type OnModuleInit,
    createAppBuilder,
    WEBVIEW_SERVICE,
    Inject,
    type OnAppBootstrap,
    type WebViewService,
} from '@altv-mango/client';

@Controller()
class ControllerA implements OnModuleInit {
    @OnServer('test_event')
    public onTestEvent() {
        console.log('test_event');
    }

    public onModuleInit() {
        console.log('ModuleA initialized');
    }
}

@Module({ controllers: [ControllerA] })
class ModuleA implements OnAppBootstrap {
    @Inject(WEBVIEW_SERVICE) private readonly webViewService: WebViewService;

    public async onAppBootstrap() {
        this.webViewService.create('ui_test', { url: 'http://resource/ui/dist/index.html', isVisible: true });
    }
}

const appBuilder = await createAppBuilder();
const app = appBuilder.build();
await app.start(ModuleA);
