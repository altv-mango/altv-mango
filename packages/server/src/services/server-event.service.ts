import { BaseEventService } from '@altv-mango/core/app';
import { injectable } from 'inversify';
import { INTERNAL_EVENTS } from '../constants';
import type { EventService } from '../interfaces';
import { Events as ServerEvents, Player } from '@altv/server';
import type { Events as SharedEvents } from '@altv/shared';

@injectable()
export class ServerEventService extends BaseEventService<ServerEvents.CustomServerEvent> implements EventService {
    public constructor() {
        super();

        this.$altEvents = ServerEvents;
        this.$internalEventNames = new Set(Object.values(INTERNAL_EVENTS));
    }

    public onPlayer<E extends string, U extends Player>(
        eventName: Exclude<E, keyof SharedEvents.CustomPlayerToServerEvent>,
        callback: (player: U, body: unknown) => void | Promise<void>,
    ) {
        const wrapper = (player: U, ...args: unknown[]) => callback(player, args[0]);
        const eventHandler = ServerEvents.onPlayer(eventName, wrapper);
        this.$remoteHandlers.add(eventHandler);
        return eventHandler;
    }

    public oncePlayer<E extends string, U extends Player>(
        eventName: Exclude<E, keyof SharedEvents.CustomPlayerToServerEvent>,
        callback: (player: U, body: unknown) => void | Promise<void>,
    ) {
        const wrapper = (player: U, ...args: unknown[]) => callback(player, args[0]!);
        const eventHandler = ServerEvents.oncePlayer(eventName, wrapper);
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
        ServerEvents.emitAllPlayersRaw(eventName, body);
    }

    public emitAllPlayersUnreliable<E extends string>(eventName: Exclude<E, keyof SharedEvents.CustomServerToPlayerEvent>, body?: unknown) {
        ServerEvents.emitAllPlayersUnreliableRaw(eventName, body);
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
        return ServerEvents.onScriptRPC(callback);
    }

    public onceScriptRPC<T extends Player>(callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.ScriptRPCEventParameters, T>) {
        return ServerEvents.onceScriptRPC(callback);
    }

