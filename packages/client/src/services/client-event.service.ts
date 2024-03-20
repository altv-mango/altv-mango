import { BaseEventService } from '@altv-mango/core/app';
import { inject, injectable } from 'inversify';
import { INTERNAL_EVENTS, WEBVIEW_LIST_SERVICE } from '../constants';
import type { WebViewListService } from './webview-list.service';
import { Events as ClientEvents, Enums, type Player } from '@altv/client';
import type { Events as SharedEvents } from '@altv/shared';
import type { EventService } from '../interfaces';

@injectable()
export class ClientEventService extends BaseEventService<ClientEvents.CustomClientEvent> implements EventService {
    @inject(WEBVIEW_LIST_SERVICE) private readonly $webViewListService: WebViewListService;

    public constructor() {
        super();

        this.$altEvents = ClientEvents;
        this.$internalEventNames = new Set(Object.values(INTERNAL_EVENTS));
    }

    public onServer<E extends keyof SharedEvents.CustomServerToPlayerEvent>(
        eventName: E,
        callback: (body: Parameters<SharedEvents.CustomServerToPlayerEvent[E]>[0]) => ReturnType<SharedEvents.CustomServerToPlayerEvent[E]>,
    ): SharedEvents.ScriptEventHandler;
    public onServer<E extends string>(
        eventName: Exclude<E, keyof SharedEvents.CustomServerToPlayerEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): SharedEvents.ScriptEventHandler;
    public onServer<E extends string>(
        eventName: Exclude<E, keyof SharedEvents.CustomServerToPlayerEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ) {
        const wrapper = (...args: unknown[]) => callback(args[0]);
        const eventHandler = ClientEvents.onServer(eventName, wrapper);
        this.$remoteHandlers.add(eventHandler);
        return eventHandler;
    }

    public onceServer<E extends keyof SharedEvents.CustomServerToPlayerEvent>(
        eventName: E,
        callback: (body: Parameters<SharedEvents.CustomServerToPlayerEvent[E]>[0]) => ReturnType<SharedEvents.CustomServerToPlayerEvent[E]>,
    ): SharedEvents.ScriptEventHandler;
    public onceServer<E extends string>(
        eventName: Exclude<E, keyof SharedEvents.CustomServerToPlayerEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): SharedEvents.ScriptEventHandler;
    public onceServer<E extends string>(
        eventName: Exclude<E, keyof SharedEvents.CustomServerToPlayerEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ) {
        const wrapper = (...args: unknown[]) => callback(args[0]);
        const eventHandler = this.$altEvents.onceServer(eventName, wrapper);
        this.$remoteHandlers.add(eventHandler);
        return eventHandler;
    }

    public emitServer<E extends keyof SharedEvents.CustomPlayerToServerEvent>(
        eventName: E,
        body: Parameters<SharedEvents.CustomPlayerToServerEvent[E]>[0],
    ): void;
    public emitServer<E extends string>(eventName: Exclude<E, keyof SharedEvents.CustomPlayerToServerEvent>, body?: unknown): void;
    public emitServer<E extends string>(eventName: Exclude<E, keyof SharedEvents.CustomPlayerToServerEvent>, body?: unknown) {
        this.$altEvents.emitServerRaw(eventName, body);
    }

    public onWebView<E extends keyof SharedEvents.CustomWebViewToClientEvent>(
        id: string | number,
        eventName: E,
        callback: (
            body: Parameters<SharedEvents.CustomWebViewToClientEvent[E]>[0],
        ) => ReturnType<SharedEvents.CustomWebViewToClientEvent[E]>,
    ): SharedEvents.ScriptEventHandler;
    public onWebView<E extends string>(
        id: string | number,
        eventName: Exclude<E, keyof SharedEvents.CustomWebViewToClientEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): SharedEvents.ScriptEventHandler;
    public onWebView<E extends string>(
        id: string | number,
        eventName: Exclude<E, keyof SharedEvents.CustomWebViewToClientEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ) {
        const webView = this.$webViewListService.tryGet(id);
        const wrapper = (...args: unknown[]) => callback(args[0]);

        const eventHandler: SharedEvents.ScriptEventHandler = {
            destroy() {
                // @ts-ignore
                this.valid = false;
                webView.off(eventName, wrapper);
            },
            eventName,
            eventType: Enums.EventType.WEB_VIEW_EVENT,
            eventTypeName: 'WEB_VIEW_EVENT',
            handler: wrapper,
            local: false,
            location: { fileName: '', lineNumber: 0 },
            onlyOnce: false,
            remote: true,
            valid: true,
        };

        webView.on(eventName, wrapper);

        this.$remoteHandlers.add(eventHandler);
        return eventHandler;
    }

