declare module '@altv/shared' {
    export namespace RPC {
        export interface CustomClientToServerRPC {}
        export interface CustomClientToWebviewRPC {}
        export interface CustomServerToClientRPC {}
        export interface CustomServerToWebViewRPC {}
        export interface CustomWebViewToClientRPC {}
        export interface CustomWebViewToServerRPC {}
    }

    export namespace Events {
        export interface CustomWebViewToServerEvent {}
        export interface CustomServerToWebViewEvent {}
        export interface CustomClientToWebViewEvent {}
        export interface CustomServerToPlayerEvent {}
        export interface CustomPlayerToServerEvent {}
        export interface CustomWebViewToClientEvent {}
    }
}

declare module '@altv/client' {
    export namespace RPC {
        export interface CustomClientRPC {}
    }
}

declare module 'alt-client' {
    export interface IClientEvent {
        // TODO: delete when client types are updated
        pedDamage: (ped: Ped, attacker: Entity | null, healthDamage: number, armourDamage: number, weapon: number) => void | boolean;
        pedDeath: (ped: Ped, killer: Entity | null, weaponHash: number) => void | boolean;
        pedHeal: (ped: Ped, oldHealth: number, newHealth: number, oldArmour: number, newArmour: number) => void | boolean;
    }
}