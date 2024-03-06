export class InternalLoggerService {
    public log(message: string) {
        console.log(`[🥭Mango][Log] ${message}`);
    }

    public error(message: string) {
        console.error(`[🥭Mango][Error] ${message}`);
    }

    public warn(message: string) {
        console.warn(`[🥭Mango][Warn] ${message}`);
    }

    public debug(message: string) {
        console.debug(`[🥭Mango][Debug] ${message}`);
    }
}
