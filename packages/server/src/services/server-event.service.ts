import { BaseEventService, MULTIPLAYER_SERVICE } from '@altv-mango/core/app';
import { inject, injectable } from 'inversify';
import { INTERNAL_EVENTS } from '../constants';
import type { EventService, ServerEventEmmiter, ServerMultiplayerService } from '../interfaces';
import type { Events as ServerEventsV2, Player } from '@altv/server';
import type { IServerEvent as ServerEventsV1 } from 'alt-server';
import type { Events as SharedEvents } from '@altv/shared';

@injectable()
export class ServerEventService extends BaseEventService<ServerEventsV2.CustomServerEvent> implements EventService {
    private $altEvents: ServerEventEmmiter;
    public constructor(@inject(MULTIPLAYER_SERVICE) multiplayerService: ServerMultiplayerService) {
        super(multiplayerService.Events);
        this.$altEvents = multiplayerService.Events;
        this.$internalEventNames = new Set(Object.values(INTERNAL_EVENTS));
    }

    public onPlayer<E extends string, U extends Player>(
        eventName: Exclude<E, keyof SharedEvents.CustomPlayerToServerEvent>,
        callback: (player: U, body: unknown) => void | Promise<void>,
    ) {
        const wrapper = (player: U, ...args: unknown[]) => callback(player, args[0]);
        const eventHandler = this.$altEvents.onPlayer(eventName, wrapper);
        this.$remoteHandlers.add(eventHandler);
        return eventHandler;
    }

    public oncePlayer<E extends string, U extends Player>(
        eventName: Exclude<E, keyof SharedEvents.CustomPlayerToServerEvent>,
        callback: (player: U, body: unknown) => void | Promise<void>,
    ) {
        const wrapper = (player: U, ...args: unknown[]) => callback(player, args[0]!);
        const eventHandler = this.$altEvents.oncePlayer(eventName, wrapper);
        this.$remoteHandlers.add(eventHandler);
        return eventHandler;
    }

    public onRemote<E extends string, U extends Player>(
        eventName: Exclude<E, keyof SharedEvents.CustomPlayerToServerEvent>,
        callback: (player: U, body: unknown) => void | Promise<void>,
    ) {
        return this.onPlayer(eventName, callback);
    }

    public onceRemote<E extends string, U extends Player>(
        eventName: Exclude<E, keyof SharedEvents.CustomPlayerToServerEvent>,
        callback: (player: U, body: unknown) => void | Promise<void>,
    ) {
        return this.oncePlayer(eventName, callback);
    }

    public emitPlayers<E extends string, U extends Player>(
        players: U[],
        eventName: Exclude<E, keyof SharedEvents.CustomServerToPlayerEvent>,
        body?: unknown,
    ) {
        for (const player of players) {
            player.emitRaw(eventName, body);
        }
    }

    public emitPlayersUnreliable<E extends string, U extends Player>(
        players: U[],
        eventName: Exclude<E, keyof SharedEvents.CustomServerToPlayerEvent>,
        body?: unknown,
    ) {
        for (const player of players) {
            player.emitUnreliableRaw(eventName, body);
        }
    }

    public emitAllPlayers<E extends string>(eventName: Exclude<E, keyof SharedEvents.CustomServerToPlayerEvent>, body?: unknown) {
        this.$altEvents.emitAllPlayersRaw(eventName, body);
    }

    public emitAllPlayersUnreliable<E extends string>(eventName: Exclude<E, keyof SharedEvents.CustomServerToPlayerEvent>, body?: unknown) {
        this.$altEvents.emitAllPlayersUnreliableRaw(eventName, body);
    }

    public onWebView<E extends string, U extends Player>(
        id: string | number,
        eventName: Exclude<E, keyof SharedEvents.CustomWebViewToServerEvent>,
        callback: (player: U, body: unknown) => void | Promise<void>,
    ) {
        return this.onPlayer(<string>`SERVER::ON_WEBVIEW_${eventName}_${id}`, <any>callback);
    }

    public onceWebView<E extends string, U extends Player>(
        id: string | number,
        eventName: Exclude<E, keyof SharedEvents.CustomWebViewToServerEvent>,
        callback: (player: U, body: unknown) => void | Promise<void>,
    ) {
        return this.oncePlayer(<string>`SERVER::ON_WEBVIEW_${eventName}_${id}`, <any>callback);
    }

    public emitWebViews<E extends string, U extends Player>(
        players: U[],
        id: string | number,
        eventName: Exclude<E, keyof SharedEvents.CustomServerToWebViewEvent>,
        body?: unknown,
    ) {
        (<EventService>this).emitPlayers(players, 'SERVER::EMIT_WEBVIEW', {
            id,
            eventName,
            payload: body,
        });
    }

    public emitAllWebViews<E extends string>(
        id: string | number,
        eventName: Exclude<E, keyof SharedEvents.CustomServerToWebViewEvent>,
        body?: unknown,
    ) {
        (<EventService>this).emitAllPlayers('SERVER::EMIT_WEBVIEW', {
            id,
            eventName,
            payload: body,
        });
    }