    public onceWebView<E extends keyof SharedEvents.CustomWebViewToClientEvent>(
        id: string | number,
        eventName: E,
        callback: (
            body: Parameters<SharedEvents.CustomWebViewToClientEvent[E]>[0],
        ) => ReturnType<SharedEvents.CustomWebViewToClientEvent[E]>,
    ): SharedEvents.ScriptEventHandler;
    public onceWebView<E extends string>(
        id: string | number,
        eventName: Exclude<E, keyof SharedEvents.CustomWebViewToClientEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): SharedEvents.ScriptEventHandler;
    public onceWebView<E extends string>(
        id: string | number,
        eventName: Exclude<E, keyof SharedEvents.CustomWebViewToClientEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ) {
        const webView = this.$webViewListService.tryGet(id);
        const wrapper = (...args: any[]) => callback(args[0]);

        const eventHandler: SharedEvents.ScriptEventHandler = {
            destroy() {
                // @ts-ignore
                this.valid = false;
                webView.off(eventName, wrapper);
            },
            eventName,
            eventType: Enums.EventType.WEB_VIEW_EVENT,
            eventTypeName: 'WEB_VIEW_EVENT',
            handler: wrapper,
            local: false,
            location: { fileName: '', lineNumber: 0 },
            onlyOnce: true,
            remote: true,
            valid: true,
        };

        webView.once(eventName, wrapper);

        this.$remoteHandlers.add(eventHandler);
        return eventHandler;
    }

    public emitWebView<E extends keyof SharedEvents.CustomClientToWebViewEvent>(
        id: string | number,
        eventName: E,
        body: Parameters<SharedEvents.CustomClientToWebViewEvent[E]>[0],
    ): void;
    public emitWebView<E extends string>(
        id: string | number,
        eventName: Exclude<E, keyof SharedEvents.CustomClientToWebViewEvent>,
        body?: unknown,
    ): void;
    public emitWebView<E extends string>(
        id: string | number,
        eventName: Exclude<E, keyof SharedEvents.CustomClientToWebViewEvent>,
        body?: unknown,
    ) {
        const webView = this.$webViewListService.tryGet(id);
        webView.emit(eventName, body);
    }

    public onScriptRPC(callback: ClientEvents.GenericEventCallback<ClientEvents.ScriptRPCEventParameters>) {
        return ClientEvents.onScriptRPC(callback);
    }

    public onceScriptRPC(callback: ClientEvents.GenericEventCallback<ClientEvents.ScriptRPCEventParameters>) {
        return ClientEvents.onceScriptRPC(callback);
    }

    public onScriptRPCAnswer(callback: ClientEvents.GenericEventCallback<ClientEvents.ScriptRPCAnswerEventParameters>) {
        return ClientEvents.onScriptRPCAnswer(callback);
    }

    public onceScriptRPCAnswer(callback: ClientEvents.GenericEventCallback<ClientEvents.ScriptRPCAnswerEventParameters>) {
        return ClientEvents.onceScriptRPCAnswer(callback);
    }

    public onKeyboardEvent(callback: ClientEvents.GenericEventCallback<ClientEvents.KeyboardEventParameters>) {
        return ClientEvents.onKeyboardEvent(callback);
    }

    public onceKeyboardEvent(callback: ClientEvents.GenericEventCallback<ClientEvents.KeyboardEventParameters>) {
        return ClientEvents.onceKeyboardEvent(callback);
    }

    public onKeyUp(callback: ClientEvents.GenericEventCallback<ClientEvents.KeyUpDownEventParameters>) {
        return ClientEvents.onKeyUp(callback);
    }

    public onceKeyUp(callback: ClientEvents.GenericEventCallback<ClientEvents.KeyUpDownEventParameters>) {
        return ClientEvents.onceKeyUp(callback);
    }

    public onKeyDown(callback: ClientEvents.GenericEventCallback<ClientEvents.KeyUpDownEventParameters>) {
        return ClientEvents.onKeyDown(callback);
    }

