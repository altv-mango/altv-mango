import type * as Alt from 'alt-client';
import type { MultiplayerWebView } from '../../../interfaces/multiplayer';

export class AltVWebViewV1 implements MultiplayerWebView {
    constructor(private $raw: Alt.WebView) {}

    public get valid(): boolean {
        return this.$raw.valid;
    }

    public destroy(): void {
        this.$raw.destroy();
    }

    public get url(): string {
        return this.$raw.url;
    }

    public set url(value: string) {
        this.$raw.url = value;
    }

    public get visible(): boolean {
        return this.$raw.isVisible;
    }

    public set visible(value: boolean) {
        this.$raw.isVisible = value;
    }

    emit(eventName: string, ...args: unknown[]): void {
        this.$raw.emit(eventName, ...args);
    }

    emitRaw(eventName: string, ...args: unknown[]): void {
        this.$raw.emit(eventName, ...args);
    }

    reload(ignoreCache: boolean): void {
        this.$raw.reload(ignoreCache);
    }

    on(eventName: string, listener: (...args: unknown[]) => void): void {
        this.$raw.on(eventName, listener);
    }

    once(eventName: string, listener: (...args: unknown[]) => void): void {
        this.$raw.once(eventName, listener);
    }

    off(eventName: string, listener: (...args: unknown[]) => void): void {
        this.$raw.off(eventName, listener);
    }
}
