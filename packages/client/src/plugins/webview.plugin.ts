import { inject, injectable } from 'inversify';
import type { MangoPlugin } from '@altv-mango/core/app';
import { ADD_WEBVIEW, WEBVIEW_SERVICE } from '../constants';
import type { _WebViewCreateOptionsDrawable, _WebViewCreateOptionsOverlay } from '@altv/client';
import type { ClientWebViewService } from '../services';

@injectable()
export class WebViewPlugin implements MangoPlugin {
    @inject(WEBVIEW_SERVICE) private readonly webViewService: ClientWebViewService;
    @inject(ADD_WEBVIEW) private readonly addWebViews: {
        id: string | number;
        options: _WebViewCreateOptionsDrawable | _WebViewCreateOptionsOverlay;
    }[];

    public beforeCreate() {
        this.addWebViews.forEach((webView) => this.webViewService.create(webView.id, webView.options));
    }
}
