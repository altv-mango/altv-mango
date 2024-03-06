import { RPCResultStatus } from '../enums';
import { MangoError } from './mango.error';

export class GuardCancelError extends MangoError {
    public constructor() {
        super('Process cancelled by the guard.', RPCResultStatus.CancelledByGuard);
    }
}
