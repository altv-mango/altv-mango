import type { Events as SharedEvents } from '@altv/shared';
import type { Events as ServerEvents, Player } from '@altv/server';
import type { ScriptEventHandler } from '@altv-mango/core/app';

export interface EventService {
    on<E extends keyof ServerEvents.CustomServerEvent>(
        eventName: E,
        callback: (body: Parameters<ServerEvents.CustomServerEvent[E]>[0]) => void | Promise<void>,
    ): ScriptEventHandler;
    on<E extends string>(
        eventName: Exclude<E, keyof ServerEvents.CustomServerEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): ScriptEventHandler;
    once<E extends keyof ServerEvents.CustomServerEvent>(
        eventName: E,
        callback: (body: Parameters<ServerEvents.CustomServerEvent[E]>[0]) => void | Promise<void>,
    ): ScriptEventHandler;
    once<E extends string>(
        eventName: Exclude<E, keyof ServerEvents.CustomServerEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): ScriptEventHandler;
    emit<E extends keyof ServerEvents.CustomServerEvent>(eventName: E, body?: Parameters<ServerEvents.CustomServerEvent[E]>[0]): void;
    emit<E extends string>(eventName: Exclude<E, keyof ServerEvents.CustomServerEvent>, body?: any): void;
    onPlayer<E extends keyof SharedEvents.CustomPlayerToServerEvent, U extends Player>(
        eventName: E,
        callback: (player: U, body: Parameters<SharedEvents.CustomPlayerToServerEvent[E]>[0]) => void | Promise<void>,
    ): ScriptEventHandler;
    onPlayer<E extends string, U extends Player>(
        eventName: Exclude<E, keyof SharedEvents.CustomPlayerToServerEvent>,
        callback: (player: U, body: unknown) => void | Promise<void>,
    ): ScriptEventHandler;
    oncePlayer<E extends keyof SharedEvents.CustomPlayerToServerEvent, U extends Player>(
        eventName: E,
        callback: (player: U, body: Parameters<SharedEvents.CustomPlayerToServerEvent[E]>[0]) => void | Promise<void>,
    ): ScriptEventHandler;
    oncePlayer<E extends string, U extends Player>(
        eventName: Exclude<E, keyof SharedEvents.CustomPlayerToServerEvent>,
        callback: (player: U, body: unknown) => void | Promise<void>,
    ): ScriptEventHandler;
    onRemote<E extends keyof SharedEvents.CustomPlayerToServerEvent, U extends Player>(
        eventName: E,
        callback: (player: U, body: Parameters<SharedEvents.CustomPlayerToServerEvent[E]>[0]) => void | Promise<void>,
    ): ScriptEventHandler;
    onRemote<E extends string, U extends Player>(
        eventName: Exclude<E, keyof SharedEvents.CustomPlayerToServerEvent>,
        callback: (player: U, body: unknown) => void | Promise<void>,
    ): ScriptEventHandler;
    onceRemote<E extends keyof SharedEvents.CustomPlayerToServerEvent, U extends Player>(
        eventName: E,
        callback: (player: U, body: Parameters<SharedEvents.CustomPlayerToServerEvent[E]>[0]) => void | Promise<void>,
    ): ScriptEventHandler;
    onceRemote<E extends string, U extends Player>(
        eventName: Exclude<E, keyof SharedEvents.CustomPlayerToServerEvent>,
        callback: (player: U, body: unknown) => void | Promise<void>,
    ): ScriptEventHandler;
    emitPlayers<E extends keyof SharedEvents.CustomServerToPlayerEvent, U extends Player>(
        player: U[],
        eventName: E,
        body?: Parameters<SharedEvents.CustomServerToPlayerEvent[E]>[0],
    ): void;
    emitPlayers<E extends string, U extends Player>(
        player: U[],
        eventName: Exclude<E, keyof SharedEvents.CustomServerToPlayerEvent>,
        body?: unknown,
    ): void;
    emitPlayersUnreliable<E extends keyof SharedEvents.CustomServerToPlayerEvent, U extends Player>(
        player: U[],
        eventName: E,
        body?: Parameters<SharedEvents.CustomServerToPlayerEvent[E]>[0],
    ): void;
    emitPlayersUnreliable<E extends string, U extends Player>(
        player: U[],
        eventName: Exclude<E, keyof SharedEvents.CustomServerToPlayerEvent>,
        body?: unknown,
    ): void;
    emitAllPlayers<E extends keyof SharedEvents.CustomServerToPlayerEvent>(
        eventName: E,
        body?: Parameters<SharedEvents.CustomServerToPlayerEvent[E]>[0],
    ): void;
    emitAllPlayers<E extends string>(eventName: Exclude<E, keyof SharedEvents.CustomServerToPlayerEvent>, body?: unknown): void;
    emitAllPlayersUnreliable<E extends keyof SharedEvents.CustomServerToPlayerEvent>(
        eventName: E,
        body?: Parameters<SharedEvents.CustomServerToPlayerEvent[E]>[0],
    ): void;
    emitAllPlayersUnreliable<E extends string>(eventName: Exclude<E, keyof SharedEvents.CustomServerToPlayerEvent>, body?: unknown): void;
    onWebView<E extends keyof SharedEvents.CustomWebViewToServerEvent, U extends Player>(
        id: string | number,
        eventName: E,
        callback: (player: U, body: Parameters<SharedEvents.CustomWebViewToServerEvent[E]>[0]) => void | Promise<void>,
    ): ScriptEventHandler;
    onWebView<E extends string, U extends Player>(
        id: string | number,
        eventName: Exclude<E, keyof SharedEvents.CustomWebViewToServerEvent>,
        callback: (player: U, body: unknown) => void | Promise<void>,
    ): ScriptEventHandler;
    onceWebView<E extends keyof SharedEvents.CustomWebViewToServerEvent, U extends Player>(
        id: string | number,
        eventName: E,
        callback: (player: U, body: Parameters<SharedEvents.CustomWebViewToServerEvent[E]>[0]) => void | Promise<void>,
    ): ScriptEventHandler;
    onceWebView<E extends string, U extends Player>(
        id: string | number,
        eventName: Exclude<E, keyof SharedEvents.CustomWebViewToServerEvent>,
        callback: (player: U, body: unknown) => void | Promise<void>,
    ): ScriptEventHandler;

