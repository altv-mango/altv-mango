import { Module } from '@altv-mango/server';
import { PlayerModule } from './player/player.module';
import { DatabaseModule } from './database/database.module';

@Module({
    imports: [DatabaseModule, PlayerModule],
})
export class RootModule {}
