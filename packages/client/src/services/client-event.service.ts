import { BaseEventService, MULTIPLAYER_SERVICE, type ScriptEventHandler } from '@altv-mango/core/app';
import { inject, injectable } from 'inversify';
import { INTERNAL_EVENTS, WEBVIEW_LIST_SERVICE } from '../constants';
import type { WebViewListService } from './webview-list.service';
import type { Events as ClientEventsV2, Events as ClientEvents, Player } from '@altv/client';
import type { Events as SharedEvents } from '@altv/shared';
import type { ClientEventEmmiter, EventService } from '../interfaces';
import type { ClientMultiplayerService } from '../interfaces/multiplayer';
import type { IClientEvent as ClientEventsV1 } from 'alt-client';

@injectable()
export class ClientEventService extends BaseEventService<ClientEvents.CustomClientEvent> implements EventService {
    @inject(WEBVIEW_LIST_SERVICE) private readonly $webViewListService: WebViewListService;
    private $altEvents: ClientEventEmmiter;

    public constructor(@inject(MULTIPLAYER_SERVICE) multiplayerService: ClientMultiplayerService) {
        super(multiplayerService.Events);
        this.$altEvents = multiplayerService.Events;
        this.$internalEventNames = new Set(Object.values(INTERNAL_EVENTS));
    }

    public onServer<E extends string>(
        eventName: Exclude<E, keyof SharedEvents.CustomServerToPlayerEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ) {
        const wrapper = (...args: unknown[]) => callback(args[0]);
        const eventHandler = this.$altEvents.onServer(eventName, wrapper);
        this.$remoteHandlers.add(eventHandler);
        return eventHandler;
    }

    public onceServer<E extends string>(
        eventName: Exclude<E, keyof SharedEvents.CustomServerToPlayerEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ) {
        const wrapper = (...args: unknown[]) => callback(args[0]);
        const eventHandler = this.$altEvents.onceServer(eventName, wrapper);
        this.$remoteHandlers.add(eventHandler);
        return eventHandler;
    }

    public emitServer<E extends string>(eventName: Exclude<E, keyof SharedEvents.CustomPlayerToServerEvent>, body?: unknown) {
        this.$altEvents.emitServer(eventName, body);
    }

    public onWebView<E extends string>(
        id: string | number,
        eventName: Exclude<E, keyof SharedEvents.CustomWebViewToClientEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ) {
        const webView = this.$webViewListService.tryGet(id);
        const wrapper = (...args: unknown[]) => callback(args[0]);

        const eventHandler: ScriptEventHandler = {
            destroy() {
                webView.off(eventName, wrapper);
            },
        };

        webView.on(eventName, wrapper);

        this.$remoteHandlers.add(eventHandler);
        return eventHandler;
    }

    public onceWebView<E extends string>(
        id: string | number,
        eventName: Exclude<E, keyof SharedEvents.CustomWebViewToClientEvent>,
        callback: (body: unknown) => void | Promise<void>,
    ) {
        const webView = this.$webViewListService.tryGet(id);
        const wrapper = (...args: any[]) => callback(args[0]);

        const eventHandler: ScriptEventHandler = {
            destroy() {
                webView.off(eventName, wrapper);
            },
        };

        webView.once(eventName, wrapper);

        this.$remoteHandlers.add(eventHandler);
        return eventHandler;
    }

    public emitWebView<E extends string>(
        id: string | number,
        eventName: Exclude<E, keyof SharedEvents.CustomClientToWebViewEvent>,
        body?: unknown,
    ) {
        const webView = this.$webViewListService.tryGet(id);
        webView.emit(eventName, body);
    }

    public onScriptRPC(
        callback: ClientEvents.GenericEventCallback<ClientEvents.ScriptRPCEventParameters>,
    ) {
        return this.$altEvents.on('scriptRPC', callback);
    }

    public onceScriptRPC(
        callback: ClientEvents.GenericEventCallback<ClientEvents.ScriptRPCEventParameters>,
    ) {
        return this.$altEvents.once('scriptRPC', callback);
    }

