/// <reference types="../shared/index.d.ts" />

/**
 * @module @altv/client
 */

declare module '@altv/client' {
    import * as altShared from '@altv/shared';

    export const isStreamerModeEnabled: boolean;
    export const locale: altShared.Enums.Locale;
    export const licenseHash: string;
    export const clientConfig: Readonly<Record<string, unknown>>;
    export const clientPath: string;

    export const localMeta: Readonly<GlobalLocalMeta & Record<string, unknown>>;

    export function isMenuOpen(): boolean;
    export function isConsoleOpen(): boolean;
    export function isGameFocused(): boolean;
    export function getFps(): number;
    export function getPing(): number;
    export function getTotalPacketsSent(): number;
    export function getTotalPacketsLost(): number;
    export function getServerIp(): string;
    export function getServerPort(): number;
    export function getScreenResolution(): altShared.Vector2;
    export function isFullscreen(): boolean;
    export function areGameControlsActive(): boolean;
    export function setGameControlsActive(state: boolean): boolean;
    export function getMsPerGameMinute(): number;
    export function setMsPerGameMinute(ms: number): void;
    export function getServerTime(): number;
    export function areRmlControlsActive(): boolean;
    export function setRmlControlsActive(state: boolean): void;
    export function getKeyState(key: altShared.Enums.KeyCode): altShared.KeyStateInfo;
    export function beginScaleformMovieMethodMinimap(methodName: string): void;
    export function setWeatherCycle(weathers: altShared.WeatherCycle[]): void;
    export function setWeatherSyncActive(state: boolean): void;
    export function getPermissionState(permission: altShared.Enums.Permission): boolean;
    export function takeScreenshot(gameOnly?: boolean): Promise<string>;
    export function setAngularVelocity(entity: Entity, quaternion: altShared.Quaternion): void;
    export function headshotToBase64(id: number): string;
    export function setDlcClothes(
        scriptId: number,
        component: number,
        drawable: number,
        texture: number,
        palette?: number,
        dlc?: number,
    ): void;
    export function setDlcProps(scriptId: number, component: number, drawable: number, texture: number, dlc?: number): void;
    export function clearProps(scriptId: number, component: number): void;
    export function setWatermarkPosition(position: altShared.Enums.WatermarkPosition): void;
    export function copyToClipboard(str: string): void;
    export function toggleRmlDebugger(state: boolean): void;
    export function loadRmlFontFace(path: string, name: string, isItalic?: boolean, isBold?: boolean): void;
    export function worldToScreen(pos: altShared.IVector3): altShared.Vector3;
    export function screenToWorld(pos: altShared.IVector2): altShared.Vector3;
    export function setMinimapComponentPosition(
        name: string,
        alignX: string,
        alignY: string,
        pos: altShared.IVector2,
        size: altShared.IVector2,
    ): void;
    export function resetMinimapComponentPosition(name: string): void;
    export function setMinimapIsRectangle(state: boolean): void;
    export function getPedBonePos(scriptId: number, boneId: number): altShared.Vector3;
    export function isPointOnScreen(pos: altShared.IVector3): boolean;

    export function getPoolSize(pool: string): number;
    export function getPoolCount(pool: string): number;
    export function getPoolEntities(pool: string): Array<number>;

    export function updateClipContext(context: Record<string, string>);

    export interface AudioCreateOptions {
        source: string;
        volume: number;
        radio?: boolean; // default: false
        clearCache?: boolean; // default: true
    }

    export abstract class Audio {
        source: string;
        loop: boolean;
        volume: number;

        readonly outputs: ReadonlyArray<AudioOutput>;
        readonly currentTime: number;
        readonly maxTime: number;
        readonly isPlaying: boolean;
        readonly listeners: ReadonlyMap<string, Array<(...args: unknown[]) => Promise<void> | void>>;

        addOutput(output: AudioOutput): void;
        removeOutput(output: AudioOutput): void;
        play(): void;
        pause(): void;
        reset(): void;
        seek(time: number): void;

        on(eventName: string, func: (...args: unknown[]) => void): void;
        once(eventName: string, func: (...args: unknown[]) => void): void;
        off(eventName: string, func: (...args: unknown[]) => void): void;

        public onCreate?(opts: AudioCreateOptions): void;
        public onDestroy?(): void;

        static readonly all: ReadonlyArray<Audio>;

        static create(options: AudioCreateOptions): Audio;
        static getByID(id: number): Audio | null;

        static setFactory(factory: typeof Audio): void;
        static getFactory<T extends Audio>(): T;
    }

    export abstract class AudioCategory {
        readonly name: string;
        volume: number;
        distanceRolloffScale: number;
        plateauRolloffScale: number;
        occlusionDamping: number;
        environmentalFilterDamping: number;
        sourceReverbDamping: number;
        distanceReverbDamping: number;
        interiorReverbDamping: number;
        environmentalLoudness: number;
        underwaterWetLevel: number;
        stonedWetLevel: number;
        pitch: number;
        lowPassFilterCutoff: number;
        highPassFilterCutoff: number;

        reset(): void;

        static get(name: string): AudioCategory | undefined;
    }

    export interface AudioFilterCreateOptions {
        hash: number | string;
    }

    export abstract class AudioFilter {
        audioCategory: AudioCategory;
        readonly hash: number;

        addRotateEffect(rate: number, priority: number): number;
        addVolumeEffect(volume: number, priority: number, channel?: number): number;
        addPeakeqEffect(band: number, bandwidth: number, q: number, center: number, gain: number, priority: number): number;
        addDampEffect(target: number, quiet: number, rate: number, gain: number, delay: number, priority: number): number;
        addAutowahEffect(
            dryMix: number,
            wetMix: number,
            feedback: number,
            rate: number,
            range: number,
            freq: number,
            priority: number,
        ): number;
        addPhaserEffect(
            dryMix: number,
            wetMix: number,
            feedback: number,
            rate: number,
            range: number,
            freq: number,
            priority: number,
        ): number;
        addChorusEffect(
            dryMix: number,
            wetMix: number,
            feedback: number,
            minSweep: number,
            maxSweep: number,
            rate: number,
            priority: number,
        ): number;
        addDistortionEffect(drive: number, dryMix: number, wetMix: number, feedback: number, volume: number, priority: number): number;
        addCompressor2Effect(gain: number, threshold: number, ratio: number, attack: number, release: number, priority: number): number;
        addBqfEffect(filter: number, center: number, gain: number, bandwidth: number, q: number, s: number, priority: number): number;
        addEcho4Effect(dryMix: number, wetMix: number, feedback: number, delay: number, priority: number): number;
        addPitchshiftEffect(pitchShift: number, semitones: number, fftSize: number, osamp: number, priority: number): number;
        addFreeverbEffect(
            dryMix: number,
            wetMix: number,
            roomSize: number,
            damp: number,
            width: number,
            mode: number,
            priority: number,
        ): number;

