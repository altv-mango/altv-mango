import type * as AltShared from 'alt-shared';
import type * as AltClient from 'alt-client';
import { AltVWebViewManagerV1 } from './altv-webview-manager';
import type { ClientMultiplayerService, MultiplayerWebViewManager } from '../../../interfaces/multiplayer';
import { ClientAltVEventEmmiterV1 } from './altv-event-emmiter';
import type { ClientEventEmmiter } from '../../../interfaces';
import { AltMultiplayerServceV1 } from '@altv-mango/core/app';

export class ClientAltMultiplayerServceV1 extends AltMultiplayerServceV1 implements ClientMultiplayerService {
    public override Events: ClientEventEmmiter;
    public WebView: MultiplayerWebViewManager;
    constructor(altShared: typeof AltShared, altClient: typeof AltClient) {
        super(altShared);
        this.Events = new ClientAltVEventEmmiterV1(altShared, altClient);
        this.WebView = new AltVWebViewManagerV1(altClient);
    }
}
