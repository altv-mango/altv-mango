import { Container, inject, injectable } from 'inversify';
import { INTERNAL_APP_CONTAINER, type MangoPlugin } from '@altv-mango/core/app';
import { ADD_WEBVIEW, WEBVIEW_SERVICE } from '../constants';
import type { _WebViewCreateOptionsDrawable, _WebViewCreateOptionsOverlay } from '@altv/client';
import type { ClientLoggerService, ClientWebViewService } from '../services';
import { LOGGER_SERVICE } from '..';

@injectable()
export class WebViewPlugin implements MangoPlugin {
    @inject(INTERNAL_APP_CONTAINER) private readonly internalAppContainer: Container;
    @inject(WEBVIEW_SERVICE) private readonly webViewService: ClientWebViewService;
    @inject(LOGGER_SERVICE) private readonly loggerService: ClientLoggerService;

    public async beforeLoad() {
        const time = Date.now();

        const addWebViews = this.internalAppContainer.isBound(ADD_WEBVIEW)
            ? this.internalAppContainer.get<
                  {
                      id: string | number;
                      options: _WebViewCreateOptionsDrawable | _WebViewCreateOptionsOverlay;
                  }[]
              >(ADD_WEBVIEW)
            : [];
        if (addWebViews.length === 0) return;

        addWebViews.forEach((webView) => {
            this.webViewService.create(webView.id, webView.options);
        });

        this.loggerService.log(`~lw~WebViews created ~lk~(${Date.now() - time}ms)`);
    }
}