    public onceKeyDown(callback: ClientEvents.GenericEventCallback<ClientEvents.KeyUpDownEventParameters>) {
        return ClientEvents.onceKeyDown(callback);
    }

    public onWebViewEvent(callback: ClientEvents.GenericEventCallback<ClientEvents.WebViewEventParameters>) {
        return ClientEvents.onWebViewEvent(callback);
    }

    public onceWebViewEvent(callback: ClientEvents.GenericEventCallback<ClientEvents.WebViewEventParameters>) {
        return ClientEvents.onceWebViewEvent(callback);
    }

    public onWebSocketEvent(callback: ClientEvents.GenericEventCallback<ClientEvents.WebSocketEventParameters>) {
        return ClientEvents.onWebSocketEvent(callback);
    }

    public onceWebSocketEvent(callback: ClientEvents.GenericEventCallback<ClientEvents.WebSocketEventParameters>) {
        return ClientEvents.onceWebSocketEvent(callback);
    }

    public onAudioEvent(callback: ClientEvents.GenericEventCallback<ClientEvents.AudioEventParameters>) {
        return ClientEvents.onAudioEvent(callback);
    }

    public onceAudioEvent(callback: ClientEvents.GenericEventCallback<ClientEvents.AudioEventParameters>) {
        return ClientEvents.onceAudioEvent(callback);
    }

    public onRmluiEvent(callback: ClientEvents.GenericEventCallback<ClientEvents.RmluiEventParameters>) {
        return ClientEvents.onRmluiEvent(callback);
    }

    public onceRmluiEvent(callback: ClientEvents.GenericEventCallback<ClientEvents.RmluiEventParameters>) {
        return ClientEvents.onceRmluiEvent(callback);
    }

    public onWindowFocusChange(callback: ClientEvents.GenericEventCallback<ClientEvents.WindowFocusChangeEventParameters>) {
        return ClientEvents.onWindowFocusChange(callback);
    }

    public onceWindowFocusChange(callback: ClientEvents.GenericEventCallback<ClientEvents.WindowFocusChangeEventParameters>) {
        return ClientEvents.onceWindowFocusChange(callback);
    }

    public onWindowResolutionChange(callback: ClientEvents.GenericEventCallback<ClientEvents.WindowResolutionChangeEventParameters>) {
        return ClientEvents.onWindowResolutionChange(callback);
    }

    public onceWindowResolutionChange(callback: ClientEvents.GenericEventCallback<ClientEvents.WindowResolutionChangeEventParameters>) {
        return ClientEvents.onceWindowResolutionChange(callback);
    }

    public onConnectionComplete(callback: ClientEvents.GenericEventCallback) {
        return ClientEvents.onConnectionComplete(callback);
    }

    public onceConnectionComplete(callback: ClientEvents.GenericEventCallback) {
        return ClientEvents.onceConnectionComplete(callback);
    }

    public onDisconnect(callback: ClientEvents.GenericEventCallback) {
        return ClientEvents.onDisconnect(callback);
    }

    public onceDisconnect(callback: ClientEvents.GenericEventCallback) {
        return ClientEvents.onceDisconnect(callback);
    }

    public onSpawned(callback: ClientEvents.GenericEventCallback) {
        return ClientEvents.onSpawned(callback);
    }

    public onceSpawned(callback: ClientEvents.GenericEventCallback) {
        return ClientEvents.onceSpawned(callback);
    }

    public onGameEntityCreate(callback: ClientEvents.GenericEventCallback<ClientEvents.GameEntityCreateEventParameters>) {
        return ClientEvents.onGameEntityCreate(callback);
    }

    public onceGameEntityCreate(callback: ClientEvents.GenericEventCallback<ClientEvents.GameEntityCreateEventParameters>) {
        return ClientEvents.onceGameEntityCreate(callback);
    }

    public onGameEntityDestroy(callback: ClientEvents.GenericEventCallback<ClientEvents.GameEntityDestroyEventParameters>) {
        return ClientEvents.onGameEntityDestroy(callback);
    }

    public onceGameEntityDestroy(callback: ClientEvents.GenericEventCallback<ClientEvents.GameEntityDestroyEventParameters>) {
        return ClientEvents.onceGameEntityDestroy(callback);
    }

