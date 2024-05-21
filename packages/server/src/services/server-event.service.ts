import { BaseEventService, MULTIPLAYER_SERVICE } from '@altv-mango/core/app';
import { inject, injectable } from 'inversify';
import { INTERNAL_EVENTS } from '../constants';
import type { EventService, ServerEventEmmiter, ServerMultiplayerService } from '../interfaces';
import type { Events as ServerEvents, Player } from '@altv/server';
import type { Events as SharedEvents } from '@altv/shared';

@injectable()
export class ServerEventService extends BaseEventService<ServerEvents.CustomServerEvent> implements EventService {
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

    public onScriptRPC<T extends Player>(callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.ScriptRPCEventParameters, T>) {
        return this.$altEvents.on('scriptRPC', callback);
    }

    public onceScriptRPC<T extends Player>(callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.ScriptRPCEventParameters, T>) {
        return this.$altEvents.once('scriptRPC', callback);
    }

    public onScriptRPCAnswer<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.ScriptRPCAnswerEventParameters, T>,
    ) {
        return this.$altEvents.on('scriptRPCAnswer', callback);
    }

    public onceScriptRPCAnswer<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.ScriptRPCAnswerEventParameters, T>,
    ) {
        return this.$altEvents.once('scriptRPCAnswer', callback);
    }

    public onServerStarted(callback: ServerEvents.GenericEventCallback) {
        return this.$altEvents.on('serverStarted', callback);
    }

    public onceServerStarted(callback: ServerEvents.GenericEventCallback) {
        return this.$altEvents.once('serverStarted', callback);
    }

    public onConnectionQueueAdd(callback: ServerEvents.GenericEventCallback<ServerEvents.ConnectionQueueEventParameters>) {
        return this.$altEvents.on('connectionQueueAdd', callback);
    }

    public onceConnectionQueueAdd(callback: ServerEvents.GenericEventCallback<ServerEvents.ConnectionQueueEventParameters>) {
        return this.$altEvents.once('connectionQueueAdd', callback);
    }

    public onConnectionQueueRemove(callback: ServerEvents.GenericEventCallback<ServerEvents.ConnectionQueueEventParameters>) {
        return this.$altEvents.on('connectionQueueRemove', callback);
    }

    public onceConnectionQueueRemove(callback: ServerEvents.GenericEventCallback<ServerEvents.ConnectionQueueEventParameters>) {
        return this.$altEvents.once('connectionQueueRemove', callback);
    }

    public onPlayerConnect<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerConnectEventParameters, T>,
    ) {
        return this.$altEvents.on('playerConnect', callback);
    }

    public oncePlayerConnect<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerConnectEventParameters, T>,
    ) {
        return this.$altEvents.once('playerConnect', callback);
    }

    public onPlayerConnectDenied(callback: ServerEvents.GenericEventCallback<ServerEvents.PlayerConnectDeniedEventParameters>) {
        return this.$altEvents.on('playerConnectDenied', callback);
    }

    public oncePlayerConnectDenied(callback: ServerEvents.GenericEventCallback<ServerEvents.PlayerConnectDeniedEventParameters>) {
        return this.$altEvents.once('playerConnectDenied', callback);
    }

    public onPlayerDisconnect<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerDisconnectEventParameters, T>,
    ) {
        return this.$altEvents.on('playerDisconnect', callback);
    }

    public oncePlayerDisconnect<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerDisconnectEventParameters, T>,
    ) {
        return this.$altEvents.once('playerDisconnect', callback);
    }

    public onPlayerDamage<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerDamageEventParameters, T>,
    ) {
        return this.$altEvents.on('playerDamage', callback);
    }

    public oncePlayerDamage<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerDamageEventParameters, T>,
    ) {
        return this.$altEvents.once('playerDamage', callback);
    }

    public onPlayerDeath<T extends Player>(callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerDeathEventParameters, T>) {
        return this.$altEvents.on('playerDeath', callback);
    }

    public oncePlayerDeath<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerDeathEventParameters, T>,
    ) {
        return this.$altEvents.once('playerDeath', callback);
    }

    public onPlayerHeal<T extends Player>(callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerHealEventParameters, T>) {
        return this.$altEvents.on('playerHeal', callback);
    }

    public oncePlayerHeal<T extends Player>(callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerHealEventParameters, T>) {
        return this.$altEvents.once('playerHeal', callback);
    }

    public onPlayerControlRequest<T extends Player>(
        callback: ServerEvents.GenericCancellablePlayerEventCallback<ServerEvents.PlayerControlRequestEventParameters, T>,
    ) {
        return this.$altEvents.on('playerControlRequest', callback);
    }

    public oncePlayerControlRequest<T extends Player>(
        callback: ServerEvents.GenericCancellablePlayerEventCallback<ServerEvents.PlayerControlRequestEventParameters, T>,
    ) {
        return this.$altEvents.once('playerControlRequest', callback);
    }

    public onPlayerInteriorChange<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerInteriorChangeEventParameters, T>,
    ) {
        return this.$altEvents.on('playerInteriorChange', callback);
    }

    public oncePlayerInteriorChange<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerInteriorChangeEventParameters, T>,
    ) {
        return this.$altEvents.once('playerInteriorChange', callback);
    }

    public onPlayerDimensionChange<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerDimensionChangeEventParameters, T>,
    ) {
        return this.$altEvents.on('playerDimensionChange', callback);
    }

    public oncePlayerDimensionChange<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerDimensionChangeEventParameters, T>,
    ) {
        return this.$altEvents.once('playerDimensionChange', callback);
    }

    public onPlayerWeaponChange<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerWeaponChangeEventParameters, T>,
    ) {
        return this.$altEvents.on('playerWeaponChange', callback);
    }

    public oncePlayerWeaponChange<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerWeaponChangeEventParameters, T>,
    ) {
        return this.$altEvents.once('playerWeaponChange', callback);
    }

    public onPlayerSyncedSceneRequest(
        callback: ServerEvents.GenericCancellableEventCallback<ServerEvents.PlayerSyncedSceneRequestEventParameters>,
    ) {
        return this.$altEvents.on('playerSyncedSceneRequest', callback);
    }

    public oncePlayerSyncedSceneRequest(
        callback: ServerEvents.GenericCancellableEventCallback<ServerEvents.PlayerSyncedSceneRequestEventParameters>,
    ) {
        return this.$altEvents.once('playerSyncedSceneRequest', callback);
    }

    public onPlayerSyncedSceneStart<T extends Player>(
        callback: ServerEvents.GenericCancellablePlayerEventCallback<ServerEvents.PlayerSyncedSceneStartEventParameters, T>,
    ) {
        return this.$altEvents.on('playerSyncedSceneStart', callback);
    }

    public oncePlayerSyncedSceneStart<T extends Player>(
        callback: ServerEvents.GenericCancellablePlayerEventCallback<ServerEvents.PlayerSyncedSceneStartEventParameters, T>,
    ) {
        return this.$altEvents.once('playerSyncedSceneStart', callback);
    }

    public onPlayerSyncedSceneStop<T extends Player>(
        callback: ServerEvents.GenericCancellablePlayerEventCallback<ServerEvents.PlayerSyncedSceneStopEventParameters, T>,
    ) {
        return this.$altEvents.on('playerSyncedSceneStop', callback);
    }

    public oncePlayerSyncedSceneStop<T extends Player>(
        callback: ServerEvents.GenericCancellablePlayerEventCallback<ServerEvents.PlayerSyncedSceneStopEventParameters, T>,
    ) {
        return this.$altEvents.once('playerSyncedSceneStop', callback);
    }

    public onPlayerSyncedSceneUpdate<T extends Player>(
        callback: ServerEvents.GenericCancellablePlayerEventCallback<ServerEvents.PlayerSyncedSceneUpdateEventParameters, T>,
    ) {
        return this.$altEvents.on('playerSyncedSceneUpdate', callback);
    }

    public onPlayerSpawn<T extends Player>(callback: ServerEvents.GenericPlayerEventCallback<{}, T>) {
        return this.$altEvents.on('playerSpawn', callback);
    }

    public oncePlayerSpawn<T extends Player>(callback: ServerEvents.GenericPlayerEventCallback<{}, T>) {
        return this.$altEvents.once('playerSpawn', callback);
    }

    public onPlayerAnimationChange<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerAnimationChangeEventParameters, T>,
    ) {
        return this.$altEvents.on('playerAnimationChange', callback);
    }

    public oncePlayerAnimationChange<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerAnimationChangeEventParameters, T>,
    ) {
        return this.$altEvents.once('playerAnimationChange', callback);
    }

    public onPlayerVehicleEntered<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerVehicleEnteredEventParameters, T>,
    ) {
        return this.$altEvents.on('playerVehicleEntered', callback);
    }

    public oncePlayerVehicleEntered<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerVehicleEnteredEventParameters, T>,
    ) {
        return this.$altEvents.once('playerVehicleEntered', callback);
    }

    public onPlayerStartVehicleEnter<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerStartVehicleEnterEventParameters, T>,
    ) {
        return this.$altEvents.on('playerStartVehicleEnter', callback);
    }

    public oncePlayerStartVehicleEnter<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerStartVehicleEnterEventParameters, T>,
    ) {
        return this.$altEvents.once('playerStartVehicleEnter', callback);
    }

    public onPlayerVehicleLeft<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerVehicleLeftEventParameters, T>,
    ) {
        return this.$altEvents.on('playerVehicleLeft', callback);
    }

    public oncePlayerVehicleLeft<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerVehicleLeftEventParameters, T>,
    ) {
        return this.$altEvents.once('playerVehicleLeft', callback);
    }

    public onPlayerVehicleSeatChange<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerVehicleSeatChangeEventParameters, T>,
    ) {
        return this.$altEvents.on('playerVehicleSeatChange', callback);
    }

    public oncePlayerVehicleSeatChange<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerVehicleSeatChangeEventParameters, T>,
    ) {
        return this.$altEvents.once('playerVehicleSeatChange', callback);
    }

    public onPlayerStartTalking<T extends Player>(callback: ServerEvents.GenericPlayerEventCallback<{}, T>) {
        return this.$altEvents.on('playerStartTalking', callback);
    }

    public oncePlayerStartTalking<T extends Player>(callback: ServerEvents.GenericPlayerEventCallback<{}, T>) {
        return this.$altEvents.once('playerStartTalking', callback);
    }

    public onPlayerStopTalking<T extends Player>(callback: ServerEvents.GenericPlayerEventCallback<{}, T>) {
        return this.$altEvents.on('playerStopTalking', callback);
    }

    public oncePlayerStopTalking<T extends Player>(callback: ServerEvents.GenericPlayerEventCallback<{}, T>) {
        return this.$altEvents.once('playerStopTalking', callback);
    }

    public onPedHeal(callback: ServerEvents.GenericEventCallback<ServerEvents.PedHealEventParameters>) {
        return this.$altEvents.on('pedHeal', callback);
    }

    public oncePedHeal(callback: ServerEvents.GenericEventCallback<ServerEvents.PedHealEventParameters>) {
        return this.$altEvents.once('pedHeal', callback);
    }

    public onPedDeath(callback: ServerEvents.GenericEventCallback<ServerEvents.PedDeathEventParameters>) {
        return this.$altEvents.on('pedDeath', callback);
    }

    public oncePedDeath(callback: ServerEvents.GenericEventCallback<ServerEvents.PedDeathEventParameters>) {
        return this.$altEvents.once('pedDeath', callback);
    }

    public onPedDamage(callback: ServerEvents.GenericEventCallback<ServerEvents.PedDamageEventParameters>) {
        return this.$altEvents.on('pedDamage', callback);
    }

    public oncePedDamage(callback: ServerEvents.GenericEventCallback<ServerEvents.PedDamageEventParameters>) {
        return this.$altEvents.once('pedDamage', callback);
    }

    public onVehicleDestroy(callback: ServerEvents.GenericEventCallback<ServerEvents.VehicleDestroyEventParameters>) {
        return this.$altEvents.on('vehicleDestroy', callback);
    }

    public onceVehicleDestroy(callback: ServerEvents.GenericEventCallback<ServerEvents.VehicleDestroyEventParameters>) {
        return this.$altEvents.once('vehicleDestroy', callback);
    }

    public onVehicleAttach(callback: ServerEvents.GenericEventCallback<ServerEvents.VehicleAttachEventParameters>) {
        return this.$altEvents.on('vehicleAttach', callback);
    }

    public onceVehicleAttach(callback: ServerEvents.GenericEventCallback<ServerEvents.VehicleAttachEventParameters>) {
        return this.$altEvents.once('vehicleAttach', callback);
    }

    public onVehicleDetach(callback: ServerEvents.GenericEventCallback<ServerEvents.VehicleDetachEventParameters>) {
        return this.$altEvents.on('vehicleDetach', callback);
    }

    public onceVehicleDetach(callback: ServerEvents.GenericEventCallback<ServerEvents.VehicleDetachEventParameters>) {
        return this.$altEvents.once('vehicleDetach', callback);
    }

    public onVehicleDamage(callback: ServerEvents.GenericEventCallback<ServerEvents.VehicleDamageEventParameters>) {
        return this.$altEvents.on('vehicleDamage', callback);
    }

    public onceVehicleDamage(callback: ServerEvents.GenericEventCallback<ServerEvents.VehicleDamageEventParameters>) {
        return this.$altEvents.once('vehicleDamage', callback);
    }

    public onVehicleSirenStateChange(callback: ServerEvents.GenericEventCallback<ServerEvents.VehicleSirenStateChangeEventParameters>) {
        return this.$altEvents.on('vehicleSirenStateChange', callback);
    }

    public onceVehicleSirenStateChange(callback: ServerEvents.GenericEventCallback<ServerEvents.VehicleSirenStateChangeEventParameters>) {
        return this.$altEvents.once('vehicleSirenStateChange', callback);
    }

    public onVehicleHornStateChange<T extends Player>(
        callback: ServerEvents.GenericCancellablePlayerEventCallback<ServerEvents.VehicleHornStateChangeEventParameters, T>,
    ) {
        return this.$altEvents.on('vehicleHornStateChange', callback);
    }

    public onceVehicleHornStateChange<T extends Player>(
        callback: ServerEvents.GenericCancellablePlayerEventCallback<ServerEvents.VehicleHornStateChangeEventParameters, T>,
    ) {
        return this.$altEvents.once('vehicleHornStateChange', callback);
    }

    public onVoiceConnectionCreate(callback: ServerEvents.GenericEventCallback<ServerEvents.VoiceConnectionEventParameters>) {
        return this.$altEvents.on('voiceConnectionCreate', callback);
    }

    public onceVoiceConnectionCreate(callback: ServerEvents.GenericEventCallback<ServerEvents.VoiceConnectionEventParameters>) {
        return this.$altEvents.once('voiceConnectionCreate', callback);
    }

    public onClientObjectDelete<T extends Player>(callback: ServerEvents.GenericCancellablePlayerEventCallback<{}, T>) {
        return this.$altEvents.on('clientObjectDelete', callback);
    }

    public onceClientObjectDelete<T extends Player>(callback: ServerEvents.GenericCancellablePlayerEventCallback<{}, T>) {
        return this.$altEvents.once('clientObjectDelete', callback);
    }

    public onClientObjectRequest<T extends Player>(
        callback: ServerEvents.GenericCancellablePlayerEventCallback<ServerEvents.ClientObjectEventParameters, T>,
    ) {
        return this.$altEvents.on('clientObjectRequest', callback);
    }

    public onceClientObjectRequest<T extends Player>(
        callback: ServerEvents.GenericCancellablePlayerEventCallback<ServerEvents.ClientObjectEventParameters, T>,
    ) {
        return this.$altEvents.once('clientObjectRequest', callback);
    }

    public onBaseObjectCreate(callback: ServerEvents.GenericEventCallback<ServerEvents.BaseObjectCreateEventParameters>) {
        return this.$altEvents.on('baseObjectCreate', callback);
    }

    public onceBaseObjectCreate(callback: ServerEvents.GenericEventCallback<ServerEvents.BaseObjectCreateEventParameters>) {
        return this.$altEvents.once('baseObjectCreate', callback);
    }

    public onBaseObjectRemove(callback: ServerEvents.GenericEventCallback<ServerEvents.BaseObjectRemoveEventParameters>) {
        return this.$altEvents.on('baseObjectRemove', callback);
    }

    public onceBaseObjectRemove(callback: ServerEvents.GenericEventCallback<ServerEvents.BaseObjectRemoveEventParameters>) {
        return this.$altEvents.once('baseObjectRemove', callback);
    }

    public onNetOwnerChange(callback: ServerEvents.GenericEventCallback<ServerEvents.NetOwnerChangeEventParameters>) {
        return this.$altEvents.on('netOwnerChange', callback);
    }

    public onceNetOwnerChange(callback: ServerEvents.GenericEventCallback<ServerEvents.NetOwnerChangeEventParameters>) {
        return this.$altEvents.once('netOwnerChange', callback);
    }

    public onWeaponDamage(callback: ServerEvents.GenericCancellableEventCallback<ServerEvents.WeaponDamageEventParameters>) {
        return this.$altEvents.on('weaponDamage', callback);
    }

    public onceWeaponDamage(callback: ServerEvents.GenericCancellableEventCallback<ServerEvents.WeaponDamageEventParameters>) {
        return this.$altEvents.once('weaponDamage', callback);
    }

    public onMetaChange(callback: ServerEvents.GenericEventCallback<ServerEvents.MetaChangeEventParameters>) {
        return this.$altEvents.on('metaChange', callback);
    }

    public onLocalMetaChange<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.LocalMetaChangeEventParameters, T>,
    ) {
        return this.$altEvents.on('localMetaChange', callback);
    }

    public onceLocalMetaChange<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.LocalMetaChangeEventParameters, T>,
    ) {
        return this.$altEvents.once('localMetaChange', callback);
    }

    public onStreamSyncedMetaChange(callback: ServerEvents.GenericEventCallback<ServerEvents.StreamSyncedMetaChangeEventParameters>) {
        return this.$altEvents.on('streamSyncedMetaChange', callback);
    }

    public onceStreamSyncedMetaChange(callback: ServerEvents.GenericEventCallback<ServerEvents.StreamSyncedMetaChangeEventParameters>) {
        return this.$altEvents.once('streamSyncedMetaChange', callback);
    }

    public onGlobalMetaChange(callback: ServerEvents.GenericEventCallback<ServerEvents.GlobalMetaChangeEventParameters>) {
        return this.$altEvents.on('globalMetaChange', callback);
    }

    public onceGlobalMetaChange(callback: ServerEvents.GenericEventCallback<ServerEvents.GlobalMetaChangeEventParameters>) {
        return this.$altEvents.once('globalMetaChange', callback);
    }

    public onGlobalSyncedMetaChange(callback: ServerEvents.GenericEventCallback<ServerEvents.GlobalSyncedMetaChangeEventParameters>) {
        return this.$altEvents.on('globalSyncedMetaChange', callback);
    }

    public onceGlobalSyncedMetaChange(callback: ServerEvents.GenericEventCallback<ServerEvents.GlobalSyncedMetaChangeEventParameters>) {
        return this.$altEvents.once('globalSyncedMetaChange', callback);
    }

    public onConsoleCommand(callback: ServerEvents.GenericEventCallback<ServerEvents.ConsoleCommandEventParameters>) {
        return this.$altEvents.on('consoleCommand', callback);
    }

    public onceConsoleCommand(callback: ServerEvents.GenericEventCallback<ServerEvents.ConsoleCommandEventParameters>) {
        return this.$altEvents.once('consoleCommand', callback);
    }

    public onError(callback: ServerEvents.GenericEventCallback<ServerEvents.ErrorEventParameters>) {
        return this.$altEvents.on('error', callback);
    }

    public onceError(callback: ServerEvents.GenericEventCallback<ServerEvents.ErrorEventParameters>) {
        return this.$altEvents.once('error', callback);
    }

    public onColShapeEvent(callback: ServerEvents.GenericEventCallback<ServerEvents.ColShapeEventParameters>) {
        return this.$altEvents.on('colShapeEvent', callback);
    }

    public onceColShapeEvent(callback: ServerEvents.GenericEventCallback<ServerEvents.ColShapeEventParameters>) {
        return this.$altEvents.once('colShapeEvent', callback);
    }

    public onExplosion(callback: ServerEvents.GenericCancellableEventCallback<ServerEvents.ExplosionEventParameters>) {
        return this.$altEvents.on('explosion', (data) => callback(data));
    }

    public onceExplosion(callback: ServerEvents.GenericCancellableEventCallback<ServerEvents.ExplosionEventParameters>) {
        return this.$altEvents.once('explosion', (data) => callback(data));
    }

    public onFireStart<T extends Player>(
        callback: ServerEvents.GenericCancellablePlayerEventCallback<ServerEvents.FireStartEventParameters, T>,
    ) {
        return this.$altEvents.on('fireStart', callback);
    }

    public onceFireStart<T extends Player>(
        callback: ServerEvents.GenericCancellablePlayerEventCallback<ServerEvents.FireStartEventParameters, T>,
    ) {
        return this.$altEvents.once('fireStart', callback);
    }

    public onProjectileStart<T extends Player>(
        callback: ServerEvents.GenericCancellablePlayerEventCallback<ServerEvents.ProjectileStartEventParameters, T>,
    ) {
        return this.$altEvents.on('projectileStart', callback);
    }

    public onceProjectileStart<T extends Player>(
        callback: ServerEvents.GenericCancellablePlayerEventCallback<ServerEvents.ProjectileStartEventParameters, T>,
    ) {
        return this.$altEvents.once('projectileStart', callback);
    }

    public onEntityColShapeEnter(callback: ServerEvents.GenericEventCallback<ServerEvents.EntityColShapeEnterEventParameters>) {
        return this.$altEvents.on('entityColShapeEnter', callback);
    }

    public onceEntityColShapeEnter(callback: ServerEvents.GenericEventCallback<ServerEvents.EntityColShapeEnterEventParameters>) {
        return this.$altEvents.once('entityColShapeEnter', callback);
    }

    public onEntityColShapeLeave(callback: ServerEvents.GenericEventCallback<ServerEvents.EntityColShapeLeaveEventParameters>) {
        return this.$altEvents.on('entityColShapeLeave', callback);
    }

    public onceEntityColShapeLeave(callback: ServerEvents.GenericEventCallback<ServerEvents.EntityColShapeLeaveEventParameters>) {
        return this.$altEvents.once('entityColShapeLeave', callback);
    }

    public onEntityCheckpointEnter(callback: ServerEvents.GenericEventCallback<ServerEvents.EntityCheckpointEnterEventParameters>) {
        return this.$altEvents.on('entityCheckpointEnter', callback);
    }

    public onceEntityCheckpointEnter(callback: ServerEvents.GenericEventCallback<ServerEvents.EntityCheckpointEnterEventParameters>) {
        return this.$altEvents.once('entityCheckpointEnter', callback);
    }

    public onEntityCheckpointLeave(callback: ServerEvents.GenericEventCallback<ServerEvents.EntityCheckpointLeaveEventParameters>) {
        return this.$altEvents.on('entityCheckpointLeave', callback);
    }

    public onceEntityCheckpointLeave(callback: ServerEvents.GenericEventCallback<ServerEvents.EntityCheckpointLeaveEventParameters>) {
        return this.$altEvents.once('entityCheckpointLeave', callback);
    }

    public onGivePedScriptedTask(callback: ServerEvents.GenericEventCallback<ServerEvents.GivePedScriptedTaskEventParameters>) {
        return this.$altEvents.on('givePedScriptedTask', callback);
    }

    public onLocalScriptEvent<T = unknown[]>(callback: ServerEvents.GenericEventCallback<ServerEvents.ServerScriptEventParameters<T>>) {
        return this.$altEvents.on('localScriptEvent', callback);
    }

    public onceLocalScriptEvent<T = unknown[]>(callback: ServerEvents.GenericEventCallback<ServerEvents.ServerScriptEventParameters<T>>) {
        return this.$altEvents.once('localScriptEvent', callback);
    }

    public onRemoteScriptEvent<T = unknown[], U extends Player = Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerScriptEventParameters<T>, U>,
    ) {
        return this.$altEvents.on('remoteScriptEvent', callback);
    }

    public onceRemoteScriptEvent<T = unknown[], U extends Player = Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerScriptEventParameters<T>, U>,
    ) {
        return this.$altEvents.once('remoteScriptEvent', callback);
    }

    public onAnyResourceStart(callback: ServerEvents.GenericEventCallback<ServerEvents.ResourceStartEventParameters>) {
        return this.$altEvents.on('anyResourceStart', callback);
    }

    public onceAnyResourceStart(callback: ServerEvents.GenericEventCallback<ServerEvents.ResourceStartEventParameters>) {
        return this.$altEvents.once('anyResourceStart', callback);
    }

    public onAnyResourceStop(callback: ServerEvents.GenericEventCallback<ServerEvents.ResourceStopEventParameters>) {
        return this.$altEvents.on('anyResourceStop', callback);
    }

    public onceAnyResourceStop(callback: ServerEvents.GenericEventCallback<ServerEvents.ResourceStopEventParameters>) {
        return this.$altEvents.once('anyResourceStop', callback);
    }

    public onResourceStart(callback: ServerEvents.GenericEventCallback) {
        return this.$altEvents.on('resourceStart', callback);
    }

    public onceResourceStart(callback: ServerEvents.GenericEventCallback) {
        return this.$altEvents.once('resourceStart', callback);
    }

    public onResourceStop(callback: ServerEvents.GenericEventCallback) {
        return this.$altEvents.on('resourceStop', callback);
    }

    public onceResourceStop(callback: ServerEvents.GenericEventCallback) {
        return this.$altEvents.once('resourceStop', callback);
    }

    public onResourceError(callback: ServerEvents.GenericEventCallback<ServerEvents.ResourceErrorEventParameters>) {
        return this.$altEvents.on('resourceError', callback);
    }

    public onceResourceError(callback: ServerEvents.GenericEventCallback<ServerEvents.ResourceErrorEventParameters>) {
        return this.$altEvents.once('resourceError', callback);
    }

    public onEvent(callback: ServerEvents.GenericEventCallback<SharedEvents.GenericOnEventParameters>) {
        return this.$altEvents.on('event', callback);
    }
}
