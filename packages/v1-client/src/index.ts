import * as altClient from 'alt-client';
import * as Enums from './enums';
import type {
    AudioCreateOptions,
    AudioFilterCreateOptions,
    AudioOutputAttachedCreateOptions,
    AudioOutputFrontendCreateOptions,
    AudioOutputWorldCreateOptions,
    BaseObjectMeta,
    BaseObjectSyncedMeta,
    Entity,
    IVector2,
    IVector3,
    KeyStateInfo,
    Quaternion,
    WeatherCycle,
} from '@altv/client';

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
            // @ts-ignore
            this.$audio.on(eventName, func);
            return;
        }
        // @ts-ignore
        this.$audio.on(eventName, func);
        this.listeners.get(eventName)!.push(func);
    }
    public once(eventName: string, func: (...args: unknown[]) => void) {
        throw new Error('Not implemented');
    }
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
    private $original: altClient.AudioCategory; // Add

    public get name() {
        return this.$original.name;
    }
    public get volume() {
        return this.$original.volume;
    }
    public set volume(value: number) {
        this.$original.volume = value;
    }
    public get distanceRolloffScale() {
        return this.$original.distanceRolloffScale;
    }
    public set distanceRolloffScale(value: number) {
        this.$original.distanceRolloffScale = value;
    }
    public get plateauRolloffScale() {
        return this.$original.plateauRolloffScale;
    }
    public set plateauRolloffScale(value: number) {
        this.$original.plateauRolloffScale = value;
    }
    public get occlusionDamping() {
        return this.$original.occlusionDamping;
    }
    public set occlusionDamping(value: number) {
        this.$original.occlusionDamping = value;
    }
    public get environmentalFilterDamping() {
        return this.$original.environmentalFilterDamping;
    }
    public set environmentalFilterDamping(value: number) {
        this.$original.environmentalFilterDamping = value;
    }
    public get sourceReverbDamping() {
        return this.$original.sourceReverbDamping;
    }
    public set sourceReverbDamping(value: number) {
        this.$original.sourceReverbDamping = value;
    }
    public get distanceReverbDamping() {
        return this.$original.distanceReverbDamping;
    }
    public set distanceReverbDamping(value: number) {
        this.$original.distanceReverbDamping = value;
    }
    public get interiorReverbDamping() {
        return this.$original.interiorReverbDamping;
    }
    public set interiorReverbDamping(value: number) {
        this.$original.interiorReverbDamping = value;
    }
    public get environmentalLoudness() {
        return this.$original.environmentalLoudness;
    }
    public set environmentalLoudness(value: number) {
        this.$original.environmentalLoudness = value;
    }
    public get underwaterWetLevel() {
        return this.$original.underwaterWetLevel;
    }
    public set underwaterWetLevel(value: number) {
        this.$original.underwaterWetLevel = value;
    }
    public get stonedWetLevel() {
        return this.$original.stonedWetLevel;
    }
    public set stonedWetLevel(value: number) {
        this.$original.stonedWetLevel = value;
    }
    public get pitch() {
        return this.$original.pitch;
    }
    public set pitch(value: number) {
        this.$original.pitch = value;
    }
    public get lowPassFilterCutoff() {
        return this.$original.lowPassFilterCutoff;
    }
    public set lowPassFilterCutoff(value: number) {
        this.$original.lowPassFilterCutoff = value;
    }
    public get highPassFilterCutoff() {
        return this.$original.highPassFilterCutoff;
    }

    public reset() {
        throw new Error('Not implemented');
    }

    public static get(name: string) {
        return altClient.AudioCategory.getForName(name);
    }
}

export class AudioFilter {
    private $original: altClient.AudioFilter; // Add

    public audioCategory: AudioCategory;
    public get hash() {
        return this.$original.hash;
    }

    public addRotateEffect(rate: number, priority: number) {
        return this.$original.addRotateEffect(rate, priority);
    }
    public addVolumeEffect(volume: number, priority: number, channel?: number) {
        return this.$original.addVolumeEffect(volume, priority, channel);
    }
    public addPeakeqEffect(band: number, bandwidth: number, q: number, center: number, gain: number, priority: number) {
        return this.$original.addPeakeqEffect(band, bandwidth, q, center, gain, priority);
    }
    public addDampEffect(target: number, quiet: number, rate: number, gain: number, delay: number, priority: number) {
        return this.$original.addDampEffect(target, quiet, rate, gain, delay, priority);
    }
    public addAutowahEffect(dryMix: number, wetMix: number, feedback: number, rate: number, range: number, freq: number, priority: number) {
        return this.$original.addAutowahEffect(dryMix, wetMix, feedback, rate, range, freq, priority);
    }
    public addPhaserEffect(dryMix: number, wetMix: number, feedback: number, rate: number, range: number, freq: number, priority: number) {
        return this.$original.addPhaserEffect(dryMix, wetMix, feedback, rate, range, freq, priority);
    }
    public addChorusEffect(
        dryMix: number,
        wetMix: number,
        feedback: number,
        minSweep: number,
        maxSweep: number,
        rate: number,
        priority: number,
    ) {
        return this.$original.addChorusEffect(dryMix, wetMix, feedback, minSweep, maxSweep, rate, priority);
    }
    public addDistortionEffect(drive: number, dryMix: number, wetMix: number, feedback: number, volume: number, priority: number) {
        return this.$original.addDistortionEffect(drive, dryMix, wetMix, feedback, volume, priority);
    }
    public addCompressor2Effect(gain: number, threshold: number, ratio: number, attack: number, release: number, priority: number) {
        return this.$original.addCompressor2Effect(gain, threshold, ratio, attack, release, priority);
    }
    public addBqfEffect(filter: number, center: number, gain: number, bandwidth: number, q: number, s: number, priority: number) {
        return this.$original.addBqfEffect(filter, center, gain, bandwidth, q, s, priority);
    }
    public addEcho4Effect(dryMix: number, wetMix: number, feedback: number, delay: number, priority: number) {
        return this.$original.addEcho4Effect(dryMix, wetMix, feedback, delay, priority);
    }
    public addPitchshiftEffect(pitchShift: number, semitones: number, fftSize: number, osamp: number, priority: number) {
        return this.$original.addPitchshiftEffect(pitchShift, semitones, fftSize, osamp, priority);
    }
    public addFreeverbEffect(
        dryMix: number,
        wetMix: number,
        roomSize: number,
        damp: number,
        width: number,
        mode: number,
        priority: number,
    ) {
        return this.$original.addFreeverbEffect(dryMix, wetMix, roomSize, damp, width, mode, priority);
    }

