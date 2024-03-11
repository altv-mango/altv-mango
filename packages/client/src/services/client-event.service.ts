import { BaseEventService } from '@altv-mango/core/app';
import { inject, injectable } from 'inversify';
import { INTERNAL_EVENTS, WEBVIEW_LIST_SERVICE } from '../constants';
import type { WebViewListService } from './webview-list.service';
import * as altClient from '@altv/client';
import * as altShared from '@altv/shared';
import type { EventService } from '../interfaces';

@injectable()
export class ClientEventService extends BaseEventService<altClient.Events.CustomClientEvent> implements EventService {
    @inject(WEBVIEW_LIST_SERVICE) private readonly $webViewListService: WebViewListService;

    public constructor() {
        super();

        this.$altEvents = altClient.Events;
        this.$internalEventNames = new Set(Object.values(INTERNAL_EVENTS));
    }

    public onServer<E extends keyof altShared.Events.CustomServerToPlayerEvent>(
        eventName: E,
        callback: (
            body: Parameters<altShared.Events.CustomServerToPlayerEvent[E]>[0],
        ) => ReturnType<altShared.Events.CustomServerToPlayerEvent[E]>,
    ): altShared.Events.ScriptEventHandler;
    public onServer<E extends string>(
        eventName: Exclude<E, keyof altShared.Events.CustomServerToPlayerEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): altShared.Events.ScriptEventHandler;
    public onServer<E extends string>(
        eventName: Exclude<E, keyof altShared.Events.CustomServerToPlayerEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ) {
        const wrapper = (...args: unknown[]) => callback(args[0]);
        const eventHandler = altClient.Events.onServer(eventName, wrapper);
        this.$remoteHandlers.add(eventHandler);
        return eventHandler;
    }

    public onceServer<E extends keyof altShared.Events.CustomServerToPlayerEvent>(
        eventName: E,
        callback: (
            body: Parameters<altShared.Events.CustomServerToPlayerEvent[E]>[0],
        ) => ReturnType<altShared.Events.CustomServerToPlayerEvent[E]>,
    ): altShared.Events.ScriptEventHandler;
    public onceServer<E extends string>(
        eventName: Exclude<E, keyof altShared.Events.CustomServerToPlayerEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): altShared.Events.ScriptEventHandler;
    public onceServer<E extends string>(
        eventName: Exclude<E, keyof altShared.Events.CustomServerToPlayerEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ) {
        const wrapper = (...args: unknown[]) => callback(args[0]);
        const eventHandler = this.$altEvents.onceServer(eventName, wrapper);
        this.$remoteHandlers.add(eventHandler);
        return eventHandler;
    }

    public emitServer<E extends keyof altShared.Events.CustomPlayerToServerEvent>(
        eventName: E,
        body: Parameters<altShared.Events.CustomPlayerToServerEvent[E]>[0],
    ): void;
    public emitServer<E extends string>(eventName: Exclude<E, keyof altShared.Events.CustomPlayerToServerEvent>, body?: unknown): void;
    public emitServer<E extends string>(eventName: Exclude<E, keyof altShared.Events.CustomPlayerToServerEvent>, body?: unknown) {
        this.$altEvents.emitServer(eventName, body);
    }