        removeEffect(fxHandler: number): boolean;

        public onCreate?(opts: AudioFilterCreateOptions): void;
        public onDestroy?(): void;

        static readonly all: ReadonlyArray<AudioFilter>;

        static create(options: AudioFilterCreateOptions): AudioFilter;
        static getByID(id: number): AudioFilter | null;

        static setFactory(factory: typeof AudioFilter): void;
        static getFactory<T extends AudioFilter>(): T;
    }

    export abstract class AudioOutput extends BaseObject {
        muted: boolean;
        volume: number;
        readonly category: number;
        readonly owner: BaseObject;

        filter: AudioFilter | null;

        static getByID(id: number): AudioOutput | null;
    }

    export interface AudioOutputAttachedCreateOptions {
        entity: WorldObject;
        categoryHash?: number; // default: 'radio' hashed
    }

    export abstract class AudioOutputAttached extends AudioOutput {
        entity: WorldObject;

        public onCreate?(opts: AudioOutputAttachedCreateOptions): void;
        public onDestroy?(): void;

        static readonly all: ReadonlyArray<AudioOutputAttached>;

        static create(options: AudioOutputAttachedCreateOptions): AudioOutputAttached;

        static setFactory(factory: typeof AudioOutputAttached): void;
        static getFactory<T extends AudioOutputAttached>(): T;
    }

    export interface AudioOutputFrontendCreateOptions {
        //
        categoryHash?: number; // default: 'radio' hashed
    }

    export abstract class AudioOutputFrontend extends AudioOutput {
        public onCreate?(opts: AudioOutputFrontendCreateOptions): void;
        public onDestroy?(): void;

        static readonly all: ReadonlyArray<AudioOutputFrontend>;

        static create(options: AudioOutputFrontendCreateOptions): AudioOutputFrontendCreateOptions;

        static setFactory(factory: typeof AudioOutputFrontend): void;
        static getFactory<T extends AudioOutputFrontend>(): T;
    }

    export interface AudioOutputWorldCreateOptions {
        pos: altShared.Vector3;
        categoryHash?: number; // default: 'radio' hashed
    }

    export abstract class AudioOutputWorld extends AudioOutput {
        pos: altShared.Vector3;

        public onCreate?(opts: AudioOutputWorldCreateOptions): void;
        public onDestroy?(): void;

        static readonly all: ReadonlyArray<AudioOutputWorld>;

        static create(options: AudioOutputWorldCreateOptions): AudioOutputWorld;

        static setFactory(factory: typeof AudioOutputWorld): void;
        static getFactory<T extends AudioOutputWorld>(): T;
    }

    export class BaseObject extends altShared.BaseObject {
        readonly isRemote: boolean;
        readonly remoteID: number;

        static getByID(type: altShared.Enums.BaseObjectType, id: number): BaseObject | null;
        static getByRemoteID(type: altShared.Enums.BaseObjectType, id: number): BaseObject | null;

        readonly meta: BaseObjectMeta & Record<string, unknown>;
        readonly syncedMeta: Readonly<altShared.BaseObjectSyncedMeta & Record<string, unknown>>;
    }

    export type PointBlipCreateOptions = { pos: altShared.IVector3; entity?: never } | { entity: Entity; pos?: never };

    type BlipCreateOptions =
        | ({ blipType: altShared.Enums.BlipType.AREA } & altShared.AreaBlipCreateOptions)
        | ({ blipType: altShared.Enums.BlipType.RADIUS } & altShared.RadiusBlipCreateOptions)
        | ({ blipType: altShared.Enums.BlipType.DESTINATION } & PointBlipCreateOptions);

    export interface MarkerCreateOptions {
        type: altShared.Enums.MarkerType;
        pos: altShared.IVector3;
        color?: altShared.IRGBA; // default: {r: 255, g: 255, b: 255, a: 100}
        useStreaming?: boolean; // default: false
        streamingDistance?: number; // default: 0
    }

    export abstract class Blip extends WorldObject {
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

    export interface CheckpointCreateOptions {
        type: altShared.Enums.CheckpointType;
        pos: altShared.IVector3;
        radius: number;
        height: number;
        color: altShared.RGBA;
        iconColor: altShared.RGBA;
        nextPos: altShared.IVector3;
        streamingDistance: number;
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

    export type HttpResponse = { statusCode: number; headers: Readonly<Record<string, string>>; body: string };

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

    export interface LocalObjectCreateOptions {
        model: number | string;
        pos: altShared.Vector3;
        rot: altShared.Vector3;
        noOffset?: boolean; // default: false
        dynamic?: boolean; // default: false
        useStreaming?: boolean; // default: false
        streamingDistance?: number; // default: 0
    }

    // @ts-expect-error - Suppress "Class static side 'typeof LocalObject' incorrectly extends base class static side 'typeof Object'.""
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

    export interface WeaponObjectCreateOptions {
        pos: altShared.Vector3;
        rot: altShared.Vector3;
        weapon: number | string;
        model?: number | string; // default: weapon value
        ammoCount?: number; // default: 100
        createDefaultComponents?: boolean; // default: true
        scale?: number; // default: 1
        useStreaming?: boolean; // default: false
        streamingDistance?: number; // default: 0
    }

    export namespace WeaponObject {
        export function create(options: WeaponObjectCreateOptions): LocalObject;
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

    export interface LocalPedCreateOptions {
        model: number | string;
        dimension: number;
        pos: altShared.Vector3;
        heading?: number; // default: 0
        useStreaming?: boolean; // default: true
        streamingDistance?: number; // default: 0
    }

