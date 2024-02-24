import { BaseEventService } from '@altv-mango/core/app';
import { injectable } from 'inversify';
import { INTERNAL_EVENTS } from '../constants';
import type { EventService } from '../interfaces';
import * as altServer from '@altv/server';
import * as altShared from '@altv/shared';

@injectable()
export class ClientEventService extends BaseEventService<altServer.Events.CustomServerEvent> implements EventService {
    public constructor() {
        super();

        this.$altEvents = altServer.Events;
        this.$internalEventNames = new Set(Object.values(INTERNAL_EVENTS));
    }

    public onPlayer<E extends keyof altShared.Events.CustomPlayerToServerEvent, U extends altServer.Player>(
        eventName: E,
        callback: (
            player: U,
            body: Parameters<altShared.Events.CustomPlayerToServerEvent[E]>[0],
        ) => ReturnType<altShared.Events.CustomPlayerToServerEvent[E]>,
    ): altShared.Events.ScriptEventHandler;
    public onPlayer<E extends string, U extends altServer.Player>(
        eventName: Exclude<E, keyof altShared.Events.CustomPlayerToServerEvent>,
        callback: (player: U, body: unknown) => void | Promise<void>,
    ): altShared.Events.ScriptEventHandler;
    public onPlayer<E extends string, U extends altServer.Player>(
        eventName: Exclude<E, keyof altShared.Events.CustomPlayerToServerEvent>,
        callback: (player: U, body: unknown) => void | Promise<void>,
    ): altShared.Events.ScriptEventHandler {
        const wrapper = (player: U, ...args: any[]) => callback(player, args[0]);
        const eventHandler = altServer.Events.onPlayer(eventName, wrapper);
        this.$remoteHandlers.add(eventHandler);
        return eventHandler;
    }

    public oncePlayer<E extends keyof altShared.Events.CustomPlayerToServerEvent, U extends altServer.Player>(
        eventName: E,
        callback: (
            player: U,
            body: Parameters<altShared.Events.CustomPlayerToServerEvent[E]>[0],
        ) => ReturnType<altShared.Events.CustomPlayerToServerEvent[E]>,
    ): altShared.Events.ScriptEventHandler;
    public oncePlayer<E extends string, U extends altServer.Player>(
        eventName: Exclude<E, keyof altShared.Events.CustomPlayerToServerEvent>,
        callback: (player: U, body: unknown) => void | Promise<void>,
    ): altShared.Events.ScriptEventHandler;
    public oncePlayer<E extends string, U extends altServer.Player>(
        eventName: Exclude<E, keyof altShared.Events.CustomPlayerToServerEvent>,
        callback: (player: U, body: unknown) => void | Promise<void>,
    ): altShared.Events.ScriptEventHandler {
        const wrapper = (player: U, ...args: any[]) => callback(player, args[0]!);
        const eventHandler = altServer.Events.oncePlayer(eventName, wrapper);
        this.$remoteHandlers.add(eventHandler);
        return eventHandler;
    }

    public onRemote<E extends keyof altShared.Events.CustomPlayerToServerEvent, U extends altServer.Player>(
        eventName: E,
        callback: (
            player: U,
            body: Parameters<altShared.Events.CustomPlayerToServerEvent[E]>[0],
        ) => ReturnType<altShared.Events.CustomPlayerToServerEvent[E]>,
    ): altShared.Events.ScriptEventHandler;
    public onRemote<E extends string, U extends altServer.Player>(
        eventName: Exclude<E, keyof altShared.Events.CustomPlayerToServerEvent>,
        callback: (player: U, body: unknown) => void | Promise<void>,
    ): altShared.Events.ScriptEventHandler;
    public onRemote<E extends string, U extends altServer.Player>(
        eventName: Exclude<E, keyof altShared.Events.CustomPlayerToServerEvent>,
        callback: (player: U, body: unknown) => void | Promise<void>,
    ): altShared.Events.ScriptEventHandler {
        return this.onPlayer(eventName, callback);
    }

    public onceRemote<E extends keyof altShared.Events.CustomPlayerToServerEvent, U extends altServer.Player>(
        eventName: E,
        callback: (
            player: U,
            body: Parameters<altShared.Events.CustomPlayerToServerEvent[E]>[0],
        ) => ReturnType<altShared.Events.CustomPlayerToServerEvent[E]>,
    ): altShared.Events.ScriptEventHandler;
    public onceRemote<E extends string, U extends altServer.Player>(
        eventName: Exclude<E, keyof altShared.Events.CustomPlayerToServerEvent>,
        callback: (player: U, body: unknown) => void | Promise<void>,
    ): altShared.Events.ScriptEventHandler;
    public onceRemote<E extends string, U extends altServer.Player>(
        eventName: Exclude<E, keyof altShared.Events.CustomPlayerToServerEvent>,
        callback: (player: U, body: unknown) => void | Promise<void>,
    ): altShared.Events.ScriptEventHandler {
        return this.oncePlayer(eventName, callback);
    }