    public onWebView<E extends keyof altShared.Events.CustomWebViewToClientEvent>(
        id: string | number,
        eventName: E,
        callback: (
            body: Parameters<altShared.Events.CustomWebViewToClientEvent[E]>[0],
        ) => ReturnType<altShared.Events.CustomWebViewToClientEvent[E]>,
    ): altShared.Events.ScriptEventHandler;
    public onWebView<E extends string>(
        id: string | number,
        eventName: Exclude<E, keyof altShared.Events.CustomWebViewToClientEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): altShared.Events.ScriptEventHandler;
    public onWebView<E extends string>(
        id: string | number,
        eventName: Exclude<E, keyof altShared.Events.CustomWebViewToClientEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ) {
        const webView = this.$webViewListService.tryGet(id);
        const wrapper = (...args: unknown[]) => callback(args[0]);

        const eventHandler: altShared.Events.ScriptEventHandler = {
            destroy() {
                // @ts-ignore
                this.valid = false;
                webView.off(eventName, wrapper);
            },
            eventName,
            eventType: altClient.Enums.EventType.WEB_VIEW_EVENT,
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

    public onceWebView<E extends keyof altShared.Events.CustomWebViewToClientEvent>(
        id: string | number,
        eventName: E,
        callback: (
            body: Parameters<altShared.Events.CustomWebViewToClientEvent[E]>[0],
        ) => ReturnType<altShared.Events.CustomWebViewToClientEvent[E]>,
    ): altShared.Events.ScriptEventHandler;
    public onceWebView<E extends string>(
        id: string | number,
        eventName: Exclude<E, keyof altShared.Events.CustomWebViewToClientEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ): altShared.Events.ScriptEventHandler;
    public onceWebView<E extends string>(
        id: string | number,
        eventName: Exclude<E, keyof altShared.Events.CustomWebViewToClientEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ) {
        const webView = this.$webViewListService.tryGet(id);
        const wrapper = (...args: any[]) => callback(args[0]);

        const eventHandler: altShared.Events.ScriptEventHandler = {
            destroy() {
                // @ts-ignore
                this.valid = false;
                webView.off(eventName, wrapper);
            },
            eventName,
            eventType: altClient.Enums.EventType.WEB_VIEW_EVENT,
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

    public emitWebView<E extends keyof altShared.Events.CustomClientToWebViewEvent>(
        id: string | number,
        eventName: E,
        body: Parameters<altShared.Events.CustomClientToWebViewEvent[E]>[0],
    ): void;
    public emitWebView<E extends string>(
        id: string | number,
        eventName: Exclude<E, keyof altShared.Events.CustomClientToWebViewEvent>,
        body?: unknown,
    ): void;
    public emitWebView<E extends string>(
        id: string | number,
        eventName: Exclude<E, keyof altShared.Events.CustomClientToWebViewEvent>,
        body?: unknown,
    ) {
        const webView = this.$webViewListService.tryGet(id);
        webView.emit(eventName, body);
    }

    public onScriptRPC(callback: altClient.Events.GenericEventCallback<altClient.Events.ScriptRPCEventParameters>) {
        return altClient.Events.onScriptRPC(callback);
    }

    public onceScriptRPC(callback: altClient.Events.GenericEventCallback<altClient.Events.ScriptRPCEventParameters>) {
        return altClient.Events.onceScriptRPC(callback);
    }

    public onScriptRPCAnswer(callback: altClient.Events.GenericEventCallback<altClient.Events.ScriptRPCAnswerEventParameters>) {
        return altClient.Events.onScriptRPCAnswer(callback);
    }

    public onceScriptRPCAnswer(callback: altClient.Events.GenericEventCallback<altClient.Events.ScriptRPCAnswerEventParameters>) {
        return altClient.Events.onceScriptRPCAnswer(callback);
    }

    public onKeyboardEvent(callback: altClient.Events.GenericEventCallback<altClient.Events.KeyboardEventParameters>) {
        return altClient.Events.onKeyboardEvent(callback);
    }

    public onceKeyboardEvent(callback: altClient.Events.GenericEventCallback<altClient.Events.KeyboardEventParameters>) {
        return altClient.Events.onceKeyboardEvent(callback);
    }

    public onKeyUp(callback: altClient.Events.GenericEventCallback<altClient.Events.KeyUpDownEventParameters>) {
        return altClient.Events.onKeyUp(callback);
    }

    public onceKeyUp(callback: altClient.Events.GenericEventCallback<altClient.Events.KeyUpDownEventParameters>) {
        return altClient.Events.onceKeyUp(callback);
    }

    public onKeyDown(callback: altClient.Events.GenericEventCallback<altClient.Events.KeyUpDownEventParameters>) {
        return altClient.Events.onKeyDown(callback);
    }

    public onceKeyDown(callback: altClient.Events.GenericEventCallback<altClient.Events.KeyUpDownEventParameters>) {
        return altClient.Events.onceKeyDown(callback);
    }

    public onWebViewEvent(callback: altClient.Events.GenericEventCallback<altClient.Events.WebViewEventParameters>) {
        return altClient.Events.onWebViewEvent(callback);
    }

    public onceWebViewEvent(callback: altClient.Events.GenericEventCallback<altClient.Events.WebViewEventParameters>) {
        return altClient.Events.onceWebViewEvent(callback);
    }

    public onWebSocketEvent(callback: altClient.Events.GenericEventCallback<altClient.Events.WebSocketEventParameters>) {
        return altClient.Events.onWebSocketEvent(callback);
    }

    public onceWebSocketEvent(callback: altClient.Events.GenericEventCallback<altClient.Events.WebSocketEventParameters>) {
        return altClient.Events.onceWebSocketEvent(callback);
    }

    public onAudioEvent(callback: altClient.Events.GenericEventCallback<altClient.Events.AudioEventParameters>) {
        return altClient.Events.onAudioEvent(callback);
    }

    public onceAudioEvent(callback: altClient.Events.GenericEventCallback<altClient.Events.AudioEventParameters>) {
        return altClient.Events.onceAudioEvent(callback);
    }

    public onRmluiEvent(callback: altClient.Events.GenericEventCallback<altClient.Events.RmluiEventParameters>) {
        return altClient.Events.onRmluiEvent(callback);
    }

    public onceRmluiEvent(callback: altClient.Events.GenericEventCallback<altClient.Events.RmluiEventParameters>) {
        return altClient.Events.onceRmluiEvent(callback);
    }

    public onWindowFocusChange(callback: altClient.Events.GenericEventCallback<altClient.Events.WindowFocusChangeEventParameters>) {
        return altClient.Events.onWindowFocusChange(callback);
    }

    public onceWindowFocusChange(callback: altClient.Events.GenericEventCallback<altClient.Events.WindowFocusChangeEventParameters>) {
        return altClient.Events.onceWindowFocusChange(callback);
    }

    public onWindowResolutionChange(
        callback: altClient.Events.GenericEventCallback<altClient.Events.WindowResolutionChangeEventParameters>,
    ) {
        return altClient.Events.onWindowResolutionChange(callback);
    }

    public onceWindowResolutionChange(
        callback: altClient.Events.GenericEventCallback<altClient.Events.WindowResolutionChangeEventParameters>,
    ) {
        return altClient.Events.onceWindowResolutionChange(callback);
    }

    public onConnectionComplete(callback: altClient.Events.GenericEventCallback) {
        return altClient.Events.onConnectionComplete(callback);
    }

    public onceConnectionComplete(callback: altClient.Events.GenericEventCallback) {
        return altClient.Events.onceConnectionComplete(callback);
    }

    public onDisconnect(callback: altClient.Events.GenericEventCallback) {
        return altClient.Events.onDisconnect(callback);
    }

    public onceDisconnect(callback: altClient.Events.GenericEventCallback) {
        return altClient.Events.onceDisconnect(callback);
    }

    public onSpawned(callback: altClient.Events.GenericEventCallback) {
        return altClient.Events.onSpawned(callback);
    }

    public onceSpawned(callback: altClient.Events.GenericEventCallback) {
        return altClient.Events.onceSpawned(callback);
    }

    public onGameEntityCreate(callback: altClient.Events.GenericEventCallback<altClient.Events.GameEntityCreateEventParameters>) {
        return altClient.Events.onGameEntityCreate(callback);
    }

    public onceGameEntityCreate(callback: altClient.Events.GenericEventCallback<altClient.Events.GameEntityCreateEventParameters>) {
        return altClient.Events.onceGameEntityCreate(callback);
    }

    public onGameEntityDestroy(callback: altClient.Events.GenericEventCallback<altClient.Events.GameEntityDestroyEventParameters>) {
        return altClient.Events.onGameEntityDestroy(callback);
    }

    public onceGameEntityDestroy(callback: altClient.Events.GenericEventCallback<altClient.Events.GameEntityDestroyEventParameters>) {
        return altClient.Events.onceGameEntityDestroy(callback);
    }

    public onEntityHitEntity(callback: altClient.Events.GenericEventCallback<altClient.Events.EntityHitEntityEventParameters>) {
        return altClient.Events.onEntityHitEntity(callback);
    }

    public onceEntityHitEntity(callback: altClient.Events.GenericEventCallback<altClient.Events.EntityHitEntityEventParameters>) {
        return altClient.Events.onceEntityHitEntity(callback);
    }

    public onTaskChange(callback: altClient.Events.GenericEventCallback<altClient.Events.TaskChangeEventParameters>) {
        return altClient.Events.onTaskChange(callback);
    }

    public onceTaskChange(callback: altClient.Events.GenericEventCallback<altClient.Events.TaskChangeEventParameters>) {
        return altClient.Events.onceTaskChange(callback);
    }

    public onPlayerWeaponShoot(callback: altClient.Events.GenericEventCallback<altClient.Events.PlayerWeaponShootEventParameters>) {
        return altClient.Events.onPlayerWeaponShoot(callback);
    }

    public oncePlayerWeaponShoot(callback: altClient.Events.GenericEventCallback<altClient.Events.PlayerWeaponShootEventParameters>) {
        return altClient.Events.oncePlayerWeaponShoot(callback);
    }

    public onPlayerBulletHit(callback: altClient.Events.GenericEventCallback<altClient.Events.PlayerBulletHitEventParameters>) {
        return altClient.Events.onPlayerBulletHit(callback);
    }

    public oncePlayerBulletHit(callback: altClient.Events.GenericEventCallback<altClient.Events.PlayerBulletHitEventParameters>) {
        return altClient.Events.oncePlayerBulletHit(callback);
    }

    public onPlayerWeaponChange(callback: altClient.Events.GenericEventCallback<altClient.Events.PlayerWeaponChangeEventParameters>) {
        return altClient.Events.onPlayerWeaponChange(callback);
    }

    public oncePlayerWeaponChange(callback: altClient.Events.GenericEventCallback<altClient.Events.PlayerWeaponChangeEventParameters>) {
        return altClient.Events.oncePlayerWeaponChange(callback);
    }

    public onPlayerStartVehicleEnter<T extends altClient.Player>(
        callback: altClient.Events.GenericPlayerEventCallback<altClient.Events.PlayerStartVehicleEnterEventParameters, T>,
    ) {
        return altClient.Events.onPlayerStartVehicleEnter(callback);
    }

    public oncePlayerStartVehicleEnter<T extends altClient.Player>(
        callback: altClient.Events.GenericPlayerEventCallback<altClient.Events.PlayerStartVehicleEnterEventParameters, T>,
    ) {
        return altClient.Events.oncePlayerStartVehicleEnter(callback);
    }

    public onPlayerStartVehicleLeave<T extends altClient.Player>(
        callback: altClient.Events.GenericPlayerEventCallback<altClient.Events.PlayerStartVehicleLeaveEventParameters, T>,
    ) {
        return altClient.Events.onPlayerStartVehicleLeave(callback);
    }

    public oncePlayerStartVehicleLeave<T extends altClient.Player>(
        callback: altClient.Events.GenericPlayerEventCallback<altClient.Events.PlayerStartVehicleLeaveEventParameters, T>,
    ) {
        return altClient.Events.oncePlayerStartVehicleLeave(callback);
    }

    public onPlayerVehicleEntered<T extends altClient.Player>(
        callback: altClient.Events.GenericPlayerEventCallback<altClient.Events.PlayerVehicleEnterEventParameters, T>,
    ) {
        return altClient.Events.onPlayerVehicleEntered(callback);
    }

    public oncePlayerVehicleEntered<T extends altClient.Player>(
        callback: altClient.Events.GenericPlayerEventCallback<altClient.Events.PlayerVehicleEnterEventParameters, T>,
    ) {
        return altClient.Events.oncePlayerVehicleEntered(callback);
    }

    public onPlayerVehicleLeft<T extends altClient.Player>(
        callback: altClient.Events.GenericPlayerEventCallback<altClient.Events.PlayerVehicleLeaveEventParameters, T>,
    ) {
        return altClient.Events.onPlayerVehicleLeft(callback);
    }

    public oncePlayerVehicleLeft<T extends altClient.Player>(
        callback: altClient.Events.GenericPlayerEventCallback<altClient.Events.PlayerVehicleLeaveEventParameters, T>,
    ) {
        return altClient.Events.oncePlayerVehicleLeft(callback);
    }

    public onPlayerVehicleSeatChange<T extends altClient.Player>(
        callback: altClient.Events.GenericPlayerEventCallback<altClient.Events.PlayerChangeVehicleSeatEventParameters, T>,
    ) {
        return altClient.Events.onPlayerVehicleSeatChange(callback);
    }

    public oncePlayerVehicleSeatChange<T extends altClient.Player>(
        callback: altClient.Events.GenericPlayerEventCallback<altClient.Events.PlayerChangeVehicleSeatEventParameters, T>,
    ) {
        return altClient.Events.oncePlayerVehicleSeatChange(callback);
    }

    public onVoiceConnectionUpdate(callback: altClient.Events.GenericEventCallback<altClient.Events.VoiceConnectionEventParameters>) {
        return altClient.Events.onVoiceConnectionUpdate(callback);
    }

    public onceVoiceConnectionUpdate(callback: altClient.Events.GenericEventCallback<altClient.Events.VoiceConnectionEventParameters>) {
        return altClient.Events.onceVoiceConnectionUpdate(callback);
    }

    public onPlayerStartTalking<T extends altClient.Player>(callback: altClient.Events.GenericPlayerEventCallback<{}, T>) {
        return altClient.Events.onPlayerStartTalking(callback);
    }

    public oncePlayerStartTalking<T extends altClient.Player>(callback: altClient.Events.GenericPlayerEventCallback<{}, T>) {
        return altClient.Events.oncePlayerStartTalking(callback);
    }

    public onPlayerStopTalking<T extends altClient.Player>(callback: altClient.Events.GenericPlayerEventCallback<{}, T>) {
        return altClient.Events.onPlayerStopTalking(callback);
    }

    public oncePlayerStopTalking<T extends altClient.Player>(callback: altClient.Events.GenericPlayerEventCallback<{}, T>) {
        return altClient.Events.oncePlayerStopTalking(callback);
    }

    public onPedDeath(callback: altClient.Events.GenericEventCallback<altClient.Events.PedDeathEventParameters>) {
        return altClient.Events.onPedDeath(callback);
    }

    public oncePedDeath(callback: altClient.Events.GenericEventCallback<altClient.Events.PedDeathEventParameters>) {
        return altClient.Events.oncePedDeath(callback);
    }

    public onPedDamage(callback: altClient.Events.GenericEventCallback<altClient.Events.PedDamageEventParameters>) {
        return altClient.Events.onPedDamage(callback);
    }

    public onWorldObjectPositionChange(
        callback: altClient.Events.GenericEventCallback<altClient.Events.WorldObjectPositionChangeEventParameters>,
    ) {
        return altClient.Events.onWorldObjectPositionChange(callback);
    }

    public onceWorldObjectPositionChange(
        callback: altClient.Events.GenericEventCallback<altClient.Events.WorldObjectPositionChangeEventParameters>,
    ) {
        return altClient.Events.onceWorldObjectPositionChange(callback);
    }

    public onWorldObjectStreamIn(callback: altClient.Events.GenericEventCallback<altClient.Events.WorldObjectStreamInEventParameters>) {
        return altClient.Events.onWorldObjectStreamIn(callback);
    }

    public onceWorldObjectStreamIn(callback: altClient.Events.GenericEventCallback<altClient.Events.WorldObjectStreamInEventParameters>) {
        return altClient.Events.onceWorldObjectStreamIn(callback);
    }

    public onWorldObjectStreamOut(callback: altClient.Events.GenericEventCallback<altClient.Events.WorldObjectStreamOutEventParameters>) {
        return altClient.Events.onWorldObjectStreamOut(callback);
    }

    public onceWorldObjectStreamOut(callback: altClient.Events.GenericEventCallback<altClient.Events.WorldObjectStreamOutEventParameters>) {
        return altClient.Events.onceWorldObjectStreamOut(callback);
    }

    public onEvent(callback: altClient.Events.GenericEventCallback<altShared.Events.GenericOnEventParameters>) {
        return altClient.Events.onEvent(callback);
    }

    public onBaseObjectCreate(callback: altClient.Events.GenericEventCallback<altClient.Events.BaseObjectCreateEventParameters>) {
        return altClient.Events.onBaseObjectCreate(callback);
    }

    public onBaseObjectRemove(callback: altClient.Events.GenericEventCallback<altClient.Events.BaseObjectRemoveEventParameters>) {
        return altClient.Events.onBaseObjectRemove(callback);
    }

    public onNetOwnerChange(callback: altClient.Events.GenericEventCallback<altClient.Events.NetOwnerChangeEventParameters>) {
        return altClient.Events.onNetOwnerChange(callback);
    }

    public onWeaponDamage(callback: altClient.Events.GenericEventCallback<altClient.Events.WeaponDamageEventParameters>) {
        return altClient.Events.onWeaponDamage(callback);
    }

    public onMetaChange(callback: altClient.Events.GenericEventCallback<altClient.Events.MetaChangeEventParameters>) {
        return altClient.Events.onMetaChange(callback);
    }

    public onLocalMetaChange(callback: altClient.Events.GenericPlayerEventCallback<altClient.Events.LocalMetaChangeEventParameters>) {
        return altClient.Events.onLocalMetaChange(callback);
    }

    public onSyncedMetaChange(callback: altClient.Events.GenericEventCallback<altClient.Events.SyncedMetaChangeEventParameters>) {
        return altClient.Events.onSyncedMetaChange(callback);
    }

    public onStreamSyncedMetaChange(
        callback: altClient.Events.GenericEventCallback<altClient.Events.StreamSyncedMetaChangeEventParameters>,
    ) {
        return altClient.Events.onStreamSyncedMetaChange(callback);
    }

    public onGlobalMetaChange(callback: altClient.Events.GenericEventCallback<altClient.Events.GlobalMetaChangeEventParameters>) {
        return altClient.Events.onGlobalMetaChange(callback);
    }

    public onGlobalSyncedMetaChange(
        callback: altClient.Events.GenericEventCallback<altClient.Events.GlobalSyncedMetaChangeEventParameters>,
    ) {
        return altClient.Events.onGlobalSyncedMetaChange(callback);
    }

    public onEntityColShapeEnter(callback: altClient.Events.GenericEventCallback<altClient.Events.EntityColShapeEnterEventParameters>) {
        return altClient.Events.onEntityColShapeEnter(callback);
    }

    public onEntityColShapeLeave(callback: altClient.Events.GenericEventCallback<altClient.Events.EntityColShapeLeaveEventParameters>) {
        return altClient.Events.onEntityColShapeLeave(callback);
    }

    public onEntityCheckpointEnter(callback: altClient.Events.GenericEventCallback<altClient.Events.EntityCheckpointEnterEventParameters>) {
        return altClient.Events.onEntityCheckpointEnter(callback);
    }

    public onEntityCheckpointLeave(callback: altClient.Events.GenericEventCallback<altClient.Events.EntityCheckpointLeaveEventParameters>) {
        return altClient.Events.onEntityCheckpointLeave(callback);
    }

    public onColShapeEvent(callback: altClient.Events.GenericEventCallback<altClient.Events.ColShapeEventParameters>) {
        return altClient.Events.onColShapeEvent(callback);
    }

    public onConsoleCommand(callback: altClient.Events.GenericEventCallback<altClient.Events.ConsoleCommandEventParameters>) {
        return altClient.Events.onConsoleCommand(callback);
    }

    public onError(callback: altClient.Events.GenericEventCallback<altClient.Events.ErrorEventParameters>) {
        return altClient.Events.onError(callback);
    }

    public onLocalScriptEvent(callback: altClient.Events.GenericEventCallback<altClient.Events.LocalScriptEventParameters>) {
        return altClient.Events.onLocalScriptEvent(callback);
    }

    public onRemoteScriptEvent(callback: altClient.Events.GenericEventCallback<altClient.Events.RemoteScriptEventParameters>) {
        return altClient.Events.onRemoteScriptEvent(callback);
    }

    public onResourceStart(callback: altClient.Events.GenericEventCallback<altClient.Events.ResourceStartEventParameters>) {
        return altClient.Events.onResourceStart(callback);
    }

    public onResourceStop(callback: altClient.Events.GenericEventCallback<altClient.Events.ResourceStopEventParameters>) {
        return altClient.Events.onResourceStop(callback);
    }

    public onResourceError(callback: altClient.Events.GenericEventCallback<altClient.Events.ResourceErrorEventParameters>) {
        return altClient.Events.onResourceError(callback);
    }
}
