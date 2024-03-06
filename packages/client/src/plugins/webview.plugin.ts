import { Container, inject, injectable } from 'inversify';
import { INTERNAL_APP_CONTAINER, type MangoPlugin } from '@altv-mango/core/app';
import { ADD_WEBVIEW, WEBVIEW_SERVICE } from '../constants';
import type { _WebViewCreateOptionsDrawable, _WebViewCreateOptionsOverlay } from '@altv/client';
import type { ClientWebViewService } from '../services';

@injectable()
export class WebViewPlugin implements MangoPlugin {
    @inject(INTERNAL_APP_CONTAINER) private readonly internalAppContainer: Container;
    @inject(WEBVIEW_SERVICE) private readonly webViewService: ClientWebViewService;

    public beforeStart() {
        const addWebViews = this.internalAppContainer.get<
            {
                id: string | number;
                options: _WebViewCreateOptionsDrawable | _WebViewCreateOptionsOverlay;
            }[]
        >(ADD_WEBVIEW);
        addWebViews.forEach((webView) => this.webViewService.create(webView.id, webView.options));
    }
}