    public emitPlayers<E extends keyof altShared.Events.CustomServerToPlayerEvent, U extends altServer.Player>(
        players: U[],
        eventName: E,
        body?: Parameters<altShared.Events.CustomServerToPlayerEvent[E]>[0],
    ): void;
    public emitPlayers<E extends string, U extends altServer.Player>(
        players: U[],
        eventName: Exclude<E, keyof altShared.Events.CustomServerToPlayerEvent>,
        body?: unknown,
    ): void;
    public emitPlayers<E extends string, U extends altServer.Player>(
        players: U[],
        eventName: Exclude<E, keyof altShared.Events.CustomServerToPlayerEvent>,
        body?: unknown,
    ): void {
        for (const player of players) {
            player.emitRaw(eventName, body);
        }
    }

    public emitPlayersUnreliable<E extends keyof altShared.Events.CustomServerToPlayerEvent, U extends altServer.Player>(
        players: U[],
        eventName: E,
        body?: Parameters<altShared.Events.CustomServerToPlayerEvent[E]>[0],
    ): void;
    public emitPlayersUnreliable<E extends string, U extends altServer.Player>(
        players: U[],
        eventName: Exclude<E, keyof altShared.Events.CustomServerToPlayerEvent>,
        body?: unknown,
    ): void;
    public emitPlayersUnreliable<E extends string, U extends altServer.Player>(
        players: U[],
        eventName: Exclude<E, keyof altShared.Events.CustomServerToPlayerEvent>,
        body?: unknown,
    ): void {
        for (const player of players) {
            player.emitUnreliableRaw(eventName, body);
        }
    }

    public emitAllPlayers<E extends keyof altShared.Events.CustomServerToPlayerEvent>(
        eventName: E,
        body?: Parameters<altShared.Events.CustomServerToPlayerEvent[E]>[0],
    ): void;
    public emitAllPlayers<E extends string>(eventName: Exclude<E, keyof altShared.Events.CustomServerToPlayerEvent>, body?: unknown): void;
    public emitAllPlayers<E extends string>(eventName: Exclude<E, keyof altShared.Events.CustomServerToPlayerEvent>, body?: unknown): void {
        altServer.Events.emitAllPlayersRaw(eventName, body);
    }

    public emitAllPlayersUnreliable<E extends keyof altShared.Events.CustomServerToPlayerEvent>(
        eventName: E,
        body?: Parameters<altShared.Events.CustomServerToPlayerEvent[E]>[0],
    ): void;
    public emitAllPlayersUnreliable<E extends string>(
        eventName: Exclude<E, keyof altShared.Events.CustomServerToPlayerEvent>,
        body?: unknown,
    ): void;
    public emitAllPlayersUnreliable<E extends string>(
        eventName: Exclude<E, keyof altShared.Events.CustomServerToPlayerEvent>,
        body?: unknown,
    ): void {
        altServer.Events.emitAllPlayersUnreliableRaw(eventName, body);
    }

    public onWebView<E extends keyof altShared.Events.CustomWebViewToServerEvent, U extends altServer.Player>(
        id: string | number,
        eventName: E,
        callback: (
            player: U,
            body: Parameters<altShared.Events.CustomWebViewToServerEvent[E]>[0],
        ) => ReturnType<altShared.Events.CustomWebViewToServerEvent[E]>,
    ): altShared.Events.ScriptEventHandler;
    public onWebView<E extends string, U extends altServer.Player>(
        id: string | number,
        eventName: Exclude<E, keyof altShared.Events.CustomWebViewToServerEvent>,
        callback: (player: U, body: unknown) => void | Promise<void>,
    ): altShared.Events.ScriptEventHandler;
    public onWebView<E extends string, U extends altServer.Player>(
        id: string | number,
        eventName: Exclude<E, keyof altShared.Events.CustomWebViewToServerEvent>,
        callback: (player: U, body: unknown) => void | Promise<void>,
    ): altShared.Events.ScriptEventHandler {
        return this.onPlayer(<string>`SERVER::ON_WEBVIEW_${eventName}_${id}`, <any>callback);
    }

    public onceWebView<E extends keyof altShared.Events.CustomWebViewToServerEvent, U extends altServer.Player>(
        id: string | number,
        eventName: E,
        callback: (
            player: U,
            body: Parameters<altShared.Events.CustomWebViewToServerEvent[E]>[0],
        ) => ReturnType<altShared.Events.CustomWebViewToServerEvent[E]>,
    ): altShared.Events.ScriptEventHandler;
    public onceWebView<E extends string, U extends altServer.Player>(
        id: string | number,
        eventName: Exclude<E, keyof altShared.Events.CustomWebViewToServerEvent>,
        callback: (player: U, body: unknown) => void | Promise<void>,
    ): altShared.Events.ScriptEventHandler;
    public onceWebView<E extends string, U extends altServer.Player>(
        id: string | number,
        eventName: Exclude<E, keyof altShared.Events.CustomWebViewToServerEvent>,
        callback: (player: U, body: unknown) => void | Promise<void>,
    ): altShared.Events.ScriptEventHandler {
        return this.oncePlayer(<string>`SERVER::ON_WEBVIEW_${eventName}_${id}`, <any>callback);
    }