    public emitAllWebViewsUnreliable<E extends string>(
        id: string | number,
        eventName: Exclude<E, keyof SharedEvents.CustomServerToWebViewEvent>,
        body?: unknown,
    ) {
        (<EventService>this).emitAllPlayersUnreliable('SERVER::EMIT_WEBVIEW', {
            id,
            eventName,
            payload: body,
        });
    }

    public onScriptRPC<T extends Player>(callback: ServerEventsV2.GenericPlayerEventCallback<ServerEventsV2.ScriptRPCEventParameters, T>) {
        return this.$altEvents.on('scriptRPC', callback);
    }

    public onceScriptRPC<T extends Player>(
        callback: ServerEventsV2.GenericPlayerEventCallback<ServerEventsV2.ScriptRPCEventParameters, T>,
    ) {
        return this.$altEvents.once('scriptRPC', callback);
    }

    public onScriptRPCAnswer<T extends Player>(
        callback: ServerEventsV2.GenericPlayerEventCallback<ServerEventsV2.ScriptRPCAnswerEventParameters, T>,
    ) {
        return this.$altEvents.on('scriptRPCAnswer', callback);
    }

    public onceScriptRPCAnswer<T extends Player>(
        callback: ServerEventsV2.GenericPlayerEventCallback<ServerEventsV2.ScriptRPCAnswerEventParameters, T>,
    ) {
        return this.$altEvents.once('scriptRPCAnswer', callback);
    }

    public onServerStarted(
        callback: ServerEventsV2.GenericEventCallback | ServerEventsV2.GenericEventCallback<ServerEventsV1['serverStarted']>,
    ) {
        return this.$altEvents.on('serverStarted', callback);
    }

    public onceServerStarted(
        callback: ServerEventsV2.GenericEventCallback | ServerEventsV2.GenericEventCallback<ServerEventsV1['serverStarted']>,
    ) {
        return this.$altEvents.once('serverStarted', callback);
    }

    public onConnectionQueueAdd(
        callback:
            | ServerEventsV2.GenericEventCallback<ServerEventsV2.ConnectionQueueEventParameters>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['connectionQueueAdd']>,
    ) {
        return this.$altEvents.on('connectionQueueAdd', callback);
    }

    public onceConnectionQueueAdd(
        callback:
            | ServerEventsV2.GenericEventCallback<ServerEventsV2.ConnectionQueueEventParameters>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['connectionQueueAdd']>,
    ) {
        return this.$altEvents.once('connectionQueueAdd', callback);
    }

    public onConnectionQueueRemove(
        callback:
            | ServerEventsV2.GenericEventCallback<ServerEventsV2.ConnectionQueueEventParameters>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['connectionQueueRemove']>,
    ) {
        return this.$altEvents.on('connectionQueueRemove', callback);
    }

    public onceConnectionQueueRemove(
        callback:
            | ServerEventsV2.GenericEventCallback<ServerEventsV2.ConnectionQueueEventParameters>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['connectionQueueRemove']>,
    ) {
        return this.$altEvents.once('connectionQueueRemove', callback);
    }

    public onPlayerConnect<T extends Player>(
        callback:
            | ServerEventsV2.GenericPlayerEventCallback<ServerEventsV2.PlayerConnectEventParameters, T>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['playerConnect']>,
    ) {
        return this.$altEvents.on('playerConnect', callback);
    }

    public oncePlayerConnect<T extends Player>(
        callback:
            | ServerEventsV2.GenericPlayerEventCallback<ServerEventsV2.PlayerConnectEventParameters, T>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['playerConnect']>,
    ) {
        return this.$altEvents.once('playerConnect', callback);
    }

    public onPlayerConnectDenied(
        callback:
            | ServerEventsV2.GenericEventCallback<ServerEventsV2.PlayerConnectDeniedEventParameters>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['playerConnectDenied']>,
    ) {
        return this.$altEvents.on('playerConnectDenied', callback);
    }

    public oncePlayerConnectDenied(
        callback:
            | ServerEventsV2.GenericEventCallback<ServerEventsV2.PlayerConnectDeniedEventParameters>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['playerConnectDenied']>,
    ) {
        return this.$altEvents.once('playerConnectDenied', callback);
    }

    public onPlayerDisconnect<T extends Player>(
        callback:
            | ServerEventsV2.GenericPlayerEventCallback<ServerEventsV2.PlayerDisconnectEventParameters, T>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['playerDisconnect']>,
    ) {
        return this.$altEvents.on('playerDisconnect', callback);
    }

    public oncePlayerDisconnect<T extends Player>(
        callback:
            | ServerEventsV2.GenericPlayerEventCallback<ServerEventsV2.PlayerDisconnectEventParameters, T>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['playerDisconnect']>,
    ) {
        return this.$altEvents.once('playerDisconnect', callback);
    }

    public onPlayerDamage<T extends Player>(
        callback:
            | ServerEventsV2.GenericPlayerEventCallback<ServerEventsV2.PlayerDamageEventParameters, T>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['playerDamage']>,
    ) {
        return this.$altEvents.on('playerDamage', callback);
    }

    public oncePlayerDamage<T extends Player>(
        callback:
            | ServerEventsV2.GenericPlayerEventCallback<ServerEventsV2.PlayerDamageEventParameters, T>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['playerDamage']>,
    ) {
        return this.$altEvents.once('playerDamage', callback);
    }