    // @ts-expect-error  Suppress "Class static side 'typeof LocalPed' incorrectly extends base class static side 'typeof Ped'."
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

    // @ts-expect-error Suppress "Class static side 'typeof LocalPlayer' incorrectly extends base class static side 'typeof Player'."
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

    export interface LocalVehicleCreateOptions {
        model: number | string;
        dimension: number;
        pos: altShared.Vector3;
        rot: altShared.Vector3;
        useStreaming?: boolean; // default: true
        streamingDistance?: number; // default: 300
    }

    // @ts-expect-error Supress "Class static side 'typeof LocalVehicle' incorrectly extends base class static side 'typeof Vehicle'.""
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

    export abstract class MapZoomData {
        fZoomScale: number;
        fZoomSpeed: number;
        fScrollSpeed: number;
        vTilesX: number;
        vTilesY: number;

        reset(): void;

        static get(idOrAlias: number | string): MapZoomData | undefined;
        static resetAll(): void;
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

    export interface RmlDocumentCreateOptions {
        url: string;
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

    export interface TextLabelCreateOptions {
        text: string;
        fontName: string;
        fontSize: number;
        pos: altShared.IVector3;
        rot?: altShared.IVector3; // default: { x: 0, y: 0, z: 0 }
        color?: altShared.RGBA; // default: { r: 255, g: 255, b: 255, a: 255 }
        outlineColor?: altShared.RGBA; // default: { r: 0, g: 0, b: 0, a: 255 }
        outlineWidth?: number; // default: 0
        fontScale?: number; // default: 1
        useStreaming?: boolean; // default: false
        streamingDistance?: number; // default: 0
    }

    export interface VirtualEntityCreateOptions {
        group: VirtualEntityGroup;
        pos: altShared.IVector3;
        streamingDistance: number;
        data?: Record<string, unknown>;
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

    export interface WebSocketClientCreateOptions {
        url: string;
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

    export interface _WebViewTextureCreateOptions {
        drawable: number | string; // default: 0
        targetTexture: string;
    }

    export interface _WebViewCreateOptionsDrawable {
        url: string;
        drawable: number | string;
        targetTexture: string;
    }

    export interface _WebViewCreateOptionsOverlay {
        url: string;
        pos?: altShared.IVector2; // default: { x: 0, y: 0 }
        size?: altShared.IVector2; // default: { x: 0, y: 0 }
        visible?: boolean; // default: true
        overlay?: boolean; // default: false
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

    /**
     * Extend it by interface merging for use in localMeta.
     */
    export interface GlobalLocalMeta {}

    /**
     * Extend it by interface merging for use in BaseObject#meta.
     */
    export interface BaseObjectMeta {}

    /**
     * Extend it by interface merging for use in Blip#meta.
     */
    export interface BlipMeta extends BaseObjectMeta {}

    /**
     * Extend it by interface merging for use in Marker#meta.
     */
    export interface MarkerMeta extends BaseObjectMeta {}

    /**
     * Extend it by interface merging for use in Entity#meta.
     */
    export interface EntityMeta extends BaseObjectMeta {}

    /**
     * Extend it by interface merging for use in Player#meta.
     */
    export interface PlayerMeta extends EntityMeta {}

    /**
     * Extend it by interface merging for use in Vehicle#meta.
     */
    export interface VehicleMeta extends EntityMeta {}

    /**
     * Extend it by interface merging for use in Ped#meta.
     */
    export interface PedMeta extends EntityMeta {}

    /**
     * Extend it by interface merging for use in Object#meta.
     */
    export interface ObjectMeta extends EntityMeta {}

    /**
     * Extend it by interface merging for use in VirtualEntity#meta.
     */
    export interface VirtualEntityMeta extends BaseObjectMeta {}

    export abstract class WorldObject extends BaseObject {
        dimension: number;
        pos: altShared.Vector3;
    }

    // export abstract class VoiceChannel extends BaseObject {}

    export namespace PointBlip {
        export function create(opts: PointBlipCreateOptions): Blip;
    }

    export namespace AreaBlip {
        export function create(opts: altShared.AreaBlipCreateOptions): Blip;
    }

    export namespace RadiusBlip {
        export function create(opts: altShared.RadiusBlipCreateOptions): Blip;
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

    export namespace Data {
        export interface ISyncInfo {
            readonly active: boolean;
            readonly receivedTick: number;
            readonly fullyReceivedTick: number;
            readonly sendTick: number;
            readonly ackedSendTick: number;
            readonly propertyCount: number;
            readonly componentCount: number;
            /**
             * 2D array of property update ticks grouped by component
             */
            readonly propertyUpdateTicks: number[][];
        }
    }

    export namespace Drawing {
        export function drawText2dThisFrame(
            text: string,
            pos2d?: altShared.IVector2,
            font?: Number,
            scale?: Number,
            color?: altShared.IRGBA,
            outline?: boolean,
            dropShadow?: boolean,
            textAlign?: number,
        ): void;
        export function drawText2d(
            text: string,
            pos2d?: altShared.IVector2,
            font?: Number,
            scale?: Number,
            color?: altShared.IRGBA,
            outline?: boolean,
            dropShadow?: boolean,
            textAlign?: number,
        ): altShared.Timers.EveryTick;

        export function drawText3dThisFrame(
            text: string,
            pos3d: altShared.IVector2,
            font?: number,
            scale?: number,
            color?: altShared.IRGBA,
            outline?: boolean,
            dropShadow?: boolean,
            textAlign?: number,
        ): void;
        export function drawText3d(
            text: string,
            pos3d: altShared.IVector2,
            font?: number,
            scale?: number,
            color?: altShared.IRGBA,
            outline?: boolean,
            dropShadow?: boolean,
            textAlign?: number,
        ): altShared.Timers.EveryTick;
    }

    export abstract class RPCHandler {
        public readonly name: string;
        public readonly handler: (...args: unknown[]) => Promise<any> | any;
        public readonly valid: boolean;

        public destroy(): void;
    }

    export namespace RPC {
        export type GenericRpcEventHandler<T extends unknown[] = unknown[], U = unknown> = (...args: T) => Promise<U> | U;

