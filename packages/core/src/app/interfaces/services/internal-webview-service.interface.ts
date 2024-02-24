import type { WebView } from '@altv/client';

export interface InternalWebViewService {
    $onCreate(listener: (id: string | number, webView: WebView) => void): void;
}
