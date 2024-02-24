import { RPCResultStatus } from '../enums';
import { MangoError } from './mango.error';

export class GuardInvalidReturnError extends MangoError {
    public constructor() {
        super('Guard returned an invalid value. Expected boolean.', RPCResultStatus.InvalidGuardReturn);
    }
}