    public emitWebViews<E extends keyof altShared.Events.CustomServerToWebViewEvent, U extends altServer.Player>(
        players: U[],
        id: string | number,
        eventName: E,
        body?: Parameters<altShared.Events.CustomServerToWebViewEvent[E]>[0],
    ): void;
    public emitWebViews<E extends string, U extends altServer.Player>(
        players: U[],
        id: string | number,
        eventName: Exclude<E, keyof altShared.Events.CustomServerToWebViewEvent>,
        body?: unknown,
    ): void;
    public emitWebViews<E extends string, U extends altServer.Player>(
        players: U[],
        id: string | number,
        eventName: Exclude<E, keyof altShared.Events.CustomServerToWebViewEvent>,
        body?: unknown,
    ): void {
        this.emitPlayers(players, 'SERVER::EMIT_WEBVIEW', {
            id,
            eventName,
            payload: body,
        });
    }

    public emitAllWebViews<E extends keyof altShared.Events.CustomServerToWebViewEvent>(
        id: string | number,
        eventName: E,
        body?: Parameters<altShared.Events.CustomServerToWebViewEvent[E]>[0],
    ): void;
    public emitAllWebViews<E extends string>(
        id: string | number,
        eventName: Exclude<E, keyof altShared.Events.CustomServerToWebViewEvent>,
        body?: unknown,
    ): void;
    public emitAllWebViews<E extends string>(
        id: string | number,
        eventName: Exclude<E, keyof altShared.Events.CustomServerToWebViewEvent>,
        body?: unknown,
    ): void {
        this.emitAllPlayers('SERVER::EMIT_WEBVIEW', {
            id,
            eventName,
            payload: body,
        });
    }

    public emitAllWebViewsUnreliable<E extends keyof altShared.Events.CustomServerToWebViewEvent>(
        id: string | number,
        eventName: E,
        body?: Parameters<altShared.Events.CustomServerToWebViewEvent[E]>[0],
    ): void;
    public emitAllWebViewsUnreliable<E extends string>(
        id: string | number,
        eventName: Exclude<E, keyof altShared.Events.CustomServerToWebViewEvent>,
        body?: unknown,
    ): void;
    public emitAllWebViewsUnreliable<E extends string>(
        id: string | number,
        eventName: Exclude<E, keyof altShared.Events.CustomServerToWebViewEvent>,
        body?: unknown,
    ): void {
        this.emitAllPlayersUnreliable('SERVER::EMIT_WEBVIEW', {
            id,
            eventName,
            payload: body,
        });
    }

    public onScriptRPC<T extends altServer.Player>(
        callback: altServer.Events.GenericPlayerEventCallback<altServer.Events.ScriptRPCEventParameters, T>,
    ) {
        return altServer.Events.onScriptRPC(callback);
    }

    public onceScriptRPC<T extends altServer.Player>(
        callback: altServer.Events.GenericPlayerEventCallback<altServer.Events.ScriptRPCEventParameters, T>,
    ) {
        return altServer.Events.onceScriptRPC(callback);
    }

    public onScriptRPCAnswer<T extends altServer.Player>(
        callback: altServer.Events.GenericPlayerEventCallback<altServer.Events.ScriptRPCAnswerEventParameters, T>,
    ) {
        return altServer.Events.onScriptRPCAnswer(callback);
    }

    public onceScriptRPCAnswer<T extends altServer.Player>(
        callback: altServer.Events.GenericPlayerEventCallback<altServer.Events.ScriptRPCAnswerEventParameters, T>,
    ) {
        return altServer.Events.onceScriptRPCAnswer(callback);
    }

    public onServerStarted(callback: altServer.Events.GenericEventCallback) {
        return altServer.Events.onServerStarted(callback);
    }

    public onceServerStarted(callback: altServer.Events.GenericEventCallback) {
        return altServer.Events.onceServerStarted(callback);
    }

    public onConnectionQueueAdd(callback: altServer.Events.GenericEventCallback<altServer.Events.ConnectionQueueEventParameters>) {
        return altServer.Events.onConnectionQueueAdd(callback);
    }

    public onceConnectionQueueAdd(callback: altServer.Events.GenericEventCallback<altServer.Events.ConnectionQueueEventParameters>) {
        return altServer.Events.onceConnectionQueueAdd(callback);
    }

    public onConnectionQueueRemove(callback: altServer.Events.GenericEventCallback<altServer.Events.ConnectionQueueEventParameters>) {
        return altServer.Events.onConnectionQueueRemove(callback);
    }

    public onceConnectionQueueRemove(callback: altServer.Events.GenericEventCallback<altServer.Events.ConnectionQueueEventParameters>) {
        return altServer.Events.onceConnectionQueueRemove(callback);
    }

    public onPlayerConnect<T extends altServer.Player>(
        callback: altServer.Events.GenericPlayerEventCallback<altServer.Events.PlayerConnectEventParameters, T>,
    ) {
        return altServer.Events.onPlayerConnect(callback);
    }

    public oncePlayerConnect<T extends altServer.Player>(
        callback: altServer.Events.GenericPlayerEventCallback<altServer.Events.PlayerConnectEventParameters, T>,
    ) {
        return altServer.Events.oncePlayerConnect(callback);
    }

    public onPlayerConnectDenied(callback: altServer.Events.GenericEventCallback<altServer.Events.PlayerConnectDeniedEventParameters>) {
        return altServer.Events.onPlayerConnectDenied(callback);
    }

    public oncePlayerConnectDenied(callback: altServer.Events.GenericEventCallback<altServer.Events.PlayerConnectDeniedEventParameters>) {
        return altServer.Events.oncePlayerConnectDenied(callback);
    }