    public onScriptRPCAnswer(
        callback: ClientEvents.GenericEventCallback<ClientEvents.ScriptRPCAnswerEventParameters>,
    ) {
        return this.$altEvents.on('scriptRPCAnswer', callback);
    }

    public onceScriptRPCAnswer(
        callback: ClientEvents.GenericEventCallback<ClientEvents.ScriptRPCAnswerEventParameters>,
    ) {
        return this.$altEvents.once('scriptRPCAnswer', callback);
    }

    public onKeyboardEvent(
        callback: ClientEvents.GenericEventCallback<ClientEvents.KeyboardEventParameters>,
    ) {
        return this.$altEvents.on('keyboardEvent', callback);
    }

    public onceKeyboardEvent(
        callback: ClientEvents.GenericEventCallback<ClientEvents.KeyboardEventParameters>,
    ) {
        return this.$altEvents.once('keyboardEvent', callback);
    }

    public onKeyUp(
        callback: ClientEvents.GenericEventCallback<ClientEvents.KeyUpDownEventParameters> | ClientEventsV2.GenericEventCallback<ClientEventsV1['keyup']>,
    ) {
        return this.$altEvents.on('keyUp', callback);
    }

    public onceKeyUp(
        callback: ClientEvents.GenericEventCallback<ClientEvents.KeyUpDownEventParameters> | ClientEventsV2.GenericEventCallback<ClientEventsV1['keyup']>,
    ) {
        return this.$altEvents.once('keyUp', callback);
    }

    public onKeyDown(
        callback: ClientEvents.GenericEventCallback<ClientEvents.KeyUpDownEventParameters> | ClientEventsV2.GenericEventCallback<ClientEventsV1['keydown']>,
    ) {
        return this.$altEvents.on('keyDown', callback);
    }

    public onceKeyDown(
        callback: ClientEvents.GenericEventCallback<ClientEvents.KeyUpDownEventParameters> | ClientEventsV2.GenericEventCallback<ClientEventsV1['keydown']>,
    ) {
        return this.$altEvents.once('keyDown', callback);
    }

    public onWebViewEvent(
        callback: ClientEvents.GenericEventCallback<ClientEvents.WebViewEventParameters>,
    ) {
        return this.$altEvents.on('webViewEvent', callback);
    }

    public onceWebViewEvent(
        callback: ClientEvents.GenericEventCallback<ClientEvents.WebViewEventParameters>,
    ) {
        return this.$altEvents.once('webViewEvent', callback);
    }

    public onWebSocketEvent(
        callback: ClientEvents.GenericEventCallback<ClientEvents.WebSocketEventParameters>,
    ) {
        return this.$altEvents.on('webSocketEvent', callback);
    }

    public onceWebSocketEvent(
        callback: ClientEvents.GenericEventCallback<ClientEvents.WebSocketEventParameters>,
    ) {
        return this.$altEvents.once('webSocketEvent', callback);
    }

    public onAudioEvent(
        callback: ClientEvents.GenericEventCallback<ClientEvents.AudioEventParameters>,
    ) {
        return this.$altEvents.on('audioEvent', callback);
    }

    public onceAudioEvent(
        callback: ClientEvents.GenericEventCallback<ClientEvents.AudioEventParameters>,
    ) {
        return this.$altEvents.once('audioEvent', callback);
    }

    public onRmluiEvent(
        callback: ClientEvents.GenericEventCallback<ClientEvents.RmluiEventParameters>,
    ) {
        return this.$altEvents.on('rmluiEvent', callback);
    }

    public onceRmluiEvent(
        callback: ClientEvents.GenericEventCallback<ClientEvents.RmluiEventParameters>,
    ) {
        return this.$altEvents.once('rmluiEvent', callback);
    }

    public onWindowFocusChange(
        callback: ClientEvents.GenericEventCallback<ClientEvents.WindowFocusChangeEventParameters> | ClientEventsV2.GenericEventCallback<ClientEventsV1['windowFocusChange']>,
    ) {
        return this.$altEvents.on('windowFocusChange', callback);
    }

