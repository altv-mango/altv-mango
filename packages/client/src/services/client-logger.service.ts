import * as altClient from '@altv/client';
import { injectable } from 'inversify';
import { MANGO_LOG_PREFIX } from '@altv-mango/core/app';
import type { LoggerService } from '@altv-mango/core';

@injectable()
export class ClientLoggerService implements LoggerService {
    public log(...args: unknown[]): void {
        altClient.log(`~w~[~y~${MANGO_LOG_PREFIX}Client~w~][~lb~Log~w~]`, ...args);
    }

    public warn(...args: unknown[]): void {
        altClient.logWarning(`[${MANGO_LOG_PREFIX}Client][Warn]`, ...args);
    }

    public error(...args: unknown[]): void {
        altClient.logError(`[${MANGO_LOG_PREFIX}Client][Error]`, ...args);
    }

    public debug(...args: unknown[]): void {
        altClient.logDebug(`~w~[~y~${MANGO_LOG_PREFIX}Client~w~][~lc~Debug~w~]`, ...args);
    }
}
