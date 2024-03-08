import * as altShared from '@altv/shared';
import * as altServer from '@altv/server';

declare module '@altv/server' {
    export interface Player {
        emitWebView<E extends string>(id: string | number, eventName: E, body?: unknown): void;
        call<E extends string>(rpcName: E, body?: unknown, options?: altShared.RPCCallOptions): Promise<altShared.RPCResult>;
        callWebView<E extends string>(
            id: string | number,
            rpcName: E,
            body?: unknown,
            options?: RPCCallOptions,
        ): Promise<altShared.RPCResult>;
    }
}
