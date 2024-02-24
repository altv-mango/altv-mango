import { injectable } from 'inversify';
import chalk from 'chalk';
import { MANGO_LOG_PREFIX } from '../constants';

@injectable()
export class InternalLoggerService {
    public log(prefixes: string[], message: string) {
        const prefixString = prefixes.length > 0 ? `${chalk.white('[')}${prefixes.join(chalk.white(']['))}${chalk.white(']')}` : '';
        console.log(
            `${chalk.white('[')}${this.getTime()}${chalk.white(']')} ${chalk.white('[')}${chalk.yellow(MANGO_LOG_PREFIX)}${chalk.white(
                ']',
            )}${prefixString} ${message}`,
        );
    }

    public error(message: string) {
        this.log([chalk.red('Error')], message);
    }

    private getTime() {
        return new Date().toLocaleTimeString('en-US', { hour12: false });
    }
}
