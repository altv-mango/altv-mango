import * as altShared from '@altv/shared';
import * as altServer from '@altv/server';

export interface EventService {
    on<E extends keyof altServer.Events.CustomServerEvent>(
        eventName: E,
        callback: (body: Parameters<altServer.Events.CustomServerEvent[E]>[0]) => ReturnType<altServer.Events.CustomServerEvent[E]>,
    ): altShared.Events.ScriptEventHandler;
    on<E extends string>(
        eventName: Exclude<E, keyof altServer.Events.CustomServerEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): altShared.Events.ScriptEventHandler;
    once<E extends keyof altServer.Events.CustomServerEvent>(
        eventName: E,
        callback: (body: Parameters<altServer.Events.CustomServerEvent[E]>[0]) => ReturnType<altServer.Events.CustomServerEvent[E]>,
    ): altShared.Events.ScriptEventHandler;
    once<E extends string>(
        eventName: Exclude<E, keyof altServer.Events.CustomServerEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): altShared.Events.ScriptEventHandler;
    emit<E extends keyof altServer.Events.CustomServerEvent>(eventName: E, body?: altServer.Events.CustomServerEvent[E]): void;
    emit<E extends string>(eventName: Exclude<E, keyof altServer.Events.CustomServerEvent>, body?: any): void;
    onPlayer<E extends keyof altShared.Events.CustomPlayerToServerEvent, U extends altServer.Player>(
        eventName: E,
        callback: (
            player: U,
            body: Parameters<altShared.Events.CustomPlayerToServerEvent[E]>[0],
        ) => ReturnType<altShared.Events.CustomPlayerToServerEvent[E]>,
    ): altShared.Events.ScriptEventHandler;
    onPlayer<E extends string, U extends altServer.Player>(
        eventName: Exclude<E, keyof altShared.Events.CustomPlayerToServerEvent>,
        callback: (player: U, body: unknown) => void | Promise<void>,
    ): altShared.Events.ScriptEventHandler;
    oncePlayer<E extends keyof altShared.Events.CustomPlayerToServerEvent, U extends altServer.Player>(
        eventName: E,
        callback: (
            player: U,
            body: Parameters<altShared.Events.CustomPlayerToServerEvent[E]>[0],
        ) => ReturnType<altShared.Events.CustomPlayerToServerEvent[E]>,
    ): altShared.Events.ScriptEventHandler;
    oncePlayer<E extends string, U extends altServer.Player>(
        eventName: Exclude<E, keyof altShared.Events.CustomPlayerToServerEvent>,
        callback: (player: U, body: unknown) => void | Promise<void>,
    ): altShared.Events.ScriptEventHandler;
    onRemote<E extends keyof altShared.Events.CustomPlayerToServerEvent, U extends altServer.Player>(
        eventName: E,
        callback: (
            player: U,
            body: Parameters<altShared.Events.CustomPlayerToServerEvent[E]>[0],
        ) => ReturnType<altShared.Events.CustomPlayerToServerEvent[E]>,
    ): altShared.Events.ScriptEventHandler;
    onRemote<E extends string, U extends altServer.Player>(
        eventName: Exclude<E, keyof altShared.Events.CustomPlayerToServerEvent>,
        callback: (player: U, body: unknown) => void | Promise<void>,
    ): altShared.Events.ScriptEventHandler;
    onceRemote<E extends keyof altShared.Events.CustomPlayerToServerEvent, U extends altServer.Player>(
        eventName: E,
        callback: (
            player: U,
            body: Parameters<altShared.Events.CustomPlayerToServerEvent[E]>[0],
        ) => ReturnType<altShared.Events.CustomPlayerToServerEvent[E]>,
    ): altShared.Events.ScriptEventHandler;
    onceRemote<E extends string, U extends altServer.Player>(
        eventName: Exclude<E, keyof altShared.Events.CustomPlayerToServerEvent>,
        callback: (player: U, body: unknown) => void | Promise<void>,
    ): altShared.Events.ScriptEventHandler;
    emitPlayers<E extends keyof altShared.Events.CustomServerToPlayerEvent, U extends altServer.Player>(
        player: U[],
        eventName: E,
        body?: Parameters<altShared.Events.CustomServerToPlayerEvent[E]>[0],
    ): void;
    emitPlayers<E extends string, U extends altServer.Player>(
        player: U[],
        eventName: Exclude<E, keyof altShared.Events.CustomServerToPlayerEvent>,
        body?: unknown,
    ): void;
    emitPlayersUnreliable<E extends keyof altShared.Events.CustomServerToPlayerEvent, U extends altServer.Player>(
        player: U[],
        eventName: E,
        body?: Parameters<altShared.Events.CustomServerToPlayerEvent[E]>[0],
    ): void;
    emitPlayersUnreliable<E extends string, U extends altServer.Player>(
        player: U[],
        eventName: Exclude<E, keyof altShared.Events.CustomServerToPlayerEvent>,
        body?: unknown,
    ): void;
    emitAllPlayers<E extends keyof altShared.Events.CustomServerToPlayerEvent>(
        eventName: E,
        body?: Parameters<altShared.Events.CustomServerToPlayerEvent[E]>[0],
    ): void;
    emitAllPlayers<E extends string>(eventName: Exclude<E, keyof altShared.Events.CustomServerToPlayerEvent>, body?: unknown): void;
    emitAllPlayersUnreliable<E extends keyof altShared.Events.CustomServerToPlayerEvent>(
        eventName: E,
        body?: Parameters<altShared.Events.CustomServerToPlayerEvent[E]>[0],
    ): void;
    emitAllPlayersUnreliable<E extends string>(
        eventName: Exclude<E, keyof altShared.Events.CustomServerToPlayerEvent>,
        body?: unknown,
    ): void;
    onWebView<E extends keyof altShared.Events.CustomWebViewToServerEvent, U extends altServer.Player>(
        id: string | number,
        eventName: E,
        callback: (
            player: U,
            body: Parameters<altShared.Events.CustomWebViewToServerEvent[E]>[0],
        ) => ReturnType<altShared.Events.CustomWebViewToServerEvent[E]>,
    ): altShared.Events.ScriptEventHandler;
    onWebView<E extends string, U extends altServer.Player>(
        id: string | number,
        eventName: Exclude<E, keyof altShared.Events.CustomWebViewToServerEvent>,
        callback: (player: U, body: unknown) => void | Promise<void>,
    ): altShared.Events.ScriptEventHandler;
    onceWebView<E extends keyof altShared.Events.CustomWebViewToServerEvent, U extends altServer.Player>(
        id: string | number,
        eventName: E,
        callback: (
            player: U,
            body: Parameters<altShared.Events.CustomWebViewToServerEvent[E]>[0],
        ) => ReturnType<altShared.Events.CustomWebViewToServerEvent[E]>,
    ): altShared.Events.ScriptEventHandler;
    onceWebView<E extends string, U extends altServer.Player>(
        id: string | number,
        eventName: Exclude<E, keyof altShared.Events.CustomWebViewToServerEvent>,
        callback: (player: U, body: unknown) => void | Promise<void>,
    ): altShared.Events.ScriptEventHandler;