    public removeEffect(fxHandler: number) {
        return this.$original.removeEffect(fxHandler);
    }

    public onCreate?(opts: AudioFilterCreateOptions): void;
    public onDestroy?(): void;

    public static readonly all: Array<AudioFilter>;

    public static create(options: AudioFilterCreateOptions) {
        const filter = new AudioFilter();
        filter.$original = new altClient.AudioFilter(options.hash as string);
        this.all.push(filter);
        return filter;
    }
    public static getByID(id: number) {
        return this.all.find((filter) => filter.$original.id === id);
    }

    public static setFactory(factory: typeof AudioFilter) {
        throw new Error('Not implemented');
    }
    public static getFactory<T extends AudioFilter>() {
        throw new Error('Not implemented');
    }
}

export class AudioOutput extends BaseObject {
    protected $original: altClient.AudioOutput; // Add

    public get muted() {
        return this.$original.muted;
    }
    public set muted(value: boolean) {
        this.$original.muted = value;
    }
    public get volume() {
        return this.$original.volume;
    }
    public set volume(value: number) {
        this.$original.volume = value;
    }
    public get category() {
        return this.$original.category;
    }
    public get owner() {
        return this.$original.owner;
    }

    public filter: AudioFilter | null;

    public static getByID(id: number) {
        const output = altClient.AudioOutput.getByID(id);
        if (!output) return null;
        const instance = new AudioOutput();
        instance.$original = output;
        return instance;
    }
}

export class AudioOutputAttached extends AudioOutput {
    public entity: WorldObject;

    public onCreate?(opts: AudioOutputAttachedCreateOptions): void;
    public onDestroy?(): void;

    public static readonly all: Array<AudioOutputAttached> = [];

    public static create(options: AudioOutputAttachedCreateOptions) {
        const output = new AudioOutputAttached();
        output.$original = new altClient.AudioOutputAttached(options.entity, options.categoryHash);
        this.all.push(output);
        return output;
    }

    public static setFactory(factory: typeof AudioOutputAttached) {
        throw new Error('Not implemented');
    }
    public static getFactory<T extends AudioOutputAttached>() {
        throw new Error('Not implemented');
    }
}

export class AudioOutputFrontend extends AudioOutput {
    public onCreate?(opts: AudioOutputFrontendCreateOptions): void;
    public onDestroy?(): void;

    static readonly all: Array<AudioOutputFrontend>;

    public static create(options: AudioOutputFrontendCreateOptions) {
        const output = new AudioOutputFrontend();
        output.$original = new altClient.AudioOutputFrontend(options.categoryHash);
        this.all.push(output);
        return output;
    }

    static setFactory(factory: typeof AudioOutputFrontend) {
        throw new Error('Not implemented');
    }
    static getFactory<T extends AudioOutputFrontend>() {
        throw new Error('Not implemented');
    }
}

export class AudioOutputWorld extends AudioOutput {
    public pos: altShared.Vector3;

    public onCreate?(opts: AudioOutputWorldCreateOptions): void;
    public onDestroy?(): void;

    public static readonly all: Array<AudioOutputWorld> = [];

    public static create(options: AudioOutputWorldCreateOptions) {
        const output = new AudioOutputWorld();
        output.$original = new altClient.AudioOutputWorld(options.pos, options.categoryHash);
        this.all.push(output);
        return output;
    }

    public static setFactory(factory: typeof AudioOutputWorld) {
        throw new Error('Not implemented');
    }
    public static getFactory<T extends AudioOutputWorld>() {
        throw new Error('Not implemented');
    }
}

export class BaseObject {
    private $original: altClient.BaseObject; // Add

    public get id() {
        return this.$original.id;
    }
    public get type() {
        return this.$original.type as unknown as Enums.BaseObjectType;
    }

    public get valid() {
        return this.$original.valid;
    }
    public destroy() {
        this.$original.destroy();
    }

    public get isRemote() {
        return this.$original.isRemote;
    }
    public get remoteID() {
        return this.$original.remoteID;
    }

    public static getByID(type: Enums.BaseObjectType, id: number) {
        const obj = altClient.BaseObject.getByID(type as number, id);
        if (!obj) return null;
        const instance = new BaseObject();
        instance.$original = obj;
        return instance;
    }
    public static getByRemoteID(type: Enums.BaseObjectType, id: number) {
        const obj = altClient.BaseObject.getByRemoteID(type as number, id);
        if (!obj) return null;
        const instance = new BaseObject();
        instance.$original = obj;
        return instance;
    }

    readonly meta: BaseObjectMeta & Record<string, unknown>;
    readonly syncedMeta: Readonly<BaseObjectSyncedMeta & Record<string, unknown>>;
}

export class Blip extends WorldObject {
    readonly scriptID: number;
    readonly isStreamedIn: boolean;
    readonly global: boolean;
    readonly isAttached: boolean;
    readonly attachedTo?: Entity;

    readonly meta: BlipMeta & Record<string, unknown>;
    readonly syncedMeta: Readonly<altShared.BlipSyncedMeta & Record<string, unknown>>;