    public onEntityHitEntity(callback: ClientEvents.GenericEventCallback<ClientEvents.EntityHitEntityEventParameters>) {
        return ClientEvents.onEntityHitEntity(callback);
    }

    public onceEntityHitEntity(callback: ClientEvents.GenericEventCallback<ClientEvents.EntityHitEntityEventParameters>) {
        return ClientEvents.onceEntityHitEntity(callback);
    }

    public onTaskChange(callback: ClientEvents.GenericEventCallback<ClientEvents.TaskChangeEventParameters>) {
        return ClientEvents.onTaskChange(callback);
    }

    public onceTaskChange(callback: ClientEvents.GenericEventCallback<ClientEvents.TaskChangeEventParameters>) {
        return ClientEvents.onceTaskChange(callback);
    }

    public onPlayerWeaponShoot(callback: ClientEvents.GenericEventCallback<ClientEvents.PlayerWeaponShootEventParameters>) {
        return ClientEvents.onPlayerWeaponShoot(callback);
    }

    public oncePlayerWeaponShoot(callback: ClientEvents.GenericEventCallback<ClientEvents.PlayerWeaponShootEventParameters>) {
        return ClientEvents.oncePlayerWeaponShoot(callback);
    }

    public onPlayerBulletHit(callback: ClientEvents.GenericEventCallback<ClientEvents.PlayerBulletHitEventParameters>) {
        return ClientEvents.onPlayerBulletHit(callback);
    }

    public oncePlayerBulletHit(callback: ClientEvents.GenericEventCallback<ClientEvents.PlayerBulletHitEventParameters>) {
        return ClientEvents.oncePlayerBulletHit(callback);
    }

    public onPlayerWeaponChange(callback: ClientEvents.GenericEventCallback<ClientEvents.PlayerWeaponChangeEventParameters>) {
        return ClientEvents.onPlayerWeaponChange(callback);
    }

    public oncePlayerWeaponChange(callback: ClientEvents.GenericEventCallback<ClientEvents.PlayerWeaponChangeEventParameters>) {
        return ClientEvents.oncePlayerWeaponChange(callback);
    }

    public onPlayerStartVehicleEnter<T extends Player>(
        callback: ClientEvents.GenericPlayerEventCallback<ClientEvents.PlayerStartVehicleEnterEventParameters, T>,
    ) {
        return ClientEvents.onPlayerStartVehicleEnter(callback);
    }

    public oncePlayerStartVehicleEnter<T extends Player>(
        callback: ClientEvents.GenericPlayerEventCallback<ClientEvents.PlayerStartVehicleEnterEventParameters, T>,
    ) {
        return ClientEvents.oncePlayerStartVehicleEnter(callback);
    }

    public onPlayerStartVehicleLeave<T extends Player>(
        callback: ClientEvents.GenericPlayerEventCallback<ClientEvents.PlayerStartVehicleLeaveEventParameters, T>,
    ) {
        return ClientEvents.onPlayerStartVehicleLeave(callback);
    }

    public oncePlayerStartVehicleLeave<T extends Player>(
        callback: ClientEvents.GenericPlayerEventCallback<ClientEvents.PlayerStartVehicleLeaveEventParameters, T>,
    ) {
        return ClientEvents.oncePlayerStartVehicleLeave(callback);
    }

    public onPlayerVehicleEntered<T extends Player>(
        callback: ClientEvents.GenericPlayerEventCallback<ClientEvents.PlayerVehicleEnterEventParameters, T>,
    ) {
        return ClientEvents.onPlayerVehicleEntered(callback);
    }

    public oncePlayerVehicleEntered<T extends Player>(
        callback: ClientEvents.GenericPlayerEventCallback<ClientEvents.PlayerVehicleEnterEventParameters, T>,
    ) {
        return ClientEvents.oncePlayerVehicleEntered(callback);
    }

    public onPlayerVehicleLeft<T extends Player>(
        callback: ClientEvents.GenericPlayerEventCallback<ClientEvents.PlayerVehicleLeaveEventParameters, T>,
    ) {
        return ClientEvents.onPlayerVehicleLeft(callback);
    }

    public oncePlayerVehicleLeft<T extends Player>(
        callback: ClientEvents.GenericPlayerEventCallback<ClientEvents.PlayerVehicleLeaveEventParameters, T>,
    ) {
        return ClientEvents.oncePlayerVehicleLeft(callback);
    }

