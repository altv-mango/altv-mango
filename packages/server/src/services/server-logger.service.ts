import * as altServer from '@altv/server';
import { injectable } from 'inversify';
import { MANGO_LOG_PREFIX } from '@altv-mango/core/app';
import type { LoggerService } from '@altv-mango/core';

@injectable()
export class ServerLoggerService implements LoggerService {
    public log(...args: unknown[]): void {
        altServer.log(`~w~[~y~${MANGO_LOG_PREFIX}Server~w~][~lb~Log~w~]`, ...args);
    }

    public warn(...args: unknown[]): void {
        altServer.logWarning(`~w~[~y~${MANGO_LOG_PREFIX}Server~w~][~ly~Warn~w~]`, ...args);
    }

    public error(...args: unknown[]): void {
        altServer.logError(`~w~[~y~${MANGO_LOG_PREFIX}Server~w~][~lr~Error~w~]`, ...args);
    }

    public debug(...args: unknown[]): void {
        altServer.logDebug(`~w~[~y~${MANGO_LOG_PREFIX}Server~w~][~lc~Debug~w~]`, ...args);
    }
}
