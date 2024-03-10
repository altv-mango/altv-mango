import { Controller, OnPlayerConnect, OnWebView, Player } from '@altv-mango/server';
import type { CustomPlayer } from './custom-player';
import { MAIN_WEBVIEW } from '@shared/constants';

@Controller()
export class PlayerController {
    @OnPlayerConnect()
    public onPlayerConnect(@Player() player: CustomPlayer) {
        player.loggedIn = false;
    }

    @OnWebView(MAIN_WEBVIEW, 'prepareMainMenuScene')
    public prepareMainMenuScene(@Player() player: CustomPlayer) {
        player.model = 'mp_m_freemode_01';
        player.spawn({ x: 0, y: 0, z: 72 });
    }
}