    public onPlayerVehicleSeatChange<T extends Player>(
        callback: ClientEvents.GenericPlayerEventCallback<ClientEvents.PlayerChangeVehicleSeatEventParameters, T>,
    ) {
        return ClientEvents.onPlayerVehicleSeatChange(callback);
    }

    public oncePlayerVehicleSeatChange<T extends Player>(
        callback: ClientEvents.GenericPlayerEventCallback<ClientEvents.PlayerChangeVehicleSeatEventParameters, T>,
    ) {
        return ClientEvents.oncePlayerVehicleSeatChange(callback);
    }

    public onVoiceConnectionUpdate(callback: ClientEvents.GenericEventCallback<ClientEvents.VoiceConnectionEventParameters>) {
        return ClientEvents.onVoiceConnectionUpdate(callback);
    }

    public onceVoiceConnectionUpdate(callback: ClientEvents.GenericEventCallback<ClientEvents.VoiceConnectionEventParameters>) {
        return ClientEvents.onceVoiceConnectionUpdate(callback);
    }

    public onPlayerStartTalking<T extends Player>(callback: ClientEvents.GenericPlayerEventCallback<{}, T>) {
        return ClientEvents.onPlayerStartTalking(callback);
    }

    public oncePlayerStartTalking<T extends Player>(callback: ClientEvents.GenericPlayerEventCallback<{}, T>) {
        return ClientEvents.oncePlayerStartTalking(callback);
    }

    public onPlayerStopTalking<T extends Player>(callback: ClientEvents.GenericPlayerEventCallback<{}, T>) {
        return ClientEvents.onPlayerStopTalking(callback);
    }

    public oncePlayerStopTalking<T extends Player>(callback: ClientEvents.GenericPlayerEventCallback<{}, T>) {
        return ClientEvents.oncePlayerStopTalking(callback);
    }

    public onPedDeath(callback: ClientEvents.GenericEventCallback<ClientEvents.PedDeathEventParameters>) {
        return ClientEvents.onPedDeath(callback);
    }

    public oncePedDeath(callback: ClientEvents.GenericEventCallback<ClientEvents.PedDeathEventParameters>) {
        return ClientEvents.oncePedDeath(callback);
    }

    public onPedDamage(callback: ClientEvents.GenericEventCallback<ClientEvents.PedDamageEventParameters>) {
        return ClientEvents.onPedDamage(callback);
    }

    public onWorldObjectPositionChange(callback: ClientEvents.GenericEventCallback<ClientEvents.WorldObjectPositionChangeEventParameters>) {
        return ClientEvents.onWorldObjectPositionChange(callback);
    }

    public onceWorldObjectPositionChange(
        callback: ClientEvents.GenericEventCallback<ClientEvents.WorldObjectPositionChangeEventParameters>,
    ) {
        return ClientEvents.onceWorldObjectPositionChange(callback);
    }

    public onWorldObjectStreamIn(callback: ClientEvents.GenericEventCallback<ClientEvents.WorldObjectStreamInEventParameters>) {
        return ClientEvents.onWorldObjectStreamIn(callback);
    }

    public onceWorldObjectStreamIn(callback: ClientEvents.GenericEventCallback<ClientEvents.WorldObjectStreamInEventParameters>) {
        return ClientEvents.onceWorldObjectStreamIn(callback);
    }

    public onWorldObjectStreamOut(callback: ClientEvents.GenericEventCallback<ClientEvents.WorldObjectStreamOutEventParameters>) {
        return ClientEvents.onWorldObjectStreamOut(callback);
    }

    public onceWorldObjectStreamOut(callback: ClientEvents.GenericEventCallback<ClientEvents.WorldObjectStreamOutEventParameters>) {
        return ClientEvents.onceWorldObjectStreamOut(callback);
    }

    public onEvent(callback: ClientEvents.GenericEventCallback<SharedEvents.GenericOnEventParameters>) {
        return ClientEvents.onEvent(callback);
    }

    public onBaseObjectCreate(callback: ClientEvents.GenericEventCallback<ClientEvents.BaseObjectCreateEventParameters>) {
        return ClientEvents.onBaseObjectCreate(callback);
    }