    public onPlayerDisconnect<T extends altServer.Player>(
        callback: altServer.Events.GenericPlayerEventCallback<altServer.Events.PlayerDisconnectEventParameters, T>,
    ) {
        return altServer.Events.onPlayerDisconnect(callback);
    }

    public oncePlayerDisconnect<T extends altServer.Player>(
        callback: altServer.Events.GenericPlayerEventCallback<altServer.Events.PlayerDisconnectEventParameters, T>,
    ) {
        return altServer.Events.oncePlayerDisconnect(callback);
    }

    public onPlayerDamage<T extends altServer.Player>(
        callback: altServer.Events.GenericPlayerEventCallback<altServer.Events.PlayerDamageEventParameters, T>,
    ) {
        return altServer.Events.onPlayerDamage(callback);
    }

    public oncePlayerDamage<T extends altServer.Player>(
        callback: altServer.Events.GenericPlayerEventCallback<altServer.Events.PlayerDamageEventParameters, T>,
    ) {
        return altServer.Events.oncePlayerDamage(callback);
    }

    public onPlayerDeath<T extends altServer.Player>(
        callback: altServer.Events.GenericPlayerEventCallback<altServer.Events.PlayerDeathEventParameters, T>,
    ) {
        return altServer.Events.onPlayerDeath(callback);
    }

    public oncePlayerDeath<T extends altServer.Player>(
        callback: altServer.Events.GenericPlayerEventCallback<altServer.Events.PlayerDeathEventParameters, T>,
    ) {
        return altServer.Events.oncePlayerDeath(callback);
    }

    public onPlayerHeal<T extends altServer.Player>(
        callback: altServer.Events.GenericPlayerEventCallback<altServer.Events.PlayerHealEventParameters, T>,
    ) {
        return altServer.Events.onPlayerHeal(callback);
    }

    public oncePlayerHeal<T extends altServer.Player>(
        callback: altServer.Events.GenericPlayerEventCallback<altServer.Events.PlayerHealEventParameters, T>,
    ) {
        return altServer.Events.oncePlayerHeal(callback);
    }

    public onPlayerControlRequest<T extends altServer.Player>(
        callback: altServer.Events.GenericCancellablePlayerEventCallback<altServer.Events.PlayerControlRequestEventParameters, T>,
    ) {
        return altServer.Events.onPlayerControlRequest(callback);
    }

    public oncePlayerControlRequest<T extends altServer.Player>(
        callback: altServer.Events.GenericCancellablePlayerEventCallback<altServer.Events.PlayerControlRequestEventParameters, T>,
    ) {
        return altServer.Events.oncePlayerControlRequest(callback);
    }

    public onPlayerInteriorChange<T extends altServer.Player>(
        callback: altServer.Events.GenericPlayerEventCallback<altServer.Events.PlayerInteriorChangeEventParameters, T>,
    ) {
        return altServer.Events.onPlayerInteriorChange(callback);
    }

    public oncePlayerInteriorChange<T extends altServer.Player>(
        callback: altServer.Events.GenericPlayerEventCallback<altServer.Events.PlayerInteriorChangeEventParameters, T>,
    ) {
        return altServer.Events.oncePlayerInteriorChange(callback);
    }

    public onPlayerDimensionChange<T extends altServer.Player>(
        callback: altServer.Events.GenericPlayerEventCallback<altServer.Events.PlayerDimensionChangeEventParameters, T>,
    ) {
        return altServer.Events.onPlayerDimensionChange(callback);
    }

    public oncePlayerDimensionChange<T extends altServer.Player>(
        callback: altServer.Events.GenericPlayerEventCallback<altServer.Events.PlayerDimensionChangeEventParameters, T>,
    ) {
        return altServer.Events.oncePlayerDimensionChange(callback);
    }

    public onPlayerWeaponChange<T extends altServer.Player>(
        callback: altServer.Events.GenericPlayerEventCallback<altServer.Events.PlayerWeaponChangeEventParameters, T>,
    ) {
        return altServer.Events.onPlayerWeaponChange(callback);
    }

    public oncePlayerWeaponChange<T extends altServer.Player>(
        callback: altServer.Events.GenericPlayerEventCallback<altServer.Events.PlayerWeaponChangeEventParameters, T>,
    ) {
        return altServer.Events.oncePlayerWeaponChange(callback);
    }

    public onPlayerSyncedSceneRequest(
        callback: altServer.Events.GenericCancellableEventCallback<altServer.Events.PlayerSyncedSceneRequestEventParameters>,
    ) {
        return altServer.Events.onPlayerSyncedSceneRequest(callback);
    }

    public oncePlayerSyncedSceneRequest(
        callback: altServer.Events.GenericCancellableEventCallback<altServer.Events.PlayerSyncedSceneRequestEventParameters>,
    ) {
        return altServer.Events.oncePlayerSyncedSceneRequest(callback);
    }

    public onPlayerSyncedSceneStart<T extends altServer.Player>(
        callback: altServer.Events.GenericCancellablePlayerEventCallback<altServer.Events.PlayerSyncedSceneStartEventParameters, T>,
    ) {
        return altServer.Events.onPlayerSyncedSceneStart(callback);
    }

