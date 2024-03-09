import { Module } from '@altv-mango/client';
import { PlayerModule } from './player/player.module';

@Module({
    imports: [PlayerModule],
})
export class RootModule {}
