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
export function OnServerStarted() {
    return OnInternal(INTERNAL_EVENTS.SERVER_STARTED);
}

export function OnceServerStarted() {
    return OnceInternal(INTERNAL_EVENTS.SERVER_STARTED);
}
export function OnConnectionQueueAdd() {
    return OnInternal(INTERNAL_EVENTS.CONNECTION_QUEUE_ADD);
}

export function OnceConnectionQueueAdd() {
    return OnceInternal(INTERNAL_EVENTS.CONNECTION_QUEUE_ADD);
}
export function OnConnectionQueueRemove() {
    return OnInternal(INTERNAL_EVENTS.CONNECTION_QUEUE_REMOVE);
}

export function OnceConnectionQueueRemove() {
    return OnceInternal(INTERNAL_EVENTS.CONNECTION_QUEUE_REMOVE);
}
export function OnPlayerConnect() {
    return OnInternal(INTERNAL_EVENTS.PLAYER_CONNECT);
}

export function OncePlayerConnect() {
    return OnceInternal(INTERNAL_EVENTS.PLAYER_CONNECT);
}
export function OnPlayerConnectDenied() {
    return OnInternal(INTERNAL_EVENTS.PLAYER_CONNECT_DENIED);
}

export function OncePlayerConnectDenied() {
    return OnceInternal(INTERNAL_EVENTS.PLAYER_CONNECT_DENIED);
}
export function OnPlayerDisconnect() {
    return OnInternal(INTERNAL_EVENTS.PLAYER_DISCONNECT);
}

export function OncePlayerDisconnect() {
    return OnceInternal(INTERNAL_EVENTS.PLAYER_DISCONNECT);
}
export function OnPlayerDamage() {
    return OnInternal(INTERNAL_EVENTS.PLAYER_DAMAGE);
}

export function OncePlayerDamage() {
    return OnceInternal(INTERNAL_EVENTS.PLAYER_DAMAGE);
}
export function OnPlayerDeath() {
    return OnInternal(INTERNAL_EVENTS.PLAYER_DEATH);
}

export function OncePlayerDeath() {
    return OnceInternal(INTERNAL_EVENTS.PLAYER_DEATH);
}
export function OnPlayerHeal() {
    return OnInternal(INTERNAL_EVENTS.PLAYER_HEAL);
}

export function OncePlayerHeal() {
    return OnceInternal(INTERNAL_EVENTS.PLAYER_HEAL);
}
export function OnPlayerControlRequest() {
    return OnInternal(INTERNAL_EVENTS.PLAYER_CONTROL_REQUEST);
}

export function OncePlayerControlRequest() {
    return OnceInternal(INTERNAL_EVENTS.PLAYER_CONTROL_REQUEST);
}
export function OnPlayerInteriorChange() {
    return OnInternal(INTERNAL_EVENTS.PLAYER_INTERIOR_CHANGE);
}

export function OncePlayerInteriorChange() {
    return OnceInternal(INTERNAL_EVENTS.PLAYER_INTERIOR_CHANGE);
}
export function OnPlayerDimensionChange() {
    return OnInternal(INTERNAL_EVENTS.PLAYER_DIMENSION_CHANGE);
}

export function OncePlayerDimensionChange() {
    return OnceInternal(INTERNAL_EVENTS.PLAYER_DIMENSION_CHANGE);
}
export function OnPlayerWeaponChange() {
    return OnInternal(INTERNAL_EVENTS.PLAYER_WEAPON_CHANGE);
}

export function OncePlayerWeaponChange() {
    return OnceInternal(INTERNAL_EVENTS.PLAYER_WEAPON_CHANGE);
}
export function OnPlayerSyncedSceneRequest() {
    return OnInternal(INTERNAL_EVENTS.PLAYER_SYNCED_SCENE_REQUEST);
}

export function OncePlayerSyncedSceneRequest() {
    return OnceInternal(INTERNAL_EVENTS.PLAYER_SYNCED_SCENE_REQUEST);
}
export function OnPlayerSyncedSceneStart() {
    return OnInternal(INTERNAL_EVENTS.PLAYER_SYNCED_SCENE_START);
}

export function OncePlayerSyncedSceneStart() {
    return OnceInternal(INTERNAL_EVENTS.PLAYER_SYNCED_SCENE_START);
}
export function OnPlayerSyncedSceneStop() {
    return OnInternal(INTERNAL_EVENTS.PLAYER_SYNCED_SCENE_STOP);
}

export function OncePlayerSyncedSceneStop() {
    return OnceInternal(INTERNAL_EVENTS.PLAYER_SYNCED_SCENE_STOP);
}
export function OnPlayerSyncedSceneUpdate() {
    return OnInternal(INTERNAL_EVENTS.PLAYER_SYNCED_SCENE_UPDATE);
}

export function OncePlayerSyncedSceneUpdate() {
    return OnceInternal(INTERNAL_EVENTS.PLAYER_SYNCED_SCENE_UPDATE);
}
export function OnPlayerSpawn() {
    return OnInternal(INTERNAL_EVENTS.PLAYER_SPAWN);
}

export function OncePlayerSpawn() {
    return OnceInternal(INTERNAL_EVENTS.PLAYER_SPAWN);
}
export function OnPlayerAnimationChange() {
    return OnInternal(INTERNAL_EVENTS.PLAYER_ANIMATION_CHANGE);
}

export function OncePlayerAnimationChange() {
    return OnceInternal(INTERNAL_EVENTS.PLAYER_ANIMATION_CHANGE);
}
export function OnPlayerVehicleEntered() {
    return OnInternal(INTERNAL_EVENTS.PLAYER_VEHICLE_ENTERED);
}

