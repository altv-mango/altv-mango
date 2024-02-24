export enum RPCResultStatus {
    Success = 1,
    Timeout = 2,
    HandlerNotFound = 3,
    Unknown = 4,
    CancelledByGuard = 5,
    InvalidGuardReturn = 6,
    TooManyRequests = 7,
    PlayerDisconnected = 8,
    PlayerNotFound = 9,
}