    public onPlayerDeath<T extends Player>(
        callback:
            | ServerEventsV2.GenericPlayerEventCallback<ServerEventsV2.PlayerDeathEventParameters, T>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['playerDeath']>,
    ) {
        return this.$altEvents.on('playerDeath', callback);
    }

    public oncePlayerDeath<T extends Player>(
        callback:
            | ServerEventsV2.GenericPlayerEventCallback<ServerEventsV2.PlayerDeathEventParameters, T>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['playerDeath']>,
    ) {
        return this.$altEvents.once('playerDeath', callback);
    }

    public onPlayerHeal<T extends Player>(
        callback:
            | ServerEventsV2.GenericPlayerEventCallback<ServerEventsV2.PlayerHealEventParameters, T>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['playerHeal']>,
    ) {
        return this.$altEvents.on('playerHeal', callback);
    }

    public oncePlayerHeal<T extends Player>(
        callback:
            | ServerEventsV2.GenericPlayerEventCallback<ServerEventsV2.PlayerHealEventParameters, T>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['playerHeal']>,
    ) {
        return this.$altEvents.once('playerHeal', callback);
    }

    public onPlayerControlRequest<T extends Player>(
        callback:
            | ServerEventsV2.GenericCancellablePlayerEventCallback<ServerEventsV2.PlayerControlRequestEventParameters, T>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['playerRequestControl']>,
    ) {
        return this.$altEvents.on('playerControlRequest', callback);
    }

    public oncePlayerControlRequest<T extends Player>(
        callback:
            | ServerEventsV2.GenericCancellablePlayerEventCallback<ServerEventsV2.PlayerControlRequestEventParameters, T>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['playerRequestControl']>,
    ) {
        return this.$altEvents.once('playerControlRequest', callback);
    }

    public onPlayerInteriorChange<T extends Player>(
        callback:
            | ServerEventsV2.GenericPlayerEventCallback<ServerEventsV2.PlayerInteriorChangeEventParameters, T>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['playerInteriorChange']>,
    ) {
        return this.$altEvents.on('playerInteriorChange', callback);
    }

    public oncePlayerInteriorChange<T extends Player>(
        callback:
            | ServerEventsV2.GenericPlayerEventCallback<ServerEventsV2.PlayerInteriorChangeEventParameters, T>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['playerInteriorChange']>,
    ) {
        return this.$altEvents.once('playerInteriorChange', callback);
    }

    public onPlayerDimensionChange<T extends Player>(
        callback:
            | ServerEventsV2.GenericPlayerEventCallback<ServerEventsV2.PlayerDimensionChangeEventParameters, T>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['playerDimensionChange']>,
    ) {
        return this.$altEvents.on('playerDimensionChange', callback);
    }

    public oncePlayerDimensionChange<T extends Player>(
        callback:
            | ServerEventsV2.GenericPlayerEventCallback<ServerEventsV2.PlayerDimensionChangeEventParameters, T>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['playerDimensionChange']>,
    ) {
        return this.$altEvents.once('playerDimensionChange', callback);
    }

    public onPlayerWeaponChange<T extends Player>(
        callback:
            | ServerEventsV2.GenericPlayerEventCallback<ServerEventsV2.PlayerWeaponChangeEventParameters, T>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['playerWeaponChange']>,
    ) {
        return this.$altEvents.on('playerWeaponChange', callback);
    }

    public oncePlayerWeaponChange<T extends Player>(
        callback:
            | ServerEventsV2.GenericPlayerEventCallback<ServerEventsV2.PlayerWeaponChangeEventParameters, T>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['playerWeaponChange']>,
    ) {
        return this.$altEvents.once('playerWeaponChange', callback);
    }

    public onPlayerSyncedSceneRequest(
        callback:
            | ServerEventsV2.GenericCancellableEventCallback<ServerEventsV2.PlayerSyncedSceneRequestEventParameters>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['requestSyncedScene']>,
    ) {
        return this.$altEvents.on('playerSyncedSceneRequest', callback);
    }

    public oncePlayerSyncedSceneRequest(
        callback:
            | ServerEventsV2.GenericCancellableEventCallback<ServerEventsV2.PlayerSyncedSceneRequestEventParameters>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['requestSyncedScene']>,
    ) {
        return this.$altEvents.once('playerSyncedSceneRequest', callback);
    }

    public onPlayerSyncedSceneStart<T extends Player>(
        callback:
            | ServerEventsV2.GenericCancellablePlayerEventCallback<ServerEventsV2.PlayerSyncedSceneStartEventParameters, T>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['startSyncedScene']>,
    ) {
        return this.$altEvents.on('playerSyncedSceneStart', callback);
    }

    public oncePlayerSyncedSceneStart<T extends Player>(
        callback:
            | ServerEventsV2.GenericCancellablePlayerEventCallback<ServerEventsV2.PlayerSyncedSceneStartEventParameters, T>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['startSyncedScene']>,
    ) {
        return this.$altEvents.once('playerSyncedSceneStart', callback);
    }

    public onPlayerSyncedSceneStop<T extends Player>(
        callback:
            | ServerEventsV2.GenericCancellablePlayerEventCallback<ServerEventsV2.PlayerSyncedSceneStopEventParameters, T>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['stopSyncedScene']>,
    ) {
        return this.$altEvents.on('playerSyncedSceneStop', callback);
    }

