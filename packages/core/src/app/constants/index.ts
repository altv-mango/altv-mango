import { RPCResultStatus } from '../../enums';
import type { RPCResult } from '../../interfaces';

export const INTERNAL_APP_CONTAINER = 'INTERNAL_APP_CONTAINER';
export const GLOBAL_APP_CONTAINER = 'GLOBAL_APP_CONTAINER';
export const APP_ENVIROMENT = 'APP_ENVIROMENT';

export const GLOBAL_GUARDS = 'GLOBAL_GUARDS';
export const GLOBAL_INTERCEPTORS = 'GLOBAL_INTERCEPTORS';
export const GLOBAL_PIPES = 'GLOBAL_PIPES';
export const GLOBAL_ERROR_FILTERS = 'GLOBAL_ERROR_FILTERS';

export const PLUGINS = 'PLUGINS';

export const ENABLE_SHUTDOWN_HOOKS = 'ENABLE_SHUTDOWN_HOOKS';
export const CONTAINER_OPTIONS = 'CONTAINER_OPTIONS';
export const LOG_ERROR_STACKTRACE = 'LOG_ERROR_STACKTRACE';

export const MANGO_LOG_PREFIX = '🥭';

export const MANGO_REQUEST_FACTORY = 'MANGO_REQUEST_FACTORY';
export const MANGO_RESPONSE_FACTORY = 'MANGO_RESPONSE_FACTORY';
export const EXECUTION_CONTEXT_FACTORY = 'EXECUTION_CONTEXT_FACTORY';

export const MULTIPLAYER_SERVICE = 'MULTIPLAYER_SERVICE';

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
