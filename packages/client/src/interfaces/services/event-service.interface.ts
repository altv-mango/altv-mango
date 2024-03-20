import type { Events as SharedEvents } from '@altv/shared';
import type { Events as ClientEvents, Player } from '@altv/client';

export interface EventService {
    on<E extends keyof ClientEvents.CustomClientEvent>(
        eventName: E,
        callback: (body: Parameters<ClientEvents.CustomClientEvent[E]>[0]) => ReturnType<ClientEvents.CustomClientEvent[E]>,
    ): SharedEvents.ScriptEventHandler;
    on<E extends string>(
        eventName: Exclude<E, keyof ClientEvents.CustomClientEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): SharedEvents.ScriptEventHandler;
    once<E extends keyof ClientEvents.CustomClientEvent>(
        eventName: E,
        callback: (body: Parameters<ClientEvents.CustomClientEvent[E]>[0]) => ReturnType<ClientEvents.CustomClientEvent[E]>,
    ): SharedEvents.ScriptEventHandler;
    once<E extends string>(
        eventName: Exclude<E, keyof ClientEvents.CustomClientEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): SharedEvents.ScriptEventHandler;
    emit<E extends keyof ClientEvents.CustomClientEvent>(eventName: E, body?: ClientEvents.CustomClientEvent[E]): void;
    emit<E extends string>(eventName: Exclude<E, keyof ClientEvents.CustomClientEvent>, body?: unknown): void;
    onServer<E extends keyof SharedEvents.CustomServerToPlayerEvent>(
        eventName: E,
        callback: (body: Parameters<SharedEvents.CustomServerToPlayerEvent[E]>[0]) => ReturnType<SharedEvents.CustomServerToPlayerEvent[E]>,
    ): SharedEvents.ScriptEventHandler;
    onServer<E extends string>(
        eventName: Exclude<E, keyof SharedEvents.CustomServerToPlayerEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): SharedEvents.ScriptEventHandler;
    onceServer<E extends keyof SharedEvents.CustomServerToPlayerEvent>(
        eventName: E,
        callback: (body: Parameters<SharedEvents.CustomServerToPlayerEvent[E]>[0]) => ReturnType<SharedEvents.CustomServerToPlayerEvent[E]>,
    ): SharedEvents.ScriptEventHandler;
    onceServer<E extends string>(
        eventName: Exclude<E, keyof SharedEvents.CustomServerToPlayerEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): SharedEvents.ScriptEventHandler;
    emitServer<E extends keyof SharedEvents.CustomPlayerToServerEvent>(
        eventName: E,
        body?: Parameters<SharedEvents.CustomPlayerToServerEvent[E]>[0],
    ): void;
    emitServer<E extends string>(eventName: Exclude<E, keyof SharedEvents.CustomPlayerToServerEvent>, body?: unknown): void;
    onWebView<E extends keyof SharedEvents.CustomWebViewToClientEvent>(
        id: string | number,
        eventName: E,
        callback: (
            body: Parameters<SharedEvents.CustomWebViewToClientEvent[E]>[0],
        ) => ReturnType<SharedEvents.CustomWebViewToClientEvent[E]>,
    ): SharedEvents.ScriptEventHandler;
    onWebView<E extends string>(
        id: string | number,
        eventName: Exclude<E, keyof SharedEvents.CustomWebViewToClientEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): SharedEvents.ScriptEventHandler;
    onceWebView<E extends keyof SharedEvents.CustomWebViewToClientEvent>(
        id: string | number,
        eventName: E,
        callback: (
            body: Parameters<SharedEvents.CustomWebViewToClientEvent[E]>[0],
        ) => ReturnType<SharedEvents.CustomWebViewToClientEvent[E]>,
    ): SharedEvents.ScriptEventHandler;
    onceWebView<E extends string>(
        id: string | number,
        eventName: Exclude<E, keyof SharedEvents.CustomWebViewToClientEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): SharedEvents.ScriptEventHandler;
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
    onScriptRPC(callback: ClientEvents.GenericEventCallback<ClientEvents.ScriptRPCEventParameters>): SharedEvents.EventHandler;
    onceScriptRPC(callback: ClientEvents.GenericEventCallback<ClientEvents.ScriptRPCEventParameters>): SharedEvents.EventHandler;
    onScriptRPCAnswer(callback: ClientEvents.GenericEventCallback<ClientEvents.ScriptRPCAnswerEventParameters>): SharedEvents.EventHandler;
    onceScriptRPCAnswer(
        callback: ClientEvents.GenericEventCallback<ClientEvents.ScriptRPCAnswerEventParameters>,
    ): SharedEvents.EventHandler;
    onKeyboardEvent(callback: ClientEvents.GenericEventCallback<ClientEvents.KeyboardEventParameters>): SharedEvents.EventHandler;
    onceKeyboardEvent(callback: ClientEvents.GenericEventCallback<ClientEvents.KeyboardEventParameters>): SharedEvents.EventHandler;
    onKeyUp(callback: ClientEvents.GenericEventCallback<ClientEvents.KeyUpDownEventParameters>): SharedEvents.EventHandler;
    onceKeyUp(callback: ClientEvents.GenericEventCallback<ClientEvents.KeyUpDownEventParameters>): SharedEvents.EventHandler;
    onKeyDown(callback: ClientEvents.GenericEventCallback<ClientEvents.KeyUpDownEventParameters>): SharedEvents.EventHandler;
    onceKeyDown(callback: ClientEvents.GenericEventCallback<ClientEvents.KeyUpDownEventParameters>): SharedEvents.EventHandler;
    onWebViewEvent(callback: ClientEvents.GenericEventCallback<ClientEvents.WebViewEventParameters>): SharedEvents.EventHandler;
    onceWebViewEvent(callback: ClientEvents.GenericEventCallback<ClientEvents.WebViewEventParameters>): SharedEvents.EventHandler;
    onWebSocketEvent(callback: ClientEvents.GenericEventCallback<ClientEvents.WebSocketEventParameters>): SharedEvents.EventHandler;
    onceWebSocketEvent(callback: ClientEvents.GenericEventCallback<ClientEvents.WebSocketEventParameters>): SharedEvents.EventHandler;
    onAudioEvent(callback: ClientEvents.GenericEventCallback<ClientEvents.AudioEventParameters>): SharedEvents.EventHandler;
    onceAudioEvent(callback: ClientEvents.GenericEventCallback<ClientEvents.AudioEventParameters>): SharedEvents.EventHandler;
    onRmluiEvent(callback: ClientEvents.GenericEventCallback<ClientEvents.RmluiEventParameters>): SharedEvents.EventHandler;
    onceRmluiEvent(callback: ClientEvents.GenericEventCallback<ClientEvents.RmluiEventParameters>): SharedEvents.EventHandler;
    onWindowFocusChange(
        callback: ClientEvents.GenericEventCallback<ClientEvents.WindowFocusChangeEventParameters>,
    ): SharedEvents.EventHandler;
    onceWindowFocusChange(
        callback: ClientEvents.GenericEventCallback<ClientEvents.WindowFocusChangeEventParameters>,
    ): SharedEvents.EventHandler;
    onWindowResolutionChange(
        callback: ClientEvents.GenericEventCallback<ClientEvents.WindowResolutionChangeEventParameters>,
    ): SharedEvents.EventHandler;
    onceWindowResolutionChange(
        callback: ClientEvents.GenericEventCallback<ClientEvents.WindowResolutionChangeEventParameters>,
    ): SharedEvents.EventHandler;
    onConnectionComplete(callback: ClientEvents.GenericEventCallback): SharedEvents.EventHandler;
    onceConnectionComplete(callback: ClientEvents.GenericEventCallback): SharedEvents.EventHandler;
    onDisconnect(callback: ClientEvents.GenericEventCallback): SharedEvents.EventHandler;
    onceDisconnect(callback: ClientEvents.GenericEventCallback): SharedEvents.EventHandler;
    onSpawned(callback: ClientEvents.GenericEventCallback): SharedEvents.EventHandler;
    onceSpawned(callback: ClientEvents.GenericEventCallback): SharedEvents.EventHandler;
    onGameEntityCreate(
        callback: ClientEvents.GenericEventCallback<ClientEvents.GameEntityCreateEventParameters>,
    ): SharedEvents.EventHandler;
    onceGameEntityCreate(
        callback: ClientEvents.GenericEventCallback<ClientEvents.GameEntityCreateEventParameters>,
    ): SharedEvents.EventHandler;
    onGameEntityDestroy(
        callback: ClientEvents.GenericEventCallback<ClientEvents.GameEntityDestroyEventParameters>,
    ): SharedEvents.EventHandler;
    onceGameEntityDestroy(
        callback: ClientEvents.GenericEventCallback<ClientEvents.GameEntityDestroyEventParameters>,
    ): SharedEvents.EventHandler;
    onEntityHitEntity(callback: ClientEvents.GenericEventCallback<ClientEvents.EntityHitEntityEventParameters>): SharedEvents.EventHandler;
    onceEntityHitEntity(
        callback: ClientEvents.GenericEventCallback<ClientEvents.EntityHitEntityEventParameters>,
    ): SharedEvents.EventHandler;
    onTaskChange(callback: ClientEvents.GenericEventCallback<ClientEvents.TaskChangeEventParameters>): SharedEvents.EventHandler;
    onceTaskChange(callback: ClientEvents.GenericEventCallback<ClientEvents.TaskChangeEventParameters>): SharedEvents.EventHandler;
    onPlayerWeaponShoot(
        callback: ClientEvents.GenericEventCallback<ClientEvents.PlayerWeaponShootEventParameters>,
    ): SharedEvents.EventHandler;
    oncePlayerWeaponShoot(
        callback: ClientEvents.GenericEventCallback<ClientEvents.PlayerWeaponShootEventParameters>,
    ): SharedEvents.EventHandler;
    onPlayerBulletHit(callback: ClientEvents.GenericEventCallback<ClientEvents.PlayerBulletHitEventParameters>): SharedEvents.EventHandler;
    oncePlayerBulletHit(
        callback: ClientEvents.GenericEventCallback<ClientEvents.PlayerBulletHitEventParameters>,
    ): SharedEvents.EventHandler;
    onPlayerWeaponChange(
        callback: ClientEvents.GenericEventCallback<ClientEvents.PlayerWeaponChangeEventParameters>,
    ): SharedEvents.EventHandler;
    oncePlayerWeaponChange(
        callback: ClientEvents.GenericEventCallback<ClientEvents.PlayerWeaponChangeEventParameters>,
    ): SharedEvents.EventHandler;
    onPlayerStartVehicleEnter<T extends Player>(
        callback: ClientEvents.GenericPlayerEventCallback<ClientEvents.PlayerStartVehicleEnterEventParameters, T>,
    ): SharedEvents.EventHandler;
    oncePlayerStartVehicleEnter<T extends Player>(
        callback: ClientEvents.GenericPlayerEventCallback<ClientEvents.PlayerStartVehicleEnterEventParameters, T>,
    ): SharedEvents.EventHandler;
    onPlayerStartVehicleLeave<T extends Player>(
        callback: ClientEvents.GenericPlayerEventCallback<ClientEvents.PlayerStartVehicleLeaveEventParameters, T>,
    ): SharedEvents.EventHandler;
    oncePlayerStartVehicleLeave<T extends Player>(
        callback: ClientEvents.GenericPlayerEventCallback<ClientEvents.PlayerStartVehicleLeaveEventParameters, T>,
    ): SharedEvents.EventHandler;
    onPlayerVehicleEntered<T extends Player>(
        callback: ClientEvents.GenericPlayerEventCallback<ClientEvents.PlayerVehicleEnterEventParameters, T>,
    ): SharedEvents.EventHandler;
    oncePlayerVehicleEntered<T extends Player>(
        callback: ClientEvents.GenericPlayerEventCallback<ClientEvents.PlayerVehicleEnterEventParameters, T>,
    ): SharedEvents.EventHandler;
    onPlayerVehicleLeft<T extends Player>(
        callback: ClientEvents.GenericPlayerEventCallback<ClientEvents.PlayerVehicleLeaveEventParameters, T>,
    ): SharedEvents.EventHandler;
    oncePlayerVehicleLeft<T extends Player>(
        callback: ClientEvents.GenericPlayerEventCallback<ClientEvents.PlayerVehicleLeaveEventParameters, T>,
    ): SharedEvents.EventHandler;
    onPlayerVehicleSeatChange<T extends Player>(
        callback: ClientEvents.GenericPlayerEventCallback<ClientEvents.PlayerChangeVehicleSeatEventParameters, T>,
    ): SharedEvents.EventHandler;
    oncePlayerVehicleSeatChange<T extends Player>(
        callback: ClientEvents.GenericPlayerEventCallback<ClientEvents.PlayerChangeVehicleSeatEventParameters, T>,
    ): SharedEvents.EventHandler;
    onVoiceConnectionUpdate(
        callback: ClientEvents.GenericEventCallback<ClientEvents.VoiceConnectionEventParameters>,
    ): SharedEvents.EventHandler;
    onceVoiceConnectionUpdate(
        callback: ClientEvents.GenericEventCallback<ClientEvents.VoiceConnectionEventParameters>,
    ): SharedEvents.EventHandler;
    onPlayerStartTalking<T extends Player>(callback: ClientEvents.GenericPlayerEventCallback<{}, T>): SharedEvents.EventHandler;
    oncePlayerStartTalking<T extends Player>(callback: ClientEvents.GenericPlayerEventCallback<{}, T>): SharedEvents.EventHandler;
    onPlayerStopTalking<T extends Player>(callback: ClientEvents.GenericPlayerEventCallback<{}, T>): SharedEvents.EventHandler;
    oncePlayerStopTalking<T extends Player>(callback: ClientEvents.GenericPlayerEventCallback<{}, T>): SharedEvents.EventHandler;
    onPedDeath(callback: ClientEvents.GenericEventCallback<ClientEvents.PedDeathEventParameters>): SharedEvents.EventHandler;
    oncePedDeath(callback: ClientEvents.GenericEventCallback<ClientEvents.PedDeathEventParameters>): SharedEvents.EventHandler;
    onPedDamage(callback: ClientEvents.GenericEventCallback<ClientEvents.PedDamageEventParameters>): SharedEvents.EventHandler;
    onWorldObjectPositionChange(
        callback: ClientEvents.GenericEventCallback<ClientEvents.WorldObjectPositionChangeEventParameters>,
    ): SharedEvents.EventHandler;
    onceWorldObjectPositionChange(
        callback: ClientEvents.GenericEventCallback<ClientEvents.WorldObjectPositionChangeEventParameters>,
    ): SharedEvents.EventHandler;
    onWorldObjectStreamIn(
        callback: ClientEvents.GenericEventCallback<ClientEvents.WorldObjectStreamInEventParameters>,
    ): SharedEvents.EventHandler;
    onceWorldObjectStreamIn(
        callback: ClientEvents.GenericEventCallback<ClientEvents.WorldObjectStreamInEventParameters>,
    ): SharedEvents.EventHandler;
    onWorldObjectStreamOut(
        callback: ClientEvents.GenericEventCallback<ClientEvents.WorldObjectStreamOutEventParameters>,
    ): SharedEvents.EventHandler;
    onceWorldObjectStreamOut(
        callback: ClientEvents.GenericEventCallback<ClientEvents.WorldObjectStreamOutEventParameters>,
    ): SharedEvents.EventHandler;
    onEvent(callback: ClientEvents.GenericEventCallback<SharedEvents.GenericOnEventParameters>): SharedEvents.GenericEventHandler;
    onBaseObjectCreate(
        callback: ClientEvents.GenericEventCallback<ClientEvents.BaseObjectCreateEventParameters>,
    ): SharedEvents.EventHandler;
    onBaseObjectRemove(
        callback: ClientEvents.GenericEventCallback<ClientEvents.BaseObjectRemoveEventParameters>,
    ): SharedEvents.EventHandler;
    onNetOwnerChange(callback: ClientEvents.GenericEventCallback<ClientEvents.NetOwnerChangeEventParameters>): SharedEvents.EventHandler;
    onWeaponDamage(callback: ClientEvents.GenericEventCallback<ClientEvents.WeaponDamageEventParameters>): SharedEvents.EventHandler;
    onMetaChange(callback: ClientEvents.GenericEventCallback<ClientEvents.MetaChangeEventParameters>): SharedEvents.EventHandler;
    onLocalMetaChange(
        callback: ClientEvents.GenericPlayerEventCallback<ClientEvents.LocalMetaChangeEventParameters>,
    ): SharedEvents.EventHandler;
    onSyncedMetaChange(
        callback: ClientEvents.GenericEventCallback<ClientEvents.SyncedMetaChangeEventParameters>,
    ): SharedEvents.EventHandler;
    onStreamSyncedMetaChange(
        callback: ClientEvents.GenericEventCallback<ClientEvents.StreamSyncedMetaChangeEventParameters>,
    ): SharedEvents.EventHandler;
    onGlobalMetaChange(
        callback: ClientEvents.GenericEventCallback<ClientEvents.GlobalMetaChangeEventParameters>,
    ): SharedEvents.EventHandler;
    onGlobalSyncedMetaChange(
        callback: ClientEvents.GenericEventCallback<ClientEvents.GlobalSyncedMetaChangeEventParameters>,
    ): SharedEvents.EventHandler;
    onEntityColShapeEnter(
        callback: ClientEvents.GenericEventCallback<ClientEvents.EntityColShapeEnterEventParameters>,
    ): SharedEvents.EventHandler;
    onEntityColShapeLeave(
        callback: ClientEvents.GenericEventCallback<ClientEvents.EntityColShapeLeaveEventParameters>,
    ): SharedEvents.EventHandler;
    onEntityCheckpointEnter(
        callback: ClientEvents.GenericEventCallback<ClientEvents.EntityCheckpointEnterEventParameters>,
    ): SharedEvents.EventHandler;
    onEntityCheckpointLeave(
        callback: ClientEvents.GenericEventCallback<ClientEvents.EntityCheckpointLeaveEventParameters>,
    ): SharedEvents.EventHandler;
    onColShapeEvent(callback: ClientEvents.GenericEventCallback<ClientEvents.ColShapeEventParameters>): SharedEvents.EventHandler;
    onConsoleCommand(callback: ClientEvents.GenericEventCallback<ClientEvents.ConsoleCommandEventParameters>): SharedEvents.EventHandler;
    onError(callback: ClientEvents.GenericEventCallback<ClientEvents.ErrorEventParameters>): SharedEvents.EventHandler;
    onLocalScriptEvent(
        callback: ClientEvents.GenericEventCallback<ClientEvents.LocalScriptEventParameters>,
    ): SharedEvents.ScriptEventHandler;
    onRemoteScriptEvent(
        callback: ClientEvents.GenericEventCallback<ClientEvents.RemoteScriptEventParameters>,
    ): SharedEvents.ScriptEventHandler;
    onResourceStart(callback: ClientEvents.GenericEventCallback<ClientEvents.ResourceStartEventParameters>): SharedEvents.EventHandler;
    onResourceStop(callback: ClientEvents.GenericEventCallback<ClientEvents.ResourceStopEventParameters>): SharedEvents.EventHandler;
    onResourceError(callback: ClientEvents.GenericEventCallback<ClientEvents.ResourceErrorEventParameters>): SharedEvents.EventHandler;
}
