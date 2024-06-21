export interface MultiplayerTimer {
    id: number;
    interval: number;
    callback: Function;
    lastTick: number;
    once?: boolean;
    destroy(): void;
}

export interface MultiplayerTimers {
    all: MultiplayerTimer[];
    warningThreshold: number;
    sourceLocationFrameSkipCount: number;

    getByID(id: number): MultiplayerTimer | null;
    time(name?: string): void;
    timeEnd(name?: string): void;

    setInterval(callback: Function, interval: number, ...args: unknown[]): MultiplayerTimer;
    setTimeout(callback: Function, timeout: number, ...args: unknown[]): MultiplayerTimer;
    everyTick(callback: Function, ...args: unknown[]): MultiplayerTimer;
    nextTick(callback: Function, ...args: unknown[]): MultiplayerTimer;
}
