export interface MultiplayerWebViewCreateOptionsOverlay {
    url: string;
    visible?: boolean;
    overlay?: boolean;
}

export interface MultiplayerWebViewCreateOptionsDrawable {
    url: string;
    drawable: number | string;
    targetTexture: string;
}

export interface MultiplayerWebView {
    readonly valid: boolean;
    url: string;
    destroy(): void;
    reload(ignoreCache: boolean): void;
    emit(eventName: string, ...args: unknown[]): void;
    on(eventName: string, listener: (...args: unknown[]) => void): void;
    once(eventName: string, listener: (...args: unknown[]) => void): void;
    off(eventName: string, listener: (...args: unknown[]) => void): void;
}

export interface MultiplayerWebViewManager {
    create(options: MultiplayerWebViewCreateOptionsDrawable): MultiplayerWebView;
    create(options: MultiplayerWebViewCreateOptionsOverlay): MultiplayerWebView;
    getByID(id: number): MultiplayerWebView | null;
}