    public oncePlayerSyncedSceneStart<T extends altServer.Player>(
        callback: altServer.Events.GenericCancellablePlayerEventCallback<altServer.Events.PlayerSyncedSceneStartEventParameters, T>,
    ) {
        return altServer.Events.oncePlayerSyncedSceneStart(callback);
    }

    public onPlayerSyncedSceneStop<T extends altServer.Player>(
        callback: altServer.Events.GenericCancellablePlayerEventCallback<altServer.Events.PlayerSyncedSceneStopEventParameters, T>,
    ) {
        return altServer.Events.onPlayerSyncedSceneStop(callback);
    }

    public oncePlayerSyncedSceneStop<T extends altServer.Player>(
        callback: altServer.Events.GenericCancellablePlayerEventCallback<altServer.Events.PlayerSyncedSceneStopEventParameters, T>,
    ) {
        return altServer.Events.oncePlayerSyncedSceneStop(callback);
    }

    public onPlayerSyncedSceneUpdate<T extends altServer.Player>(
        callback: altServer.Events.GenericCancellablePlayerEventCallback<altServer.Events.PlayerSyncedSceneUpdateEventParameters, T>,
    ) {
        return altServer.Events.onPlayerSyncedSceneUpdate(callback);
    }

    public onPlayerSpawn<T extends altServer.Player>(callback: altServer.Events.GenericPlayerEventCallback<{}, T>) {
        return altServer.Events.onPlayerSpawn(callback);
    }

    public oncePlayerSpawn<T extends altServer.Player>(callback: altServer.Events.GenericPlayerEventCallback<{}, T>) {
        return altServer.Events.oncePlayerSpawn(callback);
    }

    public onPlayerAnimationChange<T extends altServer.Player>(
        callback: altServer.Events.GenericPlayerEventCallback<altServer.Events.PlayerAnimationChangeEventParameters, T>,
    ) {
        return altServer.Events.onPlayerAnimationChange(callback);
    }

    public oncePlayerAnimationChange<T extends altServer.Player>(
        callback: altServer.Events.GenericPlayerEventCallback<altServer.Events.PlayerAnimationChangeEventParameters, T>,
    ) {
        return altServer.Events.oncePlayerAnimationChange(callback);
    }

    public onPlayerVehicleEntered<T extends altServer.Player>(
        callback: altServer.Events.GenericPlayerEventCallback<altServer.Events.PlayerVehicleEnteredEventParameters, T>,
    ) {
        return altServer.Events.onPlayerVehicleEntered(callback);
    }

    public oncePlayerVehicleEntered<T extends altServer.Player>(
        callback: altServer.Events.GenericPlayerEventCallback<altServer.Events.PlayerVehicleEnteredEventParameters, T>,
    ) {
        return altServer.Events.oncePlayerVehicleEntered(callback);
    }

    public onPlayerStartVehicleEnter<T extends altServer.Player>(
        callback: altServer.Events.GenericPlayerEventCallback<altServer.Events.PlayerStartVehicleEnterEventParameters, T>,
    ) {
        return altServer.Events.onPlayerStartVehicleEnter(callback);
    }

    public oncePlayerStartVehicleEnter<T extends altServer.Player>(
        callback: altServer.Events.GenericPlayerEventCallback<altServer.Events.PlayerStartVehicleEnterEventParameters, T>,
    ) {
        return altServer.Events.oncePlayerStartVehicleEnter(callback);
    }

    public onPlayerVehicleLeft<T extends altServer.Player>(
        callback: altServer.Events.GenericPlayerEventCallback<altServer.Events.PlayerVehicleLeftEventParameters, T>,
    ) {
        return altServer.Events.onPlayerVehicleLeft(callback);
    }

    public oncePlayerVehicleLeft<T extends altServer.Player>(
        callback: altServer.Events.GenericPlayerEventCallback<altServer.Events.PlayerVehicleLeftEventParameters, T>,
    ) {
        return altServer.Events.oncePlayerVehicleLeft(callback);
    }

    public onPlayerVehicleSeatChange<T extends altServer.Player>(
        callback: altServer.Events.GenericPlayerEventCallback<altServer.Events.PlayerVehicleSeatChangeEventParameters, T>,
    ) {
        return altServer.Events.onPlayerVehicleSeatChange(callback);
    }

    public oncePlayerVehicleSeatChange<T extends altServer.Player>(
        callback: altServer.Events.GenericPlayerEventCallback<altServer.Events.PlayerVehicleSeatChangeEventParameters, T>,
    ) {
        return altServer.Events.oncePlayerVehicleSeatChange(callback);
    }

    public onPlayerStartTalking<T extends altServer.Player>(callback: altServer.Events.GenericPlayerEventCallback<{}, T>) {
        return altServer.Events.onPlayerStartTalking(callback);
    }

    public oncePlayerStartTalking<T extends altServer.Player>(callback: altServer.Events.GenericPlayerEventCallback<{}, T>) {
        return altServer.Events.oncePlayerStartTalking(callback);
    }

    public onPlayerStopTalking<T extends altServer.Player>(callback: altServer.Events.GenericPlayerEventCallback<{}, T>) {
        return altServer.Events.onPlayerStopTalking(callback);
    }

    public oncePlayerStopTalking<T extends altServer.Player>(callback: altServer.Events.GenericPlayerEventCallback<{}, T>) {
        return altServer.Events.oncePlayerStopTalking(callback);
    }

