import type { Events as SharedEvents } from '@altv/shared';
import type { Events as ClientEventsV2, Player } from '@altv/client';
import type { IClientEvent as ClientEventsV1 } from 'alt-client';
import type { ScriptEventHandler } from '@altv-mango/core/app';

export interface EventService {
    on<E extends keyof ClientEventsV2.CustomClientEvent>(
        eventName: E,
        callback: (body: Parameters<ClientEventsV2.CustomClientEvent[E]>[0]) => void | Promise<void>,
    ): ScriptEventHandler;
    on<E extends string>(
        eventName: Exclude<E, keyof ClientEventsV2.CustomClientEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): ScriptEventHandler;
    once<E extends keyof ClientEventsV2.CustomClientEvent>(
        eventName: E,
        callback: (body: Parameters<ClientEventsV2.CustomClientEvent[E]>[0]) => void | Promise<void>,
    ): ScriptEventHandler;
    once<E extends string>(
        eventName: Exclude<E, keyof ClientEventsV2.CustomClientEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): ScriptEventHandler;
    emit<E extends keyof ClientEventsV2.CustomClientEvent>(eventName: E, body?: Parameters<ClientEventsV2.CustomClientEvent[E]>[0]): void;
    emit<E extends string>(eventName: Exclude<E, keyof ClientEventsV2.CustomClientEvent>, body?: unknown): void;
    onServer<E extends keyof SharedEvents.CustomServerToPlayerEvent>(
        eventName: E,
        callback: (body: Parameters<SharedEvents.CustomServerToPlayerEvent[E]>[0]) => void | Promise<void>,
    ): ScriptEventHandler;
    onServer<E extends string>(
        eventName: Exclude<E, keyof SharedEvents.CustomServerToPlayerEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): ScriptEventHandler;
    onceServer<E extends keyof SharedEvents.CustomServerToPlayerEvent>(
        eventName: E,
        callback: (body: Parameters<SharedEvents.CustomServerToPlayerEvent[E]>[0]) => void | Promise<void>,
    ): ScriptEventHandler;
    onceServer<E extends string>(
        eventName: Exclude<E, keyof SharedEvents.CustomServerToPlayerEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): ScriptEventHandler;
    emitServer<E extends keyof SharedEvents.CustomPlayerToServerEvent>(
        eventName: E,
        body?: Parameters<SharedEvents.CustomPlayerToServerEvent[E]>[0],
    ): void;
    emitServer<E extends string>(eventName: Exclude<E, keyof SharedEvents.CustomPlayerToServerEvent>, body?: unknown): void;
    onWebView<E extends keyof SharedEvents.CustomWebViewToClientEvent>(
        id: string | number,
        eventName: E,
        callback: (body: Parameters<SharedEvents.CustomWebViewToClientEvent[E]>[0]) => void | Promise<void>,
    ): ScriptEventHandler;
    onWebView<E extends string>(
        id: string | number,
        eventName: Exclude<E, keyof SharedEvents.CustomWebViewToClientEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): ScriptEventHandler;
    onceWebView<E extends keyof SharedEvents.CustomWebViewToClientEvent>(
        id: string | number,
        eventName: E,
        callback: (body: Parameters<SharedEvents.CustomWebViewToClientEvent[E]>[0]) => void | Promise<void>,
    ): ScriptEventHandler;
    onceWebView<E extends string>(
        id: string | number,
        eventName: Exclude<E, keyof SharedEvents.CustomWebViewToClientEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): ScriptEventHandler;
    emitWebView<E extends keyof SharedEvents.CustomClientToWebViewEvent>(
        id: string | number,
        eventName: E,
        body?: Parameters<SharedEvents.CustomClientToWebViewEvent[E]>[0],
    ): void;
    emitWebView<E extends string>(
        id: string | number,
        eventName: Exclude<E, keyof SharedEvents.CustomClientToWebViewEvent>,
        body?: unknown,
    ): void;
    onKeyboardEvent(callback: ClientEventsV2.GenericEventCallback<ClientEventsV2.KeyboardEventParameters>): ScriptEventHandler;
    onceKeyboardEvent(callback: ClientEventsV2.GenericEventCallback<ClientEventsV2.KeyboardEventParameters>): ScriptEventHandler;
    onKeyUp(callback: ClientEventsV2.GenericEventCallback<ClientEventsV2.KeyUpDownEventParameters>): ScriptEventHandler;
    onKeyUp(callback: ClientEventsV2.GenericEventCallback<ClientEventsV1["keyup"]>): ScriptEventHandler;
    onceKeyUp(callback: ClientEventsV2.GenericEventCallback<ClientEventsV2.KeyUpDownEventParameters>): ScriptEventHandler;
    onceKeyUp(callback: ClientEventsV2.GenericEventCallback<ClientEventsV1["keyup"]>): ScriptEventHandler;
    onKeyDown(callback: ClientEventsV2.GenericEventCallback<ClientEventsV2.KeyUpDownEventParameters>): ScriptEventHandler;
    onKeyDown(callback: ClientEventsV2.GenericEventCallback<ClientEventsV1["keydown"]>): ScriptEventHandler;
    onceKeyDown(callback: ClientEventsV2.GenericEventCallback<ClientEventsV2.KeyUpDownEventParameters>): ScriptEventHandler;
    onceKeyDown(callback: ClientEventsV2.GenericEventCallback<ClientEventsV1["keydown"]>): ScriptEventHandler;
    onWebViewEvent(callback: ClientEventsV2.GenericEventCallback<ClientEventsV2.WebViewEventParameters>): ScriptEventHandler;
    onceWebViewEvent(callback: ClientEventsV2.GenericEventCallback<ClientEventsV2.WebViewEventParameters>): ScriptEventHandler;
    onWebSocketEvent(callback: ClientEventsV2.GenericEventCallback<ClientEventsV2.WebSocketEventParameters>): ScriptEventHandler;
    onceWebSocketEvent(callback: ClientEventsV2.GenericEventCallback<ClientEventsV2.WebSocketEventParameters>): ScriptEventHandler;
    onAudioEvent(callback: ClientEventsV2.GenericEventCallback<ClientEventsV2.AudioEventParameters>): ScriptEventHandler;
    onceAudioEvent(callback: ClientEventsV2.GenericEventCallback<ClientEventsV2.AudioEventParameters>): ScriptEventHandler;
    onRmluiEvent(callback: ClientEventsV2.GenericEventCallback<ClientEventsV2.RmluiEventParameters>): ScriptEventHandler;
    onceRmluiEvent(callback: ClientEventsV2.GenericEventCallback<ClientEventsV2.RmluiEventParameters>): ScriptEventHandler;
    onWindowFocusChange(callback: ClientEventsV2.GenericEventCallback<ClientEventsV2.WindowFocusChangeEventParameters>): ScriptEventHandler;
    onWindowFocusChange(callback: ClientEventsV2.GenericEventCallback<ClientEventsV1["windowFocusChange"]>): ScriptEventHandler;
    onceWindowFocusChange(callback: ClientEventsV2.GenericEventCallback<ClientEventsV2.WindowFocusChangeEventParameters>): ScriptEventHandler;
    onceWindowFocusChange(callback: ClientEventsV2.GenericEventCallback<ClientEventsV1["windowFocusChange"]>): ScriptEventHandler;
    onWindowResolutionChange(callback: ClientEventsV2.GenericEventCallback<ClientEventsV2.WindowResolutionChangeEventParameters>): ScriptEventHandler;
    onWindowResolutionChange(callback: ClientEventsV2.GenericEventCallback<ClientEventsV1["windowResolutionChange"]>): ScriptEventHandler;
    onceWindowResolutionChange(callback: ClientEventsV2.GenericEventCallback<ClientEventsV2.WindowResolutionChangeEventParameters>): ScriptEventHandler;
    onceWindowResolutionChange(callback: ClientEventsV2.GenericEventCallback<ClientEventsV1["windowResolutionChange"]>): ScriptEventHandler;
    onConnectionComplete(callback: ClientEventsV2.GenericEventCallback): ScriptEventHandler;
    onConnectionComplete(callback: ClientEventsV2.GenericEventCallback<ClientEventsV1["connectionComplete"]>): ScriptEventHandler;
    onceConnectionComplete(callback: ClientEventsV2.GenericEventCallback): ScriptEventHandler;
    onceConnectionComplete(callback: ClientEventsV2.GenericEventCallback<ClientEventsV1["connectionComplete"]>): ScriptEventHandler;
    onDisconnect(callback: ClientEventsV2.GenericEventCallback): ScriptEventHandler;
    onDisconnect(callback: ClientEventsV2.GenericEventCallback<ClientEventsV1["disconnect"]>): ScriptEventHandler;
    onceDisconnect(callback: ClientEventsV2.GenericEventCallback): ScriptEventHandler;
    onceDisconnect(callback: ClientEventsV2.GenericEventCallback<ClientEventsV1["disconnect"]>): ScriptEventHandler;
    onSpawned(callback: ClientEventsV2.GenericEventCallback): ScriptEventHandler;
    onSpawned(callback: ClientEventsV2.GenericEventCallback<ClientEventsV1["spawned"]>): ScriptEventHandler;
    onceSpawned(callback: ClientEventsV2.GenericEventCallback): ScriptEventHandler;
    onceSpawned(callback: ClientEventsV2.GenericEventCallback<ClientEventsV1["spawned"]>): ScriptEventHandler;
    onGameEntityCreate(callback: ClientEventsV2.GenericEventCallback<ClientEventsV2.GameEntityCreateEventParameters>): ScriptEventHandler;
    onGameEntityCreate(callback: ClientEventsV2.GenericEventCallback<ClientEventsV1["gameEntityCreate"]>): ScriptEventHandler;
    onceGameEntityCreate(callback: ClientEventsV2.GenericEventCallback<ClientEventsV2.GameEntityCreateEventParameters>): ScriptEventHandler;
    onceGameEntityCreate(callback: ClientEventsV2.GenericEventCallback<ClientEventsV1["gameEntityCreate"]>): ScriptEventHandler;
    onGameEntityDestroy(callback: ClientEventsV2.GenericEventCallback<ClientEventsV2.GameEntityDestroyEventParameters>): ScriptEventHandler;
    onGameEntityDestroy(callback: ClientEventsV2.GenericEventCallback<ClientEventsV1["gameEntityDestroy"]>): ScriptEventHandler;
    onceGameEntityDestroy(callback: ClientEventsV2.GenericEventCallback<ClientEventsV2.GameEntityDestroyEventParameters>): ScriptEventHandler;
    onceGameEntityDestroy(callback: ClientEventsV2.GenericEventCallback<ClientEventsV1["gameEntityDestroy"]>): ScriptEventHandler;
    onEntityHitEntity(callback: ClientEventsV2.GenericEventCallback<ClientEventsV2.EntityHitEntityEventParameters>): ScriptEventHandler;
    onEntityHitEntity(callback: ClientEventsV2.GenericEventCallback<ClientEventsV1["entityHitEntity"]>): ScriptEventHandler;
    onceEntityHitEntity(callback: ClientEventsV2.GenericEventCallback<ClientEventsV2.EntityHitEntityEventParameters>): ScriptEventHandler;
    onceEntityHitEntity(callback: ClientEventsV2.GenericEventCallback<ClientEventsV1["entityHitEntity"]>): ScriptEventHandler;
    onTaskChange(callback: ClientEventsV2.GenericEventCallback<ClientEventsV2.TaskChangeEventParameters>): ScriptEventHandler;
    onTaskChange(callback: ClientEventsV2.GenericEventCallback<ClientEventsV1["taskChange"]>): ScriptEventHandler;
    onceTaskChange(callback: ClientEventsV2.GenericEventCallback<ClientEventsV2.TaskChangeEventParameters>): ScriptEventHandler;
    onceTaskChange(callback: ClientEventsV2.GenericEventCallback<ClientEventsV1["taskChange"]>): ScriptEventHandler;
    onPlayerWeaponShoot(callback: ClientEventsV2.GenericEventCallback<ClientEventsV2.PlayerWeaponShootEventParameters>): ScriptEventHandler;
    onPlayerWeaponShoot(callback: ClientEventsV2.GenericEventCallback<ClientEventsV1["playerWeaponShoot"]>): ScriptEventHandler;
    oncePlayerWeaponShoot(callback: ClientEventsV2.GenericEventCallback<ClientEventsV2.PlayerWeaponShootEventParameters>): ScriptEventHandler;
    oncePlayerWeaponShoot(callback: ClientEventsV2.GenericEventCallback<ClientEventsV1["playerWeaponShoot"]>): ScriptEventHandler;
    onPlayerBulletHit(callback: ClientEventsV2.GenericEventCallback<ClientEventsV2.PlayerBulletHitEventParameters>): ScriptEventHandler;
    onPlayerBulletHit(callback: ClientEventsV2.GenericEventCallback<ClientEventsV1["playerBulletHit"]>): ScriptEventHandler;
    oncePlayerBulletHit(callback: ClientEventsV2.GenericEventCallback<ClientEventsV2.PlayerBulletHitEventParameters>): ScriptEventHandler;
    oncePlayerBulletHit(callback: ClientEventsV2.GenericEventCallback<ClientEventsV1["playerBulletHit"]>): ScriptEventHandler;
    onPlayerWeaponChange(callback: ClientEventsV2.GenericEventCallback<ClientEventsV2.PlayerWeaponChangeEventParameters>): ScriptEventHandler;
    onPlayerWeaponChange(callback: ClientEventsV2.GenericEventCallback<ClientEventsV1["playerWeaponChange"]>): ScriptEventHandler;
    oncePlayerWeaponChange(callback: ClientEventsV2.GenericEventCallback<ClientEventsV2.PlayerWeaponChangeEventParameters>): ScriptEventHandler;
    oncePlayerWeaponChange(callback: ClientEventsV2.GenericEventCallback<ClientEventsV1["playerWeaponChange"]>): ScriptEventHandler;
    onPlayerStartVehicleEnter<T extends Player>(callback: ClientEventsV2.GenericPlayerEventCallback<ClientEventsV2.PlayerStartVehicleEnterEventParameters, T>): ScriptEventHandler;
    onPlayerStartVehicleEnter(callback: ClientEventsV2.GenericEventCallback<ClientEventsV1["startEnteringVehicle"]>): ScriptEventHandler;
    oncePlayerStartVehicleEnter<T extends Player>(callback: ClientEventsV2.GenericPlayerEventCallback<ClientEventsV2.PlayerStartVehicleEnterEventParameters, T>): ScriptEventHandler;
    oncePlayerStartVehicleEnter(callback: ClientEventsV2.GenericEventCallback<ClientEventsV1["startEnteringVehicle"]>): ScriptEventHandler;
    onPlayerStartVehicleLeave<T extends Player>(callback: ClientEventsV2.GenericPlayerEventCallback<ClientEventsV2.PlayerStartVehicleLeaveEventParameters, T>): ScriptEventHandler;
    onPlayerStartVehicleLeave(callback: ClientEventsV2.GenericEventCallback<ClientEventsV1["startLeavingVehicle"]>): ScriptEventHandler;
    oncePlayerStartVehicleLeave<T extends Player>(callback: ClientEventsV2.GenericPlayerEventCallback<ClientEventsV2.PlayerStartVehicleLeaveEventParameters, T>): ScriptEventHandler;
    oncePlayerStartVehicleLeave(callback: ClientEventsV2.GenericEventCallback<ClientEventsV1["startLeavingVehicle"]>): ScriptEventHandler;
    onPlayerVehicleEntered<T extends Player>(callback: ClientEventsV2.GenericPlayerEventCallback<ClientEventsV2.PlayerVehicleEnterEventParameters, T>): ScriptEventHandler;
    onPlayerVehicleEntered(callback: ClientEventsV2.GenericEventCallback<ClientEventsV1["enteredVehicle"]>): ScriptEventHandler;
    oncePlayerVehicleEntered<T extends Player>(callback: ClientEventsV2.GenericPlayerEventCallback<ClientEventsV2.PlayerVehicleEnterEventParameters, T>): ScriptEventHandler;
    oncePlayerVehicleEntered(callback: ClientEventsV2.GenericEventCallback<ClientEventsV1["enteredVehicle"]>): ScriptEventHandler;
    onPlayerVehicleLeft<T extends Player>(callback: ClientEventsV2.GenericPlayerEventCallback<ClientEventsV2.PlayerVehicleLeaveEventParameters, T>): ScriptEventHandler;
    onPlayerVehicleLeft(callback: ClientEventsV2.GenericEventCallback<ClientEventsV1["leftVehicle"]>): ScriptEventHandler;
    oncePlayerVehicleLeft<T extends Player>(callback: ClientEventsV2.GenericPlayerEventCallback<ClientEventsV2.PlayerVehicleLeaveEventParameters, T>): ScriptEventHandler;
    oncePlayerVehicleLeft(callback: ClientEventsV2.GenericEventCallback<ClientEventsV1["leftVehicle"]>): ScriptEventHandler;
    onPlayerVehicleSeatChange<T extends Player>(callback: ClientEventsV2.GenericPlayerEventCallback<ClientEventsV2.PlayerChangeVehicleSeatEventParameters, T>): ScriptEventHandler;
    onPlayerVehicleSeatChange(callback: ClientEventsV2.GenericEventCallback<ClientEventsV1["changedVehicleSeat"]>): ScriptEventHandler;
    oncePlayerVehicleSeatChange<T extends Player>(callback: ClientEventsV2.GenericPlayerEventCallback<ClientEventsV2.PlayerChangeVehicleSeatEventParameters, T>): ScriptEventHandler;
    oncePlayerVehicleSeatChange(callback: ClientEventsV2.GenericEventCallback<ClientEventsV1["changedVehicleSeat"]>): ScriptEventHandler;
    onVoiceConnectionUpdate(callback: ClientEventsV2.GenericEventCallback<ClientEventsV2.VoiceConnectionEventParameters>): ScriptEventHandler;
    onceVoiceConnectionUpdate(callback: ClientEventsV2.GenericEventCallback<ClientEventsV2.VoiceConnectionEventParameters>): ScriptEventHandler;
    onPlayerStartTalking<T extends Player>(callback: ClientEventsV2.GenericPlayerEventCallback<{}, T>): ScriptEventHandler;
    onPlayerStartTalking(callback: ClientEventsV2.GenericEventCallback<ClientEventsV1["playerStartTalking"]>): ScriptEventHandler;
    oncePlayerStartTalking<T extends Player>(callback: ClientEventsV2.GenericPlayerEventCallback<{}, T>): ScriptEventHandler;
    oncePlayerStartTalking(callback: ClientEventsV2.GenericEventCallback<ClientEventsV1["playerStartTalking"]>): ScriptEventHandler;
    onPlayerStopTalking<T extends Player>(callback: ClientEventsV2.GenericPlayerEventCallback<{}, T>): ScriptEventHandler;
    onPlayerStopTalking(callback: ClientEventsV2.GenericEventCallback<ClientEventsV1["playerStopTalking"]>): ScriptEventHandler;
    oncePlayerStopTalking<T extends Player>(callback: ClientEventsV2.GenericPlayerEventCallback<{}, T>): ScriptEventHandler;
    oncePlayerStopTalking(callback: ClientEventsV2.GenericEventCallback<ClientEventsV1["playerStopTalking"]>): ScriptEventHandler;
    onWorldObjectPositionChange(callback: ClientEventsV2.GenericEventCallback<ClientEventsV2.WorldObjectPositionChangeEventParameters>): ScriptEventHandler;
    onWorldObjectPositionChange(callback: ClientEventsV2.GenericEventCallback<ClientEventsV1["worldObjectPositionChange"]>): ScriptEventHandler;
    onceWorldObjectPositionChange(callback: ClientEventsV2.GenericEventCallback<ClientEventsV2.WorldObjectPositionChangeEventParameters>): ScriptEventHandler;
    onceWorldObjectPositionChange(callback: ClientEventsV2.GenericEventCallback<ClientEventsV1["worldObjectPositionChange"]>): ScriptEventHandler;
    onWorldObjectStreamIn(callback: ClientEventsV2.GenericEventCallback<ClientEventsV2.WorldObjectStreamInEventParameters>): ScriptEventHandler;
    onWorldObjectStreamIn(callback: ClientEventsV2.GenericEventCallback<ClientEventsV1["worldObjectStreamIn"]>): ScriptEventHandler;
    onceWorldObjectStreamIn(callback: ClientEventsV2.GenericEventCallback<ClientEventsV2.WorldObjectStreamInEventParameters>): ScriptEventHandler;
    onceWorldObjectStreamIn(callback: ClientEventsV2.GenericEventCallback<ClientEventsV1["worldObjectStreamIn"]>): ScriptEventHandler;
    onWorldObjectStreamOut(callback: ClientEventsV2.GenericEventCallback<ClientEventsV2.WorldObjectStreamOutEventParameters>): ScriptEventHandler;
    onWorldObjectStreamOut(callback: ClientEventsV2.GenericEventCallback<ClientEventsV1["worldObjectStreamOut"]>): ScriptEventHandler;
    onceWorldObjectStreamOut(callback: ClientEventsV2.GenericEventCallback<ClientEventsV2.WorldObjectStreamOutEventParameters>): ScriptEventHandler;
    onceWorldObjectStreamOut(callback: ClientEventsV2.GenericEventCallback<ClientEventsV1["worldObjectStreamOut"]>): ScriptEventHandler;
    onEvent(callback: ClientEventsV2.GenericEventCallback<SharedEvents.GenericOnEventParameters>): ScriptEventHandler;
    onBaseObjectCreate(callback: ClientEventsV2.GenericEventCallback<ClientEventsV2.BaseObjectCreateEventParameters>): ScriptEventHandler;
    onBaseObjectCreate(callback: ClientEventsV2.GenericEventCallback<ClientEventsV1["baseObjectCreate"]>): ScriptEventHandler;
    onBaseObjectRemove(callback: ClientEventsV2.GenericEventCallback<ClientEventsV2.BaseObjectRemoveEventParameters>): ScriptEventHandler;
    onBaseObjectRemove(callback: ClientEventsV2.GenericEventCallback<ClientEventsV1["baseObjectRemove"]>): ScriptEventHandler;
    onNetOwnerChange(callback: ClientEventsV2.GenericEventCallback<ClientEventsV2.NetOwnerChangeEventParameters>): ScriptEventHandler;
    onNetOwnerChange(callback: ClientEventsV2.GenericEventCallback<ClientEventsV1["netOwnerChange"]>): ScriptEventHandler;
    onWeaponDamage(callback: ClientEventsV2.GenericEventCallback<ClientEventsV2.WeaponDamageEventParameters>): ScriptEventHandler;
    onWeaponDamage(callback: ClientEventsV2.GenericEventCallback<ClientEventsV1["weaponDamage"]>): ScriptEventHandler;
    onMetaChange(callback: ClientEventsV2.GenericEventCallback<ClientEventsV2.MetaChangeEventParameters>): ScriptEventHandler;
    onMetaChange(callback: ClientEventsV2.GenericEventCallback<ClientEventsV1["metaChange"]>): ScriptEventHandler;
    onLocalMetaChange(callback: ClientEventsV2.GenericPlayerEventCallback<ClientEventsV2.LocalMetaChangeEventParameters>): ScriptEventHandler;
    onLocalMetaChange(callback: ClientEventsV2.GenericEventCallback<ClientEventsV1["localMetaChange"]>): ScriptEventHandler;
    onSyncedMetaChange(callback: ClientEventsV2.GenericEventCallback<ClientEventsV2.SyncedMetaChangeEventParameters>): ScriptEventHandler;
    onSyncedMetaChange(callback: ClientEventsV2.GenericEventCallback<ClientEventsV1["syncedMetaChange"]>): ScriptEventHandler;
    onStreamSyncedMetaChange(callback: ClientEventsV2.GenericEventCallback<ClientEventsV2.StreamSyncedMetaChangeEventParameters>): ScriptEventHandler;
    onStreamSyncedMetaChange(callback: ClientEventsV2.GenericEventCallback<ClientEventsV1["streamSyncedMetaChange"]>): ScriptEventHandler;
    onGlobalMetaChange(callback: ClientEventsV2.GenericEventCallback<ClientEventsV2.GlobalMetaChangeEventParameters>): ScriptEventHandler;
    onGlobalMetaChange(callback: ClientEventsV2.GenericEventCallback<ClientEventsV1["globalMetaChange"]>): ScriptEventHandler;
    onGlobalSyncedMetaChange(callback: ClientEventsV2.GenericEventCallback<ClientEventsV2.GlobalSyncedMetaChangeEventParameters>): ScriptEventHandler;
    onGlobalSyncedMetaChange(callback: ClientEventsV2.GenericEventCallback<ClientEventsV1["globalSyncedMetaChange"]>): ScriptEventHandler;
    onEntityColShapeEnter(callback: ClientEventsV2.GenericEventCallback<ClientEventsV2.EntityColShapeEnterEventParameters>): ScriptEventHandler;
    onEntityColShapeEnter(callback: ClientEventsV2.GenericEventCallback<ClientEventsV1["entityLeaveColshape"]>): ScriptEventHandler;
    onEntityColShapeLeave(callback: ClientEventsV2.GenericEventCallback<ClientEventsV2.EntityColShapeLeaveEventParameters>): ScriptEventHandler;
    onEntityColShapeLeave(callback: ClientEventsV2.GenericEventCallback<ClientEventsV1["entityLeaveColshape"]>): ScriptEventHandler;
    onEntityCheckpointEnter(callback: ClientEventsV2.GenericEventCallback<ClientEventsV2.EntityCheckpointEnterEventParameters>): ScriptEventHandler;
    onEntityCheckpointLeave(callback: ClientEventsV2.GenericEventCallback<ClientEventsV2.EntityCheckpointLeaveEventParameters>): ScriptEventHandler;
    onColShapeEvent(callback: ClientEventsV2.GenericEventCallback<ClientEventsV2.ColShapeEventParameters>): ScriptEventHandler;
    onConsoleCommand(callback: ClientEventsV2.GenericEventCallback<ClientEventsV2.ConsoleCommandEventParameters>): ScriptEventHandler;
    onConsoleCommand(callback: ClientEventsV2.GenericEventCallback<ClientEventsV1["consoleCommand"]>): ScriptEventHandler;
    onError(callback: ClientEventsV2.GenericEventCallback<ClientEventsV2.ErrorEventParameters>): ScriptEventHandler;
    onLocalScriptEvent(callback: ClientEventsV2.GenericEventCallback<ClientEventsV2.LocalScriptEventParameters>): ScriptEventHandler;
    onRemoteScriptEvent(callback: ClientEventsV2.GenericEventCallback<ClientEventsV2.RemoteScriptEventParameters>): ScriptEventHandler;
    onResourceStart(callback: ClientEventsV2.GenericEventCallback<ClientEventsV2.ResourceStartEventParameters>): ScriptEventHandler;
    onResourceStart(callback: ClientEventsV2.GenericEventCallback<ClientEventsV1["resourceStart"]>): ScriptEventHandler;
    onResourceStop(callback: ClientEventsV2.GenericEventCallback<ClientEventsV2.ResourceStopEventParameters>): ScriptEventHandler;
    onResourceStop(callback: ClientEventsV2.GenericEventCallback<ClientEventsV1["resourceStop"]>): ScriptEventHandler;
    onResourceError(callback: ClientEventsV2.GenericEventCallback<ClientEventsV2.ResourceErrorEventParameters>): ScriptEventHandler;
    onResourceError(callback: ClientEventsV2.GenericEventCallback<ClientEventsV1["resourceError"]>): ScriptEventHandler;
}