    public onceWindowFocusChange(
        callback: ClientEvents.GenericEventCallback<ClientEvents.WindowFocusChangeEventParameters> | ClientEventsV2.GenericEventCallback<ClientEventsV1['windowFocusChange']>,
    ) {
        return this.$altEvents.once('windowFocusChange', callback);
    }

    public onWindowResolutionChange(
        callback: ClientEvents.GenericEventCallback<ClientEvents.WindowResolutionChangeEventParameters> | ClientEventsV2.GenericEventCallback<ClientEventsV1['windowResolutionChange']>,
    ) {
        return this.$altEvents.on('windowResolutionChange', callback);
    }

    public onceWindowResolutionChange(
        callback: ClientEvents.GenericEventCallback<ClientEvents.WindowResolutionChangeEventParameters> | ClientEventsV2.GenericEventCallback<ClientEventsV1['windowResolutionChange']>,
    ) {
        return this.$altEvents.once('windowResolutionChange', callback);
    }

    public onConnectionComplete(
        callback: ClientEvents.GenericEventCallback | ClientEventsV2.GenericEventCallback<ClientEventsV1['connectionComplete']>,
    ) {
        return this.$altEvents.on('connectionComplete', callback);
    }

    public onceConnectionComplete(callback: ClientEvents.GenericEventCallback | ClientEventsV2.GenericEventCallback<ClientEventsV1['connectionComplete']>) {
        return this.$altEvents.once('connectionComplete', callback);
    }

    public onDisconnect(callback: ClientEvents.GenericEventCallback | ClientEventsV2.GenericEventCallback<ClientEventsV1['disconnect']>) {
        return this.$altEvents.on('disconnect', callback);
    }

    public onceDisconnect(callback: ClientEvents.GenericEventCallback | ClientEventsV2.GenericEventCallback<ClientEventsV1['disconnect']>) {
        return this.$altEvents.once('disconnect', callback);
    }

    public onSpawned(callback: ClientEvents.GenericEventCallback | ClientEventsV2.GenericEventCallback<ClientEventsV1['spawned']>) {
        return this.$altEvents.on('spawned', callback);
    }

    public onceSpawned(callback: ClientEvents.GenericEventCallback | ClientEventsV2.GenericEventCallback<ClientEventsV1['spawned']>) {
        return this.$altEvents.once('spawned', callback);
    }

    public onGameEntityCreate(callback: ClientEvents.GenericEventCallback<ClientEvents.GameEntityCreateEventParameters> | ClientEventsV2.GenericEventCallback<ClientEventsV1['gameEntityCreate']>) {
        return this.$altEvents.on('gameEntityCreate', callback);
    }

    public onceGameEntityCreate(callback: ClientEvents.GenericEventCallback<ClientEvents.GameEntityCreateEventParameters> | ClientEventsV2.GenericEventCallback<ClientEventsV1['gameEntityCreate']>) {
        return this.$altEvents.once('gameEntityCreate', callback);
    }

    public onGameEntityDestroy(callback: ClientEvents.GenericEventCallback<ClientEvents.GameEntityDestroyEventParameters> | ClientEventsV2.GenericEventCallback<ClientEventsV1['gameEntityDestroy']>) {
        return this.$altEvents.on('gameEntityDestroy', callback);
    }

    public onceGameEntityDestroy(callback: ClientEvents.GenericEventCallback<ClientEvents.GameEntityDestroyEventParameters> | ClientEventsV2.GenericEventCallback<ClientEventsV1['gameEntityDestroy']>) {
        return this.$altEvents.once('gameEntityDestroy', callback);
    }

    public onEntityHitEntity(callback: ClientEvents.GenericEventCallback<ClientEvents.EntityHitEntityEventParameters> | ClientEventsV2.GenericEventCallback<ClientEventsV1['entityHitEntity']>) {
        return this.$altEvents.on('entityHitEntity', callback);
    }

    public onceEntityHitEntity(callback: ClientEvents.GenericEventCallback<ClientEvents.EntityHitEntityEventParameters> | ClientEventsV2.GenericEventCallback<ClientEventsV1['entityHitEntity']>) {
        return this.$altEvents.once('entityHitEntity', callback);
    }

