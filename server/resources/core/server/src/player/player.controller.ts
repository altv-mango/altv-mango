import { Controller, OnPlayerConnect, Player } from '@altv-mango/server';
import * as altServer from '@altv/server';

@Controller()
export class PlayerController {
    @OnPlayerConnect()
    public onPlayerConnect(@Player() player: altServer.Player) {
        player.loggedIn = false;
    }
}
