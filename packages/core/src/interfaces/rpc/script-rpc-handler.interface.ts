export interface ScriptRPCHandler {
    readonly rpcName: string;
    readonly valid: boolean;
    readonly handler: Function;
    destroy(): void;
}