    blipType: altShared.Enums.BlipType;
    scaleXY: altShared.Vector2;
    display: number;
    sprite: number;
    color: number;
    secondaryColor: number;
    alpha: number;
    flashTimer: number;
    flashInterval: number;
    friendly: boolean;
    route: boolean;
    bright: boolean;
    number: number;
    showCone: boolean;
    flashes: boolean;
    flashesAlternate: boolean;
    shortRange: boolean;
    priority: number;
    rotation: number;
    gxtName: string;
    name: string;
    routeColor: altShared.RGBA;
    pulse: boolean;
    missionCreator: boolean;
    tickVisible: boolean;
    headingIndicatorVisible: boolean;
    outlineIndicatorVisible: boolean;
    friendIndicatorVisible: boolean;
    crewIndicatorVisible: boolean;
    category: number;
    highDetail: boolean;
    shrinked: boolean;
    visible: boolean;
    hiddenOnLegend: boolean;
    minimalOnEdge: boolean;
    useHeightIndicatorOnEdge: boolean;
    shortHeightThreshold: boolean;

    attachTo(entity: Entity): boolean;
    fade(opacity: number, duration: number): void;

    static create(options: BlipCreateOptions): Blip;

    public onCreate?(opts: BlipCreateOptions): void;
    public onDestroy?(): void;

    static getByID(id: number): Blip | null;
    static getByRemoteID(id: number): Blip | null;
    static getByScriptID(id: number): Blip | null;

    static setFactory(factory: typeof Blip): void;
    static getFactory<T extends Blip>(): T;
}

export abstract class Marker extends WorldObject {
    readonly isGlobal: boolean;
    readonly streamingDistance: number;

    readonly meta: MarkerMeta & Record<string, unknown>;

    color: altShared.RGBA;
    visible: boolean;
    markerType: altShared.Enums.MarkerType;
    scale: altShared.IVector3;
    rot: altShared.IVector3;
    direction: altShared.IVector3;
    faceCamera: boolean;
    rotating: boolean;
    bobUpDown: boolean;

    static readonly all: ReadonlyArray<Marker>;

    public onCreate?(opts: MarkerCreateOptions): void;
    public onDestroy?(): void;

    static getByID(id: number): Marker | null;
    static getByRemoteID(id: number): Marker | null;
    static create(opts: MarkerCreateOptions): Marker;

    static setFactory(factory: typeof Marker): void;
    static getFactory<T extends Marker>(): T;
}

export abstract class ColShape extends WorldObject {
    readonly colShapeType: altShared.Enums.ColShapeType;
    playersOnly: boolean;

    isEntityIn(entity: Entity): boolean;
    isEntityIdIn(id: number): boolean;
    isPointIn(pos: altShared.Vector3): boolean;

    public onCreate?(opts: altShared.ColShapeCreateOptions): void;
    public onDestroy?(): void;

    static readonly all: ReadonlyArray<ColShape>;

    static create(opts: altShared.ColShapeCreateOptions): ColShape;
    static getByID(id: number): ColShape | null;
    static getByRemoteID(id: number): ColShape | null;

    static setFactory(factory: typeof ColShape): void;
    static getFactory<T extends ColShape>(): T;
}

export abstract class Checkpoint extends ColShape {
    readonly scriptID: number;
    readonly isStreamedIn: boolean;

    checkpointType: number;
    radius: number;
    height: number;
    color: altShared.RGBA;
    iconColor: altShared.RGBA;
    nextPos: altShared.IVector3;
    readonly streamingDistance: number;
    visible: boolean;

    isEntityIn(entity: Entity): boolean;
    isEntityIdIn(id: number): boolean;
    isPointIn(point: altShared.Vector3): boolean;

    // @ts-expect-error
    public onCreate?(opts: CheckpointCreateOptions): void;
    public onDestroy?(): void;

    static readonly all: ReadonlyArray<Checkpoint>;

    static create(opts: CheckpointCreateOptions): Checkpoint;
    static getByID(id: number): Checkpoint | null;
    static getByRemoteID(id: number): Checkpoint | null;
    static getByScriptID(scriptId: number): Checkpoint | null;

    static setFactory(factory: typeof Checkpoint): void;
    static getFactory<T extends Checkpoint>(): T;
}

export abstract class Entity extends WorldObject {
    readonly scriptID: number;

    get model(): number;
    readonly netOwner?: Player;
    readonly visible: boolean;
    readonly isStreamedIn: boolean;

    readonly syncedMeta: Readonly<altShared.EntitySyncedMeta & Record<string, unknown>>;
    readonly streamSyncedMeta: Readonly<altShared.EntityStreamSyncedMeta & Record<string, unknown>>;

    frozen: boolean;
    rot: altShared.Vector3;

    getSyncInfo(): Data.ISyncInfo;

    static readonly all: ReadonlyArray<Entity>;
    static getByScriptID(scriptId: number): Entity | null;
}

export abstract class Font extends BaseObject {
    static register(path: string): Font | undefined;
}

export abstract class Handling extends HandlingData {
    readonly isModified: boolean;

    reset(): void;
}

export abstract class HandlingData {
    readonly handlingNameHash: number;

    mass: number;
    initialDragCoeff: number;
    downforceModifier: number;
    unkFloat1: number;
    unkFloat2: number;
    unkFloat4: number;
    unkFloat5: number;
    centreOfMassOffset: altShared.Vector3;
    inertiaMultiplier: altShared.Vector3;
    percentSubmerged: number;
    percentSubmergedRatio: number;
    driveBiasFront: number;
    acceleration: number;
    initialDriveGears: number;
    driveInertia: number;
    clutchChangeRateScaleUpShift: number;
    clutchChangeRateScaleDownShift: number;
    initialDriveForce: number;
    driveMaxFlatVel: number;
    initialDriveMaxFlatVel: number;
    brakeForce: number;
    brakeBiasFront: number;
    brakeBiasRear: number;
    handBrakeForce: number;
    steeringLock: number;
    steeringLockRatio: number;
    tractionCurveMax: number;
    tractionCurveMaxRatio: number;
    tractionCurveMin: number;
    tractionCurveMinRatio: number;
    tractionCurveLateral: number;
    tractionCurveLateralRatio: number;
    tractionSpringDeltaMax: number;
    tractionSpringDeltaMaxRatio: number;
    lowSpeedTractionLossMult: number;
    camberStiffness: number;
    tractionBiasFront: number;
    tractionBiasRear: number;
    tractionLossMult: number;
    suspensionForce: number;
    suspensionCompDamp: number;
    suspensionReboundDamp: number;
    suspensionUpperLimit: number;
    suspensionLowerLimit: number;
    suspensionRaise: number;
    suspensionBiasFront: number;
    suspensionBiasRear: number;
    antiRollBarForce: number;
    antiRollBarBiasFront: number;
    antiRollBarBiasRear: number;
    rollCentreHeightFront: number;
    rollCentreHeightRear: number;
    collisionDamageMult: number;
    weaponDamageMult: number;
    deformationDamageMult: number;
    engineDamageMult: number;
    petrolTankVolume: number;
    oilVolume: number;
    seatOffsetDistX: number;
    seatOffsetDistY: number;
    seatOffsetDistZ: number;
    monetaryValue: number;
    modelFlags: number;
    handlingFlags: number;
    damageFlags: number;