    emitWebViews<E extends keyof SharedEvents.CustomServerToWebViewEvent, U extends Player>(
        player: U[],
        id: string | number,
        eventName: E,
        body?: Parameters<SharedEvents.CustomServerToWebViewEvent[E]>[0],
    ): void;
    emitWebViews<E extends string, U extends Player>(
        player: U[],
        id: string | number,
        eventName: Exclude<E, keyof SharedEvents.CustomServerToWebViewEvent>,
        body?: unknown,
    ): void;

    emitAllWebViews<E extends keyof SharedEvents.CustomServerToWebViewEvent>(
        id: string | number,
        eventName: E,
        body?: Parameters<SharedEvents.CustomServerToWebViewEvent[E]>[0],
    ): void;
    emitAllWebViews<E extends string>(
        id: string | number,
        eventName: Exclude<E, keyof SharedEvents.CustomServerToWebViewEvent>,
        body?: unknown,
    ): void;

    emitAllWebViewsUnreliable<E extends keyof SharedEvents.CustomServerToWebViewEvent>(
        id: string | number,
        eventName: E,
        body?: Parameters<SharedEvents.CustomServerToWebViewEvent[E]>[0],
    ): void;
    emitAllWebViewsUnreliable<E extends string>(
        id: string | number,
        eventName: Exclude<E, keyof SharedEvents.CustomServerToWebViewEvent>,
        body?: unknown,
    ): void;

