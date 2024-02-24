import * as altShared from '@altv/shared';
import * as altClient from '@altv/client';

export interface EventService {
    on<E extends keyof altClient.Events.CustomClientEvent>(
        eventName: E,
        callback: (body: Parameters<altClient.Events.CustomClientEvent[E]>[0]) => ReturnType<altClient.Events.CustomClientEvent[E]>,
    ): altShared.Events.ScriptEventHandler;
    on<E extends string>(
        eventName: Exclude<E, keyof altClient.Events.CustomClientEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): altShared.Events.ScriptEventHandler;
    once<E extends keyof altClient.Events.CustomClientEvent>(
        eventName: E,
        callback: (body: Parameters<altClient.Events.CustomClientEvent[E]>[0]) => ReturnType<altClient.Events.CustomClientEvent[E]>,
    ): altShared.Events.ScriptEventHandler;
    once<E extends string>(
        eventName: Exclude<E, keyof altClient.Events.CustomClientEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): altShared.Events.ScriptEventHandler;
    emit<E extends keyof altClient.Events.CustomClientEvent>(eventName: E, body?: altClient.Events.CustomClientEvent[E]): void;
    emit<E extends string>(eventName: Exclude<E, keyof altClient.Events.CustomClientEvent>, body?: unknown): void;
    onServer<E extends keyof altShared.Events.CustomServerToPlayerEvent>(
        eventName: E,
        callback: (
            body: Parameters<altShared.Events.CustomServerToPlayerEvent[E]>[0],
        ) => ReturnType<altShared.Events.CustomServerToPlayerEvent[E]>,
    ): altShared.Events.ScriptEventHandler;
    onServer<E extends string>(
        eventName: Exclude<E, keyof altShared.Events.CustomServerToPlayerEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): altShared.Events.ScriptEventHandler;
    onceServer<E extends keyof altShared.Events.CustomServerToPlayerEvent>(
        eventName: E,
        callback: (
            body: Parameters<altShared.Events.CustomServerToPlayerEvent[E]>[0],
        ) => ReturnType<altShared.Events.CustomServerToPlayerEvent[E]>,
    ): altShared.Events.ScriptEventHandler;
    onceServer<E extends string>(
        eventName: Exclude<E, keyof altShared.Events.CustomServerToPlayerEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): altShared.Events.ScriptEventHandler;
    emitServer<E extends keyof altShared.Events.CustomPlayerToServerEvent>(
        eventName: E,
        body: Parameters<altShared.Events.CustomPlayerToServerEvent[E]>[0],
    ): void;
    emitServer<E extends string>(eventName: Exclude<E, keyof altShared.Events.CustomPlayerToServerEvent>, body?: unknown): void;
    onWebView<E extends keyof altShared.Events.CustomWebViewToClientEvent>(
        id: string | number,
        eventName: E,
        callback: (
            body: Parameters<altShared.Events.CustomWebViewToClientEvent[E]>[0],
        ) => ReturnType<altShared.Events.CustomWebViewToClientEvent[E]>,
    ): altShared.Events.ScriptEventHandler;
    onWebView<E extends string>(
        id: string | number,
        eventName: Exclude<E, keyof altShared.Events.CustomWebViewToClientEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): altShared.Events.ScriptEventHandler;
    onceWebView<E extends keyof altShared.Events.CustomWebViewToClientEvent>(
        id: string | number,
        eventName: E,
        callback: (
            body: Parameters<altShared.Events.CustomWebViewToClientEvent[E]>[0],
        ) => ReturnType<altShared.Events.CustomWebViewToClientEvent[E]>,
    ): altShared.Events.ScriptEventHandler;
    onceWebView<E extends string>(
        id: string | number,
        eventName: Exclude<E, keyof altShared.Events.CustomWebViewToClientEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): altShared.Events.ScriptEventHandler;
    emitWebView<E extends keyof altShared.Events.CustomClientToWebViewEvent>(
        id: string | number,
        eventName: E,
        body: Parameters<altShared.Events.CustomClientToWebViewEvent[E]>[0],
    ): void;
    emitWebView<E extends string>(
        id: string | number,
        eventName: Exclude<E, keyof altShared.Events.CustomClientToWebViewEvent>,
        body?: unknown,
    ): void;
    onScriptRPC(callback: altClient.Events.GenericEventCallback<altClient.Events.ScriptRPCEventParameters>): altShared.Events.EventHandler;
    onceScriptRPC(
        callback: altClient.Events.GenericEventCallback<altClient.Events.ScriptRPCEventParameters>,
    ): altShared.Events.EventHandler;
    onScriptRPCAnswer(
        callback: altClient.Events.GenericEventCallback<altClient.Events.ScriptRPCAnswerEventParameters>,
    ): altShared.Events.EventHandler;
    onceScriptRPCAnswer(
        callback: altClient.Events.GenericEventCallback<altClient.Events.ScriptRPCAnswerEventParameters>,
    ): altShared.Events.EventHandler;
    onKeyboardEvent(
        callback: altClient.Events.GenericEventCallback<altClient.Events.KeyboardEventParameters>,
    ): altShared.Events.EventHandler;
    onceKeyboardEvent(
        callback: altClient.Events.GenericEventCallback<altClient.Events.KeyboardEventParameters>,
    ): altShared.Events.EventHandler;
    onKeyUp(callback: altClient.Events.GenericEventCallback<altClient.Events.KeyUpDownEventParameters>): altShared.Events.EventHandler;
    onceKeyUp(callback: altClient.Events.GenericEventCallback<altClient.Events.KeyUpDownEventParameters>): altShared.Events.EventHandler;
    onKeyDown(callback: altClient.Events.GenericEventCallback<altClient.Events.KeyUpDownEventParameters>): altShared.Events.EventHandler;
    onceKeyDown(callback: altClient.Events.GenericEventCallback<altClient.Events.KeyUpDownEventParameters>): altShared.Events.EventHandler;
    onWebViewEvent(callback: altClient.Events.GenericEventCallback<altClient.Events.WebViewEventParameters>): altShared.Events.EventHandler;
    onceWebViewEvent(
        callback: altClient.Events.GenericEventCallback<altClient.Events.WebViewEventParameters>,
    ): altShared.Events.EventHandler;
    onWebSocketEvent(
        callback: altClient.Events.GenericEventCallback<altClient.Events.WebSocketEventParameters>,
    ): altShared.Events.EventHandler;
    onceWebSocketEvent(
        callback: altClient.Events.GenericEventCallback<altClient.Events.WebSocketEventParameters>,
    ): altShared.Events.EventHandler;
    onAudioEvent(callback: altClient.Events.GenericEventCallback<altClient.Events.AudioEventParameters>): altShared.Events.EventHandler;
    onceAudioEvent(callback: altClient.Events.GenericEventCallback<altClient.Events.AudioEventParameters>): altShared.Events.EventHandler;
    onRmluiEvent(callback: altClient.Events.GenericEventCallback<altClient.Events.RmluiEventParameters>): altShared.Events.EventHandler;
    onceRmluiEvent(callback: altClient.Events.GenericEventCallback<altClient.Events.RmluiEventParameters>): altShared.Events.EventHandler;
    onWindowFocusChange(
        callback: altClient.Events.GenericEventCallback<altClient.Events.WindowFocusChangeEventParameters>,
    ): altShared.Events.EventHandler;
    onceWindowFocusChange(
        callback: altClient.Events.GenericEventCallback<altClient.Events.WindowFocusChangeEventParameters>,
    ): altShared.Events.EventHandler;
    onWindowResolutionChange(
        callback: altClient.Events.GenericEventCallback<altClient.Events.WindowResolutionChangeEventParameters>,
    ): altShared.Events.EventHandler;
    onceWindowResolutionChange(
        callback: altClient.Events.GenericEventCallback<altClient.Events.WindowResolutionChangeEventParameters>,
    ): altShared.Events.EventHandler;
    onConnectionComplete(callback: altClient.Events.GenericEventCallback): altShared.Events.EventHandler;
    onceConnectionComplete(callback: altClient.Events.GenericEventCallback): altShared.Events.EventHandler;
    onDisconnect(callback: altClient.Events.GenericEventCallback): altShared.Events.EventHandler;
    onceDisconnect(callback: altClient.Events.GenericEventCallback): altShared.Events.EventHandler;
    onSpawned(callback: altClient.Events.GenericEventCallback): altShared.Events.EventHandler;
    onceSpawned(callback: altClient.Events.GenericEventCallback): altShared.Events.EventHandler;
    onGameEntityCreate(
        callback: altClient.Events.GenericEventCallback<altClient.Events.GameEntityCreateEventParameters>,
    ): altShared.Events.EventHandler;
    onceGameEntityCreate(
        callback: altClient.Events.GenericEventCallback<altClient.Events.GameEntityCreateEventParameters>,
    ): altShared.Events.EventHandler;
    onGameEntityDestroy(
        callback: altClient.Events.GenericEventCallback<altClient.Events.GameEntityDestroyEventParameters>,
    ): altShared.Events.EventHandler;
    onceGameEntityDestroy(
        callback: altClient.Events.GenericEventCallback<altClient.Events.GameEntityDestroyEventParameters>,
    ): altShared.Events.EventHandler;
    onEntityHitEntity(
        callback: altClient.Events.GenericEventCallback<altClient.Events.EntityHitEntityEventParameters>,
    ): altShared.Events.EventHandler;
    onceEntityHitEntity(
        callback: altClient.Events.GenericEventCallback<altClient.Events.EntityHitEntityEventParameters>,
    ): altShared.Events.EventHandler;
    onTaskChange(
        callback: altClient.Events.GenericEventCallback<altClient.Events.TaskChangeEventParameters>,
    ): altShared.Events.EventHandler;
    onceTaskChange(
        callback: altClient.Events.GenericEventCallback<altClient.Events.TaskChangeEventParameters>,
    ): altShared.Events.EventHandler;
    onPlayerWeaponShoot(
        callback: altClient.Events.GenericEventCallback<altClient.Events.PlayerWeaponShootEventParameters>,
    ): altShared.Events.EventHandler;
    oncePlayerWeaponShoot(
        callback: altClient.Events.GenericEventCallback<altClient.Events.PlayerWeaponShootEventParameters>,
    ): altShared.Events.EventHandler;
    onPlayerBulletHit(
        callback: altClient.Events.GenericEventCallback<altClient.Events.PlayerBulletHitEventParameters>,
    ): altShared.Events.EventHandler;
    oncePlayerBulletHit(
        callback: altClient.Events.GenericEventCallback<altClient.Events.PlayerBulletHitEventParameters>,
    ): altShared.Events.EventHandler;
    onPlayerWeaponChange(
        callback: altClient.Events.GenericEventCallback<altClient.Events.PlayerWeaponChangeEventParameters>,
    ): altShared.Events.EventHandler;
    oncePlayerWeaponChange(
        callback: altClient.Events.GenericEventCallback<altClient.Events.PlayerWeaponChangeEventParameters>,
    ): altShared.Events.EventHandler;
    onPlayerStartVehicleEnter<T extends altClient.Player>(
        callback: altClient.Events.GenericPlayerEventCallback<altClient.Events.PlayerStartVehicleEnterEventParameters, T>,
    ): altShared.Events.EventHandler;
    oncePlayerStartVehicleEnter<T extends altClient.Player>(
        callback: altClient.Events.GenericPlayerEventCallback<altClient.Events.PlayerStartVehicleEnterEventParameters, T>,
    ): altShared.Events.EventHandler;
    onPlayerStartVehicleLeave<T extends altClient.Player>(
        callback: altClient.Events.GenericPlayerEventCallback<altClient.Events.PlayerStartVehicleLeaveEventParameters, T>,
    ): altShared.Events.EventHandler;
    oncePlayerStartVehicleLeave<T extends altClient.Player>(
        callback: altClient.Events.GenericPlayerEventCallback<altClient.Events.PlayerStartVehicleLeaveEventParameters, T>,
    ): altShared.Events.EventHandler;
    onPlayerVehicleEntered<T extends altClient.Player>(
        callback: altClient.Events.GenericPlayerEventCallback<altClient.Events.PlayerVehicleEnterEventParameters, T>,
    ): altShared.Events.EventHandler;
    oncePlayerVehicleEntered<T extends altClient.Player>(
        callback: altClient.Events.GenericPlayerEventCallback<altClient.Events.PlayerVehicleEnterEventParameters, T>,
    ): altShared.Events.EventHandler;
    onPlayerVehicleLeft<T extends altClient.Player>(
        callback: altClient.Events.GenericPlayerEventCallback<altClient.Events.PlayerVehicleLeaveEventParameters, T>,
    ): altShared.Events.EventHandler;
    oncePlayerVehicleLeft<T extends altClient.Player>(
        callback: altClient.Events.GenericPlayerEventCallback<altClient.Events.PlayerVehicleLeaveEventParameters, T>,
    ): altShared.Events.EventHandler;
    onPlayerVehicleSeatChange<T extends altClient.Player>(
        callback: altClient.Events.GenericPlayerEventCallback<altClient.Events.PlayerChangeVehicleSeatEventParameters, T>,
    ): altShared.Events.EventHandler;
    oncePlayerVehicleSeatChange<T extends altClient.Player>(
        callback: altClient.Events.GenericPlayerEventCallback<altClient.Events.PlayerChangeVehicleSeatEventParameters, T>,
    ): altShared.Events.EventHandler;
    onVoiceConnectionUpdate(
        callback: altClient.Events.GenericEventCallback<altClient.Events.VoiceConnectionEventParameters>,
    ): altShared.Events.EventHandler;
    onceVoiceConnectionUpdate(
        callback: altClient.Events.GenericEventCallback<altClient.Events.VoiceConnectionEventParameters>,
    ): altShared.Events.EventHandler;
    onPlayerStartTalking<T extends altClient.Player>(
        callback: altClient.Events.GenericPlayerEventCallback<{}, T>,
    ): altShared.Events.EventHandler;
    oncePlayerStartTalking<T extends altClient.Player>(
        callback: altClient.Events.GenericPlayerEventCallback<{}, T>,
    ): altShared.Events.EventHandler;
    onPlayerStopTalking<T extends altClient.Player>(
        callback: altClient.Events.GenericPlayerEventCallback<{}, T>,
    ): altShared.Events.EventHandler;
    oncePlayerStopTalking<T extends altClient.Player>(
        callback: altClient.Events.GenericPlayerEventCallback<{}, T>,
    ): altShared.Events.EventHandler;
    onPedDeath(callback: altClient.Events.GenericEventCallback<altClient.Events.PedDeathEventParameters>): altShared.Events.EventHandler;
    oncePedDeath(callback: altClient.Events.GenericEventCallback<altClient.Events.PedDeathEventParameters>): altShared.Events.EventHandler;
    onPedDamage(callback: altClient.Events.GenericEventCallback<altClient.Events.PedDamageEventParameters>): altShared.Events.EventHandler;
    onWorldObjectPositionChange(
        callback: altClient.Events.GenericEventCallback<altClient.Events.WorldObjectPositionChangeEventParameters>,
    ): altShared.Events.EventHandler;
    onceWorldObjectPositionChange(
        callback: altClient.Events.GenericEventCallback<altClient.Events.WorldObjectPositionChangeEventParameters>,
    ): altShared.Events.EventHandler;
    onWorldObjectStreamIn(
        callback: altClient.Events.GenericEventCallback<altClient.Events.WorldObjectStreamInEventParameters>,
    ): altShared.Events.EventHandler;
    onceWorldObjectStreamIn(
        callback: altClient.Events.GenericEventCallback<altClient.Events.WorldObjectStreamInEventParameters>,
    ): altShared.Events.EventHandler;
    onWorldObjectStreamOut(
        callback: altClient.Events.GenericEventCallback<altClient.Events.WorldObjectStreamOutEventParameters>,
    ): altShared.Events.EventHandler;
    onceWorldObjectStreamOut(
        callback: altClient.Events.GenericEventCallback<altClient.Events.WorldObjectStreamOutEventParameters>,
    ): altShared.Events.EventHandler;
    onEvent(
        callback: altClient.Events.GenericEventCallback<altShared.Events.GenericOnEventParameters>,
    ): altShared.Events.GenericEventHandler;
    onBaseObjectCreate(
        callback: altClient.Events.GenericEventCallback<altClient.Events.BaseObjectCreateEventParameters>,
    ): altShared.Events.EventHandler;
    onBaseObjectRemove(
        callback: altClient.Events.GenericEventCallback<altClient.Events.BaseObjectRemoveEventParameters>,
    ): altShared.Events.EventHandler;
    onNetOwnerChange(
        callback: altClient.Events.GenericEventCallback<altClient.Events.NetOwnerChangeEventParameters>,
    ): altShared.Events.EventHandler;
    onWeaponDamage(
        callback: altClient.Events.GenericEventCallback<altClient.Events.WeaponDamageEventParameters>,
    ): altShared.Events.EventHandler;
    onMetaChange(
        callback: altClient.Events.GenericEventCallback<altClient.Events.MetaChangeEventParameters>,
    ): altShared.Events.EventHandler;
    onLocalMetaChange(
        callback: altClient.Events.GenericPlayerEventCallback<altClient.Events.LocalMetaChangeEventParameters>,
    ): altShared.Events.EventHandler;
    onSyncedMetaChange(
        callback: altClient.Events.GenericEventCallback<altClient.Events.SyncedMetaChangeEventParameters>,
    ): altShared.Events.EventHandler;
    onStreamSyncedMetaChange(
        callback: altClient.Events.GenericEventCallback<altClient.Events.StreamSyncedMetaChangeEventParameters>,
    ): altShared.Events.EventHandler;
    onGlobalMetaChange(
        callback: altClient.Events.GenericEventCallback<altClient.Events.GlobalMetaChangeEventParameters>,
    ): altShared.Events.EventHandler;
    onGlobalSyncedMetaChange(
        callback: altClient.Events.GenericEventCallback<altClient.Events.GlobalSyncedMetaChangeEventParameters>,
    ): altShared.Events.EventHandler;
    onEntityColShapeEnter(
        callback: altClient.Events.GenericEventCallback<altClient.Events.EntityColShapeEnterEventParameters>,
    ): altShared.Events.EventHandler;
    onEntityColShapeLeave(
        callback: altClient.Events.GenericEventCallback<altClient.Events.EntityColShapeLeaveEventParameters>,
    ): altShared.Events.EventHandler;
    onEntityCheckpointEnter(
        callback: altClient.Events.GenericEventCallback<altClient.Events.EntityCheckpointEnterEventParameters>,
    ): altShared.Events.EventHandler;
    onEntityCheckpointLeave(
        callback: altClient.Events.GenericEventCallback<altClient.Events.EntityCheckpointLeaveEventParameters>,
    ): altShared.Events.EventHandler;
    onColShapeEvent(
        callback: altClient.Events.GenericEventCallback<altClient.Events.ColShapeEventParameters>,
    ): altShared.Events.EventHandler;
    onConsoleCommand(
        callback: altClient.Events.GenericEventCallback<altClient.Events.ConsoleCommandEventParameters>,
    ): altShared.Events.EventHandler;
    onError(callback: altClient.Events.GenericEventCallback<altClient.Events.ErrorEventParameters>): altShared.Events.EventHandler;
    onLocalScriptEvent(
        callback: altClient.Events.GenericEventCallback<altClient.Events.LocalScriptEventParameters>,
    ): altShared.Events.ScriptEventHandler;
    onRemoteScriptEvent(
        callback: altClient.Events.GenericEventCallback<altClient.Events.RemoteScriptEventParameters>,
    ): altShared.Events.ScriptEventHandler;
    onResourceStart(
        callback: altClient.Events.GenericEventCallback<altClient.Events.ResourceStartEventParameters>,
    ): altShared.Events.EventHandler;
    onResourceStop(
        callback: altClient.Events.GenericEventCallback<altClient.Events.ResourceStopEventParameters>,
    ): altShared.Events.EventHandler;
    onResourceError(
        callback: altClient.Events.GenericEventCallback<altClient.Events.ResourceErrorEventParameters>,
    ): altShared.Events.EventHandler;
}