    public onPedHeal(callback: altServer.Events.GenericEventCallback<altServer.Events.PedHealEventParameters>) {
        return altServer.Events.onPedHeal(callback);
    }

    public oncePedHeal(callback: altServer.Events.GenericEventCallback<altServer.Events.PedHealEventParameters>) {
        return altServer.Events.oncePedHeal(callback);
    }

    public onPedDeath(callback: altServer.Events.GenericEventCallback<altServer.Events.PedDeathEventParameters>) {
        return altServer.Events.onPedDeath(callback);
    }

    public oncePedDeath(callback: altServer.Events.GenericEventCallback<altServer.Events.PedDeathEventParameters>) {
        return altServer.Events.oncePedDeath(callback);
    }

    public onPedDamage(callback: altServer.Events.GenericEventCallback<altServer.Events.PedDamageEventParameters>) {
        return altServer.Events.onPedDamage(callback);
    }

    public oncePedDamage(callback: altServer.Events.GenericEventCallback<altServer.Events.PedDamageEventParameters>) {
        return altServer.Events.oncePedDamage(callback);
    }

    public onVehicleDestroy(callback: altServer.Events.GenericEventCallback<altServer.Events.VehicleDestroyEventParameters>) {
        return altServer.Events.onVehicleDestroy(callback);
    }

    public onceVehicleDestroy(callback: altServer.Events.GenericEventCallback<altServer.Events.VehicleDestroyEventParameters>) {
        return altServer.Events.onceVehicleDestroy(callback);
    }

    public onVehicleAttach(callback: altServer.Events.GenericEventCallback<altServer.Events.VehicleAttachEventParameters>) {
        return altServer.Events.onVehicleAttach(callback);
    }

    public onceVehicleAttach(callback: altServer.Events.GenericEventCallback<altServer.Events.VehicleAttachEventParameters>) {
        return altServer.Events.onceVehicleAttach(callback);
    }

    public onVehicleDetach(callback: altServer.Events.GenericEventCallback<altServer.Events.VehicleDetachEventParameters>) {
        return altServer.Events.onVehicleDetach(callback);
    }

    public onceVehicleDetach(callback: altServer.Events.GenericEventCallback<altServer.Events.VehicleDetachEventParameters>) {
        return altServer.Events.onceVehicleDetach(callback);
    }

    public onVehicleDamage(callback: altServer.Events.GenericEventCallback<altServer.Events.VehicleDamageEventParameters>) {
        return altServer.Events.onVehicleDamage(callback);
    }

    public onceVehicleDamage(callback: altServer.Events.GenericEventCallback<altServer.Events.VehicleDamageEventParameters>) {
        return altServer.Events.onceVehicleDamage(callback);
    }

    public onVehicleSirenStateChange(
        callback: altServer.Events.GenericEventCallback<altServer.Events.VehicleSirenStateChangeEventParameters>,
    ) {
        return altServer.Events.onVehicleSirenStateChange(callback);
    }

    public onceVehicleSirenStateChange(
        callback: altServer.Events.GenericEventCallback<altServer.Events.VehicleSirenStateChangeEventParameters>,
    ) {
        return altServer.Events.onceVehicleSirenStateChange(callback);
    }

    public onVehicleHornStateChange<T extends altServer.Player>(
        callback: altServer.Events.GenericCancellablePlayerEventCallback<altServer.Events.VehicleHornStateChangeEventParameters, T>,
    ) {
        return altServer.Events.onVehicleHornStateChange(callback);
    }

    public onceVehicleHornStateChange<T extends altServer.Player>(
        callback: altServer.Events.GenericCancellablePlayerEventCallback<altServer.Events.VehicleHornStateChangeEventParameters, T>,
    ) {
        return altServer.Events.onceVehicleHornStateChange(callback);
    }

    public onVoiceConnectionCreate(callback: altServer.Events.GenericEventCallback<altServer.Events.VoiceConnectionEventParameters>) {
        return altServer.Events.onVoiceConnectionCreate(callback);
    }

    public onceVoiceConnectionCreate(callback: altServer.Events.GenericEventCallback<altServer.Events.VoiceConnectionEventParameters>) {
        return altServer.Events.onceVoiceConnectionCreate(callback);
    }

    public onClientObjectDelete<T extends altServer.Player>(callback: altServer.Events.GenericCancellablePlayerEventCallback<{}, T>) {
        return altServer.Events.onClientObjectDelete(callback);
    }

    public onceClientObjectDelete<T extends altServer.Player>(callback: altServer.Events.GenericCancellablePlayerEventCallback<{}, T>) {
        return altServer.Events.onceClientObjectDelete(callback);
    }

    public onClientObjectRequest<T extends altServer.Player>(
        callback: altServer.Events.GenericCancellablePlayerEventCallback<altServer.Events.ClientObjectEventParameters, T>,
    ) {
        return altServer.Events.onClientObjectRequest(callback);
    }

    public onceClientObjectRequest<T extends altServer.Player>(
        callback: altServer.Events.GenericCancellablePlayerEventCallback<altServer.Events.ClientObjectEventParameters, T>,
    ) {
        return altServer.Events.onceClientObjectRequest(callback);
    }

