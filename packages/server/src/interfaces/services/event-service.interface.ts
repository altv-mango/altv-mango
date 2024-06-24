import type { Events as SharedEvents } from '@altv/shared';
import type { Events as ServerEventsV2, Player } from '@altv/server';
import type { IServerEvent as ServerEventsV1 } from 'alt-server';
import type { ScriptEventHandler } from '@altv-mango/core/app';

export interface EventService {
    on<E extends keyof ServerEventsV2.CustomServerEvent>(
        eventName: E,
        callback: (body: Parameters<ServerEventsV2.CustomServerEvent[E]>[0]) => void | Promise<void>,
    ): ScriptEventHandler;
    on<E extends string>(
        eventName: Exclude<E, keyof ServerEventsV2.CustomServerEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): ScriptEventHandler;
    once<E extends keyof ServerEventsV2.CustomServerEvent>(
        eventName: E,
        callback: (body: Parameters<ServerEventsV2.CustomServerEvent[E]>[0]) => void | Promise<void>,
    ): ScriptEventHandler;
    once<E extends string>(
        eventName: Exclude<E, keyof ServerEventsV2.CustomServerEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): ScriptEventHandler;
    emit<E extends keyof ServerEventsV2.CustomServerEvent>(eventName: E, body?: Parameters<ServerEventsV2.CustomServerEvent[E]>[0]): void;
    emit<E extends string>(eventName: Exclude<E, keyof ServerEventsV2.CustomServerEvent>, body?: any): void;
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

