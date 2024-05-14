import type { MultiplayerService } from '@altv-mango/core/app';
import type { ClientEventEmmiter } from '../event';
import type { MultiplayerWebViewManager } from './multiplaer-web-view.interface';

export interface ClientMultiplayerService extends MultiplayerService {
    Events: ClientEventEmmiter;
    WebView: MultiplayerWebViewManager;
}
