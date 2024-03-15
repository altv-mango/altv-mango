import {
    Controller,
    Inject,
    LOGGER_SERVICE,
    OnPlayerConnect,
    OnWebView,
    Player,
    type LoggerService,
    RPC_SERVICE,
    type RPCService,
} from '@altv-mango/server';
import type { CustomPlayer } from './custom-player';
import { MAIN_WEBVIEW } from '@shared/constants';

@Controller()
export class PlayerController {
    @Inject(LOGGER_SERVICE)
    private readonly loggerService: LoggerService;

    @Inject(RPC_SERVICE)
    private readonly rpcService: RPCService;

    @OnPlayerConnect()
    public async onPlayerConnect(@Player() player: CustomPlayer) {
        this.loggerService.log(`Player ${player.name} connected`);

        setTimeout(async () => {
            const result = await this.rpcService.callPlayer(player, 'TEST_RPC', undefined, { timeout: 10000 });
            this.loggerService.log(result);
        }, 5000);
    }

    @OnWebView(MAIN_WEBVIEW, 'prepareMainMenuScene')
    public prepareMainMenuScene(@Player() player: CustomPlayer) {
        player.model = 'mp_m_freemode_01';
        player.spawn({ x: 0, y: 0, z: 72 });
    }
}