    public onTaskChange(callback: ClientEvents.GenericEventCallback<ClientEvents.TaskChangeEventParameters> | ClientEventsV2.GenericEventCallback<ClientEventsV1['taskChange']>) {
        return this.$altEvents.on('taskChange', callback);
    }

    public onceTaskChange(callback: ClientEvents.GenericEventCallback<ClientEvents.TaskChangeEventParameters> | ClientEventsV2.GenericEventCallback<ClientEventsV1['taskChange']>) {
        return this.$altEvents.once('taskChange', callback);
    }

    public onPlayerWeaponShoot(callback: ClientEvents.GenericEventCallback<ClientEvents.PlayerWeaponShootEventParameters> | ClientEventsV2.GenericEventCallback<ClientEventsV1['playerWeaponShoot']>) {
        return this.$altEvents.on('playerWeaponShoot', callback);
    }

    public oncePlayerWeaponShoot(callback: ClientEvents.GenericEventCallback<ClientEvents.PlayerWeaponShootEventParameters> | ClientEventsV2.GenericEventCallback<ClientEventsV1['playerWeaponShoot']>) {
        return this.$altEvents.once('playerWeaponShoot', callback);
    }

    public onPlayerBulletHit(callback: ClientEvents.GenericEventCallback<ClientEvents.PlayerBulletHitEventParameters> | ClientEventsV2.GenericEventCallback<ClientEventsV1['playerBulletHit']>) {
        return this.$altEvents.on('playerBulletHit', callback);
    }

    public oncePlayerBulletHit(callback: ClientEvents.GenericEventCallback<ClientEvents.PlayerBulletHitEventParameters> | ClientEventsV2.GenericEventCallback<ClientEventsV1['playerBulletHit']>) {
        return this.$altEvents.once('playerBulletHit', callback);
    }

    public onPlayerWeaponChange(callback: ClientEvents.GenericEventCallback<ClientEvents.PlayerWeaponChangeEventParameters> | ClientEventsV2.GenericEventCallback<ClientEventsV1['playerWeaponChange']>) {
        return this.$altEvents.on('playerWeaponChange', callback);
    }

    public oncePlayerWeaponChange(callback: ClientEvents.GenericEventCallback<ClientEvents.PlayerWeaponChangeEventParameters> | ClientEventsV2.GenericEventCallback<ClientEventsV1['playerWeaponChange']>) {
        return this.$altEvents.once('playerWeaponChange', callback);
    }

    public onPlayerStartVehicleEnter<T extends Player>(
        callback: ClientEvents.GenericPlayerEventCallback<ClientEvents.PlayerStartVehicleEnterEventParameters, T> | ClientEventsV2.GenericEventCallback<ClientEventsV1['startEnteringVehicle']>,
    ) {
        return this.$altEvents.on('playerStartVehicleEnter', callback);
    }

    public oncePlayerStartVehicleEnter<T extends Player>(callback: ClientEvents.GenericPlayerEventCallback<ClientEvents.PlayerStartVehicleEnterEventParameters, T> | ClientEventsV2.GenericEventCallback<ClientEventsV1['startEnteringVehicle']>) {
        return this.$altEvents.once('playerStartVehicleEnter', callback);
    }

    public onPlayerStartVehicleLeave<T extends Player>(
        callback: ClientEvents.GenericPlayerEventCallback<ClientEvents.PlayerStartVehicleLeaveEventParameters, T> | ClientEventsV2.GenericPlayerEventCallback<ClientEventsV1["startLeavingVehicle"]>,
    ) {
        return this.$altEvents.on('playerStartVehicleLeave', callback);
    }

    public oncePlayerStartVehicleLeave<T extends Player>(
        callback: ClientEvents.GenericPlayerEventCallback<ClientEvents.PlayerStartVehicleLeaveEventParameters, T> | ClientEventsV2.GenericPlayerEventCallback<ClientEventsV1["startLeavingVehicle"]>,
    ) {
        return this.$altEvents.once('playerStartVehicleLeave', callback);
    }

