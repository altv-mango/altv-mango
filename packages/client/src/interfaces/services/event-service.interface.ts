import type { Events as SharedEvents } from '@altv/shared';
import type { Events as ClientEvents, Player } from '@altv/client';
import type { ScriptEventHandler } from '@altv-mango/core/app';

export interface EventService {
    on<E extends keyof ClientEvents.CustomClientEvent>(
        eventName: E,
        callback: (body: Parameters<ClientEvents.CustomClientEvent[E]>[0]) => void | Promise<void>,
    ): ScriptEventHandler;
    on<E extends string>(
        eventName: Exclude<E, keyof ClientEvents.CustomClientEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): ScriptEventHandler;
    once<E extends keyof ClientEvents.CustomClientEvent>(
        eventName: E,
        callback: (body: Parameters<ClientEvents.CustomClientEvent[E]>[0]) => void | Promise<void>,
    ): ScriptEventHandler;
    once<E extends string>(
        eventName: Exclude<E, keyof ClientEvents.CustomClientEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): ScriptEventHandler;
    emit<E extends keyof ClientEvents.CustomClientEvent>(eventName: E, body?: Parameters<ClientEvents.CustomClientEvent[E]>[0]): void;
    emit<E extends string>(eventName: Exclude<E, keyof ClientEvents.CustomClientEvent>, body?: unknown): void;
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
    onScriptRPC(callback: ClientEvents.GenericEventCallback<ClientEvents.ScriptRPCEventParameters>): ScriptEventHandler;
    onceScriptRPC(callback: ClientEvents.GenericEventCallback<ClientEvents.ScriptRPCEventParameters>): ScriptEventHandler;
    onScriptRPCAnswer(callback: ClientEvents.GenericEventCallback<ClientEvents.ScriptRPCAnswerEventParameters>): ScriptEventHandler;
    onceScriptRPCAnswer(
        callback: ClientEvents.GenericEventCallback<ClientEvents.ScriptRPCAnswerEventParameters>,
    ): ScriptEventHandler;
    onKeyboardEvent(callback: ClientEvents.GenericEventCallback<ClientEvents.KeyboardEventParameters>): ScriptEventHandler;
    onceKeyboardEvent(callback: ClientEvents.GenericEventCallback<ClientEvents.KeyboardEventParameters>): ScriptEventHandler;
    onKeyUp(callback: ClientEvents.GenericEventCallback<ClientEvents.KeyUpDownEventParameters>): ScriptEventHandler;
    onceKeyUp(callback: ClientEvents.GenericEventCallback<ClientEvents.KeyUpDownEventParameters>): ScriptEventHandler;
    onKeyDown(callback: ClientEvents.GenericEventCallback<ClientEvents.KeyUpDownEventParameters>): ScriptEventHandler;
    onceKeyDown(callback: ClientEvents.GenericEventCallback<ClientEvents.KeyUpDownEventParameters>): ScriptEventHandler;
    onWebViewEvent(callback: ClientEvents.GenericEventCallback<ClientEvents.WebViewEventParameters>): ScriptEventHandler;
    onceWebViewEvent(callback: ClientEvents.GenericEventCallback<ClientEvents.WebViewEventParameters>): ScriptEventHandler;
    onWebSocketEvent(callback: ClientEvents.GenericEventCallback<ClientEvents.WebSocketEventParameters>): ScriptEventHandler;
    onceWebSocketEvent(callback: ClientEvents.GenericEventCallback<ClientEvents.WebSocketEventParameters>): ScriptEventHandler;
    onAudioEvent(callback: ClientEvents.GenericEventCallback<ClientEvents.AudioEventParameters>): ScriptEventHandler;
    onceAudioEvent(callback: ClientEvents.GenericEventCallback<ClientEvents.AudioEventParameters>): ScriptEventHandler;
    onRmluiEvent(callback: ClientEvents.GenericEventCallback<ClientEvents.RmluiEventParameters>): ScriptEventHandler;
    onceRmluiEvent(callback: ClientEvents.GenericEventCallback<ClientEvents.RmluiEventParameters>): ScriptEventHandler;
    onWindowFocusChange(
        callback: ClientEvents.GenericEventCallback<ClientEvents.WindowFocusChangeEventParameters>,
    ): ScriptEventHandler;
    onceWindowFocusChange(
        callback: ClientEvents.GenericEventCallback<ClientEvents.WindowFocusChangeEventParameters>,
    ): ScriptEventHandler;
    onWindowResolutionChange(
        callback: ClientEvents.GenericEventCallback<ClientEvents.WindowResolutionChangeEventParameters>,
    ): ScriptEventHandler;
    onceWindowResolutionChange(
        callback: ClientEvents.GenericEventCallback<ClientEvents.WindowResolutionChangeEventParameters>,
    ): ScriptEventHandler;
    onConnectionComplete(callback: ClientEvents.GenericEventCallback): ScriptEventHandler;
    onceConnectionComplete(callback: ClientEvents.GenericEventCallback): ScriptEventHandler;
    onDisconnect(callback: ClientEvents.GenericEventCallback): ScriptEventHandler;
    onceDisconnect(callback: ClientEvents.GenericEventCallback): ScriptEventHandler;
    onSpawned(callback: ClientEvents.GenericEventCallback): ScriptEventHandler;
    onceSpawned(callback: ClientEvents.GenericEventCallback): ScriptEventHandler;
    onGameEntityCreate(
        callback: ClientEvents.GenericEventCallback<ClientEvents.GameEntityCreateEventParameters>,
    ): ScriptEventHandler;
    onceGameEntityCreate(
        callback: ClientEvents.GenericEventCallback<ClientEvents.GameEntityCreateEventParameters>,
    ): ScriptEventHandler;
    onGameEntityDestroy(
        callback: ClientEvents.GenericEventCallback<ClientEvents.GameEntityDestroyEventParameters>,
    ): ScriptEventHandler;
    onceGameEntityDestroy(
        callback: ClientEvents.GenericEventCallback<ClientEvents.GameEntityDestroyEventParameters>,
    ): ScriptEventHandler;
    onEntityHitEntity(callback: ClientEvents.GenericEventCallback<ClientEvents.EntityHitEntityEventParameters>): ScriptEventHandler;
    onceEntityHitEntity(
        callback: ClientEvents.GenericEventCallback<ClientEvents.EntityHitEntityEventParameters>,
    ): ScriptEventHandler;
    onTaskChange(callback: ClientEvents.GenericEventCallback<ClientEvents.TaskChangeEventParameters>): ScriptEventHandler;
    onceTaskChange(callback: ClientEvents.GenericEventCallback<ClientEvents.TaskChangeEventParameters>): ScriptEventHandler;
    onPlayerWeaponShoot(
        callback: ClientEvents.GenericEventCallback<ClientEvents.PlayerWeaponShootEventParameters>,
    ): ScriptEventHandler;
    oncePlayerWeaponShoot(
        callback: ClientEvents.GenericEventCallback<ClientEvents.PlayerWeaponShootEventParameters>,
    ): ScriptEventHandler;
    onPlayerBulletHit(callback: ClientEvents.GenericEventCallback<ClientEvents.PlayerBulletHitEventParameters>): ScriptEventHandler;
    oncePlayerBulletHit(
        callback: ClientEvents.GenericEventCallback<ClientEvents.PlayerBulletHitEventParameters>,
    ): ScriptEventHandler;
    onPlayerWeaponChange(
        callback: ClientEvents.GenericEventCallback<ClientEvents.PlayerWeaponChangeEventParameters>,
    ): ScriptEventHandler;
    oncePlayerWeaponChange(
        callback: ClientEvents.GenericEventCallback<ClientEvents.PlayerWeaponChangeEventParameters>,
    ): ScriptEventHandler;
    onPlayerStartVehicleEnter<T extends Player>(
        callback: ClientEvents.GenericPlayerEventCallback<ClientEvents.PlayerStartVehicleEnterEventParameters, T>,
    ): ScriptEventHandler;
    oncePlayerStartVehicleEnter<T extends Player>(
        callback: ClientEvents.GenericPlayerEventCallback<ClientEvents.PlayerStartVehicleEnterEventParameters, T>,
    ): ScriptEventHandler;
    onPlayerStartVehicleLeave<T extends Player>(
        callback: ClientEvents.GenericPlayerEventCallback<ClientEvents.PlayerStartVehicleLeaveEventParameters, T>,
    ): ScriptEventHandler;
    oncePlayerStartVehicleLeave<T extends Player>(
        callback: ClientEvents.GenericPlayerEventCallback<ClientEvents.PlayerStartVehicleLeaveEventParameters, T>,
    ): ScriptEventHandler;
    onPlayerVehicleEntered<T extends Player>(
        callback: ClientEvents.GenericPlayerEventCallback<ClientEvents.PlayerVehicleEnterEventParameters, T>,
    ): ScriptEventHandler;
    oncePlayerVehicleEntered<T extends Player>(
        callback: ClientEvents.GenericPlayerEventCallback<ClientEvents.PlayerVehicleEnterEventParameters, T>,
    ): ScriptEventHandler;
    onPlayerVehicleLeft<T extends Player>(
        callback: ClientEvents.GenericPlayerEventCallback<ClientEvents.PlayerVehicleLeaveEventParameters, T>,
    ): ScriptEventHandler;
    oncePlayerVehicleLeft<T extends Player>(
        callback: ClientEvents.GenericPlayerEventCallback<ClientEvents.PlayerVehicleLeaveEventParameters, T>,
    ): ScriptEventHandler;
    onPlayerVehicleSeatChange<T extends Player>(
        callback: ClientEvents.GenericPlayerEventCallback<ClientEvents.PlayerChangeVehicleSeatEventParameters, T>,
    ): ScriptEventHandler;
    oncePlayerVehicleSeatChange<T extends Player>(
        callback: ClientEvents.GenericPlayerEventCallback<ClientEvents.PlayerChangeVehicleSeatEventParameters, T>,
    ): ScriptEventHandler;
    onVoiceConnectionUpdate(
        callback: ClientEvents.GenericEventCallback<ClientEvents.VoiceConnectionEventParameters>,
    ): ScriptEventHandler;
    onceVoiceConnectionUpdate(
        callback: ClientEvents.GenericEventCallback<ClientEvents.VoiceConnectionEventParameters>,
    ): ScriptEventHandler;
    onPlayerStartTalking<T extends Player>(callback: ClientEvents.GenericPlayerEventCallback<{}, T>): ScriptEventHandler;
    oncePlayerStartTalking<T extends Player>(callback: ClientEvents.GenericPlayerEventCallback<{}, T>): ScriptEventHandler;
    onPlayerStopTalking<T extends Player>(callback: ClientEvents.GenericPlayerEventCallback<{}, T>): ScriptEventHandler;
    oncePlayerStopTalking<T extends Player>(callback: ClientEvents.GenericPlayerEventCallback<{}, T>): ScriptEventHandler;
    onPedDeath(callback: ClientEvents.GenericEventCallback<ClientEvents.PedDeathEventParameters>): ScriptEventHandler;
    oncePedDeath(callback: ClientEvents.GenericEventCallback<ClientEvents.PedDeathEventParameters>): ScriptEventHandler;
    onPedDamage(callback: ClientEvents.GenericEventCallback<ClientEvents.PedDamageEventParameters>): ScriptEventHandler;
    onWorldObjectPositionChange(
        callback: ClientEvents.GenericEventCallback<ClientEvents.WorldObjectPositionChangeEventParameters>,
    ): ScriptEventHandler;
    onceWorldObjectPositionChange(
        callback: ClientEvents.GenericEventCallback<ClientEvents.WorldObjectPositionChangeEventParameters>,
    ): ScriptEventHandler;
    onWorldObjectStreamIn(
        callback: ClientEvents.GenericEventCallback<ClientEvents.WorldObjectStreamInEventParameters>,
    ): ScriptEventHandler;
    onceWorldObjectStreamIn(
        callback: ClientEvents.GenericEventCallback<ClientEvents.WorldObjectStreamInEventParameters>,
    ): ScriptEventHandler;
    onWorldObjectStreamOut(
        callback: ClientEvents.GenericEventCallback<ClientEvents.WorldObjectStreamOutEventParameters>,
    ): ScriptEventHandler;
    onceWorldObjectStreamOut(
        callback: ClientEvents.GenericEventCallback<ClientEvents.WorldObjectStreamOutEventParameters>,
    ): ScriptEventHandler;
    onEvent(callback: ClientEvents.GenericEventCallback<SharedEvents.GenericOnEventParameters>): ScriptEventHandler;
    onBaseObjectCreate(
        callback: ClientEvents.GenericEventCallback<ClientEvents.BaseObjectCreateEventParameters>,
    ): ScriptEventHandler;
    onBaseObjectRemove(
        callback: ClientEvents.GenericEventCallback<ClientEvents.BaseObjectRemoveEventParameters>,
    ): ScriptEventHandler;
    onNetOwnerChange(callback: ClientEvents.GenericEventCallback<ClientEvents.NetOwnerChangeEventParameters>): ScriptEventHandler;
    onWeaponDamage(callback: ClientEvents.GenericEventCallback<ClientEvents.WeaponDamageEventParameters>): ScriptEventHandler;
    onMetaChange(callback: ClientEvents.GenericEventCallback<ClientEvents.MetaChangeEventParameters>): ScriptEventHandler;
    onLocalMetaChange(
        callback: ClientEvents.GenericPlayerEventCallback<ClientEvents.LocalMetaChangeEventParameters>,
    ): ScriptEventHandler;
    onSyncedMetaChange(
        callback: ClientEvents.GenericEventCallback<ClientEvents.SyncedMetaChangeEventParameters>,
    ): ScriptEventHandler;
    onStreamSyncedMetaChange(
        callback: ClientEvents.GenericEventCallback<ClientEvents.StreamSyncedMetaChangeEventParameters>,
    ): ScriptEventHandler;
    onGlobalMetaChange(
        callback: ClientEvents.GenericEventCallback<ClientEvents.GlobalMetaChangeEventParameters>,
    ): ScriptEventHandler;
    onGlobalSyncedMetaChange(
        callback: ClientEvents.GenericEventCallback<ClientEvents.GlobalSyncedMetaChangeEventParameters>,
    ): ScriptEventHandler;
    onEntityColShapeEnter(
        callback: ClientEvents.GenericEventCallback<ClientEvents.EntityColShapeEnterEventParameters>,
    ): ScriptEventHandler;
    onEntityColShapeLeave(
        callback: ClientEvents.GenericEventCallback<ClientEvents.EntityColShapeLeaveEventParameters>,
    ): ScriptEventHandler;
    onEntityCheckpointEnter(
        callback: ClientEvents.GenericEventCallback<ClientEvents.EntityCheckpointEnterEventParameters>,
    ): ScriptEventHandler;
    onEntityCheckpointLeave(
        callback: ClientEvents.GenericEventCallback<ClientEvents.EntityCheckpointLeaveEventParameters>,
    ): ScriptEventHandler;
    onColShapeEvent(callback: ClientEvents.GenericEventCallback<ClientEvents.ColShapeEventParameters>): ScriptEventHandler;
    onConsoleCommand(callback: ClientEvents.GenericEventCallback<ClientEvents.ConsoleCommandEventParameters>): ScriptEventHandler;
    onError(callback: ClientEvents.GenericEventCallback<ClientEvents.ErrorEventParameters>): ScriptEventHandler;
    onLocalScriptEvent(
        callback: ClientEvents.GenericEventCallback<ClientEvents.LocalScriptEventParameters>,
    ): ScriptEventHandler;
    onRemoteScriptEvent(
        callback: ClientEvents.GenericEventCallback<ClientEvents.RemoteScriptEventParameters>,
    ): ScriptEventHandler;
    onResourceStart(callback: ClientEvents.GenericEventCallback<ClientEvents.ResourceStartEventParameters>): ScriptEventHandler;
    onResourceStop(callback: ClientEvents.GenericEventCallback<ClientEvents.ResourceStopEventParameters>): ScriptEventHandler;
    onResourceError(callback: ClientEvents.GenericEventCallback<ClientEvents.ResourceErrorEventParameters>): ScriptEventHandler;
}