    public oncePlayerSyncedSceneStop<T extends Player>(
        callback:
            | ServerEventsV2.GenericCancellablePlayerEventCallback<ServerEventsV2.PlayerSyncedSceneStopEventParameters, T>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['stopSyncedScene']>,
    ) {
        return this.$altEvents.once('playerSyncedSceneStop', callback);
    }

    public onPlayerSyncedSceneUpdate<T extends Player>(
        callback:
            | ServerEventsV2.GenericCancellablePlayerEventCallback<ServerEventsV2.PlayerSyncedSceneUpdateEventParameters, T>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['updateSyncedScene']>,
    ) {
        return this.$altEvents.on('playerSyncedSceneUpdate', callback);
    }

    public onPlayerSpawn<T extends Player>(
        callback: ServerEventsV2.GenericPlayerEventCallback<{}, T> | ServerEventsV2.GenericEventCallback<ServerEventsV1['playerSpawn']>,
    ) {
        return this.$altEvents.on('playerSpawn', callback);
    }

    public oncePlayerSpawn<T extends Player>(
        callback: ServerEventsV2.GenericPlayerEventCallback<{}, T> | ServerEventsV2.GenericEventCallback<ServerEventsV1['playerSpawn']>,
    ) {
        return this.$altEvents.once('playerSpawn', callback);
    }

    public onPlayerAnimationChange<T extends Player>(
        callback:
            | ServerEventsV2.GenericPlayerEventCallback<ServerEventsV2.PlayerAnimationChangeEventParameters, T>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['playerAnimationChange']>,
    ) {
        return this.$altEvents.on('playerAnimationChange', callback);
    }

    public oncePlayerAnimationChange<T extends Player>(
        callback:
            | ServerEventsV2.GenericPlayerEventCallback<ServerEventsV2.PlayerAnimationChangeEventParameters, T>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['playerAnimationChange']>,
    ) {
        return this.$altEvents.once('playerAnimationChange', callback);
    }

    public onPlayerVehicleEntered<T extends Player>(
        callback:
            | ServerEventsV2.GenericPlayerEventCallback<ServerEventsV2.PlayerVehicleEnteredEventParameters, T>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['playerEnteredVehicle']>,
    ) {
        return this.$altEvents.on('playerVehicleEntered', callback);
    }

    public oncePlayerVehicleEntered<T extends Player>(
        callback:
            | ServerEventsV2.GenericPlayerEventCallback<ServerEventsV2.PlayerVehicleEnteredEventParameters, T>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['playerEnteredVehicle']>,
    ) {
        return this.$altEvents.once('playerVehicleEntered', callback);
    }

    public onPlayerStartVehicleEnter<T extends Player>(
        callback:
            | ServerEventsV2.GenericPlayerEventCallback<ServerEventsV2.PlayerStartVehicleEnterEventParameters, T>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['playerEnteringVehicle']>,
    ) {
        return this.$altEvents.on('playerStartVehicleEnter', callback);
    }

    public oncePlayerStartVehicleEnter<T extends Player>(
        callback:
            | ServerEventsV2.GenericPlayerEventCallback<ServerEventsV2.PlayerStartVehicleEnterEventParameters, T>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['playerEnteringVehicle']>,
    ) {
        return this.$altEvents.once('playerStartVehicleEnter', callback);
    }

    public onPlayerVehicleLeft<T extends Player>(
        callback:
            | ServerEventsV2.GenericPlayerEventCallback<ServerEventsV2.PlayerVehicleLeftEventParameters, T>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['playerLeftVehicle']>,
    ) {
        return this.$altEvents.on('playerVehicleLeft', callback);
    }

    public oncePlayerVehicleLeft<T extends Player>(
        callback:
            | ServerEventsV2.GenericPlayerEventCallback<ServerEventsV2.PlayerVehicleLeftEventParameters, T>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['playerLeftVehicle']>,
    ) {
        return this.$altEvents.once('playerVehicleLeft', callback);
    }

    public onPlayerVehicleSeatChange<T extends Player>(
        callback:
            | ServerEventsV2.GenericPlayerEventCallback<ServerEventsV2.PlayerVehicleSeatChangeEventParameters, T>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['playerChangedVehicleSeat']>,
    ) {
        return this.$altEvents.on('playerVehicleSeatChange', callback);
    }

    public oncePlayerVehicleSeatChange<T extends Player>(
        callback:
            | ServerEventsV2.GenericPlayerEventCallback<ServerEventsV2.PlayerVehicleSeatChangeEventParameters, T>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['playerChangedVehicleSeat']>,
    ) {
        return this.$altEvents.once('playerVehicleSeatChange', callback);
    }

    public onPlayerStartTalking<T extends Player>(
        callback:
            | ServerEventsV2.GenericPlayerEventCallback<{}, T>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['playerStartTalking']>,
    ) {
        return this.$altEvents.on('playerStartTalking', callback);
    }

    public oncePlayerStartTalking<T extends Player>(
        callback:
            | ServerEventsV2.GenericPlayerEventCallback<{}, T>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['playerStartTalking']>,
    ) {
        return this.$altEvents.once('playerStartTalking', callback);
    }

