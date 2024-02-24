import { inject, injectable } from 'inversify';
import type { RPCError } from '../../interfaces';
import { InternalLoggerService } from '../services';
import type { MangoResponse } from '../interfaces';
import { ErrorMessage } from '../../enums';

@injectable()
export class MangoResponseBase implements MangoResponse {
    @inject(InternalLoggerService) private readonly $loggerService: InternalLoggerService;
    public $sendListeners: Set<(data: unknown) => void>;
    public $errorListeners: Set<(error: RPCError) => void>;
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
