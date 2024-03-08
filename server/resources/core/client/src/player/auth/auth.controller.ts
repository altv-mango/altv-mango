import { Controller, Inject, OnWebViewRequest, type LoggerService, LOGGER_SERVICE } from '@altv-mango/client';
import { DISCORD_CLIENT_ID, MAIN_WEBVIEW } from '@shared/constants';
import * as altClient from '@altv/client';

@Controller()
export class AuthController {
    @Inject(LOGGER_SERVICE) private readonly loggerService: LoggerService;

    @OnWebViewRequest(MAIN_WEBVIEW, 'requestDiscordToken')
    public async requestDiscordToken() {
        this.loggerService.debug('Requesting Discord token');
        return altClient.Discord.requestOAuth2Token(DISCORD_CLIENT_ID);
    }

    @OnWebViewRequest(MAIN_WEBVIEW, 'showMainMenuScene')
    public showMainMenuScene() {}
}
