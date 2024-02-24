import { RPCResultStatus } from '../enums';
import { MangoError } from './mango.error';

export class UnknownError extends MangoError {
    public constructor() {
        super('Unknown error.', RPCResultStatus.Unknown);
    }
}