    public onScriptRPCAnswer<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.ScriptRPCAnswerEventParameters, T>,
    ) {
        return ServerEvents.onScriptRPCAnswer(callback);
    }

    public onceScriptRPCAnswer<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.ScriptRPCAnswerEventParameters, T>,
    ) {
        return ServerEvents.onceScriptRPCAnswer(callback);
    }

    public onServerStarted(callback: ServerEvents.GenericEventCallback) {
        return ServerEvents.onServerStarted(callback);
    }

    public onceServerStarted(callback: ServerEvents.GenericEventCallback) {
        return ServerEvents.onceServerStarted(callback);
    }

    public onConnectionQueueAdd(callback: ServerEvents.GenericEventCallback<ServerEvents.ConnectionQueueEventParameters>) {
        return ServerEvents.onConnectionQueueAdd(callback);
    }

    public onceConnectionQueueAdd(callback: ServerEvents.GenericEventCallback<ServerEvents.ConnectionQueueEventParameters>) {
        return ServerEvents.onceConnectionQueueAdd(callback);
    }

    public onConnectionQueueRemove(callback: ServerEvents.GenericEventCallback<ServerEvents.ConnectionQueueEventParameters>) {
        return ServerEvents.onConnectionQueueRemove(callback);
    }

    public onceConnectionQueueRemove(callback: ServerEvents.GenericEventCallback<ServerEvents.ConnectionQueueEventParameters>) {
        return ServerEvents.onceConnectionQueueRemove(callback);
    }

    public onPlayerConnect<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerConnectEventParameters, T>,
    ) {
        return ServerEvents.onPlayerConnect(callback);
    }

    public oncePlayerConnect<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerConnectEventParameters, T>,
    ) {
        return ServerEvents.oncePlayerConnect(callback);
    }

    public onPlayerConnectDenied(callback: ServerEvents.GenericEventCallback<ServerEvents.PlayerConnectDeniedEventParameters>) {
        return ServerEvents.onPlayerConnectDenied(callback);
    }

    public oncePlayerConnectDenied(callback: ServerEvents.GenericEventCallback<ServerEvents.PlayerConnectDeniedEventParameters>) {
        return ServerEvents.oncePlayerConnectDenied(callback);
    }

    public onPlayerDisconnect<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerDisconnectEventParameters, T>,
    ) {
        return ServerEvents.onPlayerDisconnect(callback);
    }

    public oncePlayerDisconnect<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerDisconnectEventParameters, T>,
    ) {
        return ServerEvents.oncePlayerDisconnect(callback);
    }

    public onPlayerDamage<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerDamageEventParameters, T>,
    ) {
        return ServerEvents.onPlayerDamage(callback);
    }

    public oncePlayerDamage<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerDamageEventParameters, T>,
    ) {
        return ServerEvents.oncePlayerDamage(callback);
    }

    public onPlayerDeath<T extends Player>(callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerDeathEventParameters, T>) {
        return ServerEvents.onPlayerDeath(callback);
    }

    public oncePlayerDeath<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerDeathEventParameters, T>,
    ) {
        return ServerEvents.oncePlayerDeath(callback);
    }

    public onPlayerHeal<T extends Player>(callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerHealEventParameters, T>) {
        return ServerEvents.onPlayerHeal(callback);
    }

    public oncePlayerHeal<T extends Player>(callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerHealEventParameters, T>) {
        return ServerEvents.oncePlayerHeal(callback);
    }

    public onPlayerControlRequest<T extends Player>(
        callback: ServerEvents.GenericCancellablePlayerEventCallback<ServerEvents.PlayerControlRequestEventParameters, T>,
    ) {
        return ServerEvents.onPlayerControlRequest(callback);
    }

    public oncePlayerControlRequest<T extends Player>(
        callback: ServerEvents.GenericCancellablePlayerEventCallback<ServerEvents.PlayerControlRequestEventParameters, T>,
    ) {
        return ServerEvents.oncePlayerControlRequest(callback);
    }

    public onPlayerInteriorChange<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerInteriorChangeEventParameters, T>,
    ) {
        return ServerEvents.onPlayerInteriorChange(callback);
    }

    public oncePlayerInteriorChange<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerInteriorChangeEventParameters, T>,
    ) {
        return ServerEvents.oncePlayerInteriorChange(callback);
    }

    public onPlayerDimensionChange<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerDimensionChangeEventParameters, T>,
    ) {
        return ServerEvents.onPlayerDimensionChange(callback);
    }

    public oncePlayerDimensionChange<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerDimensionChangeEventParameters, T>,
    ) {
        return ServerEvents.oncePlayerDimensionChange(callback);
    }

    public onPlayerWeaponChange<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerWeaponChangeEventParameters, T>,
    ) {
        return ServerEvents.onPlayerWeaponChange(callback);
    }

    public oncePlayerWeaponChange<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerWeaponChangeEventParameters, T>,
    ) {
        return ServerEvents.oncePlayerWeaponChange(callback);
    }

    public onPlayerSyncedSceneRequest(
        callback: ServerEvents.GenericCancellableEventCallback<ServerEvents.PlayerSyncedSceneRequestEventParameters>,
    ) {
        return ServerEvents.onPlayerSyncedSceneRequest(callback);
    }

    public oncePlayerSyncedSceneRequest(
        callback: ServerEvents.GenericCancellableEventCallback<ServerEvents.PlayerSyncedSceneRequestEventParameters>,
    ) {
        return ServerEvents.oncePlayerSyncedSceneRequest(callback);
    }

    public onPlayerSyncedSceneStart<T extends Player>(
        callback: ServerEvents.GenericCancellablePlayerEventCallback<ServerEvents.PlayerSyncedSceneStartEventParameters, T>,
    ) {
        return ServerEvents.onPlayerSyncedSceneStart(callback);
    }

    public oncePlayerSyncedSceneStart<T extends Player>(
        callback: ServerEvents.GenericCancellablePlayerEventCallback<ServerEvents.PlayerSyncedSceneStartEventParameters, T>,
    ) {
        return ServerEvents.oncePlayerSyncedSceneStart(callback);
    }

    public onPlayerSyncedSceneStop<T extends Player>(
        callback: ServerEvents.GenericCancellablePlayerEventCallback<ServerEvents.PlayerSyncedSceneStopEventParameters, T>,
    ) {
        return ServerEvents.onPlayerSyncedSceneStop(callback);
    }

    public oncePlayerSyncedSceneStop<T extends Player>(
        callback: ServerEvents.GenericCancellablePlayerEventCallback<ServerEvents.PlayerSyncedSceneStopEventParameters, T>,
    ) {
        return ServerEvents.oncePlayerSyncedSceneStop(callback);
    }

    public onPlayerSyncedSceneUpdate<T extends Player>(
        callback: ServerEvents.GenericCancellablePlayerEventCallback<ServerEvents.PlayerSyncedSceneUpdateEventParameters, T>,
    ) {
        return ServerEvents.onPlayerSyncedSceneUpdate(callback);
    }

    public onPlayerSpawn<T extends Player>(callback: ServerEvents.GenericPlayerEventCallback<{}, T>) {
        return ServerEvents.onPlayerSpawn(callback);
    }

    public oncePlayerSpawn<T extends Player>(callback: ServerEvents.GenericPlayerEventCallback<{}, T>) {
        return ServerEvents.oncePlayerSpawn(callback);
    }

    public onPlayerAnimationChange<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerAnimationChangeEventParameters, T>,
    ) {
        return ServerEvents.onPlayerAnimationChange(callback);
    }

    public oncePlayerAnimationChange<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerAnimationChangeEventParameters, T>,
    ) {
        return ServerEvents.oncePlayerAnimationChange(callback);
    }

    public onPlayerVehicleEntered<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerVehicleEnteredEventParameters, T>,
    ) {
        return ServerEvents.onPlayerVehicleEntered(callback);
    }

    public oncePlayerVehicleEntered<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerVehicleEnteredEventParameters, T>,
    ) {
        return ServerEvents.oncePlayerVehicleEntered(callback);
    }

    public onPlayerStartVehicleEnter<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerStartVehicleEnterEventParameters, T>,
    ) {
        return ServerEvents.onPlayerStartVehicleEnter(callback);
    }

    public oncePlayerStartVehicleEnter<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerStartVehicleEnterEventParameters, T>,
    ) {
        return ServerEvents.oncePlayerStartVehicleEnter(callback);
    }

    public onPlayerVehicleLeft<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerVehicleLeftEventParameters, T>,
    ) {
        return ServerEvents.onPlayerVehicleLeft(callback);
    }

    public oncePlayerVehicleLeft<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerVehicleLeftEventParameters, T>,
    ) {
        return ServerEvents.oncePlayerVehicleLeft(callback);
    }

    public onPlayerVehicleSeatChange<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerVehicleSeatChangeEventParameters, T>,
    ) {
        return ServerEvents.onPlayerVehicleSeatChange(callback);
    }

    public oncePlayerVehicleSeatChange<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerVehicleSeatChangeEventParameters, T>,
    ) {
        return ServerEvents.oncePlayerVehicleSeatChange(callback);
    }

    public onPlayerStartTalking<T extends Player>(callback: ServerEvents.GenericPlayerEventCallback<{}, T>) {
        return ServerEvents.onPlayerStartTalking(callback);
    }

    public oncePlayerStartTalking<T extends Player>(callback: ServerEvents.GenericPlayerEventCallback<{}, T>) {
        return ServerEvents.oncePlayerStartTalking(callback);
    }

    public onPlayerStopTalking<T extends Player>(callback: ServerEvents.GenericPlayerEventCallback<{}, T>) {
        return ServerEvents.onPlayerStopTalking(callback);
    }

    public oncePlayerStopTalking<T extends Player>(callback: ServerEvents.GenericPlayerEventCallback<{}, T>) {
        return ServerEvents.oncePlayerStopTalking(callback);
    }

    public onPedHeal(callback: ServerEvents.GenericEventCallback<ServerEvents.PedHealEventParameters>) {
        return ServerEvents.onPedHeal(callback);
    }

    public oncePedHeal(callback: ServerEvents.GenericEventCallback<ServerEvents.PedHealEventParameters>) {
        return ServerEvents.oncePedHeal(callback);
    }

    public onPedDeath(callback: ServerEvents.GenericEventCallback<ServerEvents.PedDeathEventParameters>) {
        return ServerEvents.onPedDeath(callback);
    }

    public oncePedDeath(callback: ServerEvents.GenericEventCallback<ServerEvents.PedDeathEventParameters>) {
        return ServerEvents.oncePedDeath(callback);
    }

    public onPedDamage(callback: ServerEvents.GenericEventCallback<ServerEvents.PedDamageEventParameters>) {
        return ServerEvents.onPedDamage(callback);
    }

    public oncePedDamage(callback: ServerEvents.GenericEventCallback<ServerEvents.PedDamageEventParameters>) {
        return ServerEvents.oncePedDamage(callback);
    }

    public onVehicleDestroy(callback: ServerEvents.GenericEventCallback<ServerEvents.VehicleDestroyEventParameters>) {
        return ServerEvents.onVehicleDestroy(callback);
    }

    public onceVehicleDestroy(callback: ServerEvents.GenericEventCallback<ServerEvents.VehicleDestroyEventParameters>) {
        return ServerEvents.onceVehicleDestroy(callback);
    }

    public onVehicleAttach(callback: ServerEvents.GenericEventCallback<ServerEvents.VehicleAttachEventParameters>) {
        return ServerEvents.onVehicleAttach(callback);
    }

    public onceVehicleAttach(callback: ServerEvents.GenericEventCallback<ServerEvents.VehicleAttachEventParameters>) {
        return ServerEvents.onceVehicleAttach(callback);
    }

    public onVehicleDetach(callback: ServerEvents.GenericEventCallback<ServerEvents.VehicleDetachEventParameters>) {
        return ServerEvents.onVehicleDetach(callback);
    }

    public onceVehicleDetach(callback: ServerEvents.GenericEventCallback<ServerEvents.VehicleDetachEventParameters>) {
        return ServerEvents.onceVehicleDetach(callback);
    }

    public onVehicleDamage(callback: ServerEvents.GenericEventCallback<ServerEvents.VehicleDamageEventParameters>) {
        return ServerEvents.onVehicleDamage(callback);
    }

    public onceVehicleDamage(callback: ServerEvents.GenericEventCallback<ServerEvents.VehicleDamageEventParameters>) {
        return ServerEvents.onceVehicleDamage(callback);
    }

    public onVehicleSirenStateChange(callback: ServerEvents.GenericEventCallback<ServerEvents.VehicleSirenStateChangeEventParameters>) {
        return ServerEvents.onVehicleSirenStateChange(callback);
    }

    public onceVehicleSirenStateChange(callback: ServerEvents.GenericEventCallback<ServerEvents.VehicleSirenStateChangeEventParameters>) {
        return ServerEvents.onceVehicleSirenStateChange(callback);
    }

    public onVehicleHornStateChange<T extends Player>(
        callback: ServerEvents.GenericCancellablePlayerEventCallback<ServerEvents.VehicleHornStateChangeEventParameters, T>,
    ) {
        return ServerEvents.onVehicleHornStateChange(callback);
    }

    public onceVehicleHornStateChange<T extends Player>(
        callback: ServerEvents.GenericCancellablePlayerEventCallback<ServerEvents.VehicleHornStateChangeEventParameters, T>,
    ) {
        return ServerEvents.onceVehicleHornStateChange(callback);
    }

    public onVoiceConnectionCreate(callback: ServerEvents.GenericEventCallback<ServerEvents.VoiceConnectionEventParameters>) {
        return ServerEvents.onVoiceConnectionCreate(callback);
    }

    public onceVoiceConnectionCreate(callback: ServerEvents.GenericEventCallback<ServerEvents.VoiceConnectionEventParameters>) {
        return ServerEvents.onceVoiceConnectionCreate(callback);
    }

    public onClientObjectDelete<T extends Player>(callback: ServerEvents.GenericCancellablePlayerEventCallback<{}, T>) {
        return ServerEvents.onClientObjectDelete(callback);
    }

    public onceClientObjectDelete<T extends Player>(callback: ServerEvents.GenericCancellablePlayerEventCallback<{}, T>) {
        return ServerEvents.onceClientObjectDelete(callback);
    }

    public onClientObjectRequest<T extends Player>(
        callback: ServerEvents.GenericCancellablePlayerEventCallback<ServerEvents.ClientObjectEventParameters, T>,
    ) {
        return ServerEvents.onClientObjectRequest(callback);
    }

    public onceClientObjectRequest<T extends Player>(
        callback: ServerEvents.GenericCancellablePlayerEventCallback<ServerEvents.ClientObjectEventParameters, T>,
    ) {
        return ServerEvents.onceClientObjectRequest(callback);
    }

    public onBaseObjectCreate(callback: ServerEvents.GenericEventCallback<ServerEvents.BaseObjectCreateEventParameters>) {
        return ServerEvents.onBaseObjectCreate(callback);
    }

    public onceBaseObjectCreate(callback: ServerEvents.GenericEventCallback<ServerEvents.BaseObjectCreateEventParameters>) {
        return ServerEvents.onceBaseObjectCreate(callback);
    }

    public onBaseObjectRemove(callback: ServerEvents.GenericEventCallback<ServerEvents.BaseObjectRemoveEventParameters>) {
        return ServerEvents.onBaseObjectRemove(callback);
    }

    public onceBaseObjectRemove(callback: ServerEvents.GenericEventCallback<ServerEvents.BaseObjectRemoveEventParameters>) {
        return ServerEvents.onceBaseObjectRemove(callback);
    }

    public onNetOwnerChange(callback: ServerEvents.GenericEventCallback<ServerEvents.NetOwnerChangeEventParameters>) {
        return ServerEvents.onNetOwnerChange(callback);
    }

    public onceNetOwnerChange(callback: ServerEvents.GenericEventCallback<ServerEvents.NetOwnerChangeEventParameters>) {
        return ServerEvents.onceNetOwnerChange(callback);
    }

    public onWeaponDamage(callback: ServerEvents.GenericCancellableEventCallback<ServerEvents.WeaponDamageEventParameters>) {
        return ServerEvents.onWeaponDamage(callback);
    }

    public onceWeaponDamage(callback: ServerEvents.GenericCancellableEventCallback<ServerEvents.WeaponDamageEventParameters>) {
        return ServerEvents.onceWeaponDamage(callback);
    }

    public onMetaChange(callback: ServerEvents.GenericEventCallback<ServerEvents.MetaChangeEventParameters>) {
        return ServerEvents.onMetaChange(callback);
    }

    public onLocalMetaChange<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.LocalMetaChangeEventParameters, T>,
    ) {
        return ServerEvents.onLocalMetaChange(callback);
    }

    public onceLocalMetaChange<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.LocalMetaChangeEventParameters, T>,
    ) {
        return ServerEvents.onceLocalMetaChange(callback);
    }

    public onStreamSyncedMetaChange(callback: ServerEvents.GenericEventCallback<ServerEvents.StreamSyncedMetaChangeEventParameters>) {
        return ServerEvents.onStreamSyncedMetaChange(callback);
    }

    public onceStreamSyncedMetaChange(callback: ServerEvents.GenericEventCallback<ServerEvents.StreamSyncedMetaChangeEventParameters>) {
        return ServerEvents.onceStreamSyncedMetaChange(callback);
    }

    public onGlobalMetaChange(callback: ServerEvents.GenericEventCallback<ServerEvents.GlobalMetaChangeEventParameters>) {
        return ServerEvents.onGlobalMetaChange(callback);
    }

    public onceGlobalMetaChange(callback: ServerEvents.GenericEventCallback<ServerEvents.GlobalMetaChangeEventParameters>) {
        return ServerEvents.onceGlobalMetaChange(callback);
    }

    public onGlobalSyncedMetaChange(callback: ServerEvents.GenericEventCallback<ServerEvents.GlobalSyncedMetaChangeEventParameters>) {
        return ServerEvents.onGlobalSyncedMetaChange(callback);
    }

    public onceGlobalSyncedMetaChange(callback: ServerEvents.GenericEventCallback<ServerEvents.GlobalSyncedMetaChangeEventParameters>) {
        return ServerEvents.onceGlobalSyncedMetaChange(callback);
    }

    public onConsoleCommand(callback: ServerEvents.GenericEventCallback<ServerEvents.ConsoleCommandEventParameters>) {
        return ServerEvents.onConsoleCommand(callback);
    }

    public onceConsoleCommand(callback: ServerEvents.GenericEventCallback<ServerEvents.ConsoleCommandEventParameters>) {
        return ServerEvents.onceConsoleCommand(callback);
    }

    public onError(callback: ServerEvents.GenericEventCallback<ServerEvents.ErrorEventParameters>) {
        return ServerEvents.onError(callback);
    }

    public onceError(callback: ServerEvents.GenericEventCallback<ServerEvents.ErrorEventParameters>) {
        return ServerEvents.onceError(callback);
    }

    public onColShapeEvent(callback: ServerEvents.GenericEventCallback<ServerEvents.ColShapeEventParameters>) {
        return ServerEvents.onColShapeEvent(callback);
    }

    public onceColShapeEvent(callback: ServerEvents.GenericEventCallback<ServerEvents.ColShapeEventParameters>) {
        return ServerEvents.onceColShapeEvent(callback);
    }

    public onExplosion(callback: ServerEvents.GenericCancellableEventCallback<ServerEvents.ExplosionEventParameters>) {
        return ServerEvents.onExplosion(callback);
    }

    public onceExplosion(callback: ServerEvents.GenericCancellableEventCallback<ServerEvents.ExplosionEventParameters>) {
        return ServerEvents.onceExplosion(callback);
    }

    public onFireStart<T extends Player>(
        callback: ServerEvents.GenericCancellablePlayerEventCallback<ServerEvents.FireStartEventParameters, T>,
    ) {
        return ServerEvents.onFireStart(callback);
    }

    public onceFireStart<T extends Player>(
        callback: ServerEvents.GenericCancellablePlayerEventCallback<ServerEvents.FireStartEventParameters, T>,
    ) {
        return ServerEvents.onceFireStart(callback);
    }

    public onProjectileStart<T extends Player>(
        callback: ServerEvents.GenericCancellablePlayerEventCallback<ServerEvents.ProjectileStartEventParameters, T>,
    ) {
        return ServerEvents.onProjectileStart(callback);
    }

    public onceProjectileStart<T extends Player>(
        callback: ServerEvents.GenericCancellablePlayerEventCallback<ServerEvents.ProjectileStartEventParameters, T>,
    ) {
        return ServerEvents.onceProjectileStart(callback);
    }

    public onEntityColShapeEnter(callback: ServerEvents.GenericEventCallback<ServerEvents.EntityColShapeEnterEventParameters>) {
        return ServerEvents.onEntityColShapeEnter(callback);
    }

    public onceEntityColShapeEnter(callback: ServerEvents.GenericEventCallback<ServerEvents.EntityColShapeEnterEventParameters>) {
        return ServerEvents.onceEntityColShapeEnter(callback);
    }

    public onEntityColShapeLeave(callback: ServerEvents.GenericEventCallback<ServerEvents.EntityColShapeLeaveEventParameters>) {
        return ServerEvents.onEntityColShapeLeave(callback);
    }

    public onceEntityColShapeLeave(callback: ServerEvents.GenericEventCallback<ServerEvents.EntityColShapeLeaveEventParameters>) {
        return ServerEvents.onceEntityColShapeLeave(callback);
    }

    public onEntityCheckpointEnter(callback: ServerEvents.GenericEventCallback<ServerEvents.EntityCheckpointEnterEventParameters>) {
        return ServerEvents.onEntityCheckpointEnter(callback);
    }

    public onceEntityCheckpointEnter(callback: ServerEvents.GenericEventCallback<ServerEvents.EntityCheckpointEnterEventParameters>) {
        return ServerEvents.onceEntityCheckpointEnter(callback);
    }

    public onEntityCheckpointLeave(callback: ServerEvents.GenericEventCallback<ServerEvents.EntityCheckpointLeaveEventParameters>) {
        return ServerEvents.onEntityCheckpointLeave(callback);
    }

    public onceEntityCheckpointLeave(callback: ServerEvents.GenericEventCallback<ServerEvents.EntityCheckpointLeaveEventParameters>) {
        return ServerEvents.onceEntityCheckpointLeave(callback);
    }

    public onGivePedScriptedTask(callback: ServerEvents.GenericEventCallback<ServerEvents.GivePedScriptedTaskEventParameters>) {
        return ServerEvents.onGivePedScriptedTask(callback);
    }

    public onLocalScriptEvent<T = unknown[]>(callback: ServerEvents.GenericEventCallback<ServerEvents.ServerScriptEventParameters<T>>) {
        return ServerEvents.onLocalScriptEvent(callback);
    }

    public onceLocalScriptEvent<T = unknown[]>(callback: ServerEvents.GenericEventCallback<ServerEvents.ServerScriptEventParameters<T>>) {
        return ServerEvents.onceLocalScriptEvent(callback);
    }

    public onRemoteScriptEvent<T = unknown[], U extends Player = Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerScriptEventParameters<T>, U>,
    ) {
        return ServerEvents.onRemoteScriptEvent(callback);
    }

    public onceRemoteScriptEvent<T = unknown[], U extends Player = Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerScriptEventParameters<T>, U>,
    ) {
        return ServerEvents.onceRemoteScriptEvent(callback);
    }

    public onAnyResourceStart(callback: ServerEvents.GenericEventCallback<ServerEvents.ResourceStartEventParameters>) {
        return ServerEvents.onAnyResourceStart(callback);
    }

    public onceAnyResourceStart(callback: ServerEvents.GenericEventCallback<ServerEvents.ResourceStartEventParameters>) {
        return ServerEvents.onceAnyResourceStart(callback);
    }

    public onAnyResourceStop(callback: ServerEvents.GenericEventCallback<ServerEvents.ResourceStopEventParameters>) {
        return ServerEvents.onAnyResourceStop(callback);
    }

    public onceAnyResourceStop(callback: ServerEvents.GenericEventCallback<ServerEvents.ResourceStopEventParameters>) {
        return ServerEvents.onceAnyResourceStop(callback);
    }

    public onResourceStart(callback: ServerEvents.GenericEventCallback) {
        return ServerEvents.onResourceStart(callback);
    }

    public onceResourceStart(callback: ServerEvents.GenericEventCallback) {
        return ServerEvents.onceResourceStart(callback);
    }

    public onResourceStop(callback: ServerEvents.GenericEventCallback) {
        return ServerEvents.onResourceStop(callback);
    }

    public onceResourceStop(callback: ServerEvents.GenericEventCallback) {
        return ServerEvents.onceResourceStop(callback);
    }

    public onResourceError(callback: ServerEvents.GenericEventCallback<ServerEvents.ResourceErrorEventParameters>) {
        return ServerEvents.onResourceError(callback);
    }

    public onceResourceError(callback: ServerEvents.GenericEventCallback<ServerEvents.ResourceErrorEventParameters>) {
        return ServerEvents.onceResourceError(callback);
    }

    public onEvent(callback: ServerEvents.GenericEventCallback<SharedEvents.GenericOnEventParameters>) {
        return ServerEvents.onEvent(callback);
    }
}
