import { inject, injectable } from 'inversify';
import { type LoggerService } from '../../interfaces';
import { LOGGER_SERVICE } from '../../constants';

@injectable()
export class InternalLoggerService {
    @inject(LOGGER_SERVICE) private loggerService: LoggerService;

    public log(prefixes: string[], message: string) {
        const prefixString = prefixes.length > 0 ? `${prefixes.join('.')}` : '';
        this.loggerService.log(`${prefixString} ${message}`);
    }

    public error(message: string) {
        this.loggerService.error(message);
    }
}