    public onPlayerStopTalking<T extends Player>(
        callback:
            | ServerEventsV2.GenericPlayerEventCallback<{}, T>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['playerStopTalking']>,
    ) {
        return this.$altEvents.on('playerStopTalking', callback);
    }

    public oncePlayerStopTalking<T extends Player>(
        callback:
            | ServerEventsV2.GenericPlayerEventCallback<{}, T>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['playerStopTalking']>,
    ) {
        return this.$altEvents.once('playerStopTalking', callback);
    }

    public onPedHeal(
        callback:
            | ServerEventsV2.GenericEventCallback<ServerEventsV2.PedHealEventParameters>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['pedHeal']>,
    ) {
        return this.$altEvents.on('pedHeal', callback);
    }

    public oncePedHeal(
        callback:
            | ServerEventsV2.GenericEventCallback<ServerEventsV2.PedHealEventParameters>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['pedHeal']>,
    ) {
        return this.$altEvents.once('pedHeal', callback);
    }

    public onPedDeath(
        callback:
            | ServerEventsV2.GenericEventCallback<ServerEventsV2.PedDeathEventParameters>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['pedDeath']>,
    ) {
        return this.$altEvents.on('pedDeath', callback);
    }

    public oncePedDeath(
        callback:
            | ServerEventsV2.GenericEventCallback<ServerEventsV2.PedDeathEventParameters>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['pedDeath']>,
    ) {
        return this.$altEvents.once('pedDeath', callback);
    }

    public onPedDamage(
        callback:
            | ServerEventsV2.GenericEventCallback<ServerEventsV2.PedDamageEventParameters>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['pedDamage']>,
    ) {
        return this.$altEvents.on('pedDamage', callback);
    }

    public oncePedDamage(
        callback:
            | ServerEventsV2.GenericEventCallback<ServerEventsV2.PedDamageEventParameters>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['pedDamage']>,
    ) {
        return this.$altEvents.once('pedDamage', callback);
    }

    public onVehicleDestroy(
        callback:
            | ServerEventsV2.GenericEventCallback<ServerEventsV2.VehicleDestroyEventParameters>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['vehicleDestroy']>,
    ) {
        return this.$altEvents.on('vehicleDestroy', callback);
    }

    public onceVehicleDestroy(
        callback:
            | ServerEventsV2.GenericEventCallback<ServerEventsV2.VehicleDestroyEventParameters>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['vehicleDestroy']>,
    ) {
        return this.$altEvents.once('vehicleDestroy', callback);
    }

    public onVehicleAttach(
        callback:
            | ServerEventsV2.GenericEventCallback<ServerEventsV2.VehicleAttachEventParameters>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['vehicleAttach']>,
    ) {
        return this.$altEvents.on('vehicleAttach', callback);
    }

    public onceVehicleAttach(
        callback:
            | ServerEventsV2.GenericEventCallback<ServerEventsV2.VehicleAttachEventParameters>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['vehicleAttach']>,
    ) {
        return this.$altEvents.once('vehicleAttach', callback);
    }

    public onVehicleDetach(
        callback:
            | ServerEventsV2.GenericEventCallback<ServerEventsV2.VehicleDetachEventParameters>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['vehicleDetach']>,
    ) {
        return this.$altEvents.on('vehicleDetach', callback);
    }

    public onceVehicleDetach(
        callback:
            | ServerEventsV2.GenericEventCallback<ServerEventsV2.VehicleDetachEventParameters>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['vehicleDetach']>,
    ) {
        return this.$altEvents.once('vehicleDetach', callback);
    }

    public onVehicleDamage(
        callback:
            | ServerEventsV2.GenericEventCallback<ServerEventsV2.VehicleDamageEventParameters>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['vehicleDamage']>,
    ) {
        return this.$altEvents.on('vehicleDamage', callback);
    }

    public onceVehicleDamage(
        callback:
            | ServerEventsV2.GenericEventCallback<ServerEventsV2.VehicleDamageEventParameters>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['vehicleDamage']>,
    ) {
        return this.$altEvents.once('vehicleDamage', callback);
    }

    public onVehicleSirenStateChange(
        callback:
            | ServerEventsV2.GenericEventCallback<ServerEventsV2.VehicleSirenStateChangeEventParameters>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['vehicleSiren']>,
    ) {
        return this.$altEvents.on('vehicleSirenStateChange', callback);
    }

    public onceVehicleSirenStateChange(
        callback:
            | ServerEventsV2.GenericEventCallback<ServerEventsV2.VehicleSirenStateChangeEventParameters>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['vehicleSiren']>,
    ) {
        return this.$altEvents.once('vehicleSirenStateChange', callback);
    }

    public onVehicleHornStateChange<T extends Player>(
        callback:
            | ServerEventsV2.GenericCancellablePlayerEventCallback<ServerEventsV2.VehicleHornStateChangeEventParameters, T>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['vehicleHorn']>,
    ) {
        return this.$altEvents.on('vehicleHornStateChange', callback);
    }

    public onceVehicleHornStateChange<T extends Player>(
        callback:
            | ServerEventsV2.GenericCancellablePlayerEventCallback<ServerEventsV2.VehicleHornStateChangeEventParameters, T>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['vehicleHorn']>,
    ) {
        return this.$altEvents.once('vehicleHornStateChange', callback);
    }

