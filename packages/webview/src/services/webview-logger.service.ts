import type { LoggerService } from '@altv-mango/core/interfaces';

export class WebViewLoggerService implements LoggerService {
    public log(message: string) {
        console.log(`[🥭WebView][Log] ${message}`);
    }

    public error(message: string) {
        console.error(`[🥭WebView][Error] ${message}`);
    }

    public warn(message: string) {
        console.warn(`[🥭WebView][Warn] ${message}`);
    }

    public debug(message: string) {
        console.debug(`[🥭WebView][Debug] ${message}`);
    }
}
