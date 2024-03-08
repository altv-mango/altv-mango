import { inject, injectable } from 'inversify';
import type { LoggerService, RPCError } from '../../interfaces';
import type { MangoResponse } from '../interfaces';
import { ErrorMessage } from '../../enums';
import { LOGGER_SERVICE } from '../../constants';

@injectable()
export class MangoResponseBase implements MangoResponse {
    @inject(LOGGER_SERVICE) private readonly $loggerService: LoggerService;
    public $sendListeners: Set<(data: unknown) => void> = new Set();
    public $errorListeners: Set<(error: RPCError) => void> = new Set();
    public $isSent: boolean = false;

    public send<TData = unknown>(data?: TData) {
        if (this.$isSent) {
            this.$loggerService.error('An error occurred while sending the RPC response.');
            throw new Error(ErrorMessage.RPCResponseAlreadySent);
        }

        this.$sendListeners.forEach((listener) => listener(data));
        this.$isSent = true;
    }

    public error<TDetails = unknown>(message: string, details?: TDetails) {
        if (this.$isSent) {
            this.$loggerService.error('An error occurred while sending the RPC response.');
            throw new Error(ErrorMessage.RPCResponseAlreadySent);
        }
        this.$errorListeners.forEach((listener) => listener({ message, details }));
        this.$isSent = true;
    }

    public $onSend(listener: (data: unknown) => void) {
        this.$sendListeners.add(listener);
    }

    public $onError(listener: (error: RPCError) => void) {
        this.$errorListeners.add(listener);
    }
}
