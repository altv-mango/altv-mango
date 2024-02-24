import { RPCResultStatus } from '../enums';
import type { RPCResult } from '../interfaces';

export const RPC_RESULT_TIMEOUT: RPCResult = {
    success: false,
    error: { message: 'RPC call timed out.' },
    status: RPCResultStatus.Timeout,
};

export const RPC_RESULT_HANDLER_NOT_FOUND: RPCResult = {
    success: false,
    error: { message: 'RPC handler not found.' },
    status: RPCResultStatus.HandlerNotFound,
};

export const RPC_RESULT_UNKNOWN: RPCResult = {
    success: false,
    error: { message: 'Unknown error.' },
    status: RPCResultStatus.Unknown,
};

export const RPC_RESULT_PLAYER_DISCONNECTED: RPCResult = {
    success: false,
    error: { message: 'Player disconnected.' },
    status: RPCResultStatus.PlayerDisconnected,
};

export const RPC_RESULT_PLAYER_NOT_FOUND: RPCResult = {
    success: false,
    error: { message: 'Player not found.' },
    status: RPCResultStatus.PlayerNotFound,
};
