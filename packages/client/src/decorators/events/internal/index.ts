import { OnInternal, OnceInternal } from '@altv-mango/core';
import { INTERNAL_EVENTS } from '../../../constants';

export function OnScriptRPC() {
    return OnInternal(INTERNAL_EVENTS.SCRIPT_RPC);
}

export function OnceScriptRPC() {
    return OnceInternal(INTERNAL_EVENTS.SCRIPT_RPC);
}
export function OnScriptRPCAnswer() {
    return OnInternal(INTERNAL_EVENTS.SCRIPT_RPC_ANSWER);
}

export function OnceScriptRPCAnswer() {
    return OnceInternal(INTERNAL_EVENTS.SCRIPT_RPC_ANSWER);
}
export function OnKeyBoardEvent() {
    return OnInternal(INTERNAL_EVENTS.KEYBOARD_EVENT);
}

export function OnceKeyBoardEvent() {
    return OnceInternal(INTERNAL_EVENTS.KEYBOARD_EVENT);
}
export function OnKeyUp() {
    return OnInternal(INTERNAL_EVENTS.KEY_UP);
}

export function OnceKeyUp() {
    return OnceInternal(INTERNAL_EVENTS.KEY_UP);
}
export function OnKeyDown() {
    return OnInternal(INTERNAL_EVENTS.KEY_DOWN);
}

export function OnceKeyDown() {
    return OnceInternal(INTERNAL_EVENTS.KEY_DOWN);
}
export function OnWebViewEvent() {
    return OnInternal(INTERNAL_EVENTS.WEB_VIEW_EVENT);
}

export function OnceWebViewEvent() {
    return OnceInternal(INTERNAL_EVENTS.WEB_VIEW_EVENT);
}
export function OnWebSocketEvent() {
    return OnInternal(INTERNAL_EVENTS.WEB_SOCKET_EVENT);
}

export function OnceWebSocketEvent() {
    return OnceInternal(INTERNAL_EVENTS.WEB_SOCKET_EVENT);
}
export function OnAudioEvent() {
    return OnInternal(INTERNAL_EVENTS.AUDIO_EVENT);
}

export function OnceAudioEvent() {
    return OnceInternal(INTERNAL_EVENTS.AUDIO_EVENT);
}
export function OnRmluiEvent() {
    return OnInternal(INTERNAL_EVENTS.RMLUI_EVENT);
}

export function OnceRmluiEvent() {
    return OnceInternal(INTERNAL_EVENTS.RMLUI_EVENT);
}
export function OnWindowFocusChange() {
    return OnInternal(INTERNAL_EVENTS.WINDOW_FOCUS_CHANGE);
}

export function OnceWindowFocusChange() {
    return OnceInternal(INTERNAL_EVENTS.WINDOW_FOCUS_CHANGE);
}
export function OnWindowResolutionChange() {
    return OnInternal(INTERNAL_EVENTS.WINDOW_RESOLUTION_CHANGE);
}

export function OnceWindowResolutionChange() {
    return OnceInternal(INTERNAL_EVENTS.WINDOW_RESOLUTION_CHANGE);
}
export function OnConnectionComplete() {
    return OnInternal(INTERNAL_EVENTS.CONNECTION_COMPLETE);
}

export function OnceConnectionComplete() {
    return OnceInternal(INTERNAL_EVENTS.CONNECTION_COMPLETE);
}
export function OnDisconnect() {
    return OnInternal(INTERNAL_EVENTS.DISCONNECT);
}

export function OnceDisconnect() {
    return OnceInternal(INTERNAL_EVENTS.DISCONNECT);
}
export function OnSpawned() {
    return OnInternal(INTERNAL_EVENTS.SPAWNED);
}

export function OnceSpawned() {
    return OnceInternal(INTERNAL_EVENTS.SPAWNED);
}
export function OnGameEntityCreate() {
    return OnInternal(INTERNAL_EVENTS.GAME_ENTITY_CREATE);
}