    public onBaseObjectRemove(callback: ClientEvents.GenericEventCallback<ClientEvents.BaseObjectRemoveEventParameters>) {
        return ClientEvents.onBaseObjectRemove(callback);
    }

    public onNetOwnerChange(callback: ClientEvents.GenericEventCallback<ClientEvents.NetOwnerChangeEventParameters>) {
        return ClientEvents.onNetOwnerChange(callback);
    }

    public onWeaponDamage(callback: ClientEvents.GenericEventCallback<ClientEvents.WeaponDamageEventParameters>) {
        return ClientEvents.onWeaponDamage(callback);
    }

    public onMetaChange(callback: ClientEvents.GenericEventCallback<ClientEvents.MetaChangeEventParameters>) {
        return ClientEvents.onMetaChange(callback);
    }

    public onLocalMetaChange(callback: ClientEvents.GenericPlayerEventCallback<ClientEvents.LocalMetaChangeEventParameters>) {
        return ClientEvents.onLocalMetaChange(callback);
    }

    public onSyncedMetaChange(callback: ClientEvents.GenericEventCallback<ClientEvents.SyncedMetaChangeEventParameters>) {
        return ClientEvents.onSyncedMetaChange(callback);
    }

    public onStreamSyncedMetaChange(callback: ClientEvents.GenericEventCallback<ClientEvents.StreamSyncedMetaChangeEventParameters>) {
        return ClientEvents.onStreamSyncedMetaChange(callback);
    }

    public onGlobalMetaChange(callback: ClientEvents.GenericEventCallback<ClientEvents.GlobalMetaChangeEventParameters>) {
        return ClientEvents.onGlobalMetaChange(callback);
    }

    public onGlobalSyncedMetaChange(callback: ClientEvents.GenericEventCallback<ClientEvents.GlobalSyncedMetaChangeEventParameters>) {
        return ClientEvents.onGlobalSyncedMetaChange(callback);
    }

    public onEntityColShapeEnter(callback: ClientEvents.GenericEventCallback<ClientEvents.EntityColShapeEnterEventParameters>) {
        return ClientEvents.onEntityColShapeEnter(callback);
    }

    public onEntityColShapeLeave(callback: ClientEvents.GenericEventCallback<ClientEvents.EntityColShapeLeaveEventParameters>) {
        return ClientEvents.onEntityColShapeLeave(callback);
    }

    public onEntityCheckpointEnter(callback: ClientEvents.GenericEventCallback<ClientEvents.EntityCheckpointEnterEventParameters>) {
        return ClientEvents.onEntityCheckpointEnter(callback);
    }

    public onEntityCheckpointLeave(callback: ClientEvents.GenericEventCallback<ClientEvents.EntityCheckpointLeaveEventParameters>) {
        return ClientEvents.onEntityCheckpointLeave(callback);
    }

    public onColShapeEvent(callback: ClientEvents.GenericEventCallback<ClientEvents.ColShapeEventParameters>) {
        return ClientEvents.onColShapeEvent(callback);
    }

    public onConsoleCommand(callback: ClientEvents.GenericEventCallback<ClientEvents.ConsoleCommandEventParameters>) {
        return ClientEvents.onConsoleCommand(callback);
    }

    public onError(callback: ClientEvents.GenericEventCallback<ClientEvents.ErrorEventParameters>) {
        return ClientEvents.onError(callback);
    }

    public onLocalScriptEvent(callback: ClientEvents.GenericEventCallback<ClientEvents.LocalScriptEventParameters>) {
        return ClientEvents.onLocalScriptEvent(callback);
    }

    public onRemoteScriptEvent(callback: ClientEvents.GenericEventCallback<ClientEvents.RemoteScriptEventParameters>) {
        return ClientEvents.onRemoteScriptEvent(callback);
    }

    public onResourceStart(callback: ClientEvents.GenericEventCallback<ClientEvents.ResourceStartEventParameters>) {
        return ClientEvents.onResourceStart(callback);
    }

    public onResourceStop(callback: ClientEvents.GenericEventCallback<ClientEvents.ResourceStopEventParameters>) {
        return ClientEvents.onResourceStop(callback);
    }

    public onResourceError(callback: ClientEvents.GenericEventCallback<ClientEvents.ResourceErrorEventParameters>) {
        return ClientEvents.onResourceError(callback);
    }
}
