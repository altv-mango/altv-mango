import * as altClient from 'alt-client';
import * as Enums from './enums';
import type { AudioCreateOptions, Entity, IVector2, IVector3, KeyStateInfo, Quaternion, WeatherCycle } from '@altv/client';

export const isStreamerModeEnabled = altClient.isInStreamerMode();
export const locale = altClient.getLocale() as unknown as Enums.Locale;
export const licenseHash = altClient.getLicenseHash();
export const clientConfig = altClient.Resource.current.config as Readonly<Record<string, unknown>>;
// cosnt localMeta = altClient.meta

export function isMenuOpen() {
    return altClient.isMenuOpen();
}

export function isConsoleOpen() {
    return altClient.isConsoleOpen();
}

export function isGameFocused() {
    return altClient.isGameFocused();
}

export function getFps() {
    return altClient.getFps();
}

export function getPing() {
    return altClient.getPing();
}

export function getTotalPacketsSent() {
    return altClient.getTotalPacketsSent();
}

export function getTotalPacketsLost() {
    return altClient.getTotalPacketsLost();
}

export function getServerIp() {
    return altClient.getServerIp();
}

export function getServerPort() {
    return altClient.getServerPort();
}

export function getScreenResolution() {
    return altClient.getScreenResolution();
}

export function isFullscreen() {
    return altClient.isFullScreen();
}

export function areGameControlsActive() {
    return altClient.gameControlsEnabled();
}

export function setGameControlsActive(value: boolean) {
    altClient.toggleGameControls(value);
}

export function getMsPerGameMinute() {
    return altClient.getMsPerGameMinute();
}

export function setMsPerGameMinute(value: number) {
    altClient.setMsPerGameMinute(value);
}

export function getServerTime() {
    return altClient.getServerTime();
}

export function areRmlControlsActive() {
    return altClient.rmlControlsEnabled();
}

export function setRmlControlsActive(value: boolean) {
    altClient.toggleRmlControls(value);
}

export function getKeyState(key: Enums.KeyCode) {
    return {
        isDown: altClient.isKeyDown(key as number),
        isToggled: altClient.isKeyToggled(key as number),
    } as KeyStateInfo;
}

export function beginScaleformMovieMethodMinimap(method: string) {
    altClient.beginScaleformMovieMethodMinimap(method);
}

export function setWeatherCycle(weathers: WeatherCycle[]) {
    altClient.setWeatherCycle(
        weathers.map((weather) => weather.weather),
        weathers.map((weather) => weather.multiplier),
    );
}

export function setWeatherSyncActive(state: boolean) {
    altClient.setWeatherSyncActive(state);
}

export function getPermissionState(permission: Enums.Permission) {
    return altClient.getPermissionState(permission);
}

export function takeScreenshot(gameOnly?: boolean) {
    return gameOnly ? altClient.takeScreenshotGameOnly() : altClient.takeScreenshot();
}

export function setAngularVelocity(entity: Entity, quaternion: Quaternion) {
    // TODO: Implement this
    // altClient.setRotationVelocity(entity, quaternion);
}

export function headshotToBase64(id: number) {
    return altClient.getHeadshotBase64(id);
}

export function setDlcClothes(scriptId: number, component: number, drawable: number, texture: number, palette?: number, dlc?: number) {
    altClient.setPedDlcClothes(scriptId, dlc!, component, drawable, texture, palette);
}

export function setDlcProps(scriptId: number, component: number, drawable: number, texture: number, dlc?: number) {
    altClient.setPedDlcProp(scriptId, dlc!, component, drawable, texture);
}

export function clearProps(scriptId: number, component: number) {
    altClient.clearPedProp(scriptId, component);
}

export function setWatermarkPosition(position: Enums.WatermarkPosition) {
    altClient.setWatermarkPosition(position);
}

export function copyToClipboard(text: string) {
    altClient.copyToClipboard(text);
}

export function toggleRmlDebugger() {
    // TODO: Implement this
}

export function loadRmlFontFace(path: string, name: string, isItalic?: boolean, isBold?: boolean) {
    altClient.loadRmlFont(path, name, isItalic, isBold);
}