    public onPlayerVehicleEntered<T extends Player>(
        callback: ClientEvents.GenericPlayerEventCallback<ClientEvents.PlayerVehicleEnterEventParameters, T> | ClientEventsV2.GenericPlayerEventCallback<ClientEventsV1["enteredVehicle"], T>,
    ) {
        return this.$altEvents.on('playerVehicleEntered', callback);
    }

    public oncePlayerVehicleEntered<T extends Player>(
        callback: ClientEvents.GenericPlayerEventCallback<ClientEvents.PlayerVehicleEnterEventParameters, T> | ClientEventsV2.GenericPlayerEventCallback<ClientEventsV1["enteredVehicle"], T>,
    ) {
        return this.$altEvents.once('playerVehicleEntered', callback);
    }

    public onPlayerVehicleLeft<T extends Player>(
        callback: ClientEvents.GenericPlayerEventCallback<ClientEvents.PlayerVehicleLeaveEventParameters, T> | ClientEventsV2.GenericPlayerEventCallback<ClientEventsV1["leftVehicle"], T>,
    ) {
        return this.$altEvents.on('playerVehicleLeft', callback);
    }

    public oncePlayerVehicleLeft<T extends Player>(
        callback: ClientEvents.GenericPlayerEventCallback<ClientEvents.PlayerVehicleLeaveEventParameters, T> | ClientEventsV2.GenericPlayerEventCallback<ClientEventsV1["leftVehicle"], T>,
    ) {
        return this.$altEvents.once('playerVehicleLeft', callback);
    }

    public onPlayerVehicleSeatChange<T extends Player>(
        callback: ClientEvents.GenericPlayerEventCallback<ClientEvents.PlayerChangeVehicleSeatEventParameters, T> | ClientEventsV2.GenericPlayerEventCallback<ClientEventsV1["changedVehicleSeat"], T>,
    ) {
        return this.$altEvents.on('playerVehicleSeatChange', callback);
    }

    public oncePlayerVehicleSeatChange<T extends Player>(
        callback: ClientEvents.GenericPlayerEventCallback<ClientEvents.PlayerChangeVehicleSeatEventParameters, T> | ClientEventsV2.GenericPlayerEventCallback<ClientEventsV1["changedVehicleSeat"], T>,
    ) {
        return this.$altEvents.once('playerVehicleSeatChange', callback);
    }

    public onVoiceConnectionUpdate(callback: ClientEvents.GenericEventCallback<ClientEvents.VoiceConnectionEventParameters>) {
        return this.$altEvents.on('voiceConnectionUpdate', callback);
    }

    public onceVoiceConnectionUpdate(callback: ClientEvents.GenericEventCallback<ClientEvents.VoiceConnectionEventParameters>) {
        return this.$altEvents.once('voiceConnectionUpdate', callback);
    }

    public onPlayerStartTalking<T extends Player>(callback: ClientEvents.GenericPlayerEventCallback<{}, T> | ClientEventsV2.GenericEventCallback<ClientEventsV1["playerStartTalking"]>) {
        return this.$altEvents.on('playerStartTalking', callback);
    }

    public oncePlayerStartTalking<T extends Player>(callback: ClientEvents.GenericPlayerEventCallback<{}, T> | ClientEventsV2.GenericEventCallback<ClientEventsV1["playerStartTalking"]>) {
        return this.$altEvents.once('playerStartTalking', callback);
    }

    public onPlayerStopTalking<T extends Player>(callback: ClientEvents.GenericPlayerEventCallback<{}, T>  | ClientEventsV2.GenericEventCallback<ClientEventsV1["playerStopTalking"]>) {
        return this.$altEvents.on('playerStopTalking', callback);
    }

    public oncePlayerStopTalking<T extends Player>(callback: ClientEvents.GenericPlayerEventCallback<{}, T>  | ClientEventsV2.GenericEventCallback<ClientEventsV1["playerStopTalking"]>) {
        return this.$altEvents.once('playerStopTalking', callback);
    }

