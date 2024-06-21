import type * as Alt from 'alt-client';
import type {
    MultiplayerWebView,
    MultiplayerWebViewCreateOptionsDrawable,
    MultiplayerWebViewCreateOptionsOverlay,
    MultiplayerWebViewManager,
} from '../../../interfaces/multiplayer';
import { AltVWebViewV1 } from './altv-webview';

export class AltVWebViewManagerV1 implements MultiplayerWebViewManager {
    constructor(private altClient: typeof Alt) {}
    public create(options: MultiplayerWebViewCreateOptionsDrawable): MultiplayerWebView;
    public create(options: MultiplayerWebViewCreateOptionsOverlay): MultiplayerWebView;
    public create(options: MultiplayerWebViewCreateOptionsOverlay | MultiplayerWebViewCreateOptionsDrawable): MultiplayerWebView {
        let raw: Alt.WebView;
        if ('drawable' in options)
            raw = new this.altClient.WebView(
                options.url,
                typeof options.drawable === 'string' ? this.altClient.hash(options.drawable) : options.drawable,
                options.targetTexture,
            );
        else raw = new this.altClient.WebView(options.url, options.overlay);
        const webView: MultiplayerWebView = new AltVWebViewV1(raw);
        return webView;
    }

    public getByID(id: number): MultiplayerWebView | null {
        const webView = this.altClient.WebView.getByID(id);
        if (!webView) return null;
        return new AltVWebViewV1(webView);
    }
}
