import '@abraham/reflection';
import 'dotenv/config';
import { createAppBuilder } from '@altv-mango/server';
import { RootModule } from './root.module';
import { CustomPlayer } from './player/custom-player';

const appBuilder = await createAppBuilder();
appBuilder.setPlayerFactory(CustomPlayer);
const app = await appBuilder.build();
await app.start(RootModule);