export function worldToScreen(pos: IVector3) {
    // TODO: Implement this
    return altClient.worldToScreen(pos);
}

export function screenToWorld(pos: IVector2) {
    // TODO: Implement this
    return altClient.screenToWorld(pos);
}

export function setMinimapComponentPosition(name: string, alignX: string, alignY: string, pos: IVector2, size: IVector2) {
    altClient.setMinimapComponentPosition(name, alignX, alignY, pos, size);
}

export function resetMinimapComponentPosition(name: string) {
    altClient.resetMinimapComponentPosition(name);
}

export function setMinimapIsRectangle(state: boolean) {
    altClient.setMinimapIsRectangle(state);
}

export function getPedBonePos(scriptId: number, boneId: number) {
    // TODO: Implement this
    return altClient.getPedBonePos(scriptId, boneId);
}

export function isPointOnScreen(pos: IVector3) {
    return altClient.isPointOnScreen(pos);
}

export function getPoolSize(pool: string) {
    return altClient.getPoolSize(pool);
}

export function getPoolCount(pool: string) {
    return altClient.getPoolCount(pool);
}

export function getPoolEntities(pool: string) {
    return altClient.getPoolEntities(pool);
}

export function updateClipContext(context: Record<string, string>) {
    altClient.updateClipContext(context);
}

export class Audio {
    private $audio: altClient.Audio; // Add

    public source: string;
    public loop: boolean;
    public volume: number;

    public readonly outputs: Array<AudioOutput>;
    public readonly currentTime: number;
    public readonly maxTime: number;
    public readonly isPlaying: boolean;
    public readonly listeners: Map<string, Array<(...args: unknown[]) => Promise<void> | void>>;

    public addOutput(output: AudioOutput) {
        // TODO: Implement this
    }
    public removeOutput(output: AudioOutput) {
        // TODO: Implement this
    }
    public play() {
        this.$audio.play();
    }
    public pause() {
        this.$audio.pause();
    }
    public reset() {
        this.$audio.reset();
    }
    public seek(time: number) {
        this.$audio.seek(time);
    }

    public on(eventName: string, func: (...args: unknown[]) => void) {
        if (!this.listeners.has(eventName)) {
            this.listeners.set(eventName, [func]);
            this.$audio.on(eventName, func);
            return;
        }
        this.$audio.on(eventName, func);
        this.listeners.get(eventName)!.push(func);
    }
    public once(eventName: string, func: (...args: unknown[]) => void) {}
    public off(eventName: string, func: (...args: unknown[]) => void) {
        throw new Error('Not implemented');
    }

    public onCreate?(opts: AudioCreateOptions): void;
    public onDestroy?(): void;

    public static readonly all: Array<Audio>;

    public static create(options: AudioCreateOptions) {
        const audio = new Audio();
        audio.$audio = new altClient.Audio(options.source, options.volume, options.radio, options.clearCache);
        this.all.push(audio);
        return audio;
    }
    public static getByID(id: number) {
        return this.all.find((audio) => audio.$audio.id === id);
    }

    public static setFactory(factory: typeof Audio) {
        throw new Error('Not implemented');
    }
    public static getFactory<T extends Audio>() {
        throw new Error('Not implemented');
    }
}

export class AudioCategory {
    private $category: altClient.AudioCategory; // Add

    public readonly name: string;
    public volume: number;
    public distanceRolloffScale: number;
    public plateauRolloffScale: number;
    public occlusionDamping: number;
    public environmentalFilterDamping: number;
    public sourceReverbDamping: number;
    public distanceReverbDamping: number;
    public interiorReverbDamping: number;
    public environmentalLoudness: number;
    public underwaterWetLevel: number;
    public stonedWetLevel: number;
    public pitch: number;
    public lowPassFilterCutoff: number;
    public highPassFilterCutoff: number;

    public reset() {
        throw new Error('Not implemented');
    }

    public static get(name: string) {
        return altClient.AudioCategory.getForName(name);
    }
}
