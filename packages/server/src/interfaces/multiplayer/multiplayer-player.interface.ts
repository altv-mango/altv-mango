export interface MultiplayerPlayer {
    emit(eventName: string, ...args: any[]): void;
}