    public onWorldObjectPositionChange(callback: ClientEvents.GenericEventCallback<ClientEvents.WorldObjectPositionChangeEventParameters> | ClientEventsV2.GenericEventCallback<ClientEventsV1["worldObjectPositionChange"]>) {
        return this.$altEvents.on('worldObjectPositionChange', callback);
    }

    public onceWorldObjectPositionChange(
        callback: ClientEvents.GenericEventCallback<ClientEvents.WorldObjectPositionChangeEventParameters> | ClientEventsV2.GenericEventCallback<ClientEventsV1["worldObjectPositionChange"]>,
    ) {
        return this.$altEvents.once('worldObjectPositionChange', callback);
    }

    public onWorldObjectStreamIn(callback: ClientEvents.GenericEventCallback<ClientEvents.WorldObjectStreamInEventParameters> | ClientEventsV2.GenericEventCallback<ClientEventsV1["worldObjectStreamIn"]>) {
        return this.$altEvents.on('worldObjectStreamIn', callback);
    }

    public onceWorldObjectStreamIn(callback: ClientEvents.GenericEventCallback<ClientEvents.WorldObjectStreamInEventParameters> | ClientEventsV2.GenericEventCallback<ClientEventsV1["worldObjectStreamIn"]>) {
        return this.$altEvents.once('worldObjectStreamIn', callback);
    }

    public onWorldObjectStreamOut(callback: ClientEvents.GenericEventCallback<ClientEvents.WorldObjectStreamOutEventParameters> | ClientEventsV2.GenericEventCallback<ClientEventsV1["worldObjectStreamOut"]>) {
        return this.$altEvents.on('worldObjectStreamOut', callback);
    }

    public onceWorldObjectStreamOut(callback: ClientEvents.GenericEventCallback<ClientEvents.WorldObjectStreamOutEventParameters> | ClientEventsV2.GenericEventCallback<ClientEventsV1["worldObjectStreamOut"]>) {
        return this.$altEvents.once('worldObjectStreamOut', callback);
    }

    public onEvent(callback: ClientEvents.GenericEventCallback<SharedEvents.GenericOnEventParameters>) {
        return this.$altEvents.on('event', callback);
    }

    public onBaseObjectCreate(callback: ClientEvents.GenericEventCallback<ClientEvents.BaseObjectCreateEventParameters> | ClientEventsV2.GenericEventCallback<ClientEventsV1["baseObjectCreate"]>) {
        return this.$altEvents.on('baseObjectCreate', callback);
    }

    public onBaseObjectRemove(callback: ClientEvents.GenericEventCallback<ClientEvents.BaseObjectRemoveEventParameters> | ClientEventsV2.GenericEventCallback<ClientEventsV1["baseObjectRemove"]>) {
        return this.$altEvents.on('baseObjectRemove', callback);
    }

    public onNetOwnerChange(callback: ClientEvents.GenericEventCallback<ClientEvents.NetOwnerChangeEventParameters> | ClientEventsV2.GenericEventCallback<ClientEventsV1["netOwnerChange"]>) {
        return this.$altEvents.on('netOwnerChange', callback);
    }

    public onWeaponDamage(callback: ClientEvents.GenericEventCallback<ClientEvents.WeaponDamageEventParameters> | ClientEventsV2.GenericEventCallback<ClientEventsV1["weaponDamage"]>) {
        return this.$altEvents.on('weaponDamage', callback);
    }

    public onMetaChange(callback: ClientEvents.GenericEventCallback<ClientEvents.MetaChangeEventParameters> | ClientEventsV2.GenericEventCallback<ClientEventsV1["metaChange"]>) {
        return this.$altEvents.on('metaChange', callback);
    }

    public onLocalMetaChange(callback: ClientEvents.GenericPlayerEventCallback<ClientEvents.LocalMetaChangeEventParameters> | ClientEventsV2.GenericEventCallback<ClientEventsV1["localMetaChange"]>) {
        return this.$altEvents.on('localMetaChange', callback);
    }

    public onSyncedMetaChange(callback: ClientEvents.GenericEventCallback<ClientEvents.SyncedMetaChangeEventParameters> | ClientEventsV2.GenericEventCallback<ClientEventsV1["syncedMetaChange"]>) {
        return this.$altEvents.on('syncedMetaChange', callback);
    }

