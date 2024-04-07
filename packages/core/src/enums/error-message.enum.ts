export enum ErrorMessage {
    TooManyRequests = 'Too many requests.',

    // Events
    EventNameMustBeString = 'The event name must be a string.',
    EventNameMustBeUnique = 'The event name must be unique.',
    EventNotAllowedInClient = 'The event is not allowed in the client environment.',
    EventNotAllowedInServer = 'The event is not allowed in the server environment.',
    InvalidEventType = 'Invalid event type.',
    InvalidInternalEventName = 'The name of the internal event is invalid.',

    // RPC
    RPCNameMustBeString = 'The RPC name must be a string.',
    RPCNameMustBeUnique = 'The RPC name must be unique.',
    RPCNotAllowedInClient = 'The RPC is not allowed in the client environment.',
    RPCNotAllowedInServer = 'The RPC is not allowed in the server environment.',
    InvalidRPCType = 'Invalid RPC type.',
    RPCHandlerAlreadyExists = 'The RPC handler already exists. Please provide a unique name for the RPC.',
    RPCResponseAlreadySent = 'The RPC response has already been sent.',

    // Error filters
    InvalidErrorFilterDefinition = 'Invalid error filter. Error filters must be a class reference or an object with a catch method.',
    ErrorAlreadyHandledByFilter = 'The error already points to a filter.',
    ExceptionHandlingConflict = 'The same exception can only be caught once.',
    AtLeastOneFilterRequired = 'At least one error filter must be provided.',
    DuplicateErrorFilterDetected = 'Duplicate error filter found. Ensure that the same filter is not applied more than once.',

    // WebView
    WebViewNotFound = 'The WebView with the specified id does not exist.',
    WebViewIdMustBeStringOrNumber = 'The WebView id must be a string or number.',

    // Guard
    InvalidGuardDefinition = 'Invalid guard. Guards must be a class reference or an object with a canActivate method.',
    AtLeastOneGuardRequired = 'At least one guard must be provided.',

    // Interceptor
    InvalidInterceptorDefinition = 'Invalid interceptor. Interceptors must be a class reference or an object with an intercept method.',
    AtLeastOneInterceptorRequired = 'At least one interceptor must be provided.',
    InvalidInterceptorReturnValue = 'The interceptor must return a function.',

    // Pipe
    InvalidPipeDefinition = 'Invalid pipe. Pipes must be a class reference or an object with a transform method.',
    AtLeastOnePipeRequired = 'At least one pipe must be provided.',

    // App loading
    AppAlreadyLoaded = 'App is already loaded. Please call the stop method before calling the start method.',
    AppNotLoaded = 'App is not loaded. Please call the start method before calling the stop method.',

    // Decorators
    InvalidInjectionTokenSpecified = 'The specified injection token is invalid.',
    InjectionTokenNotFound = 'The injection token could not be found.',
    ParamKeyMustBeString = 'The param key must be a string.',
    IndexKeyMustBeNumber = 'The index key must be a number.',
    DuplicateDecoratorUsage = 'The same decorator can only be used once in the same class.',
    InvalidControllerOptions = 'Invalid controller options found.',
    InvalidInjectableOptions = 'Invalid injectable options found.',
    InvalidModuleOptions = 'Invalid module options found.',
    MultipleDecoratorsOnSingleParameterNotAllowed = 'Cannot apply multiple decorators to the same parameter.',

    // Internal App
    CircularDependencyDetected = 'Circular dependency detected.',
    InvalidModuleDefinition = 'The module is invalid.',
    InvalidExportDefinition = 'The export is invalid.',
    InvalidProviderDefinition = 'The provider is invalid.',
    InvalidParameterDecoratorUsage = 'Each parameter must have their its own decorator.',
    ResponseDecoratorNotAllowedOnEvents = 'The @Response() decorator is not allowed on events.',
    PlayerDecoratorNotAllowedOnClientEvents = 'The @Player() decorator is not allowed on client events.',

    // Timers
    TimerNameMustBeString = 'The timer name must be a string.',
}