    static get(modelHash: number | string): HandlingData | undefined;
}

export abstract class HttpClient extends BaseObject {
    get(url: string): Promise<HttpResponse>;
    head(url: string): Promise<HttpResponse>;
    post(url: string, body: string): Promise<HttpResponse>;
    put(url: string, body: string): Promise<HttpResponse>;
    delete(url: string, body: string): Promise<HttpResponse>;
    connect(url: string, body: string): Promise<HttpResponse>;
    options(url: string, body: string): Promise<HttpResponse>;
    trace(url: string, body: string): Promise<HttpResponse>;
    patch(url: string, body: string): Promise<HttpResponse>;

    readonly extraHeaders: Record<string, string>;

    public onCreate?(): void;
    public onDestroy?(): void;

    static create(): HttpClient;

    static getByID(id: number): HttpClient | null;
}

export abstract class Object extends Entity {
    readonly alpha: number;
    readonly textureVariation: number;
    readonly lodDistance: number;

    static readonly all: ReadonlyArray<Object>;
    static readonly streamedIn: ReadonlyArray<Object>;

    static getByID(id: number): Object | null;
    static getByRemoteID(id: number): Object | null;
    static getByScriptID(id: number): Object | null;

    static setFactory(factory: typeof Object): void;
    static getFactory<T extends Object>(): T;
}

export abstract class LocalObject extends Object {
    get model(): number;
    set model(value: number | string);
    alpha: number;
    readonly isDynamic: boolean;
    lodDistance: number;
    hasGravity: number;
    readonly isCollisionEnabled: boolean;
    positionFrozen: boolean;
    textureVariation: number;
    readonly isWorldObject: boolean;
    readonly isWeaponObject: boolean;
    readonly useStreaming: boolean;
    readonly streamingDistance: number;
    visible: boolean;

    // WeaponObject related
    weaponTintIndex: number;
    setWeaponComponentTintIndex(componentType: number, tintIndex: number): void;
    getWeaponComponentTintIndex(componentType: number): number;
    giveWeaponComponent(componentType: number): void;
    removeWeaponComponent(componentType: number): void;

    resetAlpha(): void;
    attachTo(
        target: number | Entity,
        boneIndex: number,
        pos: altShared.Vector3,
        rot: altShared.Vector3,
        useSoftPinning: boolean,
        collision: boolean,
        fixedRot: boolean,
    ): void;
    detach(dynamic: boolean): void;
    toggleCollision(toggle: boolean, keepPhysics: boolean): void;
    placeOnGroundProperly(): void;
    activatePhysics(): void;

    public waitForSpawn(timeout?: number): Promise<void>;

    public onCreate?(opts: LocalObjectCreateOptions): void;
    public onDestroy?(): void;

    static readonly allWorld: ReadonlyArray<LocalObject>;

    static create(options: LocalObjectCreateOptions): LocalObject;
    static getByID(id: number): LocalObject | null;
    static getByScriptID(scriptId: number): LocalObject | null;

    static setFactory(factory: typeof LocalObject): void;
    static getFactory<T extends LocalObject>(): T;
}

export abstract class Ped extends Entity {
    readonly health: number;
    readonly maxHealth: number;
    readonly armour: number;
    readonly currentWeapon: number;

    readonly meta: PedMeta & Record<string, unknown>;
    readonly syncedMeta: Readonly<altShared.PedSyncedMeta & Record<string, unknown>>;
    readonly streamSyncedMeta: Readonly<altShared.PedStreamSyncedMeta & Record<string, unknown>>;

    static readonly all: ReadonlyArray<Ped>;
    static readonly streamedIn: ReadonlyArray<Ped>;

    static getByID(id: number): Ped | null;
    static getByRemoteID(id: number): Ped | null;
    static getByScriptID(scriptID: number): Ped | LocalPed | null;

    static setFactory(factory: typeof Ped): void;
    static getFactory<T extends Ped>(): T;
}

export abstract class LocalPed extends Ped {
    get model(): number;
    set model(value: number | string);
    readonly streamingDistance: number;
    visible: boolean;
    readonly scriptID: number;
    readonly isStreamedIn: boolean;

    public waitForSpawn(timeout?: number): Promise<void>;

    public onCreate?(opts: LocalPedCreateOptions): void;
    public onDestroy?(): void;

    static readonly all: ReadonlyArray<Ped>;

    static create(options: LocalPedCreateOptions): LocalPed;
    static getByID(id: number): LocalPed | null;
    static getByScriptID(scriptId: number): LocalPed | null;

    static setFactory(factory: typeof LocalPed): void;
    static getFactory<T extends LocalPed>(): T;
}

export abstract class LocalPlayer extends Player {
    readonly currentAmmo: number;
    stamina: number;
    maxStamina: number;
    readonly currentWeaponData: WeaponData;
    readonly weapons: ReadonlyArray<{ hash: number; tintIndex: number; components: ReadonlyArray<number> }>;

    getWeaponAmmo(wepaonHash: number | string): number | undefined;
    hasWeapon(wepaonHash: number | string): boolean;
    getWeaponComponents(wepaonHash: number | string): ReadonlyArray<number> | undefined;

