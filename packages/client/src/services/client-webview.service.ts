import { inject, injectable } from 'inversify';
import { WEBVIEW_LIST_SERVICE } from '../constants';
import type { WebViewListService } from './webview-list.service';
import { ErrorMessage, isNumber, isString, LOGGER_SERVICE, type LoggerService } from '@altv-mango/core';
import type { WebViewService } from '../interfaces';
import type {
    ClientMultiplayerService,
    MultiplayerWebView,
    MultiplayerWebViewCreateOptionsDrawable,
    MultiplayerWebViewCreateOptionsOverlay,
} from '../interfaces/multiplayer';
import { MULTIPLAYER_SERVICE } from '@altv-mango/core/app';

@injectable()
export class ClientWebViewService implements WebViewService {
    @inject(LOGGER_SERVICE) private readonly $loggerService: LoggerService;
    @inject(WEBVIEW_LIST_SERVICE) private readonly $webViewListService: WebViewListService;
    @inject(MULTIPLAYER_SERVICE) private readonly multiplayer: ClientMultiplayerService;
    private readonly $createListeners: ((id: string | number, webView: MultiplayerWebView) => void)[] = [];

    public create(id: string | number, options: MultiplayerWebViewCreateOptionsOverlay): MultiplayerWebView;
    public create(id: string | number, options: MultiplayerWebViewCreateOptionsDrawable): MultiplayerWebView;
    public create(
        id: string | number,
        options: MultiplayerWebViewCreateOptionsOverlay | MultiplayerWebViewCreateOptionsDrawable,
    ): MultiplayerWebView {
        if (!isString(id) && !isNumber(id)) {
            this.$loggerService.error('An error occurred while trying to create a WebView.');
            throw new Error(ErrorMessage.WebViewIdMustBeStringOrNumber);
        }

        const webView = this.multiplayer.WebView.create(options);
        this.$webViewListService.set(id, webView);
        this.$createListeners.forEach((listener) => listener(id, webView));
        return webView;
    }

    public get(id: string | number) {
        return this.$webViewListService.get(id);
    }

    public tryGet(id: string | number) {
        return this.$webViewListService.tryGet(id);
    }

    public destroy(id: string | number) {
        const webView = this.$webViewListService.get(id);
        if (webView) {
            webView.destroy();
            this.$webViewListService.delete(id);
        }
    }

    public $onCreate(listener: (id: string | number, webView: MultiplayerWebView) => void) {
        this.$createListeners.push(listener);
    }
}
