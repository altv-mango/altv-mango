import type { ClientMultiplayerService, MultiplayerWebViewManager } from '../../../interfaces/multiplayer';
import type * as AltShared from '@altv/shared';
import type * as AltClient from '@altv/client';
import { ClientAltVEventEmmiterV2 } from './altv-event-emmiter';
import type { ClientEventEmmiter } from '../../../interfaces';
import { AltVWebViewManagerV2 } from './altv-webview-manager';
import { AltMultiplayerServceV2 } from '@altv-mango/core/app';

export class ClientAltMultiplayerServceV2 extends AltMultiplayerServceV2 implements ClientMultiplayerService {
    public override Events: ClientEventEmmiter;
    public WebView: MultiplayerWebViewManager;
    constructor(altShared: typeof AltShared, altClient: typeof AltClient) {
        super(altShared);
        this.Events = new ClientAltVEventEmmiterV2(altShared, altClient);
        this.WebView = new AltVWebViewManagerV2(altClient);
    }
}