        export function send<E extends keyof altShared.RPC.CustomPlayerToServerRpcEvent>(
            rpcName: E,
            ...args: Parameters<altShared.RPC.CustomPlayerToServerRpcEvent[E]>
        ): Promise<ReturnType<altShared.RPC.CustomPlayerToServerRpcEvent[E]>>;
        export function send<E extends string>(
            rpcName: Exclude<E, keyof altShared.RPC.CustomPlayerToServerRpcEvent>,
            ...args: unknown[]
        ): Promise<any>;

        export function register<E extends keyof altShared.RPC.CustomServerToPlayerRpcEvent>(
            rpcName: E,
            handler: GenericRpcEventHandler<
                Parameters<altShared.RPC.CustomServerToPlayerRpcEvent[E]>,
                ReturnType<altShared.RPC.CustomServerToPlayerRpcEvent[E]>
            >,
        ): RPCHandler;
        export function register<E extends string>(
            rpcName: Exclude<E, keyof altShared.RPC.CustomServerToPlayerRpcEvent>,
            handler: GenericRpcEventHandler,
        ): RPCHandler;
    }

    // DO NOT TOUCH THIS - This is only here so client / server can extend Utils namespace using merging
    export class Utils extends altShared.Utils {
        protected constructor();
    }

    export namespace Utils {
        //
    }

    export namespace Events {
        export let rawEmitEnabled: boolean;
        export function emit<E extends keyof CustomClientEvent>(eventName: E, ...args: Parameters<CustomClientEvent[E]>): void;
        export function emit<E extends string>(eventName: Exclude<E, keyof CustomClientEvent>, ...args: unknown[]): void;

        export function emitRaw<E extends keyof CustomClientEvent>(eventName: E, ...args: Parameters<CustomClientEvent[E]>): void;
        export function emitRaw<E extends string>(eventName: Exclude<E, keyof CustomClientEvent>, ...args: unknown[]): void;

        export function emitServer<E extends keyof altShared.Events.CustomPlayerToServerEvent>(
            eventName: E,
            ...args: Parameters<altShared.Events.CustomPlayerToServerEvent[E]>
        ): void;
        export function emitServer<E extends string>(
            eventName: Exclude<E, keyof altShared.Events.CustomPlayerToServerEvent>,
            ...args: unknown[]
        ): void;

        export function emitServerRaw<E extends keyof altShared.Events.CustomPlayerToServerEvent>(
            eventName: E,
            ...args: Parameters<altShared.Events.CustomPlayerToServerEvent[E]>
        ): void;
        export function emitServerRaw<E extends string>(
            eventName: Exclude<E, keyof altShared.Events.CustomPlayerToServerEvent>,
            ...args: unknown[]
        ): void;

        export function emitServerUnreliable<E extends keyof altShared.Events.CustomPlayerToServerEvent>(
            eventName: E,
            ...args: Parameters<altShared.Events.CustomPlayerToServerEvent[E]>
        ): void;
        export function emitServerUnreliable<E extends string>(
            eventName: Exclude<E, keyof altShared.Events.CustomPlayerToServerEvent>,
            ...args: unknown[]
        ): void;

        export function emitServerUnreliableRaw<E extends keyof altShared.Events.CustomPlayerToServerEvent>(
            eventName: E,
            ...args: Parameters<altShared.Events.CustomPlayerToServerEvent[E]>
        ): void;
        export function emitServerUnreliableRaw<E extends string>(
            eventName: Exclude<E, keyof altShared.Events.CustomPlayerToServerEvent>,
            ...args: unknown[]
        ): void;

        // RPC related
        export function onScriptRPC(callback: GenericEventCallback<ScriptRPCEventParameters>): altShared.Events.EventHandler;
        export function onceScriptRPC(callback: GenericEventCallback<ScriptRPCEventParameters>): altShared.Events.EventHandler;
        export function onScriptRPCAnswer(callback: GenericEventCallback<ScriptRPCAnswerEventParameters>): altShared.Events.EventHandler;
        export function onceScriptRPCAnswer(callback: GenericEventCallback<ScriptRPCAnswerEventParameters>): altShared.Events.EventHandler;

        export function onKeyboardEvent(callback: GenericEventCallback<KeyboardEventParameters>): altShared.Events.EventHandler;
        export function onceKeyboardEvent(callback: GenericEventCallback<KeyboardEventParameters>): altShared.Events.EventHandler;
        export function onKeyUp(callback: GenericEventCallback<KeyUpDownEventParameters>): altShared.Events.EventHandler;
        export function onceKeyUp(callback: GenericEventCallback<KeyUpDownEventParameters>): altShared.Events.EventHandler;
        export function onKeyDown(callback: GenericEventCallback<KeyUpDownEventParameters>): altShared.Events.EventHandler;
        export function onceKeyDown(callback: GenericEventCallback<KeyUpDownEventParameters>): altShared.Events.EventHandler;
        export function onWebViewEvent(callback: GenericEventCallback<WebViewEventParameters>): altShared.Events.EventHandler;
        export function onceWebViewEvent(callback: GenericEventCallback<WebViewEventParameters>): altShared.Events.EventHandler;
        export function onWebSocketEvent(callback: GenericEventCallback<WebSocketEventParameters>): altShared.Events.EventHandler;
        export function onceWebSocketEvent(callback: GenericEventCallback<WebSocketEventParameters>): altShared.Events.EventHandler;
        export function onAudioEvent(callback: GenericEventCallback<AudioEventParameters>): altShared.Events.EventHandler;
        export function onceAudioEvent(callback: GenericEventCallback<AudioEventParameters>): altShared.Events.EventHandler;
        export function onRmluiEvent(callback: GenericEventCallback<RmluiEventParameters>): altShared.Events.EventHandler;
        export function onceRmluiEvent(callback: GenericEventCallback<RmluiEventParameters>): altShared.Events.EventHandler;
        export function onWindowFocusChange(
            callback: GenericEventCallback<WindowFocusChangeEventParameters>,
        ): altShared.Events.EventHandler;
        export function onceWindowFocusChange(
            callback: GenericEventCallback<WindowFocusChangeEventParameters>,
        ): altShared.Events.EventHandler;
        export function onWindowResolutionChange(
            callback: GenericEventCallback<WindowResolutionChangeEventParameters>,
        ): altShared.Events.EventHandler;
        export function onceWindowResolutionChange(
            callback: GenericEventCallback<WindowResolutionChangeEventParameters>,
        ): altShared.Events.EventHandler;
        export function onConnectionComplete(callback: GenericEventCallback): altShared.Events.EventHandler;
        export function onceConnectionComplete(callback: GenericEventCallback): altShared.Events.EventHandler;
        export function onDisconnect(callback: GenericEventCallback): altShared.Events.EventHandler;
        export function onceDisconnect(callback: GenericEventCallback): altShared.Events.EventHandler;
        export function onSpawned(callback: GenericEventCallback): altShared.Events.EventHandler;
        export function onceSpawned(callback: GenericEventCallback): altShared.Events.EventHandler;