export function OncePlayerVehicleEntered() {
    return OnceInternal(INTERNAL_EVENTS.PLAYER_VEHICLE_ENTERED);
}
export function OnPlayerStartVehicleEnter() {
    return OnInternal(INTERNAL_EVENTS.PLAYER_START_VEHICLE_ENTER);
}

export function OncePlayerStartVehicleEnter() {
    return OnceInternal(INTERNAL_EVENTS.PLAYER_START_VEHICLE_ENTER);
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

export function OnPedHeal() {
    return OnInternal(INTERNAL_EVENTS.PED_HEAL);
}

export function OncePedHeal() {
    return OnceInternal(INTERNAL_EVENTS.PED_HEAL);
}
export function OnPedDeath() {
    return OnInternal(INTERNAL_EVENTS.PED_DEATH);
}

export function OncePedDeath() {
    return OnceInternal(INTERNAL_EVENTS.PED_DEATH);
}
export function OnPedDamage() {
    return OnInternal(INTERNAL_EVENTS.PED_DAMAGE);
}

export function OncePedDamage() {
    return OnceInternal(INTERNAL_EVENTS.PED_DAMAGE);
}
export function OnVehicleDestroy() {
    return OnInternal(INTERNAL_EVENTS.VEHICLE_DESTROY);
}

export function OnceVehicleDestroy() {
    return OnceInternal(INTERNAL_EVENTS.VEHICLE_DESTROY);
}
export function OnVehicleAttach() {
    return OnInternal(INTERNAL_EVENTS.VEHICLE_ATTACH);
}

export function OnceVehicleAttach() {
    return OnceInternal(INTERNAL_EVENTS.VEHICLE_ATTACH);
}
export function OnVehicleDetach() {
    return OnInternal(INTERNAL_EVENTS.VEHICLE_DETACH);
}

export function OnceVehicleDetach() {
    return OnceInternal(INTERNAL_EVENTS.VEHICLE_DETACH);
}
export function OnVehicleDamage() {
    return OnInternal(INTERNAL_EVENTS.VEHICLE_DAMAGE);
}

export function OnceVehicleDamage() {
    return OnceInternal(INTERNAL_EVENTS.VEHICLE_DAMAGE);
}
export function OnVehicleSirenStateChange() {
    return OnInternal(INTERNAL_EVENTS.VEHICLE_SIREN_STATE_CHANGE);
}

export function OnceVehicleSirenStateChange() {
    return OnceInternal(INTERNAL_EVENTS.VEHICLE_SIREN_STATE_CHANGE);
}
export function OnVehicleHornStateChange() {
    return OnInternal(INTERNAL_EVENTS.VEHICLE_HORN_STATE_CHANGE);
}

export function OnceVehicleHornStateChange() {
    return OnceInternal(INTERNAL_EVENTS.VEHICLE_HORN_STATE_CHANGE);
}
export function OnVoiceConnection() {
    return OnInternal(INTERNAL_EVENTS.VOICE_CONNECTION);
}

export function OnceVoiceConnection() {
    return OnceInternal(INTERNAL_EVENTS.VOICE_CONNECTION);
}
export function OnClientObjectDelete() {
    return OnInternal(INTERNAL_EVENTS.CLIENT_OBJECT_DELETE);
}

export function OnceClientObjectDelete() {
    return OnceInternal(INTERNAL_EVENTS.CLIENT_OBJECT_DELETE);
}
export function OnClientObjectRequest() {
    return OnInternal(INTERNAL_EVENTS.CLIENT_OBJECT_REQUEST);
}

export function OnceClientObjectRequest() {
    return OnceInternal(INTERNAL_EVENTS.CLIENT_OBJECT_REQUEST);
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
export function OnColShapeEvent() {
    return OnInternal(INTERNAL_EVENTS.COL_SHAPE_EVENT);
}

export function OnceColShapeEvent() {
    return OnceInternal(INTERNAL_EVENTS.COL_SHAPE_EVENT);
}
export function OnExplosion() {
    return OnInternal(INTERNAL_EVENTS.EXPLOSION);
}

export function OnceExplosion() {
    return OnceInternal(INTERNAL_EVENTS.EXPLOSION);
}
export function OnFireStart() {
    return OnInternal(INTERNAL_EVENTS.FIRE_START);
}

export function OnceFireStart() {
    return OnceInternal(INTERNAL_EVENTS.FIRE_START);
}
export function OnProjectileStart() {
    return OnInternal(INTERNAL_EVENTS.PROJECTILE_START);
}

export function OnceProjectileStart() {
    return OnceInternal(INTERNAL_EVENTS.PROJECTILE_START);
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
export function OnGivePedScriptedTask() {
    return OnInternal(INTERNAL_EVENTS.GIVE_PED_SCRIPTED_TASK);
}

export function OnceGivePedScriptedTask() {
    return OnceInternal(INTERNAL_EVENTS.GIVE_PED_SCRIPTED_TASK);
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

export function OnAnyResourceStart() {
    return OnInternal(INTERNAL_EVENTS.ANY_RESOURCE_START);
}

export function OnceAnyResourceStart() {
    return OnceInternal(INTERNAL_EVENTS.ANY_RESOURCE_START);
}

export function OnAnyResourceStop() {
    return OnInternal(INTERNAL_EVENTS.ANY_RESOURCE_STOP);
}

export function OnceAnyResourceStop() {
    return OnceInternal(INTERNAL_EVENTS.ANY_RESOURCE_STOP);
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
export function OnEvent() {
    return OnInternal(INTERNAL_EVENTS.EVENT);
}

export function OnceEvent() {
    return OnceInternal(INTERNAL_EVENTS.EVENT);
}