    public onBaseObjectCreate(callback: altServer.Events.GenericEventCallback<altServer.Events.BaseObjectCreateEventParameters>) {
        return altServer.Events.onBaseObjectCreate(callback);
    }

    public onceBaseObjectCreate(callback: altServer.Events.GenericEventCallback<altServer.Events.BaseObjectCreateEventParameters>) {
        return altServer.Events.onceBaseObjectCreate(callback);
    }

    public onBaseObjectRemove(callback: altServer.Events.GenericEventCallback<altServer.Events.BaseObjectRemoveEventParameters>) {
        return altServer.Events.onBaseObjectRemove(callback);
    }

    public onceBaseObjectRemove(callback: altServer.Events.GenericEventCallback<altServer.Events.BaseObjectRemoveEventParameters>) {
        return altServer.Events.onceBaseObjectRemove(callback);
    }

    public onNetOwnerChange(callback: altServer.Events.GenericEventCallback<altServer.Events.NetOwnerChangeEventParameters>) {
        return altServer.Events.onNetOwnerChange(callback);
    }

    public onceNetOwnerChange(callback: altServer.Events.GenericEventCallback<altServer.Events.NetOwnerChangeEventParameters>) {
        return altServer.Events.onceNetOwnerChange(callback);
    }

    public onWeaponDamage(callback: altServer.Events.GenericCancellableEventCallback<altServer.Events.WeaponDamageEventParameters>) {
        return altServer.Events.onWeaponDamage(callback);
    }

    public onceWeaponDamage(callback: altServer.Events.GenericCancellableEventCallback<altServer.Events.WeaponDamageEventParameters>) {
        return altServer.Events.onceWeaponDamage(callback);
    }

    public onMetaChange(callback: altServer.Events.GenericEventCallback<altServer.Events.MetaChangeEventParameters>) {
        return altServer.Events.onMetaChange(callback);
    }

    public onLocalMetaChange<T extends altServer.Player>(
        callback: altServer.Events.GenericPlayerEventCallback<altServer.Events.LocalMetaChangeEventParameters, T>,
    ) {
        return altServer.Events.onLocalMetaChange(callback);
    }

    public onceLocalMetaChange<T extends altServer.Player>(
        callback: altServer.Events.GenericPlayerEventCallback<altServer.Events.LocalMetaChangeEventParameters, T>,
    ) {
        return altServer.Events.onceLocalMetaChange(callback);
    }

    public onStreamSyncedMetaChange(
        callback: altServer.Events.GenericEventCallback<altServer.Events.StreamSyncedMetaChangeEventParameters>,
    ) {
        return altServer.Events.onStreamSyncedMetaChange(callback);
    }

    public onceStreamSyncedMetaChange(
        callback: altServer.Events.GenericEventCallback<altServer.Events.StreamSyncedMetaChangeEventParameters>,
    ) {
        return altServer.Events.onceStreamSyncedMetaChange(callback);
    }

    public onGlobalMetaChange(callback: altServer.Events.GenericEventCallback<altServer.Events.GlobalMetaChangeEventParameters>) {
        return altServer.Events.onGlobalMetaChange(callback);
    }

    public onceGlobalMetaChange(callback: altServer.Events.GenericEventCallback<altServer.Events.GlobalMetaChangeEventParameters>) {
        return altServer.Events.onceGlobalMetaChange(callback);
    }

    public onGlobalSyncedMetaChange(
        callback: altServer.Events.GenericEventCallback<altServer.Events.GlobalSyncedMetaChangeEventParameters>,
    ) {
        return altServer.Events.onGlobalSyncedMetaChange(callback);
    }

    public onceGlobalSyncedMetaChange(
        callback: altServer.Events.GenericEventCallback<altServer.Events.GlobalSyncedMetaChangeEventParameters>,
    ) {
        return altServer.Events.onceGlobalSyncedMetaChange(callback);
    }

    public onConsoleCommand(callback: altServer.Events.GenericEventCallback<altServer.Events.ConsoleCommandEventParameters>) {
        return altServer.Events.onConsoleCommand(callback);
    }

    public onceConsoleCommand(callback: altServer.Events.GenericEventCallback<altServer.Events.ConsoleCommandEventParameters>) {
        return altServer.Events.onceConsoleCommand(callback);
    }

    public onError(callback: altServer.Events.GenericEventCallback<altServer.Events.ErrorEventParameters>) {
        return altServer.Events.onError(callback);
    }

    public onceError(callback: altServer.Events.GenericEventCallback<altServer.Events.ErrorEventParameters>) {
        return altServer.Events.onceError(callback);
    }

    public onColShapeEvent(callback: altServer.Events.GenericEventCallback<altServer.Events.ColShapeEventParameters>) {
        return altServer.Events.onColShapeEvent(callback);
    }

    public onceColShapeEvent(callback: altServer.Events.GenericEventCallback<altServer.Events.ColShapeEventParameters>) {
        return altServer.Events.onceColShapeEvent(callback);
    }

    public onExplosion(callback: altServer.Events.GenericCancellableEventCallback<altServer.Events.ExplosionEventParameters>) {
        return altServer.Events.onExplosion(callback);
    }

    public onceExplosion(callback: altServer.Events.GenericCancellableEventCallback<altServer.Events.ExplosionEventParameters>) {
        return altServer.Events.onceExplosion(callback);
    }