        export function onGameEntityCreate(callback: GenericEventCallback<GameEntityCreateEventParameters>): altShared.Events.EventHandler;
        export function onceGameEntityCreate(
            callback: GenericEventCallback<GameEntityCreateEventParameters>,
        ): altShared.Events.EventHandler;
        export function onGameEntityDestroy(
            callback: GenericEventCallback<GameEntityDestroyEventParameters>,
        ): altShared.Events.EventHandler;
        export function onceGameEntityDestroy(
            callback: GenericEventCallback<GameEntityDestroyEventParameters>,
        ): altShared.Events.EventHandler;
        export function onEntityHitEntity(callback: GenericEventCallback<EntityHitEntityEventParameters>): altShared.Events.EventHandler;
        export function onceEntityHitEntity(callback: GenericEventCallback<EntityHitEntityEventParameters>): altShared.Events.EventHandler;
        export function onTaskChange(callback: GenericEventCallback<TaskChangeEventParameters>): altShared.Events.EventHandler;
        export function onceTaskChange(callback: GenericEventCallback<TaskChangeEventParameters>): altShared.Events.EventHandler;

        export function onPlayerWeaponShoot(
            callback: GenericEventCallback<PlayerWeaponShootEventParameters>,
        ): altShared.Events.EventHandler;
        export function oncePlayerWeaponShoot(
            callback: GenericEventCallback<PlayerWeaponShootEventParameters>,
        ): altShared.Events.EventHandler;
        export function onPlayerBulletHit(callback: GenericEventCallback<PlayerBulletHitEventParameters>): altShared.Events.EventHandler;
        export function oncePlayerBulletHit(callback: GenericEventCallback<PlayerBulletHitEventParameters>): altShared.Events.EventHandler;
        export function onPlayerWeaponChange(
            callback: GenericEventCallback<PlayerWeaponChangeEventParameters>,
        ): altShared.Events.EventHandler;
        export function oncePlayerWeaponChange(
            callback: GenericEventCallback<PlayerWeaponChangeEventParameters>,
        ): altShared.Events.EventHandler;

        export function onPlayerStartVehicleEnter<T extends Player>(
            callback: GenericPlayerEventCallback<PlayerStartVehicleEnterEventParameters, T>,
        ): altShared.Events.EventHandler;
        export function oncePlayerStartVehicleEnter<T extends Player>(
            callback: GenericPlayerEventCallback<PlayerStartVehicleEnterEventParameters, T>,
        ): altShared.Events.EventHandler;
        export function onPlayerStartVehicleLeave<T extends Player>(
            callback: GenericPlayerEventCallback<PlayerStartVehicleLeaveEventParameters, T>,
        ): altShared.Events.EventHandler;
        export function oncePlayerStartVehicleLeave<T extends Player>(
            callback: GenericPlayerEventCallback<PlayerStartVehicleLeaveEventParameters, T>,
        ): altShared.Events.EventHandler;
        export function onPlayerVehicleEntered<T extends Player>(
            callback: GenericPlayerEventCallback<PlayerVehicleEnterEventParameters, T>,
        ): altShared.Events.EventHandler;
        export function oncePlayerVehicleEntered<T extends Player>(
            callback: GenericPlayerEventCallback<PlayerVehicleEnterEventParameters, T>,
        ): altShared.Events.EventHandler;
        export function onPlayerVehicleLeft<T extends Player>(
            callback: GenericPlayerEventCallback<PlayerVehicleLeaveEventParameters, T>,
        ): altShared.Events.EventHandler;
        export function oncePlayerVehicleLeft<T extends Player>(
            callback: GenericPlayerEventCallback<PlayerVehicleLeaveEventParameters, T>,
        ): altShared.Events.EventHandler;
        export function onPlayerVehicleSeatChange<T extends Player>(
            callback: GenericPlayerEventCallback<PlayerChangeVehicleSeatEventParameters, T>,
        ): altShared.Events.EventHandler;
        export function oncePlayerVehicleSeatChange<T extends Player>(
            callback: GenericPlayerEventCallback<PlayerChangeVehicleSeatEventParameters, T>,
        ): altShared.Events.EventHandler;

        export function onVoiceConnectionUpdate(
            callback: GenericEventCallback<VoiceConnectionEventParameters>,
        ): altShared.Events.EventHandler;
        export function onceVoiceConnectionUpdate(
            callback: GenericEventCallback<VoiceConnectionEventParameters>,
        ): altShared.Events.EventHandler;
        export function onPlayerStartTalking<T extends Player>(callback: GenericPlayerEventCallback<{}, T>): altShared.Events.EventHandler;
        export function oncePlayerStartTalking<T extends Player>(
            callback: GenericPlayerEventCallback<{}, T>,
        ): altShared.Events.EventHandler;
        export function onPlayerStopTalking<T extends Player>(callback: GenericPlayerEventCallback<{}, T>): altShared.Events.EventHandler;
        export function oncePlayerStopTalking<T extends Player>(callback: GenericPlayerEventCallback<{}, T>): altShared.Events.EventHandler;