    static setFactory(factory: typeof LocalPlayer): void;
    static getFactory<T extends LocalPlayer>(): T;
}

export abstract class LocalVehicle extends Vehicle {
    get model(): number;
    set model(value: number | string);

    readonly streamingDistance: number;
    visible: boolean;
    readonly scriptID: number;
    readonly isStreamedIn: boolean;

    public waitForSpawn(timeout?: number): Promise<void>;

    public onCreate?(opts: LocalVehicleCreateOptions): void;
    public onDestroy?(): void;

    static create(opts: LocalVehicleCreateOptions): LocalVehicle;
    static getByID(id: number): LocalVehicle | null;
    static getByScriptID(scriptId: number): LocalVehicle | null;

    static setFactory(factory: typeof LocalVehicle): void;
    static getFactory<T extends LocalVehicle>(): T;
}

export abstract class Player extends Entity {
    readonly name: string;

    readonly isTalking: boolean;
    readonly micLevel: number;
    readonly taskData: string;
    spatialVolume: number;
    nonSpatialVolume: number;
    readonly filter: AudioFilter;

    readonly health: number;
    readonly maxHealth: number;
    readonly currentWeaponComponents: ReadonlyArray<number>;
    readonly currentWeaponTintIndex: number;
    get currentWeapon(): number;
    readonly isDead: boolean;
    readonly isJumping: boolean;
    readonly isInRagdoll: boolean;
    readonly isAiming: boolean;
    readonly isShooting: boolean;
    readonly isReloading: boolean;
    readonly isEnteringVehicle: boolean;
    readonly isLeavingVehicle: boolean;
    readonly isOnLadder: boolean;
    readonly isInMelee: boolean;
    readonly isInCover: boolean;
    readonly isParachuting: boolean;
    readonly armour: number;
    readonly maxArmour: number;
    readonly moveSpeed: number;
    readonly aimPos: altShared.Vector3;
    readonly headRotation: altShared.Vector3;
    readonly isInVehicle: boolean;
    readonly vehicle?: Vehicle;
    readonly seat: number;
    readonly entityAimingAt: Entity;
    readonly entityAimOffset: altShared.Vector3;
    readonly isFlashlightActive: boolean;
    readonly isSuperJumpEnabled: boolean;
    readonly isCrouching: boolean;
    readonly isStealthy: boolean;
    readonly currentAnimationDict: number;
    readonly currentAnimationName: number;
    readonly isSpawned: boolean;
    readonly forwardSpeed: number;
    readonly strafeSpeed: number;

    getWeaponTintIndex(weaponHash: number | string): number | undefined;
    hasWeaponComponent(weaponHash: number | string, componentHash: number | string): boolean;

    readonly syncedMeta: Readonly<altShared.PlayerSyncedMeta & Record<string, unknown>>;
    readonly streamSyncedMeta: Readonly<altShared.PlayerStreamSyncedMeta & Record<string, unknown>>;

    static readonly local: LocalPlayer;
    static readonly all: ReadonlyArray<Player>;
    static readonly streamedIn: ReadonlyArray<Player>;

    static getByID(id: number): Player | null;
    static getByRemoteID(id: number): Player | null;

    static setFactory(factory: typeof Player): void;
    static getFactory<T extends Player>(): T;
}

export abstract class RmlDocument extends RmlElement {
    title: string;
    readonly sourceUrl: string;
    readonly isVisible: boolean;
    readonly isModal: boolean;

    readonly body: RmlElement;

    show(isModal?: boolean, focused?: boolean): void;
    hide(): void;
    update(): void;

    createElement(tag: string): RmlElement;
    createTextNode(text: string): RmlElement;

    public onCreate?(opts: RmlDocumentCreateOptions): void;
    public onDestroy?(): void;

    static readonly all: ReadonlyArray<RmlDocument>;

    static create(options: RmlDocumentCreateOptions): RmlDocument;

    static getByID(id: string): RmlDocument | null;

    static setFactory(factory: typeof RmlDocument): void;
    static getFactory<T extends RmlDocument>(): T;
}

// @ts-ignore - Suppresses "Class static side incorrectly extends base class static side"
export abstract class RmlElement extends BaseObject {
    readonly listeners: ReadonlyMap<string, Array<(...args: unknown[]) => Promise<void> | void>>;

    readonly relativeOffset: altShared.Vector2;
    readonly absoluteOffset: altShared.Vector2;
    readonly baseline: number;
    readonly zIndex: number;
    readonly containingBlock: altShared.Vector2;

    readonly focusedElement?: RmlElement;
    readonly tagName: string;
    rmlID: string;
    readonly isOwned: boolean;
    readonly absoluteLeft: number;
    readonly absoluteTop: number;
    readonly clientLeft: number;
    readonly clientTop: number;
    readonly clientWidth: number;
    readonly clientHeight: number;
    readonly offsetLeft: number;
    readonly offsetTop: number;
    readonly offsetWidth: number;
    readonly offsetHeight: number;
    scrollLeft: number;
    scrollTop: number;
    readonly scrollWidth: number;
    readonly scrollHeight: number;
    readonly isVisible: boolean;

    readonly parent?: RmlElement;
    readonly nextSibling?: RmlElement;
    readonly previousSibling?: RmlElement;
    readonly firstChild?: RmlElement;
    readonly lastChild?: RmlElement;
    readonly childCount: number;
    readonly hasChildren: boolean;
    innerRML: string;
    readonly childNodes: ReadonlyArray<RmlElement>;

    readonly ownerDocument: RmlDocument;
    readonly attributes: Readonly<Record<string, string>>;
    readonly classList: ReadonlyArray<string>;
    readonly pseudoClassList: ReadonlyArray<string>;

    readonly style: Record<string, string>;

