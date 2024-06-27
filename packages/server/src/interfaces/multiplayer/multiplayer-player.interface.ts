export interface MultiplayerPlayer {
    emit(eventName: string, ...args: any[]): void;
    emitRaw(eventName: string, ...args: any[]): void;
    emitWebView(webViewId: string | number, eventName: string, ...args: any[]): void;
    valid: boolean;
}