        // World object related
        export function onWorldObjectPositionChange(
            callback: GenericEventCallback<WorldObjectPositionChangeEventParameters>,
        ): altShared.Events.EventHandler;
        export function onceWorldObjectPositionChange(
            callback: GenericEventCallback<WorldObjectPositionChangeEventParameters>,
        ): altShared.Events.EventHandler;
        export function onWorldObjectStreamIn(
            callback: GenericEventCallback<WorldObjectStreamInEventParameters>,
        ): altShared.Events.EventHandler;
        export function onceWorldObjectStreamIn(
            callback: GenericEventCallback<WorldObjectStreamInEventParameters>,
        ): altShared.Events.EventHandler;
        export function onWorldObjectStreamOut(
            callback: GenericEventCallback<WorldObjectStreamOutEventParameters>,
        ): altShared.Events.EventHandler;
        export function onceWorldObjectStreamOut(
            callback: GenericEventCallback<WorldObjectStreamOutEventParameters>,
        ): altShared.Events.EventHandler;

        export function setWarningThreshold(threshold: number): void;
        export function setSourceLocationFrameSkipCount(skipCount: number): void;

        export function onEvent(
            callback: GenericEventCallback<altShared.Events.GenericOnEventParameters>,
        ): altShared.Events.GenericEventHandler;

        interface WorldObjectPositionChangeEventParameters {
            object: WorldObject;
            oldPos: altShared.Vector3;
        }

        interface WorldObjectStreamInEventParameters {
            object: WorldObject;
        }

        interface WorldObjectStreamOutEventParameters {
            object: WorldObject;
        }

        interface VoiceConnectionEventParameters {
            state: altShared.Enums.VoiceConnectionState;
        }

        interface PlayerWeaponShootEventParameters {
            weapon: number;
            totalAmmo: number;
            ammoInClip: number;
        }

        interface PlayerBulletHitEventParameters {
            weapon: number;
            victim: Entity;
            pos: altShared.Vector3;
        }

        interface PlayerWeaponChangeEventParameters {
            oldWeapon: number;
            newWeapon: number;
        }

        interface PlayerStartVehicleEnterEventParameters {
            vehicle: Vehicle;
            seat: number;
        }

        interface PlayerStartVehicleLeaveEventParameters {
            vehicle: Vehicle;
            seat: number;
        }

        interface PlayerVehicleEnterEventParameters {
            vehicle: Vehicle;
            seat: number;
        }

        interface PlayerVehicleLeaveEventParameters {
            vehicle: Vehicle;
            seat: number;
        }

        interface GameEntityCreateEventParameters {
            entity: Entity;
        }

        interface GameEntityDestroyEventParameters {
            entity: Entity;
        }

        interface EntityHitEntityEventParameters {
            entity: Entity;
            damager: Entity;
            weapon: number;
        }

        interface TaskChangeEventParameters {
            oldTask: number;
            newTask: number;
        }

        interface KeyUpDownEventParameters {
            key: altShared.Enums.KeyCode;
        }

        interface KeyboardEventParameters {
            key: altShared.Enums.KeyCode;
            state: altShared.Enums.KeyState;
        }

        interface WebViewEventParameters {
            target: WebView;
            name: string;
            args: unknown[];
        }

        interface WebSocketEventParameters {
            target: WebSocketClient;
            name: string;
            args: unknown[];
        }

        interface AudioEventParameters {
            target: Audio;
            name: string;
            args: unknown[];
        }

        interface RmluiEventParameters {
            target: RmlElement;
            name: string;
            args: unknown[];
        }

        interface WindowFocusChangeEventParameters {
            state: boolean;
        }

        interface WindowResolutionChangeEventParameters {
            oldResolution: altShared.Vector2;
            newResolution: altShared.Vector2;
        }

        // SHARED Entity related events
        export function onBaseObjectCreate(callback: GenericEventCallback<BaseObjectCreateEventParameters>): altShared.Events.EventHandler;
        export function onBaseObjectRemove(callback: GenericEventCallback<BaseObjectRemoveEventParameters>): altShared.Events.EventHandler;
        export function onNetOwnerChange(callback: GenericEventCallback<NetOwnerChangeEventParameters>): altShared.Events.EventHandler;
        export function onWeaponDamage(callback: GenericEventCallback<WeaponDamageEventParameters>): altShared.Events.EventHandler;

        // SHARED meta related events
        export function onMetaChange(callback: GenericEventCallback<MetaChangeEventParameters>): altShared.Events.EventHandler;
        export function onLocalMetaChange(
            callback: GenericPlayerEventCallback<LocalMetaChangeEventParameters>,
        ): altShared.Events.EventHandler;
        export function onSyncedMetaChange(callback: GenericEventCallback<SyncedMetaChangeEventParameters>): altShared.Events.EventHandler;
        export function onStreamSyncedMetaChange(
            callback: GenericEventCallback<StreamSyncedMetaChangeEventParameters>,
        ): altShared.Events.EventHandler;
        export function onGlobalMetaChange(callback: GenericEventCallback<GlobalMetaChangeEventParameters>): altShared.Events.EventHandler;
        export function onGlobalSyncedMetaChange(
            callback: GenericEventCallback<GlobalSyncedMetaChangeEventParameters>,
        ): altShared.Events.EventHandler;

        // Script related events
        export function onEntityColShapeEnter(
            callback: GenericEventCallback<EntityColShapeEnterEventParameters>,
        ): altShared.Events.EventHandler;
        export function onEntityColShapeLeave(
            callback: GenericEventCallback<EntityColShapeLeaveEventParameters>,
        ): altShared.Events.EventHandler;
        export function onEntityCheckpointEnter(
            callback: GenericEventCallback<EntityCheckpointEnterEventParameters>,
        ): altShared.Events.EventHandler;
        export function onEntityCheckpointLeave(
            callback: GenericEventCallback<EntityCheckpointLeaveEventParameters>,
        ): altShared.Events.EventHandler;
        export function onColShapeEvent(callback: GenericEventCallback<ColShapeEventParameters>): altShared.Events.EventHandler;

        // SHARED custom events
        export function onConsoleCommand(callback: GenericEventCallback<ConsoleCommandEventParameters>): altShared.Events.EventHandler;
        export function onError(callback: GenericEventCallback<ErrorEventParameters>): altShared.Events.EventHandler;

        // SHARED script related events
        export function onLocalScriptEvent(callback: GenericEventCallback<LocalScriptEventParameters>): altShared.Events.ScriptEventHandler;
        export function onRemoteScriptEvent(
            callback: GenericEventCallback<RemoteScriptEventParameters>,
        ): altShared.Events.ScriptEventHandler;

