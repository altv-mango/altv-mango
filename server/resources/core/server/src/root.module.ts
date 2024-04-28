import {
    Controller,
    Inject,
    LOGGER_SERVICE,
    Module,
    OnPlayerConnect,
    OnPlayerDisconnect,
    Player,
    type LoggerService,
    type OnModuleInit,
} from '@altv-mango/server';
import * as alt from '@altv/server';

@Controller()
export class RootController implements OnModuleInit {
    @Inject(LOGGER_SERVICE) private readonly loggerService: LoggerService;

    @OnPlayerDisconnect()
    public onPlayerDisconnect(@Player() player: alt.Player) {
        this.loggerService.debug(`Player ${player.name} disconnected`);
    }

    @OnPlayerConnect()
    public onPlayerConnect(@Player() player: alt.Player) {
        this.loggerService.debug(`Player ${player.name} connected`);
    }

    public onModuleInit() {}
}

@Module({
    controllers: [RootController],
})
export class RootModule {}
