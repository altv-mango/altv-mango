import type * as Alt from '@altv/client';
import type {
    MultiplayerWebView,
    MultiplayerWebViewCreateOptionsDrawable,
    MultiplayerWebViewCreateOptionsOverlay,
    MultiplayerWebViewManager,
} from '../../../interfaces';

export class AltVWebViewManagerV2 implements MultiplayerWebViewManager {
    constructor(private readonly altClient: typeof Alt) {}
    create(options: MultiplayerWebViewCreateOptionsDrawable): MultiplayerWebView;
    create(options: MultiplayerWebViewCreateOptionsOverlay): MultiplayerWebView;
    create(options: MultiplayerWebViewCreateOptionsOverlay | MultiplayerWebViewCreateOptionsDrawable): MultiplayerWebView {
        return this.altClient.WebView.create(options);
    }

    public getByID(id: number): MultiplayerWebView | null {
        return this.altClient.WebView.getByID(id);
    }
}