        // SHARED resource events
        export function onResourceStart(callback: GenericEventCallback<ResourceStartEventParameters>): altShared.Events.EventHandler;
        export function onResourceStop(callback: GenericEventCallback<ResourceStopEventParameters>): altShared.Events.EventHandler;
        export function onResourceError(callback: GenericEventCallback<ResourceErrorEventParameters>): altShared.Events.EventHandler;

        // Custom events
        export function on<E extends keyof CustomClientEvent>(
            eventName: E,
            callback: CustomEventCallback<Parameters<CustomClientEvent[E]>>,
        ): altShared.Events.ScriptEventHandler;
        export function on<E extends string>(
            eventName: Exclude<E, keyof CustomClientEvent>,
            callback: CustomEventCallback<any[]>,
        ): altShared.Events.ScriptEventHandler;
        export function once<E extends keyof CustomClientEvent>(
            eventName: E,
            callback: CustomEventCallback<Parameters<CustomClientEvent[E]>>,
        ): altShared.Events.ScriptEventHandler;
        export function once<E extends string>(
            eventName: Exclude<E, keyof CustomClientEvent>,
            callback: CustomEventCallback<any[]>,
        ): altShared.Events.ScriptEventHandler;

        export function onServer<E extends keyof altShared.Events.CustomServerToPlayerEvent>(
            eventName: E,
            callback: CustomEventCallback<Parameters<altShared.Events.CustomServerToPlayerEvent[E]>>,
        ): altShared.Events.ScriptEventHandler;
        export function onServer<E extends string>(
            eventName: Exclude<E, keyof altShared.Events.CustomServerToPlayerEvent>,
            callback: CustomEventCallback<any[]>,
        ): altShared.Events.ScriptEventHandler;
        export function onceServer<E extends keyof altShared.Events.CustomServerToPlayerEvent>(
            eventName: E,
            callback: CustomEventCallback<Parameters<altShared.Events.CustomServerToPlayerEvent[E]>>,
        ): altShared.Events.ScriptEventHandler;
        export function onceServer<E extends string>(
            eventName: Exclude<E, keyof altShared.Events.CustomServerToPlayerEvent>,
            callback: CustomEventCallback<any[]>,
        ): altShared.Events.ScriptEventHandler;

        export function onRemote<E extends keyof altShared.Events.CustomServerToPlayerEvent>(
            eventName: E,
            callback: CustomEventCallback<Parameters<altShared.Events.CustomServerToPlayerEvent[E]>>,
        ): altShared.Events.ScriptEventHandler;
        export function onRemote<E extends keyof altShared.Events.CustomRemoteEvent>(
            eventName: E,
            callback: CustomEventCallback<Parameters<altShared.Events.CustomRemoteEvent[E]>>,
        ): altShared.Events.ScriptEventHandler;
        export function onRemote<E extends string>(
            eventName: Exclude<E, keyof altShared.Events.CustomServerToPlayerEvent | keyof altShared.Events.CustomRemoteEvent>,
            callback: CustomEventCallback<any[]>,
        ): altShared.Events.ScriptEventHandler;
        export function onceRemote<E extends keyof altShared.Events.CustomServerToPlayerEvent>(
            eventName: E,
            callback: CustomEventCallback<Parameters<altShared.Events.CustomServerToPlayerEvent[E]>>,
        ): altShared.Events.ScriptEventHandler;
        export function onceRemote<E extends keyof altShared.Events.CustomRemoteEvent>(
            eventName: E,
            callback: CustomEventCallback<Parameters<altShared.Events.CustomRemoteEvent[E]>>,
        ): altShared.Events.ScriptEventHandler;
        export function onceRemote<E extends string>(
            eventName: Exclude<E, keyof altShared.Events.CustomServerToPlayerEvent | keyof altShared.Events.CustomRemoteEvent>,
            callback: CustomEventCallback<any[]>,
        ): altShared.Events.ScriptEventHandler;

        interface PlayerAnimationChangeEventParameters {
            oldAnimDict: number;
            newAnimDict: number;
            oldAnimName: number;
            newAnimName: number;
        }

        interface PlayerVehicleEnteredEventParameters {
            vehicle: Vehicle;
            seat: number;
        }

        interface PlayerVehicleLeftEventParameters {
            vehicle: Vehicle;
            seat: number;
        }

        interface PlayerChangeVehicleSeatEventParameters {
            vehicle: Vehicle;
            oldSeat: number;
            newSeat: number;
        }

        interface EntityColShapeEnterEventParameters {
            entity: WorldObject;
            colShape: ColShape;
        }

        interface EntityColShapeLeaveEventParameters {
            entity: WorldObject;
            colShape: ColShape;
        }

        interface CustomClientEvent {}

        interface ScriptRPCEventParameters {
            readonly name: string;
            readonly args: ReadonlyArray<unknown>;
            readonly answerID: number;

            willAnswer(): boolean;

            answer(...args: unknown[]): void;
            answerWithError(errorMessage: string): boolean;
        }

        interface ScriptRPCAnswerEventParameters {
            readonly answerID: number;
            readonly answer: unknown;
            readonly answerError: string;
        }

        export type CustomEventCallback<T extends unknown[]> = (...params: T) => void | Promise<void>;
        export type GenericEventCallback<T = {}> = (params: T) => void | Promise<void>;
        export type GenericPlayerEventCallback<T = {}, U extends Player = Player> = (params: T & { player: U }) => void | Promise<void>;

        type LocalScriptEvents = CustomClientEvent;
        interface LocalScriptEventParameters<E extends keyof LocalScriptEvents = keyof LocalScriptEvents> {
            eventName: E;
            args: Parameters<LocalScriptEvents[E]>;
        }

        type RemoteScriptEvents = altShared.Events.CustomServerToPlayerEvent & altShared.Events.CustomRemoteEvent;
        interface RemoteScriptEventParameters<E extends keyof RemoteScriptEvents = keyof RemoteScriptEvents> {
            eventName: E;
            args: Parameters<RemoteScriptEvents[E]>;
        }