export function OnceGameEntityCreate() {
    return OnceInternal(INTERNAL_EVENTS.GAME_ENTITY_CREATE);
}
export function OnGameEntityDestroy() {
    return OnInternal(INTERNAL_EVENTS.GAME_ENTITY_DESTROY);
}

export function OnceGameEntityDestroy() {
    return OnceInternal(INTERNAL_EVENTS.GAME_ENTITY_DESTROY);
}
export function OnEntityHitEntity() {
    return OnInternal(INTERNAL_EVENTS.ENTITY_HIT_ENTITY);
}

export function OnceEntityHitEntity() {
    return OnceInternal(INTERNAL_EVENTS.ENTITY_HIT_ENTITY);
}
export function OnTaskChange() {
    return OnInternal(INTERNAL_EVENTS.TASK_CHANGE);
}

export function OnceTaskChange() {
    return OnceInternal(INTERNAL_EVENTS.TASK_CHANGE);
}
export function OnPlayerWeaponShoot() {
    return OnInternal(INTERNAL_EVENTS.PLAYER_WEAPON_SHOOT);
}

export function OncePlayerWeaponShoot() {
    return OnceInternal(INTERNAL_EVENTS.PLAYER_WEAPON_SHOOT);
}
export function OnPlayerBulletHit() {
    return OnInternal(INTERNAL_EVENTS.PLAYER_BULLET_HIT);
}

export function OncePlayerBulletHit() {
    return OnceInternal(INTERNAL_EVENTS.PLAYER_BULLET_HIT);
}
export function OnPlayerWeaponChange() {
    return OnInternal(INTERNAL_EVENTS.PLAYER_WEAPON_CHANGE);
}

export function OncePlayerWeaponChange() {
    return OnceInternal(INTERNAL_EVENTS.PLAYER_WEAPON_CHANGE);
}
export function OnPlayerStartVehicleEnter() {
    return OnInternal(INTERNAL_EVENTS.PLAYER_START_VEHICLE_ENTER);
}

export function OncePlayerStartVehicleEnter() {
    return OnceInternal(INTERNAL_EVENTS.PLAYER_START_VEHICLE_ENTER);
}
export function OnPlayerStartVehicleLeave() {
    return OnInternal(INTERNAL_EVENTS.PLAYER_START_VEHICLE_LEAVE);
}

export function OncePlayerStartVehicleLeave() {
    return OnceInternal(INTERNAL_EVENTS.PLAYER_START_VEHICLE_LEAVE);
}
export function OnPlayerVehicleEntered() {
    return OnInternal(INTERNAL_EVENTS.PLAYER_VEHICLE_ENTERED);
}

export function OncePlayerVehicleEntered() {
    return OnceInternal(INTERNAL_EVENTS.PLAYER_VEHICLE_ENTERED);
}
export function OnPlayerVehicleLeft() {
    return OnInternal(INTERNAL_EVENTS.PLAYER_VEHICLE_LEFT);
}

export function OncePlayerVehicleLeft() {
    return OnceInternal(INTERNAL_EVENTS.PLAYER_VEHICLE_LEFT);
}
export function OnPlayerVehicleSeatChange() {
    return OnInternal(INTERNAL_EVENTS.PLAYER_VEHICLE_SEAT_CHANGE);
}

export function OncePlayerVehicleSeatChange() {
    return OnceInternal(INTERNAL_EVENTS.PLAYER_VEHICLE_SEAT_CHANGE);
}
export function OnVoiceConnectionUpdate() {
    return OnInternal(INTERNAL_EVENTS.VOICE_CONNECTION_UPDATE);
}

export function OnceVoiceConnectionUpdate() {
    return OnceInternal(INTERNAL_EVENTS.VOICE_CONNECTION_UPDATE);
}
export function OnPlayerStartTalking() {
    return OnInternal(INTERNAL_EVENTS.PLAYER_START_TALKING);
}

