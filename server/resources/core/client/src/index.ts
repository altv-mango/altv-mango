import '@abraham/reflection';
import { createAppBuilder } from '@altv-mango/client';
import { RootModule } from './root.module';
import { MAIN_WEBVIEW } from '@shared/constants';

const appBuilder = await createAppBuilder();
appBuilder.addWebView(MAIN_WEBVIEW, { url: 'http://localhost:5173', isVisible: true });
const app = await appBuilder.build();
await app.start(RootModule);
