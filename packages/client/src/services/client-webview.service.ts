import { inject, injectable } from 'inversify';
import { WEBVIEW_LIST_SERVICE } from '../constants';
import type { WebViewListService } from './webview-list.service';
import { InternalLoggerService } from '@altv-mango/core/app';
import { ErrorMessage, isNumber, isString } from '@altv-mango/core';
import type { WebViewService } from '../interfaces';
import * as altClient from '@altv/client';

@injectable()
export class ClientWebViewService implements WebViewService {
    @inject(InternalLoggerService) private readonly $loggerService: InternalLoggerService;
    @inject(WEBVIEW_LIST_SERVICE) private readonly $webViewListService: WebViewListService;
    private readonly $createListeners: ((id: string | number, webView: altClient.WebView) => void)[] = [];

    public create(id: string | number, options: altClient._WebViewCreateOptionsDrawable): altClient.WebView;
    public create(id: string | number, options: altClient._WebViewCreateOptionsOverlay): altClient.WebView;
    public create(id: string | number, options: altClient._WebViewCreateOptionsOverlay) {
        if (!isString(id) && !isNumber(id)) {
            this.$loggerService.error('An error occurred while trying to create a WebView.');
            throw new Error(ErrorMessage.WebViewIdMustBeStringOrNumber);
        }

        const webView = altClient.WebView.create(options);
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

    public $onCreate(listener: (id: string | number, webView: altClient.WebView) => void) {
        this.$createListeners.push(listener);
    }
}