    public onStreamSyncedMetaChange(callback: ClientEvents.GenericEventCallback<ClientEvents.StreamSyncedMetaChangeEventParameters> | ClientEventsV2.GenericEventCallback<ClientEventsV1["streamSyncedMetaChange"]>) {
        return this.$altEvents.on('streamSyncedMetaChange', callback);
    }

    public onGlobalMetaChange(callback: ClientEvents.GenericEventCallback<ClientEvents.GlobalMetaChangeEventParameters> | ClientEventsV2.GenericEventCallback<ClientEventsV1["globalMetaChange"]>) {
        return this.$altEvents.on('globalMetaChange', callback);
    }

    public onGlobalSyncedMetaChange(callback: ClientEvents.GenericEventCallback<ClientEvents.GlobalSyncedMetaChangeEventParameters> | ClientEventsV2.GenericEventCallback<ClientEventsV1["globalSyncedMetaChange"]>) {
        return this.$altEvents.on('globalSyncedMetaChange', callback);
    }

    public onEntityColShapeEnter(callback: ClientEvents.GenericEventCallback<ClientEvents.EntityColShapeEnterEventParameters> | ClientEventsV2.GenericEventCallback<ClientEventsV1["entityEnterColshape"]>) {
        return this.$altEvents.on('entityColShapeEnter', callback);
    }

    public onEntityColShapeLeave(callback: ClientEvents.GenericEventCallback<ClientEvents.EntityColShapeLeaveEventParameters> | ClientEventsV2.GenericEventCallback<ClientEventsV1["entityLeaveColshape"]>) {
        return this.$altEvents.on('entityColShapeLeave', callback);
    }

    public onEntityCheckpointEnter(callback: ClientEvents.GenericEventCallback<ClientEvents.EntityCheckpointEnterEventParameters>) {
        return this.$altEvents.on('entityCheckpointEnter', callback);
    }

    public onEntityCheckpointLeave(callback: ClientEvents.GenericEventCallback<ClientEvents.EntityCheckpointLeaveEventParameters>) {
        return this.$altEvents.on('entityCheckpointLeave', callback);
    }

    public onColShapeEvent(callback: ClientEvents.GenericEventCallback<ClientEvents.ColShapeEventParameters>) {
        return this.$altEvents.on('colShapeEvent', callback);
    }

    public onConsoleCommand(callback: ClientEvents.GenericEventCallback<ClientEvents.ConsoleCommandEventParameters> | ClientEventsV2.GenericEventCallback<ClientEventsV1["consoleCommand"]>) {
        return this.$altEvents.on('consoleCommand', callback);
    }

    public onError(callback: ClientEvents.GenericEventCallback<ClientEvents.ErrorEventParameters>) {
        return this.$altEvents.on('error', callback);
    }

    public onLocalScriptEvent(callback: ClientEvents.GenericEventCallback<ClientEvents.LocalScriptEventParameters>) {
        return this.$altEvents.on('localScriptEvent', callback);
    }

    public onRemoteScriptEvent(callback: ClientEvents.GenericEventCallback<ClientEvents.RemoteScriptEventParameters>) {
        return this.$altEvents.on('remoteScriptEvent', callback);
    }

    public onResourceStart(callback: ClientEvents.GenericEventCallback<ClientEvents.ResourceStartEventParameters> | ClientEventsV2.GenericEventCallback<ClientEventsV1["resourceStart"]>) {
        return this.$altEvents.on('resourceStart', callback);
    }

    public onResourceStop(callback: ClientEvents.GenericEventCallback<ClientEvents.ResourceStopEventParameters> | ClientEventsV2.GenericEventCallback<ClientEventsV1["resourceStop"]>) {
        return this.$altEvents.on('resourceStop', callback);
    }

    public onResourceError(callback: ClientEvents.GenericEventCallback<ClientEvents.ResourceErrorEventParameters> | ClientEventsV2.GenericEventCallback<ClientEventsV1["resourceError"]>) {
        return this.$altEvents.on('resourceError', callback);
    }
}