    emitWebViews<E extends keyof altShared.Events.CustomServerToWebViewEvent, U extends altServer.Player>(
        player: U[],
        id: string | number,
        eventName: E,
        body?: Parameters<altShared.Events.CustomServerToWebViewEvent[E]>[0],
    ): void;
    emitWebViews<E extends string, U extends altServer.Player>(
        player: U[],
        id: string | number,
        eventName: Exclude<E, keyof altShared.Events.CustomServerToWebViewEvent>,
        body?: unknown,
    ): void;

    emitAllWebViews<E extends keyof altShared.Events.CustomServerToWebViewEvent>(
        id: string | number,
        eventName: E,
        body?: Parameters<altShared.Events.CustomServerToWebViewEvent[E]>[0],
    ): void;
    emitAllWebViews<E extends string>(
        id: string | number,
        eventName: Exclude<E, keyof altShared.Events.CustomServerToWebViewEvent>,
        body?: unknown,
    ): void;

    emitAllWebViewsUnreliable<E extends keyof altShared.Events.CustomServerToWebViewEvent>(
        id: string | number,
        eventName: E,
        body?: Parameters<altShared.Events.CustomServerToWebViewEvent[E]>[0],
    ): void;
    emitAllWebViewsUnreliable<E extends string>(
        id: string | number,
        eventName: Exclude<E, keyof altShared.Events.CustomServerToWebViewEvent>,
        body?: unknown,
    ): void;

