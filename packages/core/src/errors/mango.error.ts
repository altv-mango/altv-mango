import { RPCResultStatus } from '../enums';

export class MangoError<TDetails = unknown> extends Error {
    public status: number = RPCResultStatus.Unknown;
    public details: TDetails | undefined;

    public constructor(message: string, status?: number, details?: TDetails) {
        super(message);
        this.status = status ?? RPCResultStatus.Unknown;
        this.details = details;
    }
}
