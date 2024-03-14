import { Controller, Inject, LOGGER_SERVICE, OnWebViewRequest, type LoggerService, OnWebView } from '@altv-mango/client';
import { DISCORD_CLIENT_ID, MAIN_WEBVIEW } from '@shared/constants';
import * as altClient from '@altv/client';

@Controller()
export class AuthController {
    @Inject(LOGGER_SERVICE)
    private readonly loggerService: LoggerService;

    @OnWebViewRequest(MAIN_WEBVIEW, 'requestDiscordToken')
    public async requestDiscordToken() {
        return altClient.Discord.requestOAuth2Token(DISCORD_CLIENT_ID);
    }

    @OnWebViewRequest(MAIN_WEBVIEW, 'showMainMenuScene')
    public showMainMenuScene() {}

    @OnWebView(MAIN_WEBVIEW, 'TEST_ERROR')
    public testError() {
        this.loggerService.log('TEST_ERROR');
        this.loggerService.warn('TEST_ERROR');
        this.loggerService.debug('TEST_ERROR');
        this.loggerService.error('TEST_ERROR');
    }
}
