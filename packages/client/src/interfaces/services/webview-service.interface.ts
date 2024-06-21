import type { MultiplayerWebView, MultiplayerWebViewCreateOptionsDrawable, MultiplayerWebViewCreateOptionsOverlay } from '../multiplayer';

export interface WebViewService {
    create(id: string | number, options: MultiplayerWebViewCreateOptionsOverlay): MultiplayerWebView;
    create(id: string | number, options: MultiplayerWebViewCreateOptionsDrawable): MultiplayerWebView;
    get(id: string | number): MultiplayerWebView | undefined;
    tryGet(id: string | number): MultiplayerWebView;
    destroy(id: string | number): void;
}
