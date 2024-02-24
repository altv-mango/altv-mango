export enum CoreMetadataKey {
    // General
    Injectable = 'mango:injectable',
    Inject = 'mango:inject',
    Module = 'mango:module',
    GlobalModule = 'mango:global-module',
    Controller = 'mango:controller-options',
    // Events & RPC
    ControllerEvents = 'mango:controller-events',
    ControllerRPCs = 'mango:controller-rpcs',
    ControllerParams = 'mango:controller-rpc-params',
    // Pipeline
    Guards = 'mango:guards',
    Interceptors = 'mango:interceptors',
    Pipes = 'mango:pipes',
    // Error
    Catch = 'mango:catch',
    ErrorFilters = 'mango:error-filters',
}