    public onFireStart<T extends altServer.Player>(
        callback: altServer.Events.GenericCancellablePlayerEventCallback<altServer.Events.FireStartEventParameters, T>,
    ) {
        return altServer.Events.onFireStart(callback);
    }

    public onceFireStart<T extends altServer.Player>(
        callback: altServer.Events.GenericCancellablePlayerEventCallback<altServer.Events.FireStartEventParameters, T>,
    ) {
        return altServer.Events.onceFireStart(callback);
    }

    public onProjectileStart<T extends altServer.Player>(
        callback: altServer.Events.GenericCancellablePlayerEventCallback<altServer.Events.ProjectileStartEventParameters, T>,
    ) {
        return altServer.Events.onProjectileStart(callback);
    }

    public onceProjectileStart<T extends altServer.Player>(
        callback: altServer.Events.GenericCancellablePlayerEventCallback<altServer.Events.ProjectileStartEventParameters, T>,
    ) {
        return altServer.Events.onceProjectileStart(callback);
    }

    public onEntityColShapeEnter(callback: altServer.Events.GenericEventCallback<altServer.Events.EntityColShapeEnterEventParameters>) {
        return altServer.Events.onEntityColShapeEnter(callback);
    }

    public onceEntityColShapeEnter(callback: altServer.Events.GenericEventCallback<altServer.Events.EntityColShapeEnterEventParameters>) {
        return altServer.Events.onceEntityColShapeEnter(callback);
    }

    public onEntityColShapeLeave(callback: altServer.Events.GenericEventCallback<altServer.Events.EntityColShapeLeaveEventParameters>) {
        return altServer.Events.onEntityColShapeLeave(callback);
    }

    public onceEntityColShapeLeave(callback: altServer.Events.GenericEventCallback<altServer.Events.EntityColShapeLeaveEventParameters>) {
        return altServer.Events.onceEntityColShapeLeave(callback);
    }

    public onEntityCheckpointEnter(callback: altServer.Events.GenericEventCallback<altServer.Events.EntityCheckpointEnterEventParameters>) {
        return altServer.Events.onEntityCheckpointEnter(callback);
    }

    public onceEntityCheckpointEnter(
        callback: altServer.Events.GenericEventCallback<altServer.Events.EntityCheckpointEnterEventParameters>,
    ) {
        return altServer.Events.onceEntityCheckpointEnter(callback);
    }

    public onEntityCheckpointLeave(callback: altServer.Events.GenericEventCallback<altServer.Events.EntityCheckpointLeaveEventParameters>) {
        return altServer.Events.onEntityCheckpointLeave(callback);
    }

    public onceEntityCheckpointLeave(
        callback: altServer.Events.GenericEventCallback<altServer.Events.EntityCheckpointLeaveEventParameters>,
    ) {
        return altServer.Events.onceEntityCheckpointLeave(callback);
    }

    public onGivePedScriptedTask(callback: altServer.Events.GenericEventCallback<altServer.Events.GivePedScriptedTaskEventParameters>) {
        return altServer.Events.onGivePedScriptedTask(callback);
    }

    public onLocalScriptEvent<T = unknown[]>(
        callback: altServer.Events.GenericEventCallback<altServer.Events.ServerScriptEventParameters<T>>,
    ) {
        return altServer.Events.onLocalScriptEvent(callback);
    }

    public onceLocalScriptEvent<T = unknown[]>(
        callback: altServer.Events.GenericEventCallback<altServer.Events.ServerScriptEventParameters<T>>,
    ) {
        return altServer.Events.onceLocalScriptEvent(callback);
    }

    public onRemoteScriptEvent<T = unknown[], U extends altServer.Player = altServer.Player>(
        callback: altServer.Events.GenericPlayerEventCallback<altServer.Events.PlayerScriptEventParameters<T>, U>,
    ) {
        return altServer.Events.onRemoteScriptEvent(callback);
    }

    public onceRemoteScriptEvent<T = unknown[], U extends altServer.Player = altServer.Player>(
        callback: altServer.Events.GenericPlayerEventCallback<altServer.Events.PlayerScriptEventParameters<T>, U>,
    ) {
        return altServer.Events.onceRemoteScriptEvent(callback);
    }

    public onResourceStart(callback: altServer.Events.GenericEventCallback) {
        return altServer.Events.onResourceStart(callback);
    }

    public onceResourceStart(callback: altServer.Events.GenericEventCallback) {
        return altServer.Events.onceResourceStart(callback);
    }

    public onResourceStop(callback: altServer.Events.GenericEventCallback) {
        return altServer.Events.onResourceStop(callback);
    }

    public onceResourceStop(callback: altServer.Events.GenericEventCallback) {
        return altServer.Events.onceResourceStop(callback);
    }

    public onResourceError(callback: altServer.Events.GenericEventCallback<altServer.Events.ResourceErrorEventParameters>) {
        return altServer.Events.onResourceError(callback);
    }

    public onceResourceError(callback: altServer.Events.GenericEventCallback<altServer.Events.ResourceErrorEventParameters>) {
        return altServer.Events.onceResourceError(callback);
    }

    public onEvent(callback: altServer.Events.GenericEventCallback<altShared.Events.GenericOnEventParameters>) {
        return altServer.Events.onEvent(callback);
    }
}