    onScriptRPC<T extends Player>(callback: ServerEventsV2.GenericPlayerEventCallback<ServerEventsV2.ScriptRPCEventParameters, T>): ScriptEventHandler;
    onceScriptRPC<T extends Player>(callback: ServerEventsV2.GenericPlayerEventCallback<ServerEventsV2.ScriptRPCEventParameters, T>): ScriptEventHandler;
    onScriptRPCAnswer<T extends Player>(callback: ServerEventsV2.GenericPlayerEventCallback<ServerEventsV2.ScriptRPCAnswerEventParameters, T>): ScriptEventHandler;
    onceScriptRPCAnswer<T extends Player>(callback: ServerEventsV2.GenericPlayerEventCallback<ServerEventsV2.ScriptRPCAnswerEventParameters, T>): ScriptEventHandler;
    onServerStarted(callback: ServerEventsV2.GenericEventCallback): ScriptEventHandler;
    onServerStarted(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["serverStarted"]>): ScriptEventHandler;
    onceServerStarted(callback: ServerEventsV2.GenericEventCallback): ScriptEventHandler;
    onceServerStarted(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["serverStarted"]>): ScriptEventHandler;
    onConnectionQueueAdd(callback: ServerEventsV2.GenericEventCallback<ServerEventsV2.ConnectionQueueEventParameters>): ScriptEventHandler;
    onConnectionQueueAdd(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["connectionQueueAdd"]>): ScriptEventHandler;
    onceConnectionQueueAdd(callback: ServerEventsV2.GenericEventCallback<ServerEventsV2.ConnectionQueueEventParameters>): ScriptEventHandler;
    onceConnectionQueueAdd(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["connectionQueueAdd"]>): ScriptEventHandler;
    onConnectionQueueRemove(callback: ServerEventsV2.GenericEventCallback<ServerEventsV2.ConnectionQueueEventParameters>): ScriptEventHandler;
    onConnectionQueueRemove(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["connectionQueueRemove"]>): ScriptEventHandler;
    onceConnectionQueueRemove(callback: ServerEventsV2.GenericEventCallback<ServerEventsV2.ConnectionQueueEventParameters>): ScriptEventHandler;
    onceConnectionQueueRemove(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["connectionQueueRemove"]>): ScriptEventHandler;
    onPlayerConnect<T extends Player>(callback: ServerEventsV2.GenericPlayerEventCallback<ServerEventsV2.PlayerConnectEventParameters, T>): ScriptEventHandler;
    onPlayerConnect(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["playerConnect"]>): ScriptEventHandler;
    oncePlayerConnect<T extends Player>(callback: ServerEventsV2.GenericPlayerEventCallback<ServerEventsV2.PlayerConnectEventParameters, T>): ScriptEventHandler;
    oncePlayerConnect(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["playerConnect"]>): ScriptEventHandler;
    onPlayerConnectDenied(callback: ServerEventsV2.GenericEventCallback<ServerEventsV2.PlayerConnectDeniedEventParameters>): ScriptEventHandler;
    onPlayerConnectDenied(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["playerConnectDenied"]>): ScriptEventHandler;
    oncePlayerConnectDenied(callback: ServerEventsV2.GenericEventCallback<ServerEventsV2.PlayerConnectDeniedEventParameters>): ScriptEventHandler;
    oncePlayerConnectDenied(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["playerConnectDenied"]>): ScriptEventHandler;
    onPlayerDisconnect<T extends Player>(callback: ServerEventsV2.GenericPlayerEventCallback<ServerEventsV2.PlayerDisconnectEventParameters, T>): ScriptEventHandler;
    onPlayerDisconnect(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["playerDisconnect"]>): ScriptEventHandler;
    oncePlayerDisconnect<T extends Player>(callback: ServerEventsV2.GenericPlayerEventCallback<ServerEventsV2.PlayerDisconnectEventParameters, T>): ScriptEventHandler;
    oncePlayerDisconnect(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["playerDisconnect"]>): ScriptEventHandler;
    onPlayerDamage<T extends Player>(callback: ServerEventsV2.GenericPlayerEventCallback<ServerEventsV2.PlayerDamageEventParameters, T>): ScriptEventHandler;
    onPlayerDamage(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["playerDamage"]>): ScriptEventHandler;
    oncePlayerDamage<T extends Player>(callback: ServerEventsV2.GenericPlayerEventCallback<ServerEventsV2.PlayerDamageEventParameters, T>): ScriptEventHandler;
    oncePlayerDamage(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["playerDamage"]>): ScriptEventHandler;
    onPlayerDeath<T extends Player>(callback: ServerEventsV2.GenericPlayerEventCallback<ServerEventsV2.PlayerDeathEventParameters, T>): ScriptEventHandler;
    onPlayerDeath(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["playerDeath"]>): ScriptEventHandler;
    oncePlayerDeath<T extends Player>(callback: ServerEventsV2.GenericPlayerEventCallback<ServerEventsV2.PlayerDeathEventParameters, T>): ScriptEventHandler;
    oncePlayerDeath(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["playerDeath"]>): ScriptEventHandler;
    onPlayerHeal<T extends Player>(callback: ServerEventsV2.GenericPlayerEventCallback<ServerEventsV2.PlayerHealEventParameters, T>): ScriptEventHandler;
    onPlayerHeal(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["playerHeal"]>): ScriptEventHandler;
    oncePlayerHeal<T extends Player>(callback: ServerEventsV2.GenericPlayerEventCallback<ServerEventsV2.PlayerHealEventParameters, T>): ScriptEventHandler;
    oncePlayerHeal(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["playerHeal"]>): ScriptEventHandler;
    onPlayerControlRequest<T extends Player>(callback: ServerEventsV2.GenericCancellablePlayerEventCallback<ServerEventsV2.PlayerControlRequestEventParameters, T>): ScriptEventHandler;
    oncePlayerControlRequest<T extends Player>(callback: ServerEventsV2.GenericCancellablePlayerEventCallback<ServerEventsV2.PlayerControlRequestEventParameters, T>): ScriptEventHandler;
    onPlayerInteriorChange<T extends Player>(callback: ServerEventsV2.GenericPlayerEventCallback<ServerEventsV2.PlayerInteriorChangeEventParameters, T>): ScriptEventHandler;
    onPlayerInteriorChange(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["playerInteriorChange"]>): ScriptEventHandler;
    oncePlayerInteriorChange<T extends Player>(callback: ServerEventsV2.GenericPlayerEventCallback<ServerEventsV2.PlayerInteriorChangeEventParameters, T>): ScriptEventHandler;
    oncePlayerInteriorChange(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["playerInteriorChange"]>): ScriptEventHandler;
    onPlayerDimensionChange<T extends Player>(callback: ServerEventsV2.GenericPlayerEventCallback<ServerEventsV2.PlayerDimensionChangeEventParameters, T>): ScriptEventHandler;
    onPlayerDimensionChange(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["playerDimensionChange"]>): ScriptEventHandler;
    oncePlayerDimensionChange<T extends Player>(callback: ServerEventsV2.GenericPlayerEventCallback<ServerEventsV2.PlayerDimensionChangeEventParameters, T>): ScriptEventHandler;
    oncePlayerDimensionChange(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["playerDimensionChange"]>): ScriptEventHandler;
    onPlayerWeaponChange<T extends Player>(callback: ServerEventsV2.GenericPlayerEventCallback<ServerEventsV2.PlayerWeaponChangeEventParameters, T>): ScriptEventHandler;
    onPlayerWeaponChange(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["playerWeaponChange"]>): ScriptEventHandler;
    oncePlayerWeaponChange<T extends Player>(callback: ServerEventsV2.GenericPlayerEventCallback<ServerEventsV2.PlayerWeaponChangeEventParameters, T>): ScriptEventHandler;
    oncePlayerWeaponChange(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["playerWeaponChange"]>): ScriptEventHandler;
    onPlayerSyncedSceneRequest(callback: ServerEventsV2.GenericCancellableEventCallback<ServerEventsV2.PlayerSyncedSceneRequestEventParameters>): ScriptEventHandler;
    onPlayerSyncedSceneRequest(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["requestSyncedScene"]>): ScriptEventHandler;
    oncePlayerSyncedSceneRequest(callback: ServerEventsV2.GenericCancellableEventCallback<ServerEventsV2.PlayerSyncedSceneRequestEventParameters>): ScriptEventHandler;
    oncePlayerSyncedSceneRequest(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["requestSyncedScene"]>): ScriptEventHandler;
    onPlayerSyncedSceneStart<T extends Player>(callback: ServerEventsV2.GenericCancellablePlayerEventCallback<ServerEventsV2.PlayerSyncedSceneStartEventParameters, T>): ScriptEventHandler;
    onPlayerSyncedSceneStart(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["startSyncedScene"]>): ScriptEventHandler;
    oncePlayerSyncedSceneStart<T extends Player>(callback: ServerEventsV2.GenericCancellablePlayerEventCallback<ServerEventsV2.PlayerSyncedSceneStartEventParameters, T>): ScriptEventHandler;
    oncePlayerSyncedSceneStart(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["startSyncedScene"]>): ScriptEventHandler;
    onPlayerSyncedSceneStop<T extends Player>(callback: ServerEventsV2.GenericCancellablePlayerEventCallback<ServerEventsV2.PlayerSyncedSceneStopEventParameters, T>): ScriptEventHandler;
    onPlayerSyncedSceneStop(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["stopSyncedScene"]>): ScriptEventHandler;
    oncePlayerSyncedSceneStop<T extends Player>(callback: ServerEventsV2.GenericCancellablePlayerEventCallback<ServerEventsV2.PlayerSyncedSceneStopEventParameters, T>): ScriptEventHandler;
    oncePlayerSyncedSceneStop(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["stopSyncedScene"]>): ScriptEventHandler;
    onPlayerSyncedSceneUpdate<T extends Player>(callback: ServerEventsV2.GenericCancellablePlayerEventCallback<ServerEventsV2.PlayerSyncedSceneUpdateEventParameters, T>): ScriptEventHandler;
    onPlayerSyncedSceneUpdate(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["updateSyncedScene"]>): ScriptEventHandler;
    onPlayerSpawn<T extends Player>(callback: ServerEventsV2.GenericPlayerEventCallback<{}, T>): ScriptEventHandler;
    onPlayerSpawn(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["playerSpawn"]>): ScriptEventHandler;
    oncePlayerSpawn<T extends Player>(callback: ServerEventsV2.GenericPlayerEventCallback<{}, T>): ScriptEventHandler;
    oncePlayerSpawn(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["playerSpawn"]>): ScriptEventHandler;
    onPlayerAnimationChange<T extends Player>(callback: ServerEventsV2.GenericPlayerEventCallback<ServerEventsV2.PlayerAnimationChangeEventParameters, T>): ScriptEventHandler;
    onPlayerAnimationChange(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["playerAnimationChange"]>): ScriptEventHandler;
    oncePlayerAnimationChange<T extends Player>(callback: ServerEventsV2.GenericPlayerEventCallback<ServerEventsV2.PlayerAnimationChangeEventParameters, T>): ScriptEventHandler;
    oncePlayerAnimationChange(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["playerAnimationChange"]>): ScriptEventHandler;
    onPlayerVehicleEntered<T extends Player>(callback: ServerEventsV2.GenericPlayerEventCallback<ServerEventsV2.PlayerVehicleEnteredEventParameters, T>): ScriptEventHandler;
    onPlayerVehicleEntered(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["playerEnteredVehicle"]>): ScriptEventHandler;
    oncePlayerVehicleEntered<T extends Player>(callback: ServerEventsV2.GenericPlayerEventCallback<ServerEventsV2.PlayerVehicleEnteredEventParameters, T>): ScriptEventHandler;
    oncePlayerVehicleEntered(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["playerEnteredVehicle"]>): ScriptEventHandler;
    onPlayerStartVehicleEnter<T extends Player>(callback: ServerEventsV2.GenericPlayerEventCallback<ServerEventsV2.PlayerStartVehicleEnterEventParameters, T>): ScriptEventHandler;
    onPlayerStartVehicleEnter(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["playerEnteringVehicle"]>): ScriptEventHandler;
    oncePlayerStartVehicleEnter<T extends Player>(callback: ServerEventsV2.GenericPlayerEventCallback<ServerEventsV2.PlayerStartVehicleEnterEventParameters, T>): ScriptEventHandler;
    oncePlayerStartVehicleEnter(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["playerEnteringVehicle"]>): ScriptEventHandler;
    onPlayerVehicleLeft<T extends Player>(callback: ServerEventsV2.GenericPlayerEventCallback<ServerEventsV2.PlayerVehicleLeftEventParameters, T>): ScriptEventHandler;
    onPlayerVehicleLeft(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["playerLeftVehicle"]>): ScriptEventHandler;
    oncePlayerVehicleLeft<T extends Player>(callback: ServerEventsV2.GenericPlayerEventCallback<ServerEventsV2.PlayerVehicleLeftEventParameters, T>): ScriptEventHandler;
    oncePlayerVehicleLeft(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["playerLeftVehicle"]>): ScriptEventHandler;
    onPlayerVehicleSeatChange<T extends Player>(callback: ServerEventsV2.GenericPlayerEventCallback<ServerEventsV2.PlayerVehicleSeatChangeEventParameters, T>): ScriptEventHandler;
    onPlayerVehicleSeatChange(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["playerChangedVehicleSeat"]>): ScriptEventHandler;
    oncePlayerVehicleSeatChange<T extends Player>(callback: ServerEventsV2.GenericPlayerEventCallback<ServerEventsV2.PlayerVehicleSeatChangeEventParameters, T>): ScriptEventHandler;
    oncePlayerVehicleSeatChange(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["playerChangedVehicleSeat"]>): ScriptEventHandler;
    onPedHeal(callback: ServerEventsV2.GenericEventCallback<ServerEventsV2.PedHealEventParameters>): ScriptEventHandler;
    onPedHeal(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["pedHeal"]>): ScriptEventHandler;
    oncePedHeal(callback: ServerEventsV2.GenericEventCallback<ServerEventsV2.PedHealEventParameters>): ScriptEventHandler;
    oncePedHeal(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["pedHeal"]>): ScriptEventHandler;
    onPedDeath(callback: ServerEventsV2.GenericEventCallback<ServerEventsV2.PedDeathEventParameters>): ScriptEventHandler;
    onPedDeath(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["pedDeath"]>): ScriptEventHandler;
    oncePedDeath(callback: ServerEventsV2.GenericEventCallback<ServerEventsV2.PedDeathEventParameters>): ScriptEventHandler;
    oncePedDeath(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["pedDeath"]>): ScriptEventHandler;
    onPedDamage(callback: ServerEventsV2.GenericEventCallback<ServerEventsV2.PedDamageEventParameters>): ScriptEventHandler;
    onPedDamage(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["pedDamage"]>): ScriptEventHandler;
    oncePedDamage(callback: ServerEventsV2.GenericEventCallback<ServerEventsV2.PedDamageEventParameters>): ScriptEventHandler;
    oncePedDamage(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["pedDamage"]>): ScriptEventHandler;
    onVehicleDestroy(callback: ServerEventsV2.GenericEventCallback<ServerEventsV2.VehicleDestroyEventParameters>): ScriptEventHandler;
    onVehicleDestroy(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["vehicleDestroy"]>): ScriptEventHandler;
    onceVehicleDestroy(callback: ServerEventsV2.GenericEventCallback<ServerEventsV2.VehicleDestroyEventParameters>): ScriptEventHandler;
    onceVehicleDestroy(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["vehicleDestroy"]>): ScriptEventHandler;
    onVehicleAttach(callback: ServerEventsV2.GenericEventCallback<ServerEventsV2.VehicleAttachEventParameters>): ScriptEventHandler;
    onVehicleAttach(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["vehicleAttach"]>): ScriptEventHandler;
    onceVehicleAttach(callback: ServerEventsV2.GenericEventCallback<ServerEventsV2.VehicleAttachEventParameters>): ScriptEventHandler;
    onceVehicleAttach(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["vehicleAttach"]>): ScriptEventHandler;
    onVehicleDetach(callback: ServerEventsV2.GenericEventCallback<ServerEventsV2.VehicleDetachEventParameters>): ScriptEventHandler;
    onVehicleDetach(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["vehicleDetach"]>): ScriptEventHandler;
    onceVehicleDetach(callback: ServerEventsV2.GenericEventCallback<ServerEventsV2.VehicleDetachEventParameters>): ScriptEventHandler;
    onceVehicleDetach(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["vehicleDetach"]>): ScriptEventHandler;
    onVehicleDamage(callback: ServerEventsV2.GenericEventCallback<ServerEventsV2.VehicleDamageEventParameters>): ScriptEventHandler;
    onVehicleDamage(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["vehicleDamage"]>): ScriptEventHandler;
    onceVehicleDamage(callback: ServerEventsV2.GenericEventCallback<ServerEventsV2.VehicleDamageEventParameters>): ScriptEventHandler;
    onceVehicleDamage(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["vehicleDamage"]>): ScriptEventHandler;
    onVehicleSirenStateChange(callback: ServerEventsV2.GenericEventCallback<ServerEventsV2.VehicleSirenStateChangeEventParameters>): ScriptEventHandler;
    onVehicleSirenStateChange(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["vehicleSiren"]>): ScriptEventHandler;
    onceVehicleSirenStateChange(callback: ServerEventsV2.GenericEventCallback<ServerEventsV2.VehicleSirenStateChangeEventParameters>): ScriptEventHandler;
    onceVehicleSirenStateChange(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["vehicleSiren"]>): ScriptEventHandler;
    onVehicleHornStateChange<T extends Player>(callback: ServerEventsV2.GenericCancellablePlayerEventCallback<ServerEventsV2.VehicleHornStateChangeEventParameters, T>): ScriptEventHandler;
    onVehicleHornStateChange(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["vehicleHorn"]>): ScriptEventHandler;
    onceVehicleHornStateChange<T extends Player>(callback: ServerEventsV2.GenericCancellablePlayerEventCallback<ServerEventsV2.VehicleHornStateChangeEventParameters, T>): ScriptEventHandler;
    onceVehicleHornStateChange(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["vehicleHorn"]>): ScriptEventHandler;
    onVoiceConnection(callback: ServerEventsV2.GenericEventCallback<ServerEventsV2.VoiceConnectionEventParameters>): ScriptEventHandler;
    onVoiceConnection(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["voiceConnection"]>): ScriptEventHandler;
    onceVoiceConnection(callback: ServerEventsV2.GenericEventCallback<ServerEventsV2.VoiceConnectionEventParameters>): ScriptEventHandler;
    onceVoiceConnection(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["voiceConnection"]>): ScriptEventHandler;
    onClientObjectDelete<T extends Player>(callback: ServerEventsV2.GenericCancellablePlayerEventCallback<{}, T>): ScriptEventHandler;
    onClientObjectDelete(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["clientDeleteObject"]>): ScriptEventHandler;
    onceClientObjectDelete<T extends Player>(callback: ServerEventsV2.GenericCancellablePlayerEventCallback<{}, T>): ScriptEventHandler;
    onceClientObjectDelete(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["clientDeleteObject"]>): ScriptEventHandler;
    onClientObjectRequest<T extends Player>(callback: ServerEventsV2.GenericCancellablePlayerEventCallback<ServerEventsV2.ClientObjectEventParameters, T>): ScriptEventHandler;
    onClientObjectRequest(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["clientRequestObject"]>): ScriptEventHandler;
    onceClientObjectRequest<T extends Player>(callback: ServerEventsV2.GenericCancellablePlayerEventCallback<ServerEventsV2.ClientObjectEventParameters, T>): ScriptEventHandler;
    onceClientObjectRequest(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["clientRequestObject"]>): ScriptEventHandler;
    onBaseObjectCreate(callback: ServerEventsV2.GenericEventCallback<ServerEventsV2.BaseObjectCreateEventParameters>): ScriptEventHandler;
    onBaseObjectCreate(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["baseObjectCreate"]>): ScriptEventHandler;
    onceBaseObjectCreate(callback: ServerEventsV2.GenericEventCallback<ServerEventsV2.BaseObjectCreateEventParameters>): ScriptEventHandler;
    onceBaseObjectCreate(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["baseObjectCreate"]>): ScriptEventHandler;
    onBaseObjectRemove(callback: ServerEventsV2.GenericEventCallback<ServerEventsV2.BaseObjectRemoveEventParameters>): ScriptEventHandler;
    onBaseObjectRemove(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["baseObjectRemove"]>): ScriptEventHandler;
    onceBaseObjectRemove(callback: ServerEventsV2.GenericEventCallback<ServerEventsV2.BaseObjectRemoveEventParameters>): ScriptEventHandler;
    onceBaseObjectRemove(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["baseObjectRemove"]>): ScriptEventHandler;
    onNetOwnerChange(callback: ServerEventsV2.GenericEventCallback<ServerEventsV2.NetOwnerChangeEventParameters>): ScriptEventHandler;
    onNetOwnerChange(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["netOwnerChange"]>): ScriptEventHandler;
    onceNetOwnerChange(callback: ServerEventsV2.GenericEventCallback<ServerEventsV2.NetOwnerChangeEventParameters>): ScriptEventHandler;
    onceNetOwnerChange(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["netOwnerChange"]>): ScriptEventHandler;
    onWeaponDamage(callback: ServerEventsV2.GenericCancellableEventCallback<ServerEventsV2.WeaponDamageEventParameters>): ScriptEventHandler;
    onWeaponDamage(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["weaponDamage"]>): ScriptEventHandler;
    onceWeaponDamage(callback: ServerEventsV2.GenericCancellableEventCallback<ServerEventsV2.WeaponDamageEventParameters>): ScriptEventHandler;
    onceWeaponDamage(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["weaponDamage"]>): ScriptEventHandler;
    onMetaChange(callback: ServerEventsV2.GenericEventCallback<ServerEventsV2.MetaChangeEventParameters>): ScriptEventHandler;
    onMetaChange(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["metaChange"]>): ScriptEventHandler;
    onLocalMetaChange<T extends Player>(callback: ServerEventsV2.GenericPlayerEventCallback<ServerEventsV2.LocalMetaChangeEventParameters, T>): ScriptEventHandler;
    onLocalMetaChange(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["localMetaChange"]>): ScriptEventHandler;
    onceLocalMetaChange<T extends Player>(callback: ServerEventsV2.GenericPlayerEventCallback<ServerEventsV2.LocalMetaChangeEventParameters, T>): ScriptEventHandler;
    onceLocalMetaChange(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["localMetaChange"]>): ScriptEventHandler;
    onStreamSyncedMetaChange(callback: ServerEventsV2.GenericEventCallback<ServerEventsV2.StreamSyncedMetaChangeEventParameters>): ScriptEventHandler;
    onStreamSyncedMetaChange(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["streamSyncedMetaChange"]>): ScriptEventHandler;
    onceStreamSyncedMetaChange(callback: ServerEventsV2.GenericEventCallback<ServerEventsV2.StreamSyncedMetaChangeEventParameters>): ScriptEventHandler;
    onceStreamSyncedMetaChange(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["streamSyncedMetaChange"]>): ScriptEventHandler;
    onGlobalMetaChange(callback: ServerEventsV2.GenericEventCallback<ServerEventsV2.GlobalMetaChangeEventParameters>): ScriptEventHandler;
    onGlobalMetaChange(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["globalMetaChange"]>): ScriptEventHandler;
    onceGlobalMetaChange(callback: ServerEventsV2.GenericEventCallback<ServerEventsV2.GlobalMetaChangeEventParameters>): ScriptEventHandler;
    onceGlobalMetaChange(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["globalMetaChange"]>): ScriptEventHandler;
    onGlobalSyncedMetaChange(callback: ServerEventsV2.GenericEventCallback<ServerEventsV2.GlobalSyncedMetaChangeEventParameters>): ScriptEventHandler;
    onGlobalSyncedMetaChange(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["globalSyncedMetaChange"]>): ScriptEventHandler;
    onceGlobalSyncedMetaChange(callback: ServerEventsV2.GenericEventCallback<ServerEventsV2.GlobalSyncedMetaChangeEventParameters>): ScriptEventHandler;
    onceGlobalSyncedMetaChange(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["globalSyncedMetaChange"]>): ScriptEventHandler;
    onConsoleCommand(callback: ServerEventsV2.GenericEventCallback<ServerEventsV2.ConsoleCommandEventParameters>): ScriptEventHandler;
    onConsoleCommand(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["consoleCommand"]>): ScriptEventHandler;
    onceConsoleCommand(callback: ServerEventsV2.GenericEventCallback<ServerEventsV2.ConsoleCommandEventParameters>): ScriptEventHandler;
    onceConsoleCommand(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["consoleCommand"]>): ScriptEventHandler;
    onError(callback: ServerEventsV2.GenericEventCallback<ServerEventsV2.ErrorEventParameters>): ScriptEventHandler;
    onceError(callback: ServerEventsV2.GenericEventCallback<ServerEventsV2.ErrorEventParameters>): ScriptEventHandler;
    onColShapeEvent(callback: ServerEventsV2.GenericEventCallback<ServerEventsV2.ColShapeEventParameters>): ScriptEventHandler;
    onceColShapeEvent(callback: ServerEventsV2.GenericEventCallback<ServerEventsV2.ColShapeEventParameters>): ScriptEventHandler;
    onExplosion(callback: ServerEventsV2.GenericCancellableEventCallback<ServerEventsV2.ExplosionEventParameters>): ScriptEventHandler;
    onExplosion(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["explosion"]>): ScriptEventHandler;
    onceExplosion(callback: ServerEventsV2.GenericCancellableEventCallback<ServerEventsV2.ExplosionEventParameters>): ScriptEventHandler;
    onceExplosion(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["explosion"]>): ScriptEventHandler;
    onFireStart<T extends Player>(callback: ServerEventsV2.GenericCancellablePlayerEventCallback<ServerEventsV2.FireStartEventParameters, T>): ScriptEventHandler;
    onFireStart(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["startFire"]>): ScriptEventHandler;
    onceFireStart<T extends Player>(callback: ServerEventsV2.GenericCancellablePlayerEventCallback<ServerEventsV2.FireStartEventParameters, T>): ScriptEventHandler;
    onceFireStart(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["startFire"]>): ScriptEventHandler;
    onProjectileStart<T extends Player>(callback: ServerEventsV2.GenericCancellablePlayerEventCallback<ServerEventsV2.ProjectileStartEventParameters, T>): ScriptEventHandler;
    onProjectileStart(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["startProjectile"]>): ScriptEventHandler;
    onceProjectileStart<T extends Player>(callback: ServerEventsV2.GenericCancellablePlayerEventCallback<ServerEventsV2.ProjectileStartEventParameters, T>): ScriptEventHandler;
    onceProjectileStart(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["startProjectile"]>): ScriptEventHandler;
    onEntityColShapeEnter(callback: ServerEventsV2.GenericEventCallback<ServerEventsV2.EntityColShapeEnterEventParameters>): ScriptEventHandler;
    onEntityColShapeEnter(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["entityEnterColshape"]>): ScriptEventHandler;
    onceEntityColShapeEnter(callback: ServerEventsV2.GenericEventCallback<ServerEventsV2.EntityColShapeEnterEventParameters>): ScriptEventHandler;
    onceEntityColShapeEnter(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["entityEnterColshape"]>): ScriptEventHandler;
    onEntityColShapeLeave(callback: ServerEventsV2.GenericEventCallback<ServerEventsV2.EntityColShapeLeaveEventParameters>): ScriptEventHandler;
    onEntityColShapeLeave(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["entityLeaveColshape"]>): ScriptEventHandler;
    onceEntityColShapeLeave(callback: ServerEventsV2.GenericEventCallback<ServerEventsV2.EntityColShapeLeaveEventParameters>): ScriptEventHandler;
    onceEntityColShapeLeave(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["entityLeaveColshape"]>): ScriptEventHandler;
    onEntityCheckpointEnter(callback: ServerEventsV2.GenericEventCallback<ServerEventsV2.EntityCheckpointEnterEventParameters>): ScriptEventHandler;
    onceEntityCheckpointEnter(callback: ServerEventsV2.GenericEventCallback<ServerEventsV2.EntityCheckpointEnterEventParameters>): ScriptEventHandler;
    onEntityCheckpointLeave(callback: ServerEventsV2.GenericEventCallback<ServerEventsV2.EntityCheckpointLeaveEventParameters>): ScriptEventHandler;
    onceEntityCheckpointLeave(callback: ServerEventsV2.GenericEventCallback<ServerEventsV2.EntityCheckpointLeaveEventParameters>): ScriptEventHandler;
    onGivePedScriptedTask(callback: ServerEventsV2.GenericEventCallback<ServerEventsV2.GivePedScriptedTaskEventParameters>): ScriptEventHandler;
    onGivePedScriptedTask(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["givePedScriptedTask"]>): ScriptEventHandler;
    onLocalScriptEvent<T = unknown[]>(callback: ServerEventsV2.GenericEventCallback<ServerEventsV2.ServerScriptEventParameters<T>>): ScriptEventHandler;
    onceLocalScriptEvent<T = unknown[]>(callback: ServerEventsV2.GenericEventCallback<ServerEventsV2.ServerScriptEventParameters<T>>): ScriptEventHandler;
    onRemoteScriptEvent<T = unknown[], U extends Player = Player>(callback: ServerEventsV2.GenericPlayerEventCallback<ServerEventsV2.PlayerScriptEventParameters<T>, U>): ScriptEventHandler;
    onceRemoteScriptEvent<T = unknown[], U extends Player = Player>(callback: ServerEventsV2.GenericPlayerEventCallback<ServerEventsV2.PlayerScriptEventParameters<T>, U>): ScriptEventHandler;
    onAnyResourceStart(callback: ServerEventsV2.GenericEventCallback<ServerEventsV2.ResourceStartEventParameters>): ScriptEventHandler;
    onAnyResourceStart(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["anyResourceStart"]>): ScriptEventHandler;
    onceAnyResourceStart(callback: ServerEventsV2.GenericEventCallback<ServerEventsV2.ResourceStartEventParameters>): ScriptEventHandler;
    onceAnyResourceStart(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["anyResourceStart"]>): ScriptEventHandler;
    onAnyResourceStop(callback: ServerEventsV2.GenericEventCallback<ServerEventsV2.ResourceStopEventParameters>): ScriptEventHandler;
    onAnyResourceStop(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["anyResourceStop"]>): ScriptEventHandler;
    onceAnyResourceStop(callback: ServerEventsV2.GenericEventCallback<ServerEventsV2.ResourceStopEventParameters>): ScriptEventHandler;
    onceAnyResourceStop(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["anyResourceStop"]>): ScriptEventHandler;
    onResourceStart(callback: ServerEventsV2.GenericEventCallback): ScriptEventHandler;
    onResourceStart(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["resourceStart"]>): ScriptEventHandler;
    onceResourceStart(callback: ServerEventsV2.GenericEventCallback): ScriptEventHandler;
    onceResourceStart(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["resourceStart"]>): ScriptEventHandler;
    onResourceStop(callback: ServerEventsV2.GenericEventCallback): ScriptEventHandler;
    onResourceStop(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["resourceStop"]>): ScriptEventHandler;
    onceResourceStop(callback: ServerEventsV2.GenericEventCallback): ScriptEventHandler;
    onceResourceStop(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["resourceStop"]>): ScriptEventHandler;
    onResourceError(callback: ServerEventsV2.GenericEventCallback<ServerEventsV2.ResourceErrorEventParameters>): ScriptEventHandler;
    onResourceError(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["resourceError"]>): ScriptEventHandler;
    onceResourceError(callback: ServerEventsV2.GenericEventCallback<ServerEventsV2.ResourceErrorEventParameters>): ScriptEventHandler;
    onceResourceError(callback: ServerEventsV2.GenericEventCallback<ServerEventsV1["resourceError"]>): ScriptEventHandler;
    onEvent(callback: ServerEventsV2.GenericEventCallback<SharedEvents.GenericOnEventParameters>): ScriptEventHandler;
}
