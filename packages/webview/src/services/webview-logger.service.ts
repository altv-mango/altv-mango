import type { LoggerService } from '@altv-mango/core';

export class WebViewLoggerService implements LoggerService {
    public log(...args: unknown[]) {
        console.log(`[🥭WebView][Log]`, ...args);
    }

    public error(...args: unknown[]) {
        console.error(`[🥭WebView][Error]`, ...args);
    }

    public warn(...args: unknown[]) {
        console.warn(`[🥭WebView][Warn]`, ...args);
    }

    public debug(...args: unknown[]) {
        console.debug(`[🥭WebView][Debug]`, ...args);
    }
}
