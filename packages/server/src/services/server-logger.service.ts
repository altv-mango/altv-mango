import { inject, injectable } from 'inversify';
import { MANGO_LOG_PREFIX, MULTIPLAYER_SERVICE } from '@altv-mango/core/app';
import type { LoggerService } from '@altv-mango/core';
import type { ServerMultiplayerService } from '../interfaces';

@injectable()
export class ServerLoggerService implements LoggerService {
    @inject(MULTIPLAYER_SERVICE) multiplayerService: ServerMultiplayerService;
    public log(...args: unknown[]): void {
        this.multiplayerService.log(`~w~[~y~${MANGO_LOG_PREFIX}Server~w~][~lb~Log~w~]`, ...args);
    }

    public warn(...args: unknown[]): void {
        this.multiplayerService.logWarning(`[${MANGO_LOG_PREFIX}Server][Warn]`, ...args);
    }

    public error(...args: unknown[]): void {
        this.multiplayerService.logError(`[${MANGO_LOG_PREFIX}Server][Error]`, ...args);
    }

    public debug(...args: unknown[]): void {
        this.multiplayerService.logDebug(`~w~[~y~${MANGO_LOG_PREFIX}Server~w~][~lc~Debug~w~]`, ...args);
    }
}