    onScriptRPC<T extends altServer.Player>(
        callback: altServer.Events.GenericPlayerEventCallback<altServer.Events.ScriptRPCEventParameters, T>,
    ): altShared.Events.EventHandler;
    onceScriptRPC<T extends altServer.Player>(
        callback: altServer.Events.GenericPlayerEventCallback<altServer.Events.ScriptRPCEventParameters, T>,
    ): altShared.Events.EventHandler;
    onScriptRPCAnswer<T extends altServer.Player>(
        callback: altServer.Events.GenericPlayerEventCallback<altServer.Events.ScriptRPCAnswerEventParameters, T>,
    ): altShared.Events.EventHandler;
    onceScriptRPCAnswer<T extends altServer.Player>(
        callback: altServer.Events.GenericPlayerEventCallback<altServer.Events.ScriptRPCAnswerEventParameters, T>,
    ): altShared.Events.EventHandler;
    onServerStarted(callback: altServer.Events.GenericEventCallback): altShared.Events.EventHandler;
    onceServerStarted(callback: altServer.Events.GenericEventCallback): altShared.Events.EventHandler;
    onConnectionQueueAdd(
        callback: altServer.Events.GenericEventCallback<altServer.Events.ConnectionQueueEventParameters>,
    ): altShared.Events.EventHandler;
    onceConnectionQueueAdd(
        callback: altServer.Events.GenericEventCallback<altServer.Events.ConnectionQueueEventParameters>,
    ): altShared.Events.EventHandler;
    onConnectionQueueRemove(
        callback: altServer.Events.GenericEventCallback<altServer.Events.ConnectionQueueEventParameters>,
    ): altShared.Events.EventHandler;
    onceConnectionQueueRemove(
        callback: altServer.Events.GenericEventCallback<altServer.Events.ConnectionQueueEventParameters>,
    ): altShared.Events.EventHandler;
    onPlayerConnect<T extends altServer.Player>(
        callback: altServer.Events.GenericPlayerEventCallback<altServer.Events.PlayerConnectEventParameters, T>,
    ): altShared.Events.EventHandler;
    oncePlayerConnect<T extends altServer.Player>(
        callback: altServer.Events.GenericPlayerEventCallback<altServer.Events.PlayerConnectEventParameters, T>,
    ): altShared.Events.EventHandler;
    onPlayerConnectDenied(
        callback: altServer.Events.GenericEventCallback<altServer.Events.PlayerConnectDeniedEventParameters>,
    ): altShared.Events.EventHandler;
    oncePlayerConnectDenied(
        callback: altServer.Events.GenericEventCallback<altServer.Events.PlayerConnectDeniedEventParameters>,
    ): altShared.Events.EventHandler;
    onPlayerDisconnect<T extends altServer.Player>(
        callback: altServer.Events.GenericPlayerEventCallback<altServer.Events.PlayerDisconnectEventParameters, T>,
    ): altShared.Events.EventHandler;
    oncePlayerDisconnect<T extends altServer.Player>(
        callback: altServer.Events.GenericPlayerEventCallback<altServer.Events.PlayerDisconnectEventParameters, T>,
    ): altShared.Events.EventHandler;
    onPlayerDamage<T extends altServer.Player>(
        callback: altServer.Events.GenericPlayerEventCallback<altServer.Events.PlayerDamageEventParameters, T>,
    ): altShared.Events.EventHandler;
    oncePlayerDamage<T extends altServer.Player>(
        callback: altServer.Events.GenericPlayerEventCallback<altServer.Events.PlayerDamageEventParameters, T>,
    ): altShared.Events.EventHandler;
    onPlayerDeath<T extends altServer.Player>(
        callback: altServer.Events.GenericPlayerEventCallback<altServer.Events.PlayerDeathEventParameters, T>,
    ): altShared.Events.EventHandler;
    oncePlayerDeath<T extends altServer.Player>(
        callback: altServer.Events.GenericPlayerEventCallback<altServer.Events.PlayerDeathEventParameters, T>,
    ): altShared.Events.EventHandler;
    onPlayerHeal<T extends altServer.Player>(
        callback: altServer.Events.GenericPlayerEventCallback<altServer.Events.PlayerHealEventParameters, T>,
    ): altShared.Events.EventHandler;
    oncePlayerHeal<T extends altServer.Player>(
        callback: altServer.Events.GenericPlayerEventCallback<altServer.Events.PlayerHealEventParameters, T>,
    ): altShared.Events.EventHandler;
    onPlayerControlRequest<T extends altServer.Player>(
        callback: altServer.Events.GenericCancellablePlayerEventCallback<altServer.Events.PlayerControlRequestEventParameters, T>,
    ): altShared.Events.EventHandler;
    oncePlayerControlRequest<T extends altServer.Player>(
        callback: altServer.Events.GenericCancellablePlayerEventCallback<altServer.Events.PlayerControlRequestEventParameters, T>,
    ): altShared.Events.EventHandler;
    onPlayerInteriorChange<T extends altServer.Player>(
        callback: altServer.Events.GenericPlayerEventCallback<altServer.Events.PlayerInteriorChangeEventParameters, T>,
    ): altShared.Events.EventHandler;
    oncePlayerInteriorChange<T extends altServer.Player>(
        callback: altServer.Events.GenericPlayerEventCallback<altServer.Events.PlayerInteriorChangeEventParameters, T>,
    ): altShared.Events.EventHandler;
    onPlayerDimensionChange<T extends altServer.Player>(
        callback: altServer.Events.GenericPlayerEventCallback<altServer.Events.PlayerDimensionChangeEventParameters, T>,
    ): altShared.Events.EventHandler;
    oncePlayerDimensionChange<T extends altServer.Player>(
        callback: altServer.Events.GenericPlayerEventCallback<altServer.Events.PlayerDimensionChangeEventParameters, T>,
    ): altShared.Events.EventHandler;
    onPlayerWeaponChange<T extends altServer.Player>(
        callback: altServer.Events.GenericPlayerEventCallback<altServer.Events.PlayerWeaponChangeEventParameters, T>,
    ): altShared.Events.EventHandler;
    oncePlayerWeaponChange<T extends altServer.Player>(
        callback: altServer.Events.GenericPlayerEventCallback<altServer.Events.PlayerWeaponChangeEventParameters, T>,
    ): altShared.Events.EventHandler;
    onPlayerSyncedSceneRequest(
        callback: altServer.Events.GenericCancellableEventCallback<altServer.Events.PlayerSyncedSceneRequestEventParameters>,
    ): altShared.Events.EventHandler;
    oncePlayerSyncedSceneRequest(
        callback: altServer.Events.GenericCancellableEventCallback<altServer.Events.PlayerSyncedSceneRequestEventParameters>,
    ): altShared.Events.EventHandler;
    onPlayerSyncedSceneStart<T extends altServer.Player>(
        callback: altServer.Events.GenericCancellablePlayerEventCallback<altServer.Events.PlayerSyncedSceneStartEventParameters, T>,
    ): altShared.Events.EventHandler;
    oncePlayerSyncedSceneStart<T extends altServer.Player>(
        callback: altServer.Events.GenericCancellablePlayerEventCallback<altServer.Events.PlayerSyncedSceneStartEventParameters, T>,
    ): altShared.Events.EventHandler;
    onPlayerSyncedSceneStop<T extends altServer.Player>(
        callback: altServer.Events.GenericCancellablePlayerEventCallback<altServer.Events.PlayerSyncedSceneStopEventParameters, T>,
    ): altShared.Events.EventHandler;
    oncePlayerSyncedSceneStop<T extends altServer.Player>(
        callback: altServer.Events.GenericCancellablePlayerEventCallback<altServer.Events.PlayerSyncedSceneStopEventParameters, T>,
    ): altShared.Events.EventHandler;
    onPlayerSyncedSceneUpdate<T extends altServer.Player>(
        callback: altServer.Events.GenericCancellablePlayerEventCallback<altServer.Events.PlayerSyncedSceneUpdateEventParameters, T>,
    ): altShared.Events.EventHandler;
    onPlayerSpawn<T extends altServer.Player>(callback: altServer.Events.GenericPlayerEventCallback<{}, T>): altShared.Events.EventHandler;
    oncePlayerSpawn<T extends altServer.Player>(
        callback: altServer.Events.GenericPlayerEventCallback<{}, T>,
    ): altShared.Events.EventHandler;
    onPlayerAnimationChange<T extends altServer.Player>(
        callback: altServer.Events.GenericPlayerEventCallback<altServer.Events.PlayerAnimationChangeEventParameters, T>,
    ): altShared.Events.EventHandler;
    oncePlayerAnimationChange<T extends altServer.Player>(
        callback: altServer.Events.GenericPlayerEventCallback<altServer.Events.PlayerAnimationChangeEventParameters, T>,
    ): altShared.Events.EventHandler;
    onPlayerVehicleEntered<T extends altServer.Player>(
        callback: altServer.Events.GenericPlayerEventCallback<altServer.Events.PlayerVehicleEnteredEventParameters, T>,
    ): altShared.Events.EventHandler;
    oncePlayerVehicleEntered<T extends altServer.Player>(
        callback: altServer.Events.GenericPlayerEventCallback<altServer.Events.PlayerVehicleEnteredEventParameters, T>,
    ): altShared.Events.EventHandler;
    onPlayerStartVehicleEnter<T extends altServer.Player>(
        callback: altServer.Events.GenericPlayerEventCallback<altServer.Events.PlayerStartVehicleEnterEventParameters, T>,
    ): altShared.Events.EventHandler;
    oncePlayerStartVehicleEnter<T extends altServer.Player>(
        callback: altServer.Events.GenericPlayerEventCallback<altServer.Events.PlayerStartVehicleEnterEventParameters, T>,
    ): altShared.Events.EventHandler;
    onPlayerVehicleLeft<T extends altServer.Player>(
        callback: altServer.Events.GenericPlayerEventCallback<altServer.Events.PlayerVehicleLeftEventParameters, T>,
    ): altShared.Events.EventHandler;
    oncePlayerVehicleLeft<T extends altServer.Player>(
        callback: altServer.Events.GenericPlayerEventCallback<altServer.Events.PlayerVehicleLeftEventParameters, T>,
    ): altShared.Events.EventHandler;
    onPlayerVehicleSeatChange<T extends altServer.Player>(
        callback: altServer.Events.GenericPlayerEventCallback<altServer.Events.PlayerVehicleSeatChangeEventParameters, T>,
    ): altShared.Events.EventHandler;
    oncePlayerVehicleSeatChange<T extends altServer.Player>(
        callback: altServer.Events.GenericPlayerEventCallback<altServer.Events.PlayerVehicleSeatChangeEventParameters, T>,
    ): altShared.Events.EventHandler;
    onPlayerStartTalking<T extends altServer.Player>(
        callback: altServer.Events.GenericPlayerEventCallback<{}, T>,
    ): altShared.Events.EventHandler;
    oncePlayerStartTalking<T extends altServer.Player>(
        callback: altServer.Events.GenericPlayerEventCallback<{}, T>,
    ): altShared.Events.EventHandler;
    onPlayerStopTalking<T extends altServer.Player>(
        callback: altServer.Events.GenericPlayerEventCallback<{}, T>,
    ): altShared.Events.EventHandler;
    oncePlayerStopTalking<T extends altServer.Player>(
        callback: altServer.Events.GenericPlayerEventCallback<{}, T>,
    ): altShared.Events.EventHandler;
    onPedHeal(callback: altServer.Events.GenericEventCallback<altServer.Events.PedHealEventParameters>): altShared.Events.EventHandler;
    oncePedHeal(callback: altServer.Events.GenericEventCallback<altServer.Events.PedHealEventParameters>): altShared.Events.EventHandler;
    onPedDeath(callback: altServer.Events.GenericEventCallback<altServer.Events.PedDeathEventParameters>): altShared.Events.EventHandler;
    oncePedDeath(callback: altServer.Events.GenericEventCallback<altServer.Events.PedDeathEventParameters>): altShared.Events.EventHandler;
    onPedDamage(callback: altServer.Events.GenericEventCallback<altServer.Events.PedDamageEventParameters>): altShared.Events.EventHandler;
    oncePedDamage(
        callback: altServer.Events.GenericEventCallback<altServer.Events.PedDamageEventParameters>,
    ): altShared.Events.EventHandler;
    onVehicleDestroy(
        callback: altServer.Events.GenericEventCallback<altServer.Events.VehicleDestroyEventParameters>,
    ): altShared.Events.EventHandler;
    onceVehicleDestroy(
        callback: altServer.Events.GenericEventCallback<altServer.Events.VehicleDestroyEventParameters>,
    ): altShared.Events.EventHandler;
    onVehicleAttach(
        callback: altServer.Events.GenericEventCallback<altServer.Events.VehicleAttachEventParameters>,
    ): altShared.Events.EventHandler;
    onceVehicleAttach(
        callback: altServer.Events.GenericEventCallback<altServer.Events.VehicleAttachEventParameters>,
    ): altShared.Events.EventHandler;
    onVehicleDetach(
        callback: altServer.Events.GenericEventCallback<altServer.Events.VehicleDetachEventParameters>,
    ): altShared.Events.EventHandler;
    onceVehicleDetach(
        callback: altServer.Events.GenericEventCallback<altServer.Events.VehicleDetachEventParameters>,
    ): altShared.Events.EventHandler;
    onVehicleDamage(
        callback: altServer.Events.GenericEventCallback<altServer.Events.VehicleDamageEventParameters>,
    ): altShared.Events.EventHandler;
    onceVehicleDamage(
        callback: altServer.Events.GenericEventCallback<altServer.Events.VehicleDamageEventParameters>,
    ): altShared.Events.EventHandler;
    onVehicleSirenStateChange(
        callback: altServer.Events.GenericEventCallback<altServer.Events.VehicleSirenStateChangeEventParameters>,
    ): altShared.Events.EventHandler;
    onceVehicleSirenStateChange(
        callback: altServer.Events.GenericEventCallback<altServer.Events.VehicleSirenStateChangeEventParameters>,
    ): altShared.Events.EventHandler;
    onVehicleHornStateChange<T extends altServer.Player>(
        callback: altServer.Events.GenericCancellablePlayerEventCallback<altServer.Events.VehicleHornStateChangeEventParameters, T>,
    ): altShared.Events.EventHandler;
    onceVehicleHornStateChange<T extends altServer.Player>(
        callback: altServer.Events.GenericCancellablePlayerEventCallback<altServer.Events.VehicleHornStateChangeEventParameters, T>,
    ): altShared.Events.EventHandler;
    onVoiceConnectionCreate(
        callback: altServer.Events.GenericEventCallback<altServer.Events.VoiceConnectionEventParameters>,
    ): altShared.Events.EventHandler;
    onceVoiceConnectionCreate(
        callback: altServer.Events.GenericEventCallback<altServer.Events.VoiceConnectionEventParameters>,
    ): altShared.Events.EventHandler;
    onClientObjectDelete<T extends altServer.Player>(
        callback: altServer.Events.GenericCancellablePlayerEventCallback<{}, T>,
    ): altShared.Events.EventHandler;
    onceClientObjectDelete<T extends altServer.Player>(
        callback: altServer.Events.GenericCancellablePlayerEventCallback<{}, T>,
    ): altShared.Events.EventHandler;
    onClientObjectRequest<T extends altServer.Player>(
        callback: altServer.Events.GenericCancellablePlayerEventCallback<altServer.Events.ClientObjectEventParameters, T>,
    ): altShared.Events.EventHandler;
    onceClientObjectRequest<T extends altServer.Player>(
        callback: altServer.Events.GenericCancellablePlayerEventCallback<altServer.Events.ClientObjectEventParameters, T>,
    ): altShared.Events.EventHandler;
    onBaseObjectCreate(
        callback: altServer.Events.GenericEventCallback<altServer.Events.BaseObjectCreateEventParameters>,
    ): altShared.Events.EventHandler;
    onceBaseObjectCreate(
        callback: altServer.Events.GenericEventCallback<altServer.Events.BaseObjectCreateEventParameters>,
    ): altShared.Events.EventHandler;
    onBaseObjectRemove(
        callback: altServer.Events.GenericEventCallback<altServer.Events.BaseObjectRemoveEventParameters>,
    ): altShared.Events.EventHandler;
    onceBaseObjectRemove(
        callback: altServer.Events.GenericEventCallback<altServer.Events.BaseObjectRemoveEventParameters>,
    ): altShared.Events.EventHandler;
    onNetOwnerChange(
        callback: altServer.Events.GenericEventCallback<altServer.Events.NetOwnerChangeEventParameters>,
    ): altShared.Events.EventHandler;
    onceNetOwnerChange(
        callback: altServer.Events.GenericEventCallback<altServer.Events.NetOwnerChangeEventParameters>,
    ): altShared.Events.EventHandler;
    onWeaponDamage(
        callback: altServer.Events.GenericCancellableEventCallback<altServer.Events.WeaponDamageEventParameters>,
    ): altShared.Events.EventHandler;
    onceWeaponDamage(
        callback: altServer.Events.GenericCancellableEventCallback<altServer.Events.WeaponDamageEventParameters>,
    ): altShared.Events.EventHandler;
    onMetaChange(
        callback: altServer.Events.GenericEventCallback<altServer.Events.MetaChangeEventParameters>,
    ): altShared.Events.EventHandler;
    onLocalMetaChange<T extends altServer.Player>(
        callback: altServer.Events.GenericPlayerEventCallback<altServer.Events.LocalMetaChangeEventParameters, T>,
    ): altShared.Events.EventHandler;
    onceLocalMetaChange<T extends altServer.Player>(
        callback: altServer.Events.GenericPlayerEventCallback<altServer.Events.LocalMetaChangeEventParameters, T>,
    ): altShared.Events.EventHandler;
    onStreamSyncedMetaChange(
        callback: altServer.Events.GenericEventCallback<altServer.Events.StreamSyncedMetaChangeEventParameters>,
    ): altShared.Events.EventHandler;
    onceStreamSyncedMetaChange(
        callback: altServer.Events.GenericEventCallback<altServer.Events.StreamSyncedMetaChangeEventParameters>,
    ): altShared.Events.EventHandler;
    onGlobalMetaChange(
        callback: altServer.Events.GenericEventCallback<altServer.Events.GlobalMetaChangeEventParameters>,
    ): altShared.Events.EventHandler;
    onceGlobalMetaChange(
        callback: altServer.Events.GenericEventCallback<altServer.Events.GlobalMetaChangeEventParameters>,
    ): altShared.Events.EventHandler;
    onGlobalSyncedMetaChange(
        callback: altServer.Events.GenericEventCallback<altServer.Events.GlobalSyncedMetaChangeEventParameters>,
    ): altShared.Events.EventHandler;
    onceGlobalSyncedMetaChange(
        callback: altServer.Events.GenericEventCallback<altServer.Events.GlobalSyncedMetaChangeEventParameters>,
    ): altShared.Events.EventHandler;
    onConsoleCommand(
        callback: altServer.Events.GenericEventCallback<altServer.Events.ConsoleCommandEventParameters>,
    ): altShared.Events.EventHandler;
    onceConsoleCommand(
        callback: altServer.Events.GenericEventCallback<altServer.Events.ConsoleCommandEventParameters>,
    ): altShared.Events.EventHandler;
    onError(callback: altServer.Events.GenericEventCallback<altServer.Events.ErrorEventParameters>): altShared.Events.EventHandler;
    onceError(callback: altServer.Events.GenericEventCallback<altServer.Events.ErrorEventParameters>): altShared.Events.EventHandler;
    onColShapeEvent(
        callback: altServer.Events.GenericEventCallback<altServer.Events.ColShapeEventParameters>,
    ): altShared.Events.EventHandler;
    onceColShapeEvent(
        callback: altServer.Events.GenericEventCallback<altServer.Events.ColShapeEventParameters>,
    ): altShared.Events.EventHandler;
    onExplosion(
        callback: altServer.Events.GenericCancellableEventCallback<altServer.Events.ExplosionEventParameters>,
    ): altShared.Events.EventHandler;
    onceExplosion(
        callback: altServer.Events.GenericCancellableEventCallback<altServer.Events.ExplosionEventParameters>,
    ): altShared.Events.EventHandler;
    onFireStart<T extends altServer.Player>(
        callback: altServer.Events.GenericCancellablePlayerEventCallback<altServer.Events.FireStartEventParameters, T>,
    ): altShared.Events.EventHandler;
    onceFireStart<T extends altServer.Player>(
        callback: altServer.Events.GenericCancellablePlayerEventCallback<altServer.Events.FireStartEventParameters, T>,
    ): altShared.Events.EventHandler;
    onProjectileStart<T extends altServer.Player>(
        callback: altServer.Events.GenericCancellablePlayerEventCallback<altServer.Events.ProjectileStartEventParameters, T>,
    ): altShared.Events.EventHandler;
    onceProjectileStart<T extends altServer.Player>(
        callback: altServer.Events.GenericCancellablePlayerEventCallback<altServer.Events.ProjectileStartEventParameters, T>,
    ): altShared.Events.EventHandler;
    onEntityColShapeEnter(
        callback: altServer.Events.GenericEventCallback<altServer.Events.EntityColShapeEnterEventParameters>,
    ): altShared.Events.EventHandler;
    onceEntityColShapeEnter(
        callback: altServer.Events.GenericEventCallback<altServer.Events.EntityColShapeEnterEventParameters>,
    ): altShared.Events.EventHandler;
    onEntityColShapeLeave(
        callback: altServer.Events.GenericEventCallback<altServer.Events.EntityColShapeLeaveEventParameters>,
    ): altShared.Events.EventHandler;
    onceEntityColShapeLeave(
        callback: altServer.Events.GenericEventCallback<altServer.Events.EntityColShapeLeaveEventParameters>,
    ): altShared.Events.EventHandler;
    onEntityCheckpointEnter(
        callback: altServer.Events.GenericEventCallback<altServer.Events.EntityCheckpointEnterEventParameters>,
    ): altShared.Events.EventHandler;
    onceEntityCheckpointEnter(
        callback: altServer.Events.GenericEventCallback<altServer.Events.EntityCheckpointEnterEventParameters>,
    ): altShared.Events.EventHandler;
    onEntityCheckpointLeave(
        callback: altServer.Events.GenericEventCallback<altServer.Events.EntityCheckpointLeaveEventParameters>,
    ): altShared.Events.EventHandler;
    onceEntityCheckpointLeave(
        callback: altServer.Events.GenericEventCallback<altServer.Events.EntityCheckpointLeaveEventParameters>,
    ): altShared.Events.EventHandler;
    onGivePedScriptedTask(
        callback: altServer.Events.GenericEventCallback<altServer.Events.GivePedScriptedTaskEventParameters>,
    ): altShared.Events.EventHandler;
    onLocalScriptEvent<T = unknown[]>(
        callback: altServer.Events.GenericEventCallback<altServer.Events.ServerScriptEventParameters<T>>,
    ): altShared.Events.EventHandler;
    onceLocalScriptEvent<T = unknown[]>(
        callback: altServer.Events.GenericEventCallback<altServer.Events.ServerScriptEventParameters<T>>,
    ): altShared.Events.EventHandler;
    onRemoteScriptEvent<T = unknown[], U extends altServer.Player = altServer.Player>(
        callback: altServer.Events.GenericPlayerEventCallback<altServer.Events.PlayerScriptEventParameters<T>, U>,
    ): altShared.Events.EventHandler;
    onceRemoteScriptEvent<T = unknown[], U extends altServer.Player = altServer.Player>(
        callback: altServer.Events.GenericPlayerEventCallback<altServer.Events.PlayerScriptEventParameters<T>, U>,
    ): altShared.Events.EventHandler;
    onResourceStart(callback: altServer.Events.GenericEventCallback): altShared.Events.EventHandler;
    onceResourceStart(callback: altServer.Events.GenericEventCallback): altShared.Events.EventHandler;
    onResourceStop(callback: altServer.Events.GenericEventCallback): altShared.Events.EventHandler;
    onceResourceStop(callback: altServer.Events.GenericEventCallback): altShared.Events.EventHandler;
    onResourceError(
        callback: altServer.Events.GenericEventCallback<altServer.Events.ResourceErrorEventParameters>,
    ): altShared.Events.EventHandler;
    onceResourceError(
        callback: altServer.Events.GenericEventCallback<altServer.Events.ResourceErrorEventParameters>,
    ): altShared.Events.EventHandler;
    onEvent(
        callback: altServer.Events.GenericEventCallback<altShared.Events.GenericOnEventParameters>,
    ): altShared.Events.GenericEventHandler;
}