    public onVoiceConnectionCreate(
        callback:
            | ServerEventsV2.GenericEventCallback<ServerEventsV2.VoiceConnectionEventParameters>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['voiceConnection']>,
    ) {
        return this.$altEvents.on('voiceConnectionCreate', callback);
    }

    public onceVoiceConnectionCreate(
        callback:
            | ServerEventsV2.GenericEventCallback<ServerEventsV2.VoiceConnectionEventParameters>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['voiceConnection']>,
    ) {
        return this.$altEvents.once('voiceConnectionCreate', callback);
    }

    public onClientObjectDelete<T extends Player>(
        callback:
            | ServerEventsV2.GenericCancellablePlayerEventCallback<{}, T>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['baseObjectRemove']>,
    ) {
        return this.$altEvents.on('clientObjectDelete', callback);
    }

    public onceClientObjectDelete<T extends Player>(
        callback:
            | ServerEventsV2.GenericCancellablePlayerEventCallback<{}, T>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['baseObjectRemove']>,
    ) {
        return this.$altEvents.once('clientObjectDelete', callback);
    }

    public onClientObjectRequest<T extends Player>(
        callback:
            | ServerEventsV2.GenericCancellablePlayerEventCallback<ServerEventsV2.ClientObjectEventParameters, T>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['clientRequestObject']>,
    ) {
        return this.$altEvents.on('clientObjectRequest', callback);
    }

    public onceClientObjectRequest<T extends Player>(
        callback:
            | ServerEventsV2.GenericCancellablePlayerEventCallback<ServerEventsV2.ClientObjectEventParameters, T>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['clientRequestObject']>,
    ) {
        return this.$altEvents.once('clientObjectRequest', callback);
    }

    public onBaseObjectCreate(
        callback:
            | ServerEventsV2.GenericEventCallback<ServerEventsV2.BaseObjectCreateEventParameters>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['baseObjectCreate']>,
    ) {
        return this.$altEvents.on('baseObjectCreate', callback);
    }

    public onceBaseObjectCreate(
        callback:
            | ServerEventsV2.GenericEventCallback<ServerEventsV2.BaseObjectCreateEventParameters>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['baseObjectCreate']>,
    ) {
        return this.$altEvents.once('baseObjectCreate', callback);
    }

    public onBaseObjectRemove(
        callback:
            | ServerEventsV2.GenericEventCallback<ServerEventsV2.BaseObjectRemoveEventParameters>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['baseObjectRemove']>,
    ) {
        return this.$altEvents.on('baseObjectRemove', callback);
    }

    public onceBaseObjectRemove(
        callback:
            | ServerEventsV2.GenericEventCallback<ServerEventsV2.BaseObjectRemoveEventParameters>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['baseObjectRemove']>,
    ) {
        return this.$altEvents.once('baseObjectRemove', callback);
    }

    public onNetOwnerChange(
        callback:
            | ServerEventsV2.GenericEventCallback<ServerEventsV2.NetOwnerChangeEventParameters>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['netOwnerChange']>,
    ) {
        return this.$altEvents.on('netOwnerChange', callback);
    }

    public onceNetOwnerChange(
        callback:
            | ServerEventsV2.GenericEventCallback<ServerEventsV2.NetOwnerChangeEventParameters>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['netOwnerChange']>,
    ) {
        return this.$altEvents.once('netOwnerChange', callback);
    }

    public onWeaponDamage(
        callback:
            | ServerEventsV2.GenericCancellableEventCallback<ServerEventsV2.WeaponDamageEventParameters>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['weaponDamage']>,
    ) {
        return this.$altEvents.on('weaponDamage', callback);
    }

    public onceWeaponDamage(
        callback:
            | ServerEventsV2.GenericCancellableEventCallback<ServerEventsV2.WeaponDamageEventParameters>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['weaponDamage']>,
    ) {
        return this.$altEvents.once('weaponDamage', callback);
    }

    public onMetaChange(
        callback:
            | ServerEventsV2.GenericEventCallback<ServerEventsV2.MetaChangeEventParameters>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['metaChange']>,
    ) {
        return this.$altEvents.on('metaChange', callback);
    }

    public onLocalMetaChange<T extends Player>(
        callback:
            | ServerEventsV2.GenericPlayerEventCallback<ServerEventsV2.LocalMetaChangeEventParameters, T>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['localMetaChange']>,
    ) {
        return this.$altEvents.on('localMetaChange', callback);
    }

    public onceLocalMetaChange<T extends Player>(
        callback:
            | ServerEventsV2.GenericPlayerEventCallback<ServerEventsV2.LocalMetaChangeEventParameters, T>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['localMetaChange']>,
    ) {
        return this.$altEvents.once('localMetaChange', callback);
    }

    public onStreamSyncedMetaChange(
        callback:
            | ServerEventsV2.GenericEventCallback<ServerEventsV2.StreamSyncedMetaChangeEventParameters>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['streamSyncedMetaChange']>,
    ) {
        return this.$altEvents.on('streamSyncedMetaChange', callback);
    }

    public onceStreamSyncedMetaChange(
        callback:
            | ServerEventsV2.GenericEventCallback<ServerEventsV2.StreamSyncedMetaChangeEventParameters>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['streamSyncedMetaChange']>,
    ) {
        return this.$altEvents.once('streamSyncedMetaChange', callback);
    }