    addClass(name: string): boolean;
    removeClass(name: string): boolean;
    hasClass(name: string): boolean;
    addPseudoClass(name: string): boolean;
    removePseudoClass(name: string): boolean;
    hasPseudoClass(name: string): boolean;
    setOffset(offsetParent: RmlElement, offset: altShared.Vector2, fixed?: boolean): void;
    isPointWithinElement(point: altShared.Vector2): boolean;
    setProperty(name: string, value: string): boolean;
    removeProperty(name: string): boolean;
    hasProperty(name: string): boolean;
    hasLocalProperty(name: string): boolean;
    getProperty(name: string): string;
    getLocalProperty(name: string): string;
    getPropertyAbsoluteValue(): number;
    setAttribute(name: string, value: string): void;
    removeAttribute(name: string): boolean;
    hasAttribute(name: string): boolean;
    getAttribute(name: string): string;
    getClosest(selectors: string): RmlElement | null;
    getChild(index: number): RmlElement | null;
    appendChild(child: RmlElement): void;
    insertBefore(element: RmlElement, adjacentElement: RmlElement): void;
    replaceChild(element: RmlElement, oldElement: RmlElement): void;
    removeChild(child: RmlElement): void;

    focus(): boolean;
    blur(): void;
    click(): void;

    scrollIntoView(alignWithTop?: boolean): void;
    getElementByID(id: string): RmlElement | null;
    getElementsByTagName(tag: string): ReadonlyArray<RmlElement>;
    getElementsByClassName(tag: string): ReadonlyArray<RmlElement>;
    querySelector(selector: string): RmlElement | null;
    querySelectorAll(selector: string): ReadonlyArray<RmlElement>;

    on(eventName: string, func: (...args: unknown[]) => void): void;
    once(eventName: string, func: (...args: unknown[]) => void): void;
    off(eventName: string, func: (...args: unknown[]) => void): void;

    static getByID(id: string): RmlElement | null;
}

export abstract class TextLabel extends WorldObject {
    readonly isStreamedIn: boolean;
    readonly isGlobal: boolean;
    readonly target: Entity;
    visible: boolean;
    color: altShared.RGBA;
    scale: number;
    rot: altShared.Vector3;
    faceCamera: boolean;

    outlineColor: altShared.RGBA;
    outlineWidth: number;
    fontSize: number;
    textAlign: altShared.Enums.TextLabelAlignment;
    text: string;
    font: string;

    readonly streamingDistance: number;

    public onCreate?(opts: TextLabelCreateOptions): void;
    public onDestroy?(): void;

    static readonly all: ReadonlyArray<TextLabel>;

    static create(opts: TextLabelCreateOptions): TextLabel | null;

    static getByID(id: number): TextLabel | null;
    // static getByRemoteID(id: number): TextLabel | null;

    static setFactory(factory: typeof TextLabel): void;
    static getFactory<T extends TextLabel>(): T;
}

export abstract class Vehicle extends Entity {
    readonly neon: Readonly<altShared.VehicleNeonState>;

    readonly driver?: Player;
    readonly isDestroyed: boolean;
    readonly modKitsCount: number;
    readonly modKit: number;
    readonly IsPrimaryColorRGB: boolean;
    readonly primaryColor: number;
    readonly primaryColorRGB: altShared.RGBA;
    readonly isSecondaryColorRGB: boolean;
    readonly secondaryColor: number;
    readonly secondaryColorRGB: altShared.RGBA;
    readonly pearlColor: number;
    readonly wheelColor: number;
    readonly interiorColor: number;
    readonly dashboardColor: number;
    readonly isTireSmokeColorCustom: boolean;
    readonly tireSmokeColor: altShared.RGBA;
    readonly wheelType: number;
    readonly wheelVariation: number;
    readonly customTires: boolean;
    readonly specialDarkness: number;
    readonly numberplateIndex: number;
    readonly numberplateText: string;
    readonly windowTint: number;
    readonly dirtLevel: number;
    readonly isNeonActive: boolean;
    readonly neonColor: altShared.RGBA;
    readonly livery: number;
    readonly roofLivery: number;
    readonly appearanceDataBase64: string;
    readonly engineOn: boolean;
    readonly isHandbrakeActive: boolean;
    readonly headlightColor: number;
    readonly radioStationIndex: number;
    readonly isSirenActive: boolean;
    readonly lockState: altShared.Enums.VehicleLockState;
    readonly isDaylightOn: boolean;
    readonly isNightlightOn: boolean;
    readonly roofState: number;
    readonly isFlamethrowerActive: boolean;
    readonly lightsMultiplier: number;
    readonly gameStateBase64: string;
    readonly engineHealth: number;
    readonly petrolTankHealth: number;
    readonly wheelsCount: number;
    readonly repairsCount: number;
    readonly bodyHealth: number;
    readonly bodyAdditionalHealth: number;
    readonly hasArmoredWindows: boolean;
    readonly damageDataBase64: string;
    readonly manualEngineControl: boolean;
    readonly scriptDataBase64: string;
    readonly healthDataBase64: string;
    readonly velocity: altShared.Vector3;
    readonly steeringAngle: number;
    readonly rearWheelVariation: number;

    readonly streamSyncedMeta: Readonly<altShared.VehicleStreamSyncedMeta & Record<string, unknown>>;

    readonly speed: number;
    readonly gear: number;
    readonly maxGear: number;
    readonly rpm: number;
    readonly speedVector: altShared.Vector3;
    readonly handling: Handling;
    readonly isHandlingModified: boolean;
    indicatorLights: number;
    seatCount: number;
    readonly occupiedSeatsCount: number;
    readonly isTaxiLightOn: boolean;
    engineTemperature: number;
    fuelLevel: number;
    oilLevel: number;
    engineLightState: boolean;
    absLightState: boolean;
    petrolLightState: boolean;
    oilLightState: boolean;
    batteryLightState: boolean;
    suspensionHeight: number;

    getNeonActive(): altShared.VehicleNeonState;

    getMod(category: number): number;
    getModsCount(category: number): number;
    isExtraOn(extraId: number): boolean;
    getDoorState(doorId: number): number;
    isWindowOpened(windowId: number): boolean;
    isWheelBurst(wheelId: number): boolean;
    getWheelHasTire(wheelId: number): boolean;
    isWheelDetached(wheelId: number): boolean;
    isWheelOnFire(wheelId: number): boolean;
    getWheelHealth(wheelId: number): number;

