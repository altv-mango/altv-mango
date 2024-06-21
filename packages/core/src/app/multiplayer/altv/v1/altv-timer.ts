import type { MultiplayerTimer } from '../../../interfaces';

export class AltVTimer implements MultiplayerTimer {
    public lastTick = Date.now();
    constructor(
        public id: number,
        public interval: number = 0,
        public once: boolean,
        public callback: Function,
        private clearTimer: Function,
    ) {}

    destroy() {
        this.clearTimer();
    }
}