    public onGlobalMetaChange(
        callback:
            | ServerEventsV2.GenericEventCallback<ServerEventsV2.GlobalMetaChangeEventParameters>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['globalMetaChange']>,
    ) {
        return this.$altEvents.on('globalMetaChange', callback);
    }

    public onceGlobalMetaChange(
        callback:
            | ServerEventsV2.GenericEventCallback<ServerEventsV2.GlobalMetaChangeEventParameters>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['globalMetaChange']>,
    ) {
        return this.$altEvents.once('globalMetaChange', callback);
    }

    public onGlobalSyncedMetaChange(
        callback:
            | ServerEventsV2.GenericEventCallback<ServerEventsV2.GlobalSyncedMetaChangeEventParameters>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['globalSyncedMetaChange']>,
    ) {
        return this.$altEvents.on('globalSyncedMetaChange', callback);
    }

    public onceGlobalSyncedMetaChange(
        callback:
            | ServerEventsV2.GenericEventCallback<ServerEventsV2.GlobalSyncedMetaChangeEventParameters>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['globalSyncedMetaChange']>,
    ) {
        return this.$altEvents.once('globalSyncedMetaChange', callback);
    }

    public onConsoleCommand(
        callback:
            | ServerEventsV2.GenericEventCallback<ServerEventsV2.ConsoleCommandEventParameters>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['consoleCommand']>,
    ) {
        return this.$altEvents.on('consoleCommand', callback);
    }

    public onceConsoleCommand(
        callback:
            | ServerEventsV2.GenericEventCallback<ServerEventsV2.ConsoleCommandEventParameters>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['consoleCommand']>,
    ) {
        return this.$altEvents.once('consoleCommand', callback);
    }

    public onError(callback: ServerEventsV2.GenericEventCallback<ServerEventsV2.ErrorEventParameters>) {
        return this.$altEvents.on('error', callback);
    }

    public onceError(callback: ServerEventsV2.GenericEventCallback<ServerEventsV2.ErrorEventParameters>) {
        return this.$altEvents.once('error', callback);
    }

    public onColShapeEvent(callback: ServerEventsV2.GenericEventCallback<ServerEventsV2.ColShapeEventParameters>) {
        return this.$altEvents.on('colShapeEvent', callback);
    }

    public onceColShapeEvent(callback: ServerEventsV2.GenericEventCallback<ServerEventsV2.ColShapeEventParameters>) {
        return this.$altEvents.once('colShapeEvent', callback);
    }

    public onExplosion(
        callback:
            | ServerEventsV2.GenericCancellableEventCallback<ServerEventsV2.ExplosionEventParameters>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['explosion']>,
    ) {
        return this.$altEvents.on('explosion', (data) => callback(data));
    }

    public onceExplosion(
        callback:
            | ServerEventsV2.GenericCancellableEventCallback<ServerEventsV2.ExplosionEventParameters>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['explosion']>,
    ) {
        return this.$altEvents.once('explosion', (data) => callback(data));
    }

    public onFireStart<T extends Player>(
        callback:
            | ServerEventsV2.GenericCancellablePlayerEventCallback<ServerEventsV2.FireStartEventParameters, T>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['startFire']>,
    ) {
        return this.$altEvents.on('fireStart', callback);
    }

    public onceFireStart<T extends Player>(
        callback:
            | ServerEventsV2.GenericCancellablePlayerEventCallback<ServerEventsV2.FireStartEventParameters, T>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['startFire']>,
    ) {
        return this.$altEvents.once('fireStart', callback);
    }

    public onProjectileStart<T extends Player>(
        callback:
            | ServerEventsV2.GenericCancellablePlayerEventCallback<ServerEventsV2.ProjectileStartEventParameters, T>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['startProjectile']>,
    ) {
        return this.$altEvents.on('projectileStart', callback);
    }

    public onceProjectileStart<T extends Player>(
        callback:
            | ServerEventsV2.GenericCancellablePlayerEventCallback<ServerEventsV2.ProjectileStartEventParameters, T>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['startProjectile']>,
    ) {
        return this.$altEvents.once('projectileStart', callback);
    }

    public onEntityColShapeEnter(
        callback:
            | ServerEventsV2.GenericEventCallback<ServerEventsV2.EntityColShapeEnterEventParameters>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['entityEnterColshape']>,
    ) {
        return this.$altEvents.on('entityColShapeEnter', callback);
    }

    public onceEntityColShapeEnter(
        callback:
            | ServerEventsV2.GenericEventCallback<ServerEventsV2.EntityColShapeEnterEventParameters>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['entityEnterColshape']>,
    ) {
        return this.$altEvents.once('entityColShapeEnter', callback);
    }

    public onEntityColShapeLeave(
        callback:
            | ServerEventsV2.GenericEventCallback<ServerEventsV2.EntityColShapeLeaveEventParameters>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['entityLeaveColshape']>,
    ) {
        return this.$altEvents.on('entityColShapeLeave', callback);
    }

    public onceEntityColShapeLeave(
        callback:
            | ServerEventsV2.GenericEventCallback<ServerEventsV2.EntityColShapeLeaveEventParameters>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['entityLeaveColshape']>,
    ) {
        return this.$altEvents.once('entityColShapeLeave', callback);
    }

