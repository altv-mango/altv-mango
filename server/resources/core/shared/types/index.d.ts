declare module '@altv/shared' {
    export namespace RPC {
        export interface CustomClientToServerRPC {
            EAT_MANGO: (body: { mangoId: number }) => boolean;
        }
    }
}
