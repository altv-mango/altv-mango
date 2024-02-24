import type { WebView } from '@altv/client';
import { inject, injectable } from 'inversify';
import { InternalLoggerService } from '@altv-mango/core/app';
import { ErrorMessage } from '@altv-mango/core';

@injectable()
export class WebViewListService {
    @inject(InternalLoggerService) private readonly $loggerService: InternalLoggerService;

    private readonly $webViews: Map<string | number, WebView> = new Map();

    public set(id: string | number, webView: WebView) {
        this.$webViews.set(id, webView);
    }

    public get(id: string | number) {
        return this.$webViews.get(id);
    }

    public tryGet(id: string | number) {
        const webView = this.$webViews.get(id);
        if (!webView || !webView.valid) {
            this.$loggerService.error('An error occurred while trying to get a WebView.');
            throw new Error(ErrorMessage.WebViewNotFound);
        }
        return webView;
    }

    public delete(id: string | number) {
        const webView = this.$webViews.get(id);
        if (webView) {
            webView.destroy();
            this.$webViews.delete(id);
        }
    }
}
