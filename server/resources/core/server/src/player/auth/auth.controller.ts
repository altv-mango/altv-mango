import {
    Controller,
    Inject,
    LOGGER_SERVICE,
    OnWebViewRequest,
    Param,
    Player,
    isNil,
    type LoggerService,
    EVENT_SERVICE,
    type EventService,
} from '@altv-mango/server';
import { MAIN_WEBVIEW } from '@shared/constants';
import type { DiscordUser } from '@shared/interfaces';
import * as altServer from '@altv/server';
import axios from 'axios';
import type { CustomPlayer } from '../custom-player';

@Controller()
export class AuthController {
    @Inject(LOGGER_SERVICE) private readonly loggerService: LoggerService;
    @Inject(EVENT_SERVICE) private readonly eventService: EventService;

    @OnWebViewRequest(MAIN_WEBVIEW)
    public async login(@Player() player: CustomPlayer, @Param('provider') provider: 'cloud' | 'discord', @Param('token') token?: string) {
        if (provider === 'cloud') {
            return this.handleCloudLogin(player);
        } else if (provider === 'discord' && !isNil(token)) {
            return this.handleDiscordLogin(player, token);
        }
        return false;
    }

    private async handleCloudLogin(player: CustomPlayer) {
        this.loggerService.log('Cloud login request received', { name: player.name, loudAuthResult: player.cloudAuthResult });
        const success = player.cloudAuthResult === altServer.Enums.CloudAuthResult.SUCCESS ? true : false;
        player.loggedIn = success;
        return success;
    }

    private async handleDiscordLogin(player: CustomPlayer, token: string) {
        const response = await axios
            .get<DiscordUser>('https://discordapp.com/api/users/@me', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            })
            .catch(() => null);

        this.loggerService.log(response?.data);

        if (isNil(response?.data)) {
            player.loggedIn = false;
            return false;
        }

        player.loggedIn = true;
        return true;
    }
}