export function OncePlayerStartTalking() {
    return OnceInternal(INTERNAL_EVENTS.PLAYER_START_TALKING);
}
export function OnPlayerStopTalking() {
    return OnInternal(INTERNAL_EVENTS.PLAYER_STOP_TALKING);
}

export function OncePlayerStopTalking() {
    return OnceInternal(INTERNAL_EVENTS.PLAYER_STOP_TALKING);
}

export function OnWorldObjectPositionChange() {
    return OnInternal(INTERNAL_EVENTS.WORLD_OBJECT_POSITION_CHANGE);
}

export function OnceWorldObjectPositionChange() {
    return OnceInternal(INTERNAL_EVENTS.WORLD_OBJECT_POSITION_CHANGE);
}
export function OnWorldObjectStreamIn() {
    return OnInternal(INTERNAL_EVENTS.WORLD_OBJECT_STREAM_IN);
}

export function OnceWorldObjectStreamIn() {
    return OnceInternal(INTERNAL_EVENTS.WORLD_OBJECT_STREAM_IN);
}
export function OnWorldObjectStreamOut() {
    return OnInternal(INTERNAL_EVENTS.WORLD_OBJECT_STREAM_OUT);
}

export function OnceWorldObjectStreamOut() {
    return OnceInternal(INTERNAL_EVENTS.WORLD_OBJECT_STREAM_OUT);
}
export function OnEvent() {
    return OnInternal(INTERNAL_EVENTS.EVENT);
}

export function OnceEvent() {
    return OnceInternal(INTERNAL_EVENTS.EVENT);
}
export function OnBaseObjectCreate() {
    return OnInternal(INTERNAL_EVENTS.BASE_OBJECT_CREATE);
}

export function OnceBaseObjectCreate() {
    return OnceInternal(INTERNAL_EVENTS.BASE_OBJECT_CREATE);
}
export function OnBaseObjectRemove() {
    return OnInternal(INTERNAL_EVENTS.BASE_OBJECT_REMOVE);
}

export function OnceBaseObjectRemove() {
    return OnceInternal(INTERNAL_EVENTS.BASE_OBJECT_REMOVE);
}
export function OnNetOwnerChange() {
    return OnInternal(INTERNAL_EVENTS.NET_OWNER_CHANGE);
}

export function OnceNetOwnerChange() {
    return OnceInternal(INTERNAL_EVENTS.NET_OWNER_CHANGE);
}
export function OnWeaponDamage() {
    return OnInternal(INTERNAL_EVENTS.WEAPON_DAMAGE);
}

export function OnceWeaponDamage() {
    return OnceInternal(INTERNAL_EVENTS.WEAPON_DAMAGE);
}
export function OnMetaChange() {
    return OnInternal(INTERNAL_EVENTS.META_CHANGE);
}

export function OnceMetaChange() {
    return OnceInternal(INTERNAL_EVENTS.META_CHANGE);
}
export function OnLocalMetaChange() {
    return OnInternal(INTERNAL_EVENTS.LOCAL_META_CHANGE);
}

export function OnceLocalMetaChange() {
    return OnceInternal(INTERNAL_EVENTS.LOCAL_META_CHANGE);
}
export function OnSyncedMetaChange() {
    return OnInternal(INTERNAL_EVENTS.SYNCED_META_CHANGE);
}

export function OnceSyncedMetaChange() {
    return OnceInternal(INTERNAL_EVENTS.SYNCED_META_CHANGE);
}
export function OnStreamSyncedMetaChange() {
    return OnInternal(INTERNAL_EVENTS.STREAM_SYNCED_META_CHANGE);
}

export function OnceStreamSyncedMetaChange() {
    return OnceInternal(INTERNAL_EVENTS.STREAM_SYNCED_META_CHANGE);
}
export function OnGlobalMetaChange() {
    return OnInternal(INTERNAL_EVENTS.GLOBAL_META_CHANGE);
}

