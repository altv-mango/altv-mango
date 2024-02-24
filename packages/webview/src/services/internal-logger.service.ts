export class InternalLoggerService {
    public log(prefixes: string[], message: string) {
        const prefixString = prefixes.length > 0 ? `[${prefixes.join('][')}]` : '';
        console.log(`[${this.getTime()}] [🥭Mango]${prefixString} ${message}`);
    }

    public error(message: string) {
        this.log(['Error'], message);
    }

    private getTime() {
        return new Date().toLocaleTimeString('en-US', { hour12: false });
    }
}
