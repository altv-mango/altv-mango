import { RPCResultStatus } from '../enums';
import { MangoError } from './mango.error';

export class TooManyRequests extends MangoError {
    public constructor(message = 'Too many requests.') {
        super(message, RPCResultStatus.TooManyRequests);
    }
}
