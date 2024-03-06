import { log, logDebug, logError, logWarning } from '@altv/server';
import { injectable } from 'inversify';
import { MANGO_LOG_PREFIX } from '@altv-mango/core/app';
import type { LoggerService } from '@altv-mango/core';

@injectable()
export class ServerLoggerService implements LoggerService {
    public log(...args: unknown[]): void {
        log(`~w~[~y~${MANGO_LOG_PREFIX}~w~][~lb~Log~w~]`, ...args);
    }

    public warn(...args: unknown[]): void {
        logWarning(`~w~[~y~${MANGO_LOG_PREFIX}~w~][~ly~Warn~w~]`, ...args);
    }

    public error(...args: unknown[]): void {
        logError(`~w~[~y~${MANGO_LOG_PREFIX}~w~][~lr~Error~w~]`, ...args);
    }

    public debug(...args: unknown[]): void {
        logDebug(`~w~[~y~${MANGO_LOG_PREFIX}~w~][~lc~Debug~w~]`, ...args);
    }
}