    onScriptRPC<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.ScriptRPCEventParameters, T>,
    ): ScriptEventHandler;
    onceScriptRPC<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.ScriptRPCEventParameters, T>,
    ): ScriptEventHandler;
    onScriptRPCAnswer<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.ScriptRPCAnswerEventParameters, T>,
    ): ScriptEventHandler;
    onceScriptRPCAnswer<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.ScriptRPCAnswerEventParameters, T>,
    ): ScriptEventHandler;
    onServerStarted(callback: ServerEvents.GenericEventCallback): ScriptEventHandler;
    onceServerStarted(callback: ServerEvents.GenericEventCallback): ScriptEventHandler;
    onConnectionQueueAdd(
        callback: ServerEvents.GenericEventCallback<ServerEvents.ConnectionQueueEventParameters>,
    ): ScriptEventHandler;
    onceConnectionQueueAdd(
        callback: ServerEvents.GenericEventCallback<ServerEvents.ConnectionQueueEventParameters>,
    ): ScriptEventHandler;
    onConnectionQueueRemove(
        callback: ServerEvents.GenericEventCallback<ServerEvents.ConnectionQueueEventParameters>,
    ): ScriptEventHandler;
    onceConnectionQueueRemove(
        callback: ServerEvents.GenericEventCallback<ServerEvents.ConnectionQueueEventParameters>,
    ): ScriptEventHandler;
    onPlayerConnect<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerConnectEventParameters, T>,
    ): ScriptEventHandler;
    oncePlayerConnect<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerConnectEventParameters, T>,
    ): ScriptEventHandler;
    onPlayerConnectDenied(
        callback: ServerEvents.GenericEventCallback<ServerEvents.PlayerConnectDeniedEventParameters>,
    ): ScriptEventHandler;
    oncePlayerConnectDenied(
        callback: ServerEvents.GenericEventCallback<ServerEvents.PlayerConnectDeniedEventParameters>,
    ): ScriptEventHandler;
    onPlayerDisconnect<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerDisconnectEventParameters, T>,
    ): ScriptEventHandler;
    oncePlayerDisconnect<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerDisconnectEventParameters, T>,
    ): ScriptEventHandler;
    onPlayerDamage<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerDamageEventParameters, T>,
    ): ScriptEventHandler;
    oncePlayerDamage<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerDamageEventParameters, T>,
    ): ScriptEventHandler;
    onPlayerDeath<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerDeathEventParameters, T>,
    ): ScriptEventHandler;
    oncePlayerDeath<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerDeathEventParameters, T>,
    ): ScriptEventHandler;
    onPlayerHeal<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerHealEventParameters, T>,
    ): ScriptEventHandler;
    oncePlayerHeal<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerHealEventParameters, T>,
    ): ScriptEventHandler;
    onPlayerControlRequest<T extends Player>(
        callback: ServerEvents.GenericCancellablePlayerEventCallback<ServerEvents.PlayerControlRequestEventParameters, T>,
    ): ScriptEventHandler;
    oncePlayerControlRequest<T extends Player>(
        callback: ServerEvents.GenericCancellablePlayerEventCallback<ServerEvents.PlayerControlRequestEventParameters, T>,
    ): ScriptEventHandler;
    onPlayerInteriorChange<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerInteriorChangeEventParameters, T>,
    ): ScriptEventHandler;
    oncePlayerInteriorChange<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerInteriorChangeEventParameters, T>,
    ): ScriptEventHandler;
    onPlayerDimensionChange<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerDimensionChangeEventParameters, T>,
    ): ScriptEventHandler;
    oncePlayerDimensionChange<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerDimensionChangeEventParameters, T>,
    ): ScriptEventHandler;
    onPlayerWeaponChange<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerWeaponChangeEventParameters, T>,
    ): ScriptEventHandler;
    oncePlayerWeaponChange<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerWeaponChangeEventParameters, T>,
    ): ScriptEventHandler;
    onPlayerSyncedSceneRequest(
        callback: ServerEvents.GenericCancellableEventCallback<ServerEvents.PlayerSyncedSceneRequestEventParameters>,
    ): ScriptEventHandler;
    oncePlayerSyncedSceneRequest(
        callback: ServerEvents.GenericCancellableEventCallback<ServerEvents.PlayerSyncedSceneRequestEventParameters>,
    ): ScriptEventHandler;
    onPlayerSyncedSceneStart<T extends Player>(
        callback: ServerEvents.GenericCancellablePlayerEventCallback<ServerEvents.PlayerSyncedSceneStartEventParameters, T>,
    ): ScriptEventHandler;
    oncePlayerSyncedSceneStart<T extends Player>(
        callback: ServerEvents.GenericCancellablePlayerEventCallback<ServerEvents.PlayerSyncedSceneStartEventParameters, T>,
    ): ScriptEventHandler;
    onPlayerSyncedSceneStop<T extends Player>(
        callback: ServerEvents.GenericCancellablePlayerEventCallback<ServerEvents.PlayerSyncedSceneStopEventParameters, T>,
    ): ScriptEventHandler;
    oncePlayerSyncedSceneStop<T extends Player>(
        callback: ServerEvents.GenericCancellablePlayerEventCallback<ServerEvents.PlayerSyncedSceneStopEventParameters, T>,
    ): ScriptEventHandler;
    onPlayerSyncedSceneUpdate<T extends Player>(
        callback: ServerEvents.GenericCancellablePlayerEventCallback<ServerEvents.PlayerSyncedSceneUpdateEventParameters, T>,
    ): ScriptEventHandler;
    onPlayerSpawn<T extends Player>(callback: ServerEvents.GenericPlayerEventCallback<{}, T>): ScriptEventHandler;
    oncePlayerSpawn<T extends Player>(callback: ServerEvents.GenericPlayerEventCallback<{}, T>): ScriptEventHandler;
    onPlayerAnimationChange<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerAnimationChangeEventParameters, T>,
    ): ScriptEventHandler;
    oncePlayerAnimationChange<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerAnimationChangeEventParameters, T>,
    ): ScriptEventHandler;
    onPlayerVehicleEntered<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerVehicleEnteredEventParameters, T>,
    ): ScriptEventHandler;
    oncePlayerVehicleEntered<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerVehicleEnteredEventParameters, T>,
    ): ScriptEventHandler;
    onPlayerStartVehicleEnter<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerStartVehicleEnterEventParameters, T>,
    ): ScriptEventHandler;
    oncePlayerStartVehicleEnter<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerStartVehicleEnterEventParameters, T>,
    ): ScriptEventHandler;
    onPlayerVehicleLeft<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerVehicleLeftEventParameters, T>,
    ): ScriptEventHandler;
    oncePlayerVehicleLeft<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerVehicleLeftEventParameters, T>,
    ): ScriptEventHandler;
    onPlayerVehicleSeatChange<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerVehicleSeatChangeEventParameters, T>,
    ): ScriptEventHandler;
    oncePlayerVehicleSeatChange<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerVehicleSeatChangeEventParameters, T>,
    ): ScriptEventHandler;
    onPlayerStartTalking<T extends Player>(callback: ServerEvents.GenericPlayerEventCallback<{}, T>): ScriptEventHandler;
    oncePlayerStartTalking<T extends Player>(callback: ServerEvents.GenericPlayerEventCallback<{}, T>): ScriptEventHandler;
    onPlayerStopTalking<T extends Player>(callback: ServerEvents.GenericPlayerEventCallback<{}, T>): ScriptEventHandler;
    oncePlayerStopTalking<T extends Player>(callback: ServerEvents.GenericPlayerEventCallback<{}, T>): ScriptEventHandler;
    onPedHeal(callback: ServerEvents.GenericEventCallback<ServerEvents.PedHealEventParameters>): ScriptEventHandler;
    oncePedHeal(callback: ServerEvents.GenericEventCallback<ServerEvents.PedHealEventParameters>): ScriptEventHandler;
    onPedDeath(callback: ServerEvents.GenericEventCallback<ServerEvents.PedDeathEventParameters>): ScriptEventHandler;
    oncePedDeath(callback: ServerEvents.GenericEventCallback<ServerEvents.PedDeathEventParameters>): ScriptEventHandler;
    onPedDamage(callback: ServerEvents.GenericEventCallback<ServerEvents.PedDamageEventParameters>): ScriptEventHandler;
    oncePedDamage(callback: ServerEvents.GenericEventCallback<ServerEvents.PedDamageEventParameters>): ScriptEventHandler;
    onVehicleDestroy(callback: ServerEvents.GenericEventCallback<ServerEvents.VehicleDestroyEventParameters>): ScriptEventHandler;
    onceVehicleDestroy(callback: ServerEvents.GenericEventCallback<ServerEvents.VehicleDestroyEventParameters>): ScriptEventHandler;
    onVehicleAttach(callback: ServerEvents.GenericEventCallback<ServerEvents.VehicleAttachEventParameters>): ScriptEventHandler;
    onceVehicleAttach(callback: ServerEvents.GenericEventCallback<ServerEvents.VehicleAttachEventParameters>): ScriptEventHandler;
    onVehicleDetach(callback: ServerEvents.GenericEventCallback<ServerEvents.VehicleDetachEventParameters>): ScriptEventHandler;
    onceVehicleDetach(callback: ServerEvents.GenericEventCallback<ServerEvents.VehicleDetachEventParameters>): ScriptEventHandler;
    onVehicleDamage(callback: ServerEvents.GenericEventCallback<ServerEvents.VehicleDamageEventParameters>): ScriptEventHandler;
    onceVehicleDamage(callback: ServerEvents.GenericEventCallback<ServerEvents.VehicleDamageEventParameters>): ScriptEventHandler;
    onVehicleSirenStateChange(
        callback: ServerEvents.GenericEventCallback<ServerEvents.VehicleSirenStateChangeEventParameters>,
    ): ScriptEventHandler;
    onceVehicleSirenStateChange(
        callback: ServerEvents.GenericEventCallback<ServerEvents.VehicleSirenStateChangeEventParameters>,
    ): ScriptEventHandler;
    onVehicleHornStateChange<T extends Player>(
        callback: ServerEvents.GenericCancellablePlayerEventCallback<ServerEvents.VehicleHornStateChangeEventParameters, T>,
    ): ScriptEventHandler;
    onceVehicleHornStateChange<T extends Player>(
        callback: ServerEvents.GenericCancellablePlayerEventCallback<ServerEvents.VehicleHornStateChangeEventParameters, T>,
    ): ScriptEventHandler;
    onVoiceConnectionCreate(
        callback: ServerEvents.GenericEventCallback<ServerEvents.VoiceConnectionEventParameters>,
    ): ScriptEventHandler;
    onceVoiceConnectionCreate(
        callback: ServerEvents.GenericEventCallback<ServerEvents.VoiceConnectionEventParameters>,
    ): ScriptEventHandler;
    onClientObjectDelete<T extends Player>(callback: ServerEvents.GenericCancellablePlayerEventCallback<{}, T>): ScriptEventHandler;
    onceClientObjectDelete<T extends Player>(
        callback: ServerEvents.GenericCancellablePlayerEventCallback<{}, T>,
    ): ScriptEventHandler;
    onClientObjectRequest<T extends Player>(
        callback: ServerEvents.GenericCancellablePlayerEventCallback<ServerEvents.ClientObjectEventParameters, T>,
    ): ScriptEventHandler;
    onceClientObjectRequest<T extends Player>(
        callback: ServerEvents.GenericCancellablePlayerEventCallback<ServerEvents.ClientObjectEventParameters, T>,
    ): ScriptEventHandler;
    onBaseObjectCreate(
        callback: ServerEvents.GenericEventCallback<ServerEvents.BaseObjectCreateEventParameters>,
    ): ScriptEventHandler;
    onceBaseObjectCreate(
        callback: ServerEvents.GenericEventCallback<ServerEvents.BaseObjectCreateEventParameters>,
    ): ScriptEventHandler;
    onBaseObjectRemove(
        callback: ServerEvents.GenericEventCallback<ServerEvents.BaseObjectRemoveEventParameters>,
    ): ScriptEventHandler;
    onceBaseObjectRemove(
        callback: ServerEvents.GenericEventCallback<ServerEvents.BaseObjectRemoveEventParameters>,
    ): ScriptEventHandler;
    onNetOwnerChange(callback: ServerEvents.GenericEventCallback<ServerEvents.NetOwnerChangeEventParameters>): ScriptEventHandler;
    onceNetOwnerChange(callback: ServerEvents.GenericEventCallback<ServerEvents.NetOwnerChangeEventParameters>): ScriptEventHandler;
    onWeaponDamage(
        callback: ServerEvents.GenericCancellableEventCallback<ServerEvents.WeaponDamageEventParameters>,
    ): ScriptEventHandler;
    onceWeaponDamage(
        callback: ServerEvents.GenericCancellableEventCallback<ServerEvents.WeaponDamageEventParameters>,
    ): ScriptEventHandler;
    onMetaChange(callback: ServerEvents.GenericEventCallback<ServerEvents.MetaChangeEventParameters>): ScriptEventHandler;
    onLocalMetaChange<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.LocalMetaChangeEventParameters, T>,
    ): ScriptEventHandler;
    onceLocalMetaChange<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.LocalMetaChangeEventParameters, T>,
    ): ScriptEventHandler;
    onStreamSyncedMetaChange(
        callback: ServerEvents.GenericEventCallback<ServerEvents.StreamSyncedMetaChangeEventParameters>,
    ): ScriptEventHandler;
    onceStreamSyncedMetaChange(
        callback: ServerEvents.GenericEventCallback<ServerEvents.StreamSyncedMetaChangeEventParameters>,
    ): ScriptEventHandler;
    onGlobalMetaChange(
        callback: ServerEvents.GenericEventCallback<ServerEvents.GlobalMetaChangeEventParameters>,
    ): ScriptEventHandler;
    onceGlobalMetaChange(
        callback: ServerEvents.GenericEventCallback<ServerEvents.GlobalMetaChangeEventParameters>,
    ): ScriptEventHandler;
    onGlobalSyncedMetaChange(
        callback: ServerEvents.GenericEventCallback<ServerEvents.GlobalSyncedMetaChangeEventParameters>,
    ): ScriptEventHandler;
    onceGlobalSyncedMetaChange(
        callback: ServerEvents.GenericEventCallback<ServerEvents.GlobalSyncedMetaChangeEventParameters>,
    ): ScriptEventHandler;
    onConsoleCommand(callback: ServerEvents.GenericEventCallback<ServerEvents.ConsoleCommandEventParameters>): ScriptEventHandler;
    onceConsoleCommand(callback: ServerEvents.GenericEventCallback<ServerEvents.ConsoleCommandEventParameters>): ScriptEventHandler;
    onError(callback: ServerEvents.GenericEventCallback<ServerEvents.ErrorEventParameters>): ScriptEventHandler;
    onceError(callback: ServerEvents.GenericEventCallback<ServerEvents.ErrorEventParameters>): ScriptEventHandler;
    onColShapeEvent(callback: ServerEvents.GenericEventCallback<ServerEvents.ColShapeEventParameters>): ScriptEventHandler;
    onceColShapeEvent(callback: ServerEvents.GenericEventCallback<ServerEvents.ColShapeEventParameters>): ScriptEventHandler;
    onExplosion(callback: ServerEvents.GenericCancellableEventCallback<ServerEvents.ExplosionEventParameters>): ScriptEventHandler;
    onceExplosion(callback: ServerEvents.GenericCancellableEventCallback<ServerEvents.ExplosionEventParameters>): ScriptEventHandler;
    onFireStart<T extends Player>(
        callback: ServerEvents.GenericCancellablePlayerEventCallback<ServerEvents.FireStartEventParameters, T>,
    ): ScriptEventHandler;
    onceFireStart<T extends Player>(
        callback: ServerEvents.GenericCancellablePlayerEventCallback<ServerEvents.FireStartEventParameters, T>,
    ): ScriptEventHandler;
    onProjectileStart<T extends Player>(
        callback: ServerEvents.GenericCancellablePlayerEventCallback<ServerEvents.ProjectileStartEventParameters, T>,
    ): ScriptEventHandler;
    onceProjectileStart<T extends Player>(
        callback: ServerEvents.GenericCancellablePlayerEventCallback<ServerEvents.ProjectileStartEventParameters, T>,
    ): ScriptEventHandler;
    onEntityColShapeEnter(
        callback: ServerEvents.GenericEventCallback<ServerEvents.EntityColShapeEnterEventParameters>,
    ): ScriptEventHandler;
    onceEntityColShapeEnter(
        callback: ServerEvents.GenericEventCallback<ServerEvents.EntityColShapeEnterEventParameters>,
    ): ScriptEventHandler;
    onEntityColShapeLeave(
        callback: ServerEvents.GenericEventCallback<ServerEvents.EntityColShapeLeaveEventParameters>,
    ): ScriptEventHandler;
    onceEntityColShapeLeave(
        callback: ServerEvents.GenericEventCallback<ServerEvents.EntityColShapeLeaveEventParameters>,
    ): ScriptEventHandler;
    onEntityCheckpointEnter(
        callback: ServerEvents.GenericEventCallback<ServerEvents.EntityCheckpointEnterEventParameters>,
    ): ScriptEventHandler;
    onceEntityCheckpointEnter(
        callback: ServerEvents.GenericEventCallback<ServerEvents.EntityCheckpointEnterEventParameters>,
    ): ScriptEventHandler;
    onEntityCheckpointLeave(
        callback: ServerEvents.GenericEventCallback<ServerEvents.EntityCheckpointLeaveEventParameters>,
    ): ScriptEventHandler;
    onceEntityCheckpointLeave(
        callback: ServerEvents.GenericEventCallback<ServerEvents.EntityCheckpointLeaveEventParameters>,
    ): ScriptEventHandler;
    onGivePedScriptedTask(
        callback: ServerEvents.GenericEventCallback<ServerEvents.GivePedScriptedTaskEventParameters>,
    ): ScriptEventHandler;
    onLocalScriptEvent<T = unknown[]>(
        callback: ServerEvents.GenericEventCallback<ServerEvents.ServerScriptEventParameters<T>>,
    ): ScriptEventHandler;
    onceLocalScriptEvent<T = unknown[]>(
        callback: ServerEvents.GenericEventCallback<ServerEvents.ServerScriptEventParameters<T>>,
    ): ScriptEventHandler;
    onRemoteScriptEvent<T = unknown[], U extends Player = Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerScriptEventParameters<T>, U>,
    ): ScriptEventHandler;
    onceRemoteScriptEvent<T = unknown[], U extends Player = Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerScriptEventParameters<T>, U>,
    ): ScriptEventHandler;
    onAnyResourceStart(callback: ServerEvents.GenericEventCallback<ServerEvents.ResourceStartEventParameters>): ScriptEventHandler;
    onceAnyResourceStart(callback: ServerEvents.GenericEventCallback<ServerEvents.ResourceStartEventParameters>): ScriptEventHandler;
    onAnyResourceStop(callback: ServerEvents.GenericEventCallback<ServerEvents.ResourceStopEventParameters>): ScriptEventHandler;
    onceAnyResourceStop(callback: ServerEvents.GenericEventCallback<ServerEvents.ResourceStopEventParameters>): ScriptEventHandler;
    onResourceStart(callback: ServerEvents.GenericEventCallback): ScriptEventHandler;
    onceResourceStart(callback: ServerEvents.GenericEventCallback): ScriptEventHandler;
    onResourceStop(callback: ServerEvents.GenericEventCallback): ScriptEventHandler;
    onceResourceStop(callback: ServerEvents.GenericEventCallback): ScriptEventHandler;
    onResourceError(callback: ServerEvents.GenericEventCallback<ServerEvents.ResourceErrorEventParameters>): ScriptEventHandler;
    onceResourceError(callback: ServerEvents.GenericEventCallback<ServerEvents.ResourceErrorEventParameters>): ScriptEventHandler;
    onEvent(callback: ServerEvents.GenericEventCallback<SharedEvents.GenericOnEventParameters>): ScriptEventHandler;
}
