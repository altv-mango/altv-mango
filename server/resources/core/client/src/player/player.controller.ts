import { Inject, OnConnectionComplete, Controller, WEBVIEW_SERVICE, type WebViewService, OnServerRequest } from '@altv-mango/client';
import { MAIN_WEBVIEW } from '@shared/constants';
import * as altClient from '@altv/client';

@Controller()
export class PlayerController {
    @Inject(WEBVIEW_SERVICE) private readonly webViewService: WebViewService;

    @OnConnectionComplete()
    public onConnectionComplete() {
        this.webViewService.tryGet(MAIN_WEBVIEW).focused = true;
        altClient.Cursor.visible = true;
    }

    @OnServerRequest('TEST_RPC')
    public onTestRPC() {
        return 'Hello from client';
    }
}
