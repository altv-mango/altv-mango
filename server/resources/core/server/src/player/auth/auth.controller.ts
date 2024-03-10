import { Controller, Inject, OnWebViewRequest, Param, Player, isNil } from '@altv-mango/server';
import { MAIN_WEBVIEW } from '@shared/constants';
import type { DiscordUser } from '@shared/interfaces';
import axios from 'axios';
import type { CustomPlayer } from '../custom-player';
import { DatabaseService } from '../../database/database.service';
import { authTable, playerTable } from '../../database/tables';
import { and, eq } from 'drizzle-orm';

@Controller()
export class AuthController {
    @Inject() private readonly databaseService: DatabaseService;

    @OnWebViewRequest(MAIN_WEBVIEW)
    public async login(@Player() player: CustomPlayer, @Param('provider') provider: 'discord', @Param('token') token?: string) {
        if (provider === 'discord' && !isNil(token)) {
            return this.handleDiscordLogin(player, token);
        }
        return false;
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

        if (isNil(response) || response.status !== 200) {
            player.loggedIn = false;
            return false;
        }

        await this.createPlayer(player, response.data);
        player.loggedIn = true;
        return true;
    }

    private async createPlayer(player: CustomPlayer, discordUser: DiscordUser) {
        const result = await this.databaseService.database
            .select()
            .from(playerTable)
            .innerJoin(authTable, and(eq(authTable.playerId, playerTable.id), eq(authTable.provider, 'discord')))
            .execute();

        if (result.length > 0) return;

        await this.databaseService.database.transaction(async (trx) => {
            await trx.insert(playerTable).values({});
            await trx.insert(authTable).values({
                provider: 'discord',
                id: discordUser.id,
                playerId: player.id,
                data: discordUser,
            });
        });
    }
}
