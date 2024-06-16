import * as alt from 'alt-client';
import type { WeatherCycle } from '@altv/shared';

export const isStreamerModeEnabled = alt.isInStreamerMode();
export const locale = alt.getLocale();
export const licenseHash = alt.getLicenseHash();
export const clientConfig = undefined; // TODO: Implement this
export const clientPath = undefined; // TODO: Implement this

export function areGameControlsActive() {
    return alt.gameControlsEnabled();
}

export function setGameControlsActive(state: boolean) {
    alt.toggleGameControls(state);
}

export function areRmlControlsActive() {
    return alt.rmlControlsEnabled();
}

export function setRmlControlsActive(state: boolean) {
    alt.toggleRmlControls(state);
}

export function getKeyState(key: number) {
    return {
        isDown: alt.isKeyDown(key),
        isToggled: alt.isKeyToggled(key),
    };
}

export function setWeatherCycle(weathers: WeatherCycle[]) {
    alt.setWeatherCycle(
        weathers.map((weather) => weather.weather),
        weathers.map((weather) => weather.multiplier),
    );
}

// TODO: Implement this
export function setAngularVelocity(entity: alt.Entity, quaternion: alt.Quaternion) {
    alt.setRotationVelocity(entity.scriptID, quaternion.x, quaternion.y, quaternion.z);
}

export function headshotToBase64(id: number) {
    return alt.getHeadshotBase64(id);
}

export function setDlcClothes(scriptId: number, component: number, drawable: number, texture: number, palette?: number, dlc?: number) {
    alt.setPedDlcClothes(scriptId, dlc!, component, drawable, texture, palette);
}

export function setDlcProps(scriptId: number, component: number, drawable: number, texture: number, dlc?: number) {
    alt.setPedDlcProp(scriptId, dlc!, component, drawable, texture);
}

export function clearProps(scriptId: number, component: number) {
    alt.clearPedProp(scriptId, component);
}

export function toggleRmlDebugger(_state: boolean) {
    alt.logWarning('toggleRmlDebugger is not implemented yet');
}

export function loadRmlFontFace(path: string, name: string, isItalic?: boolean, isBold?: boolean) {
    alt.loadRmlFont(path, name, isItalic, isBold);
}

export {
    isMenuOpen,
    isConsoleOpen,
    isGameFocused,
    getFps,
    getPing,
    getTotalPacketsSent,
    getTotalPacketsLost,
    getServerIp,
    getServerPort,
    getScreenResolution,
    isFullScreen,
    getMsPerGameMinute,
    setMsPerGameMinute,
    getServerTime,
    beginScaleformMovieMethodMinimap,
    setWeatherSyncActive,
    getPermissionState,
    takeScreenshot,
    setWatermarkPosition,
    copyToClipboard,
    worldToScreen,
    screenToWorld,
    setMinimapComponentPosition,
    resetMinimapComponentPosition,
    setMinimapIsRectangle,
    getPedBonePos,
    isPointOnScreen,
    getPoolSize,
    getPoolCount,
    getPoolEntities,
    updateClipContext,
} from 'alt-client';
