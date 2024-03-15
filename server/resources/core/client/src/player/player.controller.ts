import {
    Inject,
    OnConnectionComplete,
    Controller,
    WEBVIEW_SERVICE,
    type WebViewService,
    OnServerRequest,
    LOGGER_SERVICE,
    type LoggerService,
} from '@altv-mango/client';
import { MAIN_WEBVIEW } from '@shared/constants';
import * as altClient from '@altv/client';

@Controller()
export class PlayerController {
    @Inject(WEBVIEW_SERVICE) private readonly webViewService: WebViewService;
    @Inject(LOGGER_SERVICE) private readonly loggerService: LoggerService;

    @OnConnectionComplete()
    public onConnectionComplete() {
        this.webViewService.tryGet(MAIN_WEBVIEW).focused = true;
        altClient.Cursor.visible = true;
    }

    @OnServerRequest('SERVER_TO_CLIENT_RPC_TEST')
    public onServerRequest() {
        this.loggerService.debug('Received SERVER_TO_CLIENT_RPC_TEST');
        return 111;
    }
}
