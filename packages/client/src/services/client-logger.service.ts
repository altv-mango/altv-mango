import { injectable, inject } from 'inversify';
import { MANGO_LOG_PREFIX } from '@altv-mango/core/app';
import type { LoggerService } from '@altv-mango/core';
import { MULTIPLAYER_SERVICE, type MultiplayerService } from '../../../core/src/app';

@injectable()
export class ClientLoggerService implements LoggerService {
    @inject(MULTIPLAYER_SERVICE) private readonly multiplayerService: MultiplayerService;
    public log(...args: unknown[]): void {
        this.multiplayerService.log(`~w~[~y~${MANGO_LOG_PREFIX}Client~w~][~lb~Log~w~]`, ...args);
    }

    public warn(...args: unknown[]): void {
        this.multiplayerService.logWarning(`[${MANGO_LOG_PREFIX}Client][Warn]`, ...args);
    }

    public error(...args: unknown[]): void {
        this.multiplayerService.logError(`[${MANGO_LOG_PREFIX}Client][Error]`, ...args);
    }

    public debug(...args: unknown[]): void {
        this.multiplayerService.logDebug(`~w~[~y~${MANGO_LOG_PREFIX}Client~w~][~lc~Debug~w~]`, ...args);
    }
}
