import type { WebView, _WebViewCreateOptionsDrawable, _WebViewCreateOptionsOverlay } from '@altv/client';

export interface WebViewService {
    create(id: string | number, options: _WebViewCreateOptionsDrawable): WebView;
    create(id: string | number, options: _WebViewCreateOptionsOverlay): WebView;
    get(id: string | number): WebView | undefined;
    tryGet(id: string | number): WebView;
    destroy(id: string | number): void;
}
