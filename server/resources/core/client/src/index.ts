import '@abraham/reflection';
import { createAppBuilder } from '@altv-mango/client';
import { RootModule } from './root.module';

const appBuilder = await createAppBuilder();
const app = appBuilder.build();
await app.start(RootModule);