        interface BaseObjectCreateEventParameters {
            object: BaseObject;
        }

        interface BaseObjectRemoveEventParameters {
            object: BaseObject;
        }

        interface NetOwnerChangeEventParameters {
            entity: Entity;
            oldOwner?: Player;
            newOwner?: Player;
        }

        interface WeaponDamageEventParameters {
            source: Player;
            target: Entity;
            weaponHash: number;
            damage: number;
            offset: number;
            bodyPart: altShared.Enums.BodyPart;

            setDamageValue(value: number): void;
        }

        interface EntityCheckpointEnterEventParameters {
            entity: WorldObject;
            colShape: ColShape;
        }

        interface EntityCheckpointLeaveEventParameters {
            entity: WorldObject;
            colShape: ColShape;
        }

        interface ColShapeEventParameters {
            entity: WorldObject;
            target: ColShape;
            state: boolean;
        }

        interface MetaChangeEventParameters {
            entity: BaseObject;
            key: string;
            oldValue: unknown;
            newValue: unknown;
        }

        interface LocalMetaChangeEventParameters {
            key: string;
            oldValue: unknown;
            newValue: unknown;
        }

        interface SyncedMetaChangeEventParameters {
            entity: Entity;
            key: string;
            oldValue: unknown;
            newValue: unknown;
        }

        interface StreamSyncedMetaChangeEventParameters {
            entity: Entity;
            key: string;
            oldValue: unknown;
            newValue: unknown;
        }

        interface GlobalMetaChangeEventParameters {
            key: string;
            oldValue: unknown;
            newValue: unknown;
        }

        interface GlobalSyncedMetaChangeEventParameters {
            key: string;
            oldValue: unknown;
            newValue: unknown;
        }

        interface ConsoleCommandEventParameters {
            command: string;
            args: string[];
        }

        interface ErrorEventParameters {
            error: Error;
            stack: string;
            location: altShared.SourceLocation;
        }

        interface ResourceStartEventParameters {
            resource: altShared.Resource;
        }

        interface ResourceStopEventParameters {
            resource: altShared.Resource;
        }

        interface ResourceErrorEventParameters {
            resource: altShared.Resource;
        }
    }

    export namespace Discord {
        export const isReady: boolean;
        export const userID: number;
        export const userName: string;
        export const discriminator: string;
        export const avatar: string;

        export function requestOAuth2Token(appId: string): Promise<string>;
    }

    export namespace Voice {
        export let inputMuted: boolean;
        export let activityInputEnabled: boolean;
        export let activationLevel: number;
        export const activationKey: altShared.Enums.KeyCode;
        export const voiceControlsEnabled: boolean;
        export let noiseSuppressionEnabled: boolean;
        export let inputDevice: string | null;

        export const availableInputDevices: ReadonlyArray<{
            uid: string;
            name: string;
        }>;

        export const voicePlayers: Array<number>;

        export function toggleInput(enabled: boolean): void;

        export function getPlayerSpatialVolume(remotePlayerId: number): number;
        export function SetPlayerSpatialVolume(remotePlayerId: number, volume: number): void;

        export function getPlayerNonSpatialVolume(remotePlayerId: number): number;
        export function setPlayerNonSpatialVolume(remotePlayerId: number, volume: number): void;

        export function addPlayerFilter(remotePlayerId: number, filter: AudioFilter): void;
        export function removePlayerFilter(remotePlayerId: number, filter: AudioFilter): void;
        export function getPlayerFilter(remotePlayerId: number): AudioFilter;
    }

    export namespace LocalStorage {
        interface LocalStorage {}

        // Not setting undefined as possible return value because it's annoying to specify ! everytime you get a value
        // but if you want to get undefined, you can specify that as possible value in LocalStorage interface.
        export function get<K extends keyof LocalStorage>(key: K): LocalStorage[K];
        export function get<K extends string>(key: Exclude<K, keyof LocalStorage>): unknown;
        export function set<K extends keyof LocalStorage>(key: K, value: LocalStorage[K]): void;
        export function set<K extends string>(key: Exclude<K, keyof LocalStorage>, value: unknown): void;
        export function has<K extends keyof LocalStorage>(key: K): boolean;
        export function has<K extends string>(key: Exclude<K, keyof LocalStorage>): boolean;
        export function remove<K extends keyof LocalStorage>(key: K): void;
        export function remove<K extends string>(key: Exclude<K, keyof LocalStorage>): void;
        export function clear(): void;
        export function save(): void;
    }

    export namespace Stats {
        export function set(statName: altShared.Enums.StatName, value: number | boolean | string): void;
        export function get(statName: altShared.Enums.StatName): number | boolean | string | undefined;
        export function reset(statName: altShared.Enums.StatName): void;
    }

    export namespace FocusData {
        export const isFocusOverriden: boolean;
        export let focusOverridePos: altShared.Vector3;
        export let focusOverrideEntity: Entity | null;
        export const focusOverrideOffset: altShared.Vector3;

        export function clearFocusOverride(): void;
    }

    export namespace Gxt {
        export function add(nameOrHash: number | string, value: string): void;
        export function remove(nameOrHash: number | string): void;
        export function get(nameOrHash: number | string): string;
    }

    export namespace Cursor {
        export let visible: boolean;
        export let pos: altShared.Vector2;
        export let posNormalized: altShared.Vector2;
    }

    export namespace Cam {
        export const pos: altShared.Vector3;
        export let frozen: boolean;
    }

    export namespace Streaming {
        export function doesTextureExistInArchetype(modelNameOrHash: number | string, textureName: string): boolean;
        export function requestIpl(iplName: string): void;
        export function removeIpl(iplName: string): void;
        export function loadDefaultIpls(): void;
        export function loadModel(modelNameOrHash: number | string, isAsync?: boolean): void;
        export function loadYtyp(ytyp: string): void;
        export function unloadYtyp(ytyp: string): void;
    }

    export namespace ConfigFlag {
        export function get(flag: altShared.Enums.ConfigFlag): boolean;
        export function set(flag: altShared.Enums.ConfigFlag, state: boolean): boolean;
        export function exists(flag: altShared.Enums.ConfigFlag): boolean;
    }

    export * from '@altv/shared';
}
