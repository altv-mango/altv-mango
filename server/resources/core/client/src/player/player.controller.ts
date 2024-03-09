import {
    Inject,
    LOGGER_SERVICE,
    OnConnectionComplete,
    type LoggerService,
    Controller,
    WEBVIEW_SERVICE,
    type WebViewService,
} from '@altv-mango/client';
import * as altClient from '@altv/client';
import { MAIN_WEBVIEW } from '@shared/constants';

@Controller()
export class PlayerController {
    @Inject(LOGGER_SERVICE) private readonly loggerService: LoggerService;
    @Inject(WEBVIEW_SERVICE) private readonly webViewService: WebViewService;

    @OnConnectionComplete()
    public onConnectionComplete() {
        this.loggerService.log('Hello from the client!');
        this.webViewService.tryGet(MAIN_WEBVIEW).focused = true;
        altClient.Cursor.visible = true;
    }
}