export function OnceGlobalMetaChange() {
    return OnceInternal(INTERNAL_EVENTS.GLOBAL_META_CHANGE);
}
export function OnGlobalSyncedMetaChange() {
    return OnInternal(INTERNAL_EVENTS.GLOBAL_SYNCED_META_CHANGE);
}

export function OnceGlobalSyncedMetaChange() {
    return OnceInternal(INTERNAL_EVENTS.GLOBAL_SYNCED_META_CHANGE);
}
export function OnEntityColShapeEnter() {
    return OnInternal(INTERNAL_EVENTS.ENTITY_COL_SHAPE_ENTER);
}

export function OnceEntityColShapeEnter() {
    return OnceInternal(INTERNAL_EVENTS.ENTITY_COL_SHAPE_ENTER);
}
export function OnEntityColShapeLeave() {
    return OnInternal(INTERNAL_EVENTS.ENTITY_COL_SHAPE_LEAVE);
}

export function OnceEntityColShapeLeave() {
    return OnceInternal(INTERNAL_EVENTS.ENTITY_COL_SHAPE_LEAVE);
}
export function OnEntityCheckpointEnter() {
    return OnInternal(INTERNAL_EVENTS.ENTITY_CHECKPOINT_ENTER);
}

export function OnceEntityCheckpointEnter() {
    return OnceInternal(INTERNAL_EVENTS.ENTITY_CHECKPOINT_ENTER);
}
export function OnEntityCheckpointLeave() {
    return OnInternal(INTERNAL_EVENTS.ENTITY_CHECKPOINT_LEAVE);
}

export function OnceEntityCheckpointLeave() {
    return OnceInternal(INTERNAL_EVENTS.ENTITY_CHECKPOINT_LEAVE);
}
export function OnColShapeEvent() {
    return OnInternal(INTERNAL_EVENTS.COL_SHAPE_EVENT);
}

export function OnceColShapeEvent() {
    return OnceInternal(INTERNAL_EVENTS.COL_SHAPE_EVENT);
}
export function OnConsoleCommand() {
    return OnInternal(INTERNAL_EVENTS.CONSOLE_COMMAND);
}

export function OnceConsoleCommand() {
    return OnceInternal(INTERNAL_EVENTS.CONSOLE_COMMAND);
}
export function OnError() {
    return OnInternal(INTERNAL_EVENTS.ERROR);
}

export function OnceError() {
    return OnceInternal(INTERNAL_EVENTS.ERROR);
}
export function OnLocalScriptEvent() {
    return OnInternal(INTERNAL_EVENTS.LOCAL_SCRIPT_EVENT);
}

export function OnceLocalScriptEvent() {
    return OnceInternal(INTERNAL_EVENTS.LOCAL_SCRIPT_EVENT);
}
export function OnRemoteScriptEvent() {
    return OnInternal(INTERNAL_EVENTS.REMOTE_SCRIPT_EVENT);
}

export function OnceRemoteScriptEvent() {
    return OnceInternal(INTERNAL_EVENTS.REMOTE_SCRIPT_EVENT);
}
export function OnResourceStart() {
    return OnInternal(INTERNAL_EVENTS.RESOURCE_START);
}

export function OnceResourceStart() {
    return OnceInternal(INTERNAL_EVENTS.RESOURCE_START);
}
export function OnResourceStop() {
    return OnInternal(INTERNAL_EVENTS.RESOURCE_STOP);
}

export function OnceResourceStop() {
    return OnceInternal(INTERNAL_EVENTS.RESOURCE_STOP);
}
export function OnResourceError() {
    return OnInternal(INTERNAL_EVENTS.RESOURCE_ERROR);
}

export function OnceResourceError() {
    return OnceInternal(INTERNAL_EVENTS.RESOURCE_ERROR);
}