    getPartDamageLevel(partId: number): number;
    getPartBulletHoles(partId: number): number;

    isLightDamaged(lightId: number): boolean;
    isWindowDamaged(windowId: number): boolean;

    isSpecialLightDamaged(specialLightId: number): boolean;
    getArmoredWindowHealth(windowId: number): number;
    getArmoredWindowShootCount(windowId: number): number;
    getBumperDamageLevel(bumperId: number): number;
    toggleExtra(extraId: number, state: boolean): void;

    resetHandling(): void;
    replaceHandling(): void;
    toggleTaxiLight(state: boolean): void;
    getWheelCamber(wheelId: number): number;
    setWheelCamber(wheelId: number, value: number): void;
    getWheelTrackWidth(wheelId: number): number;
    setWheelTrackWidth(wheelId: number, value: number): void;
    getWheelHeight(wheelId: number): number;
    setWheelHeight(wheelId: number, value: number): void;
    getWheelTyreRadius(wheelId: number): number;
    setWheelTyreRadius(wheelId: number, radius: number): void;
    getWheelRimRadius(wheelId: number): number;
    setWheelRimRadius(wheelId: number, radius: number): void;
    getWheelTyreWidth(wheelId: number): number;
    setWheelTyreWidth(wheelId: number, width: number): void;
    getWheelSurfaceMaterial(wheelId: number): number;
    resetDashboardLights(): void;

    static readonly all: ReadonlyArray<Vehicle>;
    static readonly streamedIn: ReadonlyArray<Vehicle>;

    static getByID(id: number): Vehicle | null;
    static getByRemoteID(id: number): Vehicle | null;
    static getByScriptID(scriptId: number): Vehicle | null;

    static setFactory(factory: typeof Vehicle): void;
    static getFactory<T extends Vehicle>(): T;
}

export abstract class VirtualEntityGroup extends BaseObject {
    readonly maxEntitiesInStream: number;

    public onCreate?(opts: altShared.VirtualEntityGroupCreateOptions): void;
    public onDestroy?(): void;

    static create(opts: altShared.VirtualEntityGroupCreateOptions): VirtualEntityGroup;

    static setFactory(factory: typeof VirtualEntityGroup): void;
    static getFactory<T extends VirtualEntityGroup>(): T;
}

export abstract class VirtualEntity extends WorldObject {
    readonly isStreamedIn: boolean;

    readonly group: VirtualEntityGroup;
    readonly streamingDistance: number;

    visible: boolean;

    readonly meta: VirtualEntityMeta & Record<string, unknown>;
    readonly syncedMeta: altShared.VirtualEntitySyncedMeta & Record<string, unknown>;
    readonly streamSyncedMeta: Readonly<altShared.VirtualEntityStreamSyncedMeta & Record<string, unknown>>;

    static readonly all: ReadonlyArray<VirtualEntity>;
    static readonly streamedIn: ReadonlyArray<VirtualEntity>;

    public onCreate?(opts: VirtualEntityCreateOptions): void;
    public onDestroy?(): void;

    static create(opts: VirtualEntityCreateOptions): VirtualEntity;

    static getByID(id: number): VirtualEntity | null;
    static getByRemoteID(id: number): VirtualEntity | null;

    static setFactory(factory: typeof VirtualEntity): void;
    static getFactory<T extends VirtualEntity>(): T;
}

export abstract class WeaponData {
    readonly modelHash: number;
    readonly nameHash: number;

    recoilShakeAmplitude: number;
    recoilAccuracyMax: number;
    recoilAccuracyToAllowHeadshotPlayer: number;
    recoilRecoveryRate: number;
    animReloadRate: number;
    vehicleReloadTime: number;
    lockOnRange: number;
    accuracySpread: number;
    range: number;
    damage: number;
    readonly clipSize: number;
    readonly timeBetweenShots: number;
    headshotDamageModifier: number;
    playerDamageModifier: number;

    static readonly all: ReadonlyArray<WeaponData>;

    static get(weaponHash: number | string): WeaponData | undefined;
}

export abstract class WebSocketClient extends BaseObject {
    url: string;
    autoReconnect: boolean;
    perMessageDeflate: boolean;
    pingInterval: number;
    readonly readyState: boolean;

    on<E extends keyof altShared.Events.WebSocketClientEvent>(eventName: E, listener: altShared.Events.WebSocketClientEvent[E]): void;
    on<E extends string>(
        eventName: Exclude<E, keyof altShared.Events.WebSocketClientEvent>,
        listener: Events.CustomEventCallback<unknown[]>,
    ): void;

    once<E extends keyof altShared.Events.WebSocketClientEvent>(eventName: E, listener: altShared.Events.WebSocketClientEvent[E]): void;
    once<E extends string>(
        eventName: Exclude<E, keyof altShared.Events.WebSocketClientEvent>,
        listener: Events.CustomEventCallback<unknown[]>,
    ): void;

    off<E extends keyof altShared.Events.WebSocketClientEvent>(eventName: E, listener: altShared.Events.WebSocketClientEvent[E]): void;
    off<E extends string>(
        eventName: Exclude<E, keyof altShared.Events.WebSocketClientEvent>,
        listener: Events.CustomEventCallback<unknown[]>,
    ): void;

    readonly listeners: ReadonlyMap<string, Array<(...args: unknown[]) => Promise<void> | void>>;

    start(): void;
    stop(): void;

    send(message: string | altShared.Buffer): boolean;

    addSubProtocol(protocol: string): void;
    getSubProtocols(): ReadonlyArray<string>;
    setExtraHeader(name: string, value: string): void;
    getExtraHeaders(): Readonly<Record<string, string>>;

    public onCreate?(opts: WebSocketClientCreateOptions): void;
    public onDestroy?(): void;

    static readonly all: ReadonlyArray<WebSocketClient>;

    static create(options: WebSocketClientCreateOptions): WebSocketClient;
    static getByID(id: number): WebSocketClient | null;