    public onEntityCheckpointEnter(callback: ServerEventsV2.GenericEventCallback<ServerEventsV2.EntityCheckpointEnterEventParameters>) {
        return this.$altEvents.on('entityCheckpointEnter', callback);
    }

    public onceEntityCheckpointEnter(callback: ServerEventsV2.GenericEventCallback<ServerEventsV2.EntityCheckpointEnterEventParameters>) {
        return this.$altEvents.once('entityCheckpointEnter', callback);
    }

    public onEntityCheckpointLeave(callback: ServerEventsV2.GenericEventCallback<ServerEventsV2.EntityCheckpointLeaveEventParameters>) {
        return this.$altEvents.on('entityCheckpointLeave', callback);
    }

    public onceEntityCheckpointLeave(callback: ServerEventsV2.GenericEventCallback<ServerEventsV2.EntityCheckpointLeaveEventParameters>) {
        return this.$altEvents.once('entityCheckpointLeave', callback);
    }

    public onGivePedScriptedTask(
        callback:
            | ServerEventsV2.GenericEventCallback<ServerEventsV2.GivePedScriptedTaskEventParameters>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['givePedScriptedTask']>,
    ) {
        return this.$altEvents.on('givePedScriptedTask', callback);
    }

    public onLocalScriptEvent<T = unknown[]>(callback: ServerEventsV2.GenericEventCallback<ServerEventsV2.ServerScriptEventParameters<T>>) {
        return this.$altEvents.on('localScriptEvent', callback);
    }

    public onceLocalScriptEvent<T = unknown[]>(
        callback: ServerEventsV2.GenericEventCallback<ServerEventsV2.ServerScriptEventParameters<T>>,
    ) {
        return this.$altEvents.once('localScriptEvent', callback);
    }

    public onRemoteScriptEvent<T = unknown[], U extends Player = Player>(
        callback: ServerEventsV2.GenericPlayerEventCallback<ServerEventsV2.PlayerScriptEventParameters<T>, U>,
    ) {
        return this.$altEvents.on('remoteScriptEvent', callback);
    }

    public onceRemoteScriptEvent<T = unknown[], U extends Player = Player>(
        callback: ServerEventsV2.GenericPlayerEventCallback<ServerEventsV2.PlayerScriptEventParameters<T>, U>,
    ) {
        return this.$altEvents.once('remoteScriptEvent', callback);
    }

    public onAnyResourceStart(
        callback:
            | ServerEventsV2.GenericEventCallback<ServerEventsV2.ResourceStartEventParameters>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['anyResourceStart']>,
    ) {
        return this.$altEvents.on('anyResourceStart', callback);
    }

    public onceAnyResourceStart(
        callback:
            | ServerEventsV2.GenericEventCallback<ServerEventsV2.ResourceStartEventParameters>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['anyResourceStart']>,
    ) {
        return this.$altEvents.once('anyResourceStart', callback);
    }

    public onAnyResourceStop(
        callback:
            | ServerEventsV2.GenericEventCallback<ServerEventsV2.ResourceStopEventParameters>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['anyResourceStop']>,
    ) {
        return this.$altEvents.on('anyResourceStop', callback);
    }

    public onceAnyResourceStop(
        callback:
            | ServerEventsV2.GenericEventCallback<ServerEventsV2.ResourceStopEventParameters>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['anyResourceStop']>,
    ) {
        return this.$altEvents.once('anyResourceStop', callback);
    }

    public onResourceStart(
        callback: ServerEventsV2.GenericEventCallback | ServerEventsV2.GenericEventCallback<ServerEventsV1['resourceStart']>,
    ) {
        return this.$altEvents.on('resourceStart', callback);
    }

    public onceResourceStart(
        callback: ServerEventsV2.GenericEventCallback | ServerEventsV2.GenericEventCallback<ServerEventsV1['resourceStart']>,
    ) {
        return this.$altEvents.once('resourceStart', callback);
    }

    public onResourceStop(
        callback: ServerEventsV2.GenericEventCallback | ServerEventsV2.GenericEventCallback<ServerEventsV1['resourceError']>,
    ) {
        return this.$altEvents.on('resourceStop', callback);
    }

    public onceResourceStop(
        callback: ServerEventsV2.GenericEventCallback | ServerEventsV2.GenericEventCallback<ServerEventsV1['resourceError']>,
    ) {
        return this.$altEvents.once('resourceStop', callback);
    }

    public onResourceError(
        callback:
            | ServerEventsV2.GenericEventCallback<ServerEventsV2.ResourceErrorEventParameters>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['resourceError']>,
    ) {
        return this.$altEvents.on('resourceError', callback);
    }

    public onceResourceError(
        callback:
            | ServerEventsV2.GenericEventCallback<ServerEventsV2.ResourceErrorEventParameters>
            | ServerEventsV2.GenericEventCallback<ServerEventsV1['resourceError']>,
    ) {
        return this.$altEvents.once('resourceError', callback);
    }

    public onEvent(callback: ServerEventsV2.GenericEventCallback<SharedEvents.GenericOnEventParameters>) {
        return this.$altEvents.on('event', callback);
    }
}
