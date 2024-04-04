import { Controller, Inject, LOGGER_SERVICE, Module, type LoggerService, OnWebViewRequest, Param, Body } from '@altv-mango/client';
import { MAIN_WEBVIEW } from '@shared/constants';

@Controller()
export class RootController {
    @Inject(LOGGER_SERVICE) private readonly loggerService: LoggerService;

    @OnWebViewRequest(MAIN_WEBVIEW, 'TEST_RPC')
    public testRPC(@Param('message') message: string, @Body() body: { nessage: string }) {
        this.loggerService.debug('Test RPC was triggered with message:', message);
        this.loggerService.debug('Test RPC was triggered with body:', body);
        return 'Hello from client';
    }
}

@Module({
    controllers: [RootController],
})
export class RootModule {}
