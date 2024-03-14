import { Controller, Inject, LOGGER_SERVICE, OnPlayerConnect, OnWebView, Player, type LoggerService } from '@altv-mango/server';
import type { CustomPlayer } from './custom-player';
import { MAIN_WEBVIEW } from '@shared/constants';

@Controller()
export class PlayerController {
    @Inject(LOGGER_SERVICE)
    private readonly loggerService: LoggerService;

    @OnPlayerConnect()
    public onPlayerConnect() {
        this.loggerService.log('Player connected');
        this.loggerService.warn('Player connected');
        this.loggerService.debug('Player connected');
        this.loggerService.error('Player connected');
    }

    @OnWebView(MAIN_WEBVIEW, 'prepareMainMenuScene')
    public prepareMainMenuScene(@Player() player: CustomPlayer) {
        player.model = 'mp_m_freemode_01';
        player.spawn({ x: 0, y: 0, z: 72 });
    }
}