    static setFactory(factory: typeof WebSocketClient): void;
    static getFactory<T extends WebSocketClient>(): T;
}

export class TextEncoder {
    public readonly encoding: 'utf-8';

    public encode(str: string): Uint8Array;
    public encodeInto(str: string, arr: Uint8Array): { read: number; written: number };
}

export class TextDecoder {
    public readonly encoding: 'utf-8';

    constructor(encoding?: 'utf-8', options?: { fatal: boolean; ignoreBOM: boolean });

    public decode(buffer: ArrayBuffer): string;
}

export abstract class WebView extends BaseObject {
    focused: boolean;
    url: string;
    visible: boolean;

    readonly isOverlay: boolean;
    readonly isLoaded: boolean;
    readonly isReady: boolean;

    readonly listeners: ReadonlyMap<string, Array<(...args: unknown[]) => Promise<void> | void>>;

    size: altShared.Vector2;
    pos: altShared.Vector2;

    readonly outputs: ReadonlyArray<AudioOutput>;

    emit<E extends keyof altShared.Events.CustomClientToWebViewEvent>(
        eventName: E,
        ...args: Parameters<altShared.Events.CustomClientToWebViewEvent[E]>
    ): void;
    emit<E extends string>(eventName: Exclude<E, keyof altShared.Events.CustomClientToWebViewEvent>, ...args: unknown[]): void;

    emitRaw<E extends keyof altShared.Events.CustomClientToWebViewEvent>(
        eventName: E,
        ...args: Parameters<altShared.Events.CustomClientToWebViewEvent[E]>
    ): void;
    emitRaw<E extends string>(eventName: Exclude<E, keyof altShared.Events.CustomClientToWebViewEvent>, ...args: unknown[]): void;

    setExtraHeader(name: string, value: string): void;
    setZoomLevel(value: number): void;
    reload(ignoreCache: boolean): void;

    addOutput(output: AudioOutput): void;
    removeOutput(output: AudioOutput): void;

    on<E extends keyof altShared.Events.CustomWebViewToClientEvent>(
        eventName: E,
        listener: altShared.Events.CustomWebViewToClientEvent[E],
    ): void;
    on<E extends string>(
        eventName: Exclude<E, keyof altShared.Events.CustomWebViewToClientEvent>,
        listener: Events.CustomEventCallback<unknown[]>,
    ): void;

    once<E extends keyof altShared.Events.CustomWebViewToClientEvent>(
        eventName: E,
        listener: altShared.Events.CustomWebViewToClientEvent[E],
    ): void;
    once<E extends string>(
        eventName: Exclude<E, keyof altShared.Events.CustomWebViewToClientEvent>,
        listener: Events.CustomEventCallback<unknown[]>,
    ): void;

    off<E extends keyof altShared.Events.CustomWebViewToClientEvent>(
        eventName: E,
        listener: altShared.Events.CustomWebViewToClientEvent[E],
    ): void;
    off<E extends string>(
        eventName: Exclude<E, keyof altShared.Events.CustomWebViewToClientEvent>,
        listener: Events.CustomEventCallback<unknown[]>,
    ): void;

    public onCreate?(opts: _WebViewCreateOptionsDrawable | _WebViewCreateOptionsOverlay): void;
    public onDestroy?(): void;

    static readonly all: ReadonlyArray<WebView>;
    static readonly isGpuAccelerationActive: boolean;

    static create(options: _WebViewCreateOptionsDrawable): WebView;
    static create(options: _WebViewCreateOptionsOverlay): WebView;

    static getByID(id: number): WebView | null;

    static setFactory(factory: typeof WebView): void;
    static getFactory<T extends WebView>(): T;
}

export abstract class WorldObject extends BaseObject {
    dimension: number;
    pos: altShared.Vector3;
}

export abstract class ColShapeSphere extends ColShape {
    readonly radius: number;

    // @ts-expect-error
    public onCreate?(opts: altShared.ColShapeSphereCreateOptions): void;
    public onDestroy?(): void;

    static create(opts: altShared.ColShapeSphereCreateOptions): ColShapeSphere;
}

export abstract class ColShapeCylinder extends ColShape {
    readonly radius: number;
    readonly height: number;

    // @ts-expect-error
    public onCreate?(opts: altShared.ColShapeCylinderCreateOptions): void;
    public onDestroy?(): void;

    static create(opts: altShared.ColShapeCylinderCreateOptions): ColShapeCylinder;
}

export abstract class ColShapeCircle extends ColShape {
    readonly radius: number;

    // @ts-expect-error
    public onCreate?(opts: altShared.ColShapeCircleCreateOptions): void;
    public onDestroy?(): void;

    static create(opts: altShared.ColShapeCircleCreateOptions): ColShapeCircle;
}

export abstract class ColShapeCuboid extends ColShape {
    readonly min: altShared.Vector3;
    readonly max: altShared.Vector3;

    // @ts-expect-error
    public onCreate?(opts: altShared.ColShapeCuboidCreateOptions): void;
    public onDestroy?(): void;

    static create(opts: altShared.ColShapeCuboidCreateOptions): ColShapeCuboid;
}

export abstract class ColShapeRectangle extends ColShape {
    readonly min: altShared.Vector2;
    readonly max: altShared.Vector2;

    // @ts-expect-error
    public onCreate?(opts: altShared.ColShapeRectangleCreateOptions): void;
    public onDestroy?(): void;

    static create(opts: altShared.ColShapeRectangleCreateOptions): ColShapeRectangle;
}

export abstract class ColShapePolygon extends ColShape {
    readonly minZ: number;
    readonly maxZ: number;

    readonly points: ReadonlyArray<altShared.Vector2>;

    // @ts-expect-error
    public onCreate?(opts: altShared.ColShapePolygonCreateOptions): void;
    public onDestroy?(): void;

    static create(opts: altShared.ColShapePolygonCreateOptions): ColShapePolygon;
}

export abstract class RPCHandler {
    public readonly name: string;
    public readonly handler: (...args: unknown[]) => Promise<any> | any;
    public readonly valid: boolean;

    public destroy(): void;
}
