import {
    Inject,
    OnConnectionComplete,
    Controller,
    WEBVIEW_SERVICE,
    type WebViewService,
    OnServerRequest,
    LOGGER_SERVICE,
    type LoggerService,
    EVENT_SERVICE,
    type EventService,
} from '@altv-mango/client';
import { MAIN_WEBVIEW } from '@shared/constants';
import * as altClient from '@altv/client';

@Controller()
export class PlayerController {
    @Inject(WEBVIEW_SERVICE) private readonly webViewService: WebViewService;
    @Inject(LOGGER_SERVICE) private readonly loggerService: LoggerService;
    @Inject(EVENT_SERVICE) private readonly eventService: EventService;

    @OnConnectionComplete()
    public onConnectionComplete() {
        this.webViewService.tryGet(MAIN_WEBVIEW).focused = true;
        altClient.Cursor.visible = true;
        this.eventService.emitServer('HELLO_TEST', { foo: 'bar' });
    }

    @OnServerRequest('SERVER_TO_CLIENT_RPC_TEST')
    public onServerRequest() {
        this.loggerService.debug('Received SERVER_TO_CLIENT_RPC_TEST');
        return 111;
    }

    @OnServerRequest('TEST_RPC')
    public onTestRPC() {
        return 'Hello from client';
    }
}
