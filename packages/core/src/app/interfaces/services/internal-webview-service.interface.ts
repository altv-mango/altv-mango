import * as altClient from '@altv/client';

export interface InternalWebViewService {
    $onCreate(listener: (id: string | number, webView: altClient.WebView) => void): void;
}
