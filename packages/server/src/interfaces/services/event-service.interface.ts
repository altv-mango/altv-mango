import type { Events as SharedEvents } from '@altv/shared';
import type { Events as ServerEvents, Player } from '@altv/server';

export interface EventService {
    on<E extends keyof ServerEvents.CustomServerEvent>(
        eventName: E,
        callback: (body: Parameters<ServerEvents.CustomServerEvent[E]>[0]) => ReturnType<ServerEvents.CustomServerEvent[E]>,
    ): SharedEvents.ScriptEventHandler;
    on<E extends string>(
        eventName: Exclude<E, keyof ServerEvents.CustomServerEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): SharedEvents.ScriptEventHandler;
    once<E extends keyof ServerEvents.CustomServerEvent>(
        eventName: E,
        callback: (body: Parameters<ServerEvents.CustomServerEvent[E]>[0]) => ReturnType<ServerEvents.CustomServerEvent[E]>,
    ): SharedEvents.ScriptEventHandler;
    once<E extends string>(
        eventName: Exclude<E, keyof ServerEvents.CustomServerEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): SharedEvents.ScriptEventHandler;
    emit<E extends keyof ServerEvents.CustomServerEvent>(eventName: E, body?: ServerEvents.CustomServerEvent[E]): void;
    emit<E extends string>(eventName: Exclude<E, keyof ServerEvents.CustomServerEvent>, body?: any): void;
    onPlayer<E extends keyof SharedEvents.CustomPlayerToServerEvent, U extends Player>(
        eventName: E,
        callback: (
            player: U,
            body: Parameters<SharedEvents.CustomPlayerToServerEvent[E]>[0],
        ) => ReturnType<SharedEvents.CustomPlayerToServerEvent[E]>,
    ): SharedEvents.ScriptEventHandler;
    onPlayer<E extends string, U extends Player>(
        eventName: Exclude<E, keyof SharedEvents.CustomPlayerToServerEvent>,
        callback: (player: U, body: unknown) => void | Promise<void>,
    ): SharedEvents.ScriptEventHandler;
    oncePlayer<E extends keyof SharedEvents.CustomPlayerToServerEvent, U extends Player>(
        eventName: E,
        callback: (
            player: U,
            body: Parameters<SharedEvents.CustomPlayerToServerEvent[E]>[0],
        ) => ReturnType<SharedEvents.CustomPlayerToServerEvent[E]>,
    ): SharedEvents.ScriptEventHandler;
    oncePlayer<E extends string, U extends Player>(
        eventName: Exclude<E, keyof SharedEvents.CustomPlayerToServerEvent>,
        callback: (player: U, body: unknown) => void | Promise<void>,
    ): SharedEvents.ScriptEventHandler;
    onRemote<E extends keyof SharedEvents.CustomPlayerToServerEvent, U extends Player>(
        eventName: E,
        callback: (
            player: U,
            body: Parameters<SharedEvents.CustomPlayerToServerEvent[E]>[0],
        ) => ReturnType<SharedEvents.CustomPlayerToServerEvent[E]>,
    ): SharedEvents.ScriptEventHandler;
    onRemote<E extends string, U extends Player>(
        eventName: Exclude<E, keyof SharedEvents.CustomPlayerToServerEvent>,
        callback: (player: U, body: unknown) => void | Promise<void>,
    ): SharedEvents.ScriptEventHandler;
    onceRemote<E extends keyof SharedEvents.CustomPlayerToServerEvent, U extends Player>(
        eventName: E,
        callback: (
            player: U,
            body: Parameters<SharedEvents.CustomPlayerToServerEvent[E]>[0],
        ) => ReturnType<SharedEvents.CustomPlayerToServerEvent[E]>,
    ): SharedEvents.ScriptEventHandler;
    onceRemote<E extends string, U extends Player>(
        eventName: Exclude<E, keyof SharedEvents.CustomPlayerToServerEvent>,
        callback: (player: U, body: unknown) => void | Promise<void>,
    ): SharedEvents.ScriptEventHandler;
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
        callback: (
            player: U,
            body: Parameters<SharedEvents.CustomWebViewToServerEvent[E]>[0],
        ) => ReturnType<SharedEvents.CustomWebViewToServerEvent[E]>,
    ): SharedEvents.ScriptEventHandler;
    onWebView<E extends string, U extends Player>(
        id: string | number,
        eventName: Exclude<E, keyof SharedEvents.CustomWebViewToServerEvent>,
        callback: (player: U, body: unknown) => void | Promise<void>,
    ): SharedEvents.ScriptEventHandler;
    onceWebView<E extends keyof SharedEvents.CustomWebViewToServerEvent, U extends Player>(
        id: string | number,
        eventName: E,
        callback: (
            player: U,
            body: Parameters<SharedEvents.CustomWebViewToServerEvent[E]>[0],
        ) => ReturnType<SharedEvents.CustomWebViewToServerEvent[E]>,
    ): SharedEvents.ScriptEventHandler;
    onceWebView<E extends string, U extends Player>(
        id: string | number,
        eventName: Exclude<E, keyof SharedEvents.CustomWebViewToServerEvent>,
        callback: (player: U, body: unknown) => void | Promise<void>,
    ): SharedEvents.ScriptEventHandler;

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
    ): SharedEvents.EventHandler;
    onceScriptRPC<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.ScriptRPCEventParameters, T>,
    ): SharedEvents.EventHandler;
    onScriptRPCAnswer<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.ScriptRPCAnswerEventParameters, T>,
    ): SharedEvents.EventHandler;
    onceScriptRPCAnswer<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.ScriptRPCAnswerEventParameters, T>,
    ): SharedEvents.EventHandler;
    onServerStarted(callback: ServerEvents.GenericEventCallback): SharedEvents.EventHandler;
    onceServerStarted(callback: ServerEvents.GenericEventCallback): SharedEvents.EventHandler;
    onConnectionQueueAdd(
        callback: ServerEvents.GenericEventCallback<ServerEvents.ConnectionQueueEventParameters>,
    ): SharedEvents.EventHandler;
    onceConnectionQueueAdd(
        callback: ServerEvents.GenericEventCallback<ServerEvents.ConnectionQueueEventParameters>,
    ): SharedEvents.EventHandler;
    onConnectionQueueRemove(
        callback: ServerEvents.GenericEventCallback<ServerEvents.ConnectionQueueEventParameters>,
    ): SharedEvents.EventHandler;
    onceConnectionQueueRemove(
        callback: ServerEvents.GenericEventCallback<ServerEvents.ConnectionQueueEventParameters>,
    ): SharedEvents.EventHandler;
    onPlayerConnect<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerConnectEventParameters, T>,
    ): SharedEvents.EventHandler;
    oncePlayerConnect<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerConnectEventParameters, T>,
    ): SharedEvents.EventHandler;
    onPlayerConnectDenied(
        callback: ServerEvents.GenericEventCallback<ServerEvents.PlayerConnectDeniedEventParameters>,
    ): SharedEvents.EventHandler;
    oncePlayerConnectDenied(
        callback: ServerEvents.GenericEventCallback<ServerEvents.PlayerConnectDeniedEventParameters>,
    ): SharedEvents.EventHandler;
    onPlayerDisconnect<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerDisconnectEventParameters, T>,
    ): SharedEvents.EventHandler;
    oncePlayerDisconnect<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerDisconnectEventParameters, T>,
    ): SharedEvents.EventHandler;
    onPlayerDamage<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerDamageEventParameters, T>,
    ): SharedEvents.EventHandler;
    oncePlayerDamage<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerDamageEventParameters, T>,
    ): SharedEvents.EventHandler;
    onPlayerDeath<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerDeathEventParameters, T>,
    ): SharedEvents.EventHandler;
    oncePlayerDeath<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerDeathEventParameters, T>,
    ): SharedEvents.EventHandler;
    onPlayerHeal<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerHealEventParameters, T>,
    ): SharedEvents.EventHandler;
    oncePlayerHeal<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerHealEventParameters, T>,
    ): SharedEvents.EventHandler;
    onPlayerControlRequest<T extends Player>(
        callback: ServerEvents.GenericCancellablePlayerEventCallback<ServerEvents.PlayerControlRequestEventParameters, T>,
    ): SharedEvents.EventHandler;
    oncePlayerControlRequest<T extends Player>(
        callback: ServerEvents.GenericCancellablePlayerEventCallback<ServerEvents.PlayerControlRequestEventParameters, T>,
    ): SharedEvents.EventHandler;
    onPlayerInteriorChange<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerInteriorChangeEventParameters, T>,
    ): SharedEvents.EventHandler;
    oncePlayerInteriorChange<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerInteriorChangeEventParameters, T>,
    ): SharedEvents.EventHandler;
    onPlayerDimensionChange<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerDimensionChangeEventParameters, T>,
    ): SharedEvents.EventHandler;
    oncePlayerDimensionChange<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerDimensionChangeEventParameters, T>,
    ): SharedEvents.EventHandler;
    onPlayerWeaponChange<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerWeaponChangeEventParameters, T>,
    ): SharedEvents.EventHandler;
    oncePlayerWeaponChange<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerWeaponChangeEventParameters, T>,
    ): SharedEvents.EventHandler;
    onPlayerSyncedSceneRequest(
        callback: ServerEvents.GenericCancellableEventCallback<ServerEvents.PlayerSyncedSceneRequestEventParameters>,
    ): SharedEvents.EventHandler;
    oncePlayerSyncedSceneRequest(
        callback: ServerEvents.GenericCancellableEventCallback<ServerEvents.PlayerSyncedSceneRequestEventParameters>,
    ): SharedEvents.EventHandler;
    onPlayerSyncedSceneStart<T extends Player>(
        callback: ServerEvents.GenericCancellablePlayerEventCallback<ServerEvents.PlayerSyncedSceneStartEventParameters, T>,
    ): SharedEvents.EventHandler;
    oncePlayerSyncedSceneStart<T extends Player>(
        callback: ServerEvents.GenericCancellablePlayerEventCallback<ServerEvents.PlayerSyncedSceneStartEventParameters, T>,
    ): SharedEvents.EventHandler;
    onPlayerSyncedSceneStop<T extends Player>(
        callback: ServerEvents.GenericCancellablePlayerEventCallback<ServerEvents.PlayerSyncedSceneStopEventParameters, T>,
    ): SharedEvents.EventHandler;
    oncePlayerSyncedSceneStop<T extends Player>(
        callback: ServerEvents.GenericCancellablePlayerEventCallback<ServerEvents.PlayerSyncedSceneStopEventParameters, T>,
    ): SharedEvents.EventHandler;
    onPlayerSyncedSceneUpdate<T extends Player>(
        callback: ServerEvents.GenericCancellablePlayerEventCallback<ServerEvents.PlayerSyncedSceneUpdateEventParameters, T>,
    ): SharedEvents.EventHandler;
    onPlayerSpawn<T extends Player>(callback: ServerEvents.GenericPlayerEventCallback<{}, T>): SharedEvents.EventHandler;
    oncePlayerSpawn<T extends Player>(callback: ServerEvents.GenericPlayerEventCallback<{}, T>): SharedEvents.EventHandler;
    onPlayerAnimationChange<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerAnimationChangeEventParameters, T>,
    ): SharedEvents.EventHandler;
    oncePlayerAnimationChange<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerAnimationChangeEventParameters, T>,
    ): SharedEvents.EventHandler;
    onPlayerVehicleEntered<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerVehicleEnteredEventParameters, T>,
    ): SharedEvents.EventHandler;
    oncePlayerVehicleEntered<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerVehicleEnteredEventParameters, T>,
    ): SharedEvents.EventHandler;
    onPlayerStartVehicleEnter<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerStartVehicleEnterEventParameters, T>,
    ): SharedEvents.EventHandler;
    oncePlayerStartVehicleEnter<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerStartVehicleEnterEventParameters, T>,
    ): SharedEvents.EventHandler;
    onPlayerVehicleLeft<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerVehicleLeftEventParameters, T>,
    ): SharedEvents.EventHandler;
    oncePlayerVehicleLeft<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerVehicleLeftEventParameters, T>,
    ): SharedEvents.EventHandler;
    onPlayerVehicleSeatChange<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerVehicleSeatChangeEventParameters, T>,
    ): SharedEvents.EventHandler;
    oncePlayerVehicleSeatChange<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerVehicleSeatChangeEventParameters, T>,
    ): SharedEvents.EventHandler;
    onPlayerStartTalking<T extends Player>(callback: ServerEvents.GenericPlayerEventCallback<{}, T>): SharedEvents.EventHandler;
    oncePlayerStartTalking<T extends Player>(callback: ServerEvents.GenericPlayerEventCallback<{}, T>): SharedEvents.EventHandler;
    onPlayerStopTalking<T extends Player>(callback: ServerEvents.GenericPlayerEventCallback<{}, T>): SharedEvents.EventHandler;
    oncePlayerStopTalking<T extends Player>(callback: ServerEvents.GenericPlayerEventCallback<{}, T>): SharedEvents.EventHandler;
    onPedHeal(callback: ServerEvents.GenericEventCallback<ServerEvents.PedHealEventParameters>): SharedEvents.EventHandler;
    oncePedHeal(callback: ServerEvents.GenericEventCallback<ServerEvents.PedHealEventParameters>): SharedEvents.EventHandler;
    onPedDeath(callback: ServerEvents.GenericEventCallback<ServerEvents.PedDeathEventParameters>): SharedEvents.EventHandler;
    oncePedDeath(callback: ServerEvents.GenericEventCallback<ServerEvents.PedDeathEventParameters>): SharedEvents.EventHandler;
    onPedDamage(callback: ServerEvents.GenericEventCallback<ServerEvents.PedDamageEventParameters>): SharedEvents.EventHandler;
    oncePedDamage(callback: ServerEvents.GenericEventCallback<ServerEvents.PedDamageEventParameters>): SharedEvents.EventHandler;
    onVehicleDestroy(callback: ServerEvents.GenericEventCallback<ServerEvents.VehicleDestroyEventParameters>): SharedEvents.EventHandler;
    onceVehicleDestroy(callback: ServerEvents.GenericEventCallback<ServerEvents.VehicleDestroyEventParameters>): SharedEvents.EventHandler;
    onVehicleAttach(callback: ServerEvents.GenericEventCallback<ServerEvents.VehicleAttachEventParameters>): SharedEvents.EventHandler;
    onceVehicleAttach(callback: ServerEvents.GenericEventCallback<ServerEvents.VehicleAttachEventParameters>): SharedEvents.EventHandler;
    onVehicleDetach(callback: ServerEvents.GenericEventCallback<ServerEvents.VehicleDetachEventParameters>): SharedEvents.EventHandler;
    onceVehicleDetach(callback: ServerEvents.GenericEventCallback<ServerEvents.VehicleDetachEventParameters>): SharedEvents.EventHandler;
    onVehicleDamage(callback: ServerEvents.GenericEventCallback<ServerEvents.VehicleDamageEventParameters>): SharedEvents.EventHandler;
    onceVehicleDamage(callback: ServerEvents.GenericEventCallback<ServerEvents.VehicleDamageEventParameters>): SharedEvents.EventHandler;
    onVehicleSirenStateChange(
        callback: ServerEvents.GenericEventCallback<ServerEvents.VehicleSirenStateChangeEventParameters>,
    ): SharedEvents.EventHandler;
    onceVehicleSirenStateChange(
        callback: ServerEvents.GenericEventCallback<ServerEvents.VehicleSirenStateChangeEventParameters>,
    ): SharedEvents.EventHandler;
    onVehicleHornStateChange<T extends Player>(
        callback: ServerEvents.GenericCancellablePlayerEventCallback<ServerEvents.VehicleHornStateChangeEventParameters, T>,
    ): SharedEvents.EventHandler;
    onceVehicleHornStateChange<T extends Player>(
        callback: ServerEvents.GenericCancellablePlayerEventCallback<ServerEvents.VehicleHornStateChangeEventParameters, T>,
    ): SharedEvents.EventHandler;
    onVoiceConnectionCreate(
        callback: ServerEvents.GenericEventCallback<ServerEvents.VoiceConnectionEventParameters>,
    ): SharedEvents.EventHandler;
    onceVoiceConnectionCreate(
        callback: ServerEvents.GenericEventCallback<ServerEvents.VoiceConnectionEventParameters>,
    ): SharedEvents.EventHandler;
    onClientObjectDelete<T extends Player>(callback: ServerEvents.GenericCancellablePlayerEventCallback<{}, T>): SharedEvents.EventHandler;
    onceClientObjectDelete<T extends Player>(
        callback: ServerEvents.GenericCancellablePlayerEventCallback<{}, T>,
    ): SharedEvents.EventHandler;
    onClientObjectRequest<T extends Player>(
        callback: ServerEvents.GenericCancellablePlayerEventCallback<ServerEvents.ClientObjectEventParameters, T>,
    ): SharedEvents.EventHandler;
    onceClientObjectRequest<T extends Player>(
        callback: ServerEvents.GenericCancellablePlayerEventCallback<ServerEvents.ClientObjectEventParameters, T>,
    ): SharedEvents.EventHandler;
    onBaseObjectCreate(
        callback: ServerEvents.GenericEventCallback<ServerEvents.BaseObjectCreateEventParameters>,
    ): SharedEvents.EventHandler;
    onceBaseObjectCreate(
        callback: ServerEvents.GenericEventCallback<ServerEvents.BaseObjectCreateEventParameters>,
    ): SharedEvents.EventHandler;
    onBaseObjectRemove(
        callback: ServerEvents.GenericEventCallback<ServerEvents.BaseObjectRemoveEventParameters>,
    ): SharedEvents.EventHandler;
    onceBaseObjectRemove(
        callback: ServerEvents.GenericEventCallback<ServerEvents.BaseObjectRemoveEventParameters>,
    ): SharedEvents.EventHandler;
    onNetOwnerChange(callback: ServerEvents.GenericEventCallback<ServerEvents.NetOwnerChangeEventParameters>): SharedEvents.EventHandler;
    onceNetOwnerChange(callback: ServerEvents.GenericEventCallback<ServerEvents.NetOwnerChangeEventParameters>): SharedEvents.EventHandler;
    onWeaponDamage(
        callback: ServerEvents.GenericCancellableEventCallback<ServerEvents.WeaponDamageEventParameters>,
    ): SharedEvents.EventHandler;
    onceWeaponDamage(
        callback: ServerEvents.GenericCancellableEventCallback<ServerEvents.WeaponDamageEventParameters>,
    ): SharedEvents.EventHandler;
    onMetaChange(callback: ServerEvents.GenericEventCallback<ServerEvents.MetaChangeEventParameters>): SharedEvents.EventHandler;
    onLocalMetaChange<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.LocalMetaChangeEventParameters, T>,
    ): SharedEvents.EventHandler;
    onceLocalMetaChange<T extends Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.LocalMetaChangeEventParameters, T>,
    ): SharedEvents.EventHandler;
    onStreamSyncedMetaChange(
        callback: ServerEvents.GenericEventCallback<ServerEvents.StreamSyncedMetaChangeEventParameters>,
    ): SharedEvents.EventHandler;
    onceStreamSyncedMetaChange(
        callback: ServerEvents.GenericEventCallback<ServerEvents.StreamSyncedMetaChangeEventParameters>,
    ): SharedEvents.EventHandler;
    onGlobalMetaChange(
        callback: ServerEvents.GenericEventCallback<ServerEvents.GlobalMetaChangeEventParameters>,
    ): SharedEvents.EventHandler;
    onceGlobalMetaChange(
        callback: ServerEvents.GenericEventCallback<ServerEvents.GlobalMetaChangeEventParameters>,
    ): SharedEvents.EventHandler;
    onGlobalSyncedMetaChange(
        callback: ServerEvents.GenericEventCallback<ServerEvents.GlobalSyncedMetaChangeEventParameters>,
    ): SharedEvents.EventHandler;
    onceGlobalSyncedMetaChange(
        callback: ServerEvents.GenericEventCallback<ServerEvents.GlobalSyncedMetaChangeEventParameters>,
    ): SharedEvents.EventHandler;
    onConsoleCommand(callback: ServerEvents.GenericEventCallback<ServerEvents.ConsoleCommandEventParameters>): SharedEvents.EventHandler;
    onceConsoleCommand(callback: ServerEvents.GenericEventCallback<ServerEvents.ConsoleCommandEventParameters>): SharedEvents.EventHandler;
    onError(callback: ServerEvents.GenericEventCallback<ServerEvents.ErrorEventParameters>): SharedEvents.EventHandler;
    onceError(callback: ServerEvents.GenericEventCallback<ServerEvents.ErrorEventParameters>): SharedEvents.EventHandler;
    onColShapeEvent(callback: ServerEvents.GenericEventCallback<ServerEvents.ColShapeEventParameters>): SharedEvents.EventHandler;
    onceColShapeEvent(callback: ServerEvents.GenericEventCallback<ServerEvents.ColShapeEventParameters>): SharedEvents.EventHandler;
    onExplosion(callback: ServerEvents.GenericCancellableEventCallback<ServerEvents.ExplosionEventParameters>): SharedEvents.EventHandler;
    onceExplosion(callback: ServerEvents.GenericCancellableEventCallback<ServerEvents.ExplosionEventParameters>): SharedEvents.EventHandler;
    onFireStart<T extends Player>(
        callback: ServerEvents.GenericCancellablePlayerEventCallback<ServerEvents.FireStartEventParameters, T>,
    ): SharedEvents.EventHandler;
    onceFireStart<T extends Player>(
        callback: ServerEvents.GenericCancellablePlayerEventCallback<ServerEvents.FireStartEventParameters, T>,
    ): SharedEvents.EventHandler;
    onProjectileStart<T extends Player>(
        callback: ServerEvents.GenericCancellablePlayerEventCallback<ServerEvents.ProjectileStartEventParameters, T>,
    ): SharedEvents.EventHandler;
    onceProjectileStart<T extends Player>(
        callback: ServerEvents.GenericCancellablePlayerEventCallback<ServerEvents.ProjectileStartEventParameters, T>,
    ): SharedEvents.EventHandler;
    onEntityColShapeEnter(
        callback: ServerEvents.GenericEventCallback<ServerEvents.EntityColShapeEnterEventParameters>,
    ): SharedEvents.EventHandler;
    onceEntityColShapeEnter(
        callback: ServerEvents.GenericEventCallback<ServerEvents.EntityColShapeEnterEventParameters>,
    ): SharedEvents.EventHandler;
    onEntityColShapeLeave(
        callback: ServerEvents.GenericEventCallback<ServerEvents.EntityColShapeLeaveEventParameters>,
    ): SharedEvents.EventHandler;
    onceEntityColShapeLeave(
        callback: ServerEvents.GenericEventCallback<ServerEvents.EntityColShapeLeaveEventParameters>,
    ): SharedEvents.EventHandler;
    onEntityCheckpointEnter(
        callback: ServerEvents.GenericEventCallback<ServerEvents.EntityCheckpointEnterEventParameters>,
    ): SharedEvents.EventHandler;
    onceEntityCheckpointEnter(
        callback: ServerEvents.GenericEventCallback<ServerEvents.EntityCheckpointEnterEventParameters>,
    ): SharedEvents.EventHandler;
    onEntityCheckpointLeave(
        callback: ServerEvents.GenericEventCallback<ServerEvents.EntityCheckpointLeaveEventParameters>,
    ): SharedEvents.EventHandler;
    onceEntityCheckpointLeave(
        callback: ServerEvents.GenericEventCallback<ServerEvents.EntityCheckpointLeaveEventParameters>,
    ): SharedEvents.EventHandler;
    onGivePedScriptedTask(
        callback: ServerEvents.GenericEventCallback<ServerEvents.GivePedScriptedTaskEventParameters>,
    ): SharedEvents.EventHandler;
    onLocalScriptEvent<T = unknown[]>(
        callback: ServerEvents.GenericEventCallback<ServerEvents.ServerScriptEventParameters<T>>,
    ): SharedEvents.EventHandler;
    onceLocalScriptEvent<T = unknown[]>(
        callback: ServerEvents.GenericEventCallback<ServerEvents.ServerScriptEventParameters<T>>,
    ): SharedEvents.EventHandler;
    onRemoteScriptEvent<T = unknown[], U extends Player = Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerScriptEventParameters<T>, U>,
    ): SharedEvents.EventHandler;
    onceRemoteScriptEvent<T = unknown[], U extends Player = Player>(
        callback: ServerEvents.GenericPlayerEventCallback<ServerEvents.PlayerScriptEventParameters<T>, U>,
    ): SharedEvents.EventHandler;
    onAnyResourceStart(callback: ServerEvents.GenericEventCallback<ServerEvents.ResourceStartEventParameters>): SharedEvents.EventHandler;
    onceAnyResourceStart(callback: ServerEvents.GenericEventCallback<ServerEvents.ResourceStartEventParameters>): SharedEvents.EventHandler;
    onAnyResourceStop(callback: ServerEvents.GenericEventCallback<ServerEvents.ResourceStopEventParameters>): SharedEvents.EventHandler;
    onceAnyResourceStop(callback: ServerEvents.GenericEventCallback<ServerEvents.ResourceStopEventParameters>): SharedEvents.EventHandler;
    onResourceStart(callback: ServerEvents.GenericEventCallback): SharedEvents.EventHandler;
    onceResourceStart(callback: ServerEvents.GenericEventCallback): SharedEvents.EventHandler;
    onResourceStop(callback: ServerEvents.GenericEventCallback): SharedEvents.EventHandler;
    onceResourceStop(callback: ServerEvents.GenericEventCallback): SharedEvents.EventHandler;
    onResourceError(callback: ServerEvents.GenericEventCallback<ServerEvents.ResourceErrorEventParameters>): SharedEvents.EventHandler;
    onceResourceError(callback: ServerEvents.GenericEventCallback<ServerEvents.ResourceErrorEventParameters>): SharedEvents.EventHandler;
    onEvent(callback: ServerEvents.GenericEventCallback<SharedEvents.GenericOnEventParameters>): SharedEvents.GenericEventHandler;
}
