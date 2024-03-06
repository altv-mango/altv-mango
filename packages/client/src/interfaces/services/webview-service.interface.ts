import * as altClient from '@altv/client';

export interface WebViewService {
    create(id: string | number, options: altClient._WebViewCreateOptionsDrawable): altClient.WebView;
    create(id: string | number, options: altClient._WebViewCreateOptionsOverlay): altClient.WebView;
    get(id: string | number): altClient.WebView | undefined;
    tryGet(id: string | number): altClient.WebView;
    destroy(id: string | number): void;
}
