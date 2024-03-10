import { Controller, OnWebViewRequest } from '@altv-mango/client';
import { DISCORD_CLIENT_ID, MAIN_WEBVIEW } from '@shared/constants';
import * as altClient from '@altv/client';

@Controller()
export class AuthController {
    @OnWebViewRequest(MAIN_WEBVIEW, 'requestDiscordToken')
    public async requestDiscordToken() {
        return altClient.Discord.requestOAuth2Token(DISCORD_CLIENT_ID);
    }

    @OnWebViewRequest(MAIN_WEBVIEW, 'showMainMenuScene')
    public showMainMenuScene() {}
}
