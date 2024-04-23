import * as altClient from 'alt-client';
import * as Enums from './enums';
import type {
    AreaBlipCreateOptions,
    AudioCreateOptions,
    AudioFilterCreateOptions,
    AudioOutputAttachedCreateOptions,
    AudioOutputFrontendCreateOptions,
    AudioOutputWorldCreateOptions,
    CheckpointCreateOptions,
    ColShapeCircleCreateOptions,
    ColShapeCreateOptions,
    ColShapeCuboidCreateOptions,
    ColShapeCylinderCreateOptions,
    ColShapePolygonCreateOptions,
    ColShapeRectangleCreateOptions,
    ColShapeSphereCreateOptions,
    Data,
    EntityStreamSyncedMeta,
    EntitySyncedMeta,
    HttpResponse,
    IRGBA,
    IVector2,
    IVector3,
    KeyStateInfo,
    LocalObjectCreateOptions,
    LocalPedCreateOptions,
    LocalVehicleCreateOptions,
    MarkerCreateOptions,
    PedStreamSyncedMeta,
    PedSyncedMeta,
    PlayerStreamSyncedMeta,
    PlayerSyncedMeta,
    PointBlipCreateOptions,
    Quaternion,
    RadiusBlipCreateOptions,
    RmlDocumentCreateOptions,
    TextLabelCreateOptions,
    VectorBase,
    VehicleNeonState,
    VehicleStreamSyncedMeta,
    VirtualEntityCreateOptions,
    VirtualEntityMeta,
    WeatherCycle,
    WebSocketClientCreateOptions,
    _WebViewCreateOptionsDrawable,
    _WebViewCreateOptionsOverlay,
} from '@altv/client';

// Shared

export class Vector2 implements VectorBase<Vector2> {
    public readonly x: number;
    public readonly y: number;

    public constructor(value: number);
    public constructor(x: number, y: number);
    public constructor(xy: [number, number]);
    public constructor(xy: IVector2);
    public constructor(x: number | [number, number] | IVector2, y?: number) {
        if (typeof x === 'number') {
            this.x = x;
            this.y = y ?? x;
        } else if (Array.isArray(x)) {
            this.x = x[0];
            this.y = x[1];
        } else {
            this.x = x.x;
            this.y = x.y;
        }
    }

    public add(x: number, y: number): Vector2;
    public add(other: Vector2): Vector2;
    public add(xy: [number, number]): Vector2;
    public add(xy: IVector2): Vector2;
    public add(xy: number): Vector2;
    public add(x: number | Vector2 | [number, number] | IVector2, y?: number): Vector2 {
        if (typeof x === 'number') return new Vector2(this.x + x, this.y + (y ?? x));
        else if (Array.isArray(x)) return new Vector2(this.x + x[0], this.y + x[1]);
        else return new Vector2(this.x + x.x, this.y + x.y);
    }

    public sub(x: number, y: number): Vector2;
    public sub(other: Vector2): Vector2;
    public sub(xy: [number, number]): Vector2;
    public sub(xy: IVector2): Vector2;
    public sub(xy: number): Vector2;
    public sub(x: number | Vector2 | [number, number] | IVector2, y?: number): Vector2 {
        if (typeof x === 'number') return new Vector2(this.x - x, this.y - (y ?? x));
        else if (Array.isArray(x)) return new Vector2(this.x - x[0], this.y - x[1]);
        else return new Vector2(this.x - x.x, this.y - x.y);
    }

    public mul(x: number, y: number): Vector2;
    public mul(other: Vector2): Vector2;
    public mul(xy: [number, number]): Vector2;
    public mul(xy: IVector2): Vector2;
    public mul(xy: number): Vector2;
    public mul(x: number | Vector2 | [number, number] | IVector2, y?: number): Vector2 {
        if (typeof x === 'number') return new Vector2(this.x * x, this.y * (y ?? x));
        else if (Array.isArray(x)) return new Vector2(this.x * x[0], this.y * x[1]);
        else return new Vector2(this.x * x.x, this.y * x.y);
    }

    public div(x: number, y: number): Vector2;
    public div(other: Vector2): Vector2;
    public div(xy: [number, number]): Vector2;
    public div(xy: IVector2): Vector2;
    public div(xy: number): Vector2;
    public div(x: number | Vector2 | [number, number] | IVector2, y?: number): Vector2 {
        if (typeof x === 'number') return new Vector2(this.x / x, this.y / (y ?? x));
        else if (Array.isArray(x)) return new Vector2(this.x / x[0], this.y / x[1]);
        else return new Vector2(this.x / x.x, this.y / x.y);
    }

    public dot(x: number, y: number): Vector2;
    public dot(other: Vector2): Vector2;
    public dot(xy: [number, number]): Vector2;
    public dot(xy: IVector2): Vector2;
    public dot(xy: number): Vector2;
    public dot(x: number | Vector2 | [number, number] | IVector2, y?: number): Vector2 {
        if (typeof x === 'number') return new Vector2(this.x * x, this.y * (y ?? x));
        else if (Array.isArray(x)) return new Vector2(this.x * x[0], this.y * x[1]);
        else return new Vector2(this.x * x.x, this.y * x.y);
    }

    public distanceTo(x: number, y: number): number;
    public distanceTo(other: Vector2): number;
    public distanceTo(xy: [number, number]): number;
    public distanceTo(xy: IVector2): number;
    public distanceTo(x: number | Vector2 | [number, number] | IVector2, y?: number): number {
        if (typeof x === 'number') return Math.hypot(this.x - x, this.y - (y ?? x));
        else if (Array.isArray(x)) return Math.hypot(this.x - x[0], this.y - x[1]);
        else return Math.hypot(this.x - x.x, this.y - x.y);
    }

    public distanceToSquared(x: number, y: number): number;
    public distanceToSquared(other: Vector2): number;
    public distanceToSquared(xy: [number, number]): number;
    public distanceToSquared(xy: IVector2): number;
    public distanceToSquared(x: number | Vector2 | [number, number] | IVector2, y?: number): number {
        if (typeof x === 'number') return (this.x - x) ** 2 + (this.y - (y ?? x)) ** 2;
        else if (Array.isArray(x)) return (this.x - x[0]) ** 2 + (this.y - x[1]) ** 2;
        else return (this.x - x.x) ** 2 + (this.y - x.y) ** 2;
    }

    public angleTo(x: number, y: number): number;
    public angleTo(other: Vector2): number;
    public angleTo(xy: [number, number]): number;
    public angleTo(xy: IVector2): number;
    public angleTo(x: number | Vector2 | [number, number] | IVector2, y?: number): number {
        if (typeof x === 'number') return Math.atan2(this.y - (y ?? x), this.x - x);
        else if (Array.isArray(x)) return Math.atan2(this.y - x[1], this.x - x[0]);
        else return Math.atan2(this.y - x.y, this.x - x.x);
    }

    public angleToDegrees(x: number, y: number, z: number): number;
    public angleToDegrees(other: Vector2): number;
    public angleToDegrees(xy: [number, number]): number;
    public angleToDegrees(xy: IVector2): number;
    public angleToDegrees(x: number | Vector2 | [number, number] | IVector2, y?: number): number {
        return this.angleTo(x as number, y as number) * (180 / Math.PI);
    }

    public isInRange(range: number, x: number, y: number, z: number): boolean;
    public isInRange(range: number, other: Vector2): boolean;
    public isInRange(range: number, xy: [number, number]): boolean;
    public isInRange(range: number, xy: IVector2): boolean;
    public isInRange(range: number, x: number | Vector2 | [number, number] | IVector2, y?: number): boolean {
        return this.distanceTo(x as number, y as number) <= range;
    }

    public lerp(ratio: number, x: number, y: number, z: number): Vector2;
    public lerp(ratio: number, other: Vector2): Vector2;
    public lerp(ratio: number, xy: [number, number]): Vector2;
    public lerp(ratio: number, xy: IVector2): Vector2;
    public lerp(ratio: number, x: number | Vector2 | [number, number] | IVector2, y?: number): Vector2 {
        if (typeof x === 'number') return new Vector2(this.x + (x - this.x) * ratio, this.y + (y! - this.y) * ratio);
        else if (Array.isArray(x)) return new Vector2(this.x + (x[0] - this.x) * ratio, this.y + (x[1] - this.y) * ratio);
        else return new Vector2(this.x + (x.x - this.x) * ratio, this.y + (x.y - this.y) * ratio);
    }

    public static get zero(): Vector2 {
        return new Vector2(0, 0);
    }
    public static get one(): Vector2 {
        return new Vector2(1, 1);
    }
    public static get up(): Vector2 {
        return new Vector2(0, 1);
    }
    public static get down(): Vector2 {
        return new Vector2(0, -1);
    }
    public static get left(): Vector2 {
        return new Vector2(-1, 0);
    }
    public static get right(): Vector2 {
        return new Vector2(1, 0);
    }
    public static get negativeInfinity(): Vector2 {
        return new Vector2(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
    }
    public static get positiveInfinity(): Vector2 {
        return new Vector2(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
    }

    public static fromArray(xy: [number, number]) {
        return new Vector2(xy);
    }
    public static fromObject(xy: IVector2) {
        return new Vector2(xy);
    }

    // VectorBase implementations

    public toArray(): number[] {
        return [this.x, this.y];
    }

    public toFixed(digits?: number | undefined): Vector2 {
        return new Vector2(parseFloat(this.x.toFixed(digits)), parseFloat(this.y.toFixed(digits)));
    }

    public get length(): number {
        return Math.hypot(this.x, this.y);
    }

    public get lengthSquared(): number {
        return this.x ** 2 + this.y ** 2;
    }

    public get negative(): Vector2 {
        return new Vector2(-this.x, -this.y);
    }

    public get inverse(): Vector2 {
        return new Vector2(1 / this.x, 1 / this.y);
    }

    public get normalized(): Vector2 {
        const length = this.length;
        return new Vector2(this.x / length, this.y / length);
    }

    public toDegrees(): Vector2 {
        return new Vector2((this.x * 180) / Math.PI, (this.y * 180) / Math.PI);
    }

    public toRadians(): Vector2 {
        return new Vector2((this.x * Math.PI) / 180, (this.y * Math.PI) / 180);
    }
}

export class Vector3 implements VectorBase<Vector3> {
    public readonly x: number;
    public readonly y: number;
    public readonly z: number;

    public constructor(value: number);
    public constructor(x: number, y: number, z: number);
    public constructor(xyz: [number, number, number]);
    public constructor(xyz: IVector3);
    public constructor(x: number | [number, number, number] | IVector3, y?: number, z?: number) {
        if (typeof x === 'number') {
            this.x = x;
            this.y = y ?? x;
            this.z = z ?? x;
        } else if (Array.isArray(x)) {
            this.x = x[0];
            this.y = x[1];
            this.z = x[2];
        } else {
            this.x = x.x;
            this.y = x.y;
            this.z = x.z;
        }
    }

    add(x: number, y: number, z: number): Vector3;
    add(other: Vector3): Vector3;
    add(xyz: [number, number, number]): Vector3;
    add(xyz: IVector3): Vector3;
    add(xyz: number): Vector3;
    add(x: number | Vector3 | [number, number, number] | IVector3, y?: number, z?: number): Vector3 {
        if (typeof x === 'number') return new Vector3(this.x + x, this.y + (y ?? x), this.z + (z ?? x));
        else if (Array.isArray(x)) return new Vector3(this.x + x[0], this.y + x[1], this.z + x[2]);
        else return new Vector3(this.x + x.x, this.y + x.y, this.z + x.z);
    }

    sub(x: number, y: number, z: number): Vector3;
    sub(other: Vector3): Vector3;
    sub(xyz: [number, number, number]): Vector3;
    sub(xyz: IVector3): Vector3;
    sub(xyz: number): Vector3;
    sub(x: number | Vector3 | [number, number, number] | IVector3, y?: number, z?: number): Vector3 {
        if (typeof x === 'number') return new Vector3(this.x - x, this.y - (y ?? x), this.z - (z ?? x));
        else if (Array.isArray(x)) return new Vector3(this.x - x[0], this.y - x[1], this.z - x[2]);
        else return new Vector3(this.x - x.x, this.y - x.y, this.z - x.z);
    }

    mul(x: number, y: number, z: number): Vector3;
    mul(other: Vector3): Vector3;
    mul(xyz: [number, number, number]): Vector3;
    mul(xyz: IVector3): Vector3;
    mul(xyz: number): Vector3;
    mul(x: number | Vector3 | [number, number, number] | IVector3, y?: number, z?: number): Vector3 {
        if (typeof x === 'number') return new Vector3(this.x * x, this.y * (y ?? x), this.z * (z ?? x));
        else if (Array.isArray(x)) return new Vector3(this.x * x[0], this.y * x[1], this.z * x[2]);
        else return new Vector3(this.x * x.x, this.y * x.y, this.z * x.z);
    }

    div(x: number, y: number, z: number): Vector3;
    div(other: Vector3): Vector3;
    div(xyz: [number, number, number]): Vector3;
    div(xyz: IVector3): Vector3;
    div(xyz: number): Vector3;
    div(x: number | Vector3 | [number, number, number] | IVector3, y?: number, z?: number): Vector3 {
        if (typeof x === 'number') return new Vector3(this.x / x, this.y / (y ?? x), this.z / (z ?? x));
        else if (Array.isArray(x)) return new Vector3(this.x / x[0], this.y / x[1], this.z / x[2]);
        else return new Vector3(this.x / x.x, this.y / x.y, this.z / x.z);
    }

    dot(x: number, y: number, z: number): Vector3;
    dot(other: Vector3): Vector3;
    dot(xyz: [number, number, number]): Vector3;
    dot(xyz: IVector3): Vector3;
    dot(xyz: number): Vector3;
    dot(x: number | Vector3 | [number, number, number] | IVector3, y?: number, z?: number): Vector3 {
        if (typeof x === 'number') return new Vector3(this.x * x, this.y * (y ?? x), this.z * (z ?? x));
        else if (Array.isArray(x)) return new Vector3(this.x * x[0], this.y * x[1], this.z * x[2]);
        else return new Vector3(this.x * x.x, this.y * x.y, this.z * x.z);
    }

    cross(x: number, y: number, z: number): Vector3;
    cross(other: Vector3): Vector3;
    cross(xyz: [number, number, number]): Vector3;
    cross(xyz: IVector3): Vector3;
    cross(xyz: number): Vector3;
    cross(x: number | Vector3 | [number, number, number] | IVector3, y?: number, z?: number): Vector3 {
        if (typeof x === 'number') return new Vector3(this.y * z - this.z * y, this.z * x - this.x * z, this.x * y - this.y * x);
        else if (Array.isArray(x))
            return new Vector3(this.y * x[2] - this.z * x[1], this.z * x[0] - this.x * x[2], this.x * x[1] - this.y * x[0]);
        else return new Vector3(this.y * x.z - this.z * x.y, this.z * x.x - this.x * x.z, this.x * x.y - this.y * x.x);
    }

    distanceTo(x: number, y: number, z: number): number;
    distanceTo(other: Vector3): number;
    distanceTo(xyz: [number, number, number]): number;
    distanceTo(xyz: IVector3): number;
    distanceTo(x: number | Vector3 | [number, number, number] | IVector3, y?: number, z?: number): number {
        if (typeof x === 'number') return Math.hypot(this.x - x, this.y - (y ?? x), this.z - (z ?? x));
        else if (Array.isArray(x)) return Math.hypot(this.x - x[0], this.y - x[1], this.z - x[2]);
        else return Math.hypot(this.x - x.x, this.y - x.y, this.z - x.z);
    }

    distanceToSquared(x: number, y: number, z: number): number;
    distanceToSquared(other: Vector3): number;
    distanceToSquared(xyz: [number, number, number]): number;
    distanceToSquared(xyz: IVector3): number;
    distanceToSquared(x: number | Vector3 | [number, number, number] | IVector3, y?: number, z?: number): number {
        if (typeof x === 'number') return (this.x - x) ** 2 + (this.y - (y ?? x)) ** 2 + (this.z - (z ?? x)) ** 2;
        else if (Array.isArray(x)) return (this.x - x[0]) ** 2 + (this.y - x[1]) ** 2 + (this.z - x[2]) ** 2;
        else return (this.x - x.x) ** 2 + (this.y - x.y) ** 2 + (this.z - x.z) ** 2;
    }

    angleTo(x: number, y: number, z: number): number;
    angleTo(other: Vector3): number;
    angleTo(xyz: [number, number, number]): number;
    angleTo(xyz: IVector3): number;
    angleTo(x: number | Vector3 | [number, number, number] | IVector3, y?: number, z?: number): number {
        if (typeof x === 'number') return Math.acos(this.dot(x, y, z) / (this.length * Math.hypot(x, y, z)));
        else if (Array.isArray(x)) return Math.acos(this.dot(x[0], x[1], x[2]) / (this.length * Math.hypot(x[0], x[1], x[2])));
        else return Math.acos(this.dot(x.x, x.y, x.z) / (this.length * x.length));
    }

    angleToDegrees(x: number, y: number, z: number): number;
    angleToDegrees(other: Vector3): number;
    angleToDegrees(xyz: [number, number, number]): number;
    angleToDegrees(xyz: IVector3): number;
    angleToDegrees(x: number | Vector3 | [number, number, number] | IVector3, y?: number, z?: number): number {
        return this.angleTo(x as number, y as number, z as number) * (180 / Math.PI);
    }

    isInRange(range: number, x: number, y: number, z: number): boolean;
    isInRange(range: number, other: Vector3): boolean;
    isInRange(range: number, xyz: [number, number, number]): boolean;
    isInRange(range: number, xyz: IVector3): boolean;
    isInRange(range: number, x: number | Vector3 | [number, number, number] | IVector3, y?: number, z?: number): boolean {
        return this.distanceTo(x as number, y as number, z as number) <= range;
    }

    lerp(ratio: number, x: number, y: number, z: number): Vector3;
    lerp(ratio: number, other: Vector3): Vector3;
    lerp(ratio: number, xyz: [number, number, number]): Vector3;
    lerp(ratio: number, xyz: IVector3): Vector3;
    lerp(ratio: number, x: number | Vector3 | [number, number, number] | IVector3, y?: number, z?: number): Vector3 {
        if (typeof x === 'number')
            return new Vector3(this.x + (x - this.x) * ratio, this.y + (y! - this.y) * ratio, this.z + (z! - this.z) * ratio);
        else if (Array.isArray(x))
            return new Vector3(this.x + (x[0] - this.x) * ratio, this.y + (x[1] - this.y) * ratio, this.z + (x[2] - this.z) * ratio);
        else return new Vector3(this.x + (x.x - this.x) * ratio, this.y + (x.y - this.y) * ratio, this.z + (x.z - this.z) * ratio);
    }

    public static get zero(): Vector3 {
        return new Vector3(0, 0, 0);
    }

    public static get one(): Vector3 {
        return new Vector3(1, 1, 1);
    }

    public static get back(): Vector3 {
        return new Vector3(0, 0, -1);
    }

    public static get up(): Vector3 {
        return new Vector3(0, 1, 0);
    }

    public static get down(): Vector3 {
        return new Vector3(0, -1, 0);
    }

    public static get forward(): Vector3 {
        return new Vector3(0, 0, 1);
    }

    public static get left(): Vector3 {
        return new Vector3(-1, 0, 0);
    }

    public static get right(): Vector3 {
        return new Vector3(1, 0, 0);
    }

    public static get negativeInfinity(): Vector3 {
        return new Vector3(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
    }

    public static get positiveInfinity(): Vector3 {
        return new Vector3(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
    }

    public static fromArray(xyz: [number, number, number]): Vector3 {
        return new Vector3(xyz);
    }

    public static fromObject(xyz: IVector3): Vector3 {
        return new Vector3(xyz);
    }
}

export class RGBA {
    public readonly r: number;
    public readonly g: number;
    public readonly b: number;
    public readonly a: number;

    public constructor(r: number, g: number, b: number, a?: number);
    public constructor(rgba: [number, number, number, number | undefined]);
    public constructor(rgba: IRGBA);
    public constructor(r: number | [number, number, number, number | undefined] | IRGBA, g?: number, b?: number, a?: number) {
        if (typeof r === 'number') {
            this.r = r;
            this.g = g!;
            this.b = b!;
            this.a = a ?? 255;
        } else if (Array.isArray(r)) {
            this.r = r[0];
            this.g = r[1];
            this.b = r[2];
            this.a = r[3] ?? 255;
        } else {
            this.r = r.r;
            this.g = r.g;
            this.b = r.b;
            this.a = r.a ?? 255;
        }
    }

    public toArray(): [number, number, number, number | undefined] {
        return [this.r, this.g, this.b, this.a];
    }
    public toInt(): number {
        return (this.a << 24) | (this.r << 16) | (this.g << 8) | this.b;
    }

    public static get red(): RGBA {
        return new RGBA(255, 0, 0);
    }
    public static get green(): RGBA {
        return new RGBA(0, 255, 0);
    }
    public static get blue(): RGBA {
        return new RGBA(0, 0, 255);
    }
    public static get black(): RGBA {
        return new RGBA(0, 0, 0);
    }
    public static get white(): RGBA {
        return new RGBA(255, 255, 255);
    }
    public static get clear(): RGBA {
        return new RGBA(0, 0, 0, 0);
    }

    public static fromInt(color: number): RGBA {
        return new RGBA((color >> 16) & 0xff, (color >> 8) & 0xff, color & 0xff, color >> 24);
    }
}

// Client

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

export class BaseObject<TClass, TRaw extends altClient.BaseObject> {
    public $raw: TRaw; // Add
    public $cache: WeakMap<TRaw, TClass>;

    public get id() {
        return this.$raw.id;
    }
    public get type() {
        return this.$raw.type as unknown as Enums.BaseObjectType;
    }

    public get valid() {
        return this.$raw.valid;
    }
    public destroy() {
        this.$raw.destroy();
    }

    public get isRemote() {
        return this.$raw.isRemote;
    }
    public get remoteID() {
        return this.$raw.remoteID;
    }

    public static getByID(type: Enums.BaseObjectType, id: number) {
        const obj = altClient.BaseObject.getByID(type as number, id);
        if (!obj) return null;
        const instance = new BaseObject();
        instance.$raw = obj;
        return instance;
    }
    public static getByRemoteID(type: Enums.BaseObjectType, id: number) {
        const obj = altClient.BaseObject.getByRemoteID(type as number, id);
        if (!obj) return null;
        const instance = new BaseObject();
        instance.$raw = obj;
        return instance;
    }

    // readonly meta: BaseObjectMeta & Record<string, unknown>;
    // readonly syncedMeta: Readonly<BaseObjectSyncedMeta & Record<string, unknown>>;
}

export abstract class WorldObject<TClass, TRaw extends altClient.BaseObject> extends BaseObject<TClass, TRaw> {
    public dimension: number;
    public pos: Vector3;
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
}

export class AudioCategory {
    private $raw: altClient.AudioCategory; // Add

    public get name() {
        return this.$raw.name;
    }
    public get volume() {
        return this.$raw.volume;
    }
    public set volume(value: number) {
        this.$raw.volume = value;
    }
    public get distanceRolloffScale() {
        return this.$raw.distanceRolloffScale;
    }
    public set distanceRolloffScale(value: number) {
        this.$raw.distanceRolloffScale = value;
    }
    public get plateauRolloffScale() {
        return this.$raw.plateauRolloffScale;
    }
    public set plateauRolloffScale(value: number) {
        this.$raw.plateauRolloffScale = value;
    }
    public get occlusionDamping() {
        return this.$raw.occlusionDamping;
    }
    public set occlusionDamping(value: number) {
        this.$raw.occlusionDamping = value;
    }
    public get environmentalFilterDamping() {
        return this.$raw.environmentalFilterDamping;
    }
    public set environmentalFilterDamping(value: number) {
        this.$raw.environmentalFilterDamping = value;
    }
    public get sourceReverbDamping() {
        return this.$raw.sourceReverbDamping;
    }
    public set sourceReverbDamping(value: number) {
        this.$raw.sourceReverbDamping = value;
    }
    public get distanceReverbDamping() {
        return this.$raw.distanceReverbDamping;
    }
    public set distanceReverbDamping(value: number) {
        this.$raw.distanceReverbDamping = value;
    }
    public get interiorReverbDamping() {
        return this.$raw.interiorReverbDamping;
    }
    public set interiorReverbDamping(value: number) {
        this.$raw.interiorReverbDamping = value;
    }
    public get environmentalLoudness() {
        return this.$raw.environmentalLoudness;
    }
    public set environmentalLoudness(value: number) {
        this.$raw.environmentalLoudness = value;
    }
    public get underwaterWetLevel() {
        return this.$raw.underwaterWetLevel;
    }
    public set underwaterWetLevel(value: number) {
        this.$raw.underwaterWetLevel = value;
    }
    public get stonedWetLevel() {
        return this.$raw.stonedWetLevel;
    }
    public set stonedWetLevel(value: number) {
        this.$raw.stonedWetLevel = value;
    }
    public get pitch() {
        return this.$raw.pitch;
    }
    public set pitch(value: number) {
        this.$raw.pitch = value;
    }
    public get lowPassFilterCutoff() {
        return this.$raw.lowPassFilterCutoff;
    }
    public set lowPassFilterCutoff(value: number) {
        this.$raw.lowPassFilterCutoff = value;
    }
    public get highPassFilterCutoff() {
        return this.$raw.highPassFilterCutoff;
    }

    public reset() {
        throw new Error('Not implemented');
    }

    public static get(name: string) {
        return altClient.AudioCategory.getForName(name);
    }
}

export class AudioFilter {
    private $raw: altClient.AudioFilter; // Add

    public audioCategory: AudioCategory;
    public get hash() {
        return this.$raw.hash;
    }

    public addRotateEffect(rate: number, priority: number) {
        return this.$raw.addRotateEffect(rate, priority);
    }
    public addVolumeEffect(volume: number, priority: number, channel?: number) {
        return this.$raw.addVolumeEffect(volume, priority, channel);
    }
    public addPeakeqEffect(band: number, bandwidth: number, q: number, center: number, gain: number, priority: number) {
        return this.$raw.addPeakeqEffect(band, bandwidth, q, center, gain, priority);
    }
    public addDampEffect(target: number, quiet: number, rate: number, gain: number, delay: number, priority: number) {
        return this.$raw.addDampEffect(target, quiet, rate, gain, delay, priority);
    }
    public addAutowahEffect(dryMix: number, wetMix: number, feedback: number, rate: number, range: number, freq: number, priority: number) {
        return this.$raw.addAutowahEffect(dryMix, wetMix, feedback, rate, range, freq, priority);
    }
    public addPhaserEffect(dryMix: number, wetMix: number, feedback: number, rate: number, range: number, freq: number, priority: number) {
        return this.$raw.addPhaserEffect(dryMix, wetMix, feedback, rate, range, freq, priority);
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
        return this.$raw.addChorusEffect(dryMix, wetMix, feedback, minSweep, maxSweep, rate, priority);
    }
    public addDistortionEffect(drive: number, dryMix: number, wetMix: number, feedback: number, volume: number, priority: number) {
        return this.$raw.addDistortionEffect(drive, dryMix, wetMix, feedback, volume, priority);
    }
    public addCompressor2Effect(gain: number, threshold: number, ratio: number, attack: number, release: number, priority: number) {
        return this.$raw.addCompressor2Effect(gain, threshold, ratio, attack, release, priority);
    }
    public addBqfEffect(filter: number, center: number, gain: number, bandwidth: number, q: number, s: number, priority: number) {
        return this.$raw.addBqfEffect(filter, center, gain, bandwidth, q, s, priority);
    }
    public addEcho4Effect(dryMix: number, wetMix: number, feedback: number, delay: number, priority: number) {
        return this.$raw.addEcho4Effect(dryMix, wetMix, feedback, delay, priority);
    }
    public addPitchshiftEffect(pitchShift: number, semitones: number, fftSize: number, osamp: number, priority: number) {
        return this.$raw.addPitchshiftEffect(pitchShift, semitones, fftSize, osamp, priority);
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
        return this.$raw.addFreeverbEffect(dryMix, wetMix, roomSize, damp, width, mode, priority);
    }

    public removeEffect(fxHandler: number) {
        return this.$raw.removeEffect(fxHandler);
    }

    public static readonly all: Array<AudioFilter>;

    public static create(options: AudioFilterCreateOptions) {
        const filter = new AudioFilter();
        filter.$raw = new altClient.AudioFilter(options.hash as string);
        this.all.push(filter);
        return filter;
    }
    public static getByID(id: number) {
        return this.all.find((filter) => filter.$raw.id === id);
    }
}

export class AudioOutput extends BaseObject<AudioOutput, altClient.AudioOutput> {
    public get muted() {
        return this.$raw.muted;
    }
    public set muted(value: boolean) {
        this.$raw.muted = value;
    }
    public get volume() {
        return this.$raw.volume;
    }
    public set volume(value: number) {
        this.$raw.volume = value;
    }
    public get category() {
        return this.$raw.category;
    }
    public get owner() {
        throw new Error('Not implemented');
        // return this.$raw.owner;
    }

    public filter: AudioFilter | null;

    public static override getByID(id: number) {
        const output = altClient.AudioOutput.getByID(id);
        if (!output) return null;
        const instance = new AudioOutput();
        instance.$raw = output;
        return instance;
    }
}

export class AudioOutputAttached extends AudioOutput {
    public entity: WorldObject;

    public static readonly all: Array<AudioOutputAttached> = [];

    public static create(options: AudioOutputAttachedCreateOptions) {
        const output = new AudioOutputAttached();
        output.$raw = new altClient.AudioOutputAttached(options.entity, options.categoryHash);
        this.all.push(output);
        return output;
    }
}

export class AudioOutputFrontend extends AudioOutput {
    public static readonly all: Array<AudioOutputFrontend> = [];

    public static create(options: AudioOutputFrontendCreateOptions) {
        const output = new AudioOutputFrontend();
        output.$raw = new altClient.AudioOutputFrontend(options.categoryHash);
        this.all.push(output);
        return output;
    }
}

export class AudioOutputWorld extends AudioOutput {
    public pos: Vector3;

    public static readonly all: Array<AudioOutputWorld> = [];

    public static create(options: AudioOutputWorldCreateOptions) {
        const output = new AudioOutputWorld();
        output.$raw = new altClient.AudioOutputWorld(options.pos, options.categoryHash);
        this.all.push(output);
        return output;
    }
}

type BlipCreateOptions =
    | ({ blipType: Enums.BlipType.AREA } & AreaBlipCreateOptions)
    | ({ blipType: Enums.BlipType.RADIUS } & RadiusBlipCreateOptions)
    | ({ blipType: Enums.BlipType.DESTINATION } & PointBlipCreateOptions);

export class Blip extends WorldObject<Blip, altClient.Blip> {
    public get scriptID(): number {
        return this.$raw.scriptID;
    }
    public get isStreamedIn(): boolean {
        return this.$raw.isStreamedIn;
    }
    public get global(): boolean {
        return this.$raw.isGlobal;
    }
    public get isAttached(): boolean {
        return this.$raw.isAttached;
    }
    public get attachedTo(): Entity {
        return this.$raw.attachedTo;
    }

    // public readonly meta: BlipMeta & Record<string, unknown>;
    // public readonly syncedMeta: Readonly<altShared.BlipSyncedMeta & Record<string, unknown>>;

    public get blipType(): Enums.BlipType {
        return this.$raw.blipType as unknown as Enums.BlipType;
    }
    public set blipType(value: Enums.BlipType) {
        this.$raw.blipType = value as number;
    }

    public get scaleXY(): Vector2 {
        return new Vector2(this.$raw.scale, this.$raw.scale);
    }
    public set scaleXY(value: Vector2) {
        this.$raw.scale = value.x;
    }

    public get display(): number {
        return this.$raw.display;
    }
    public set display(value: number) {
        this.$raw.display = value;
    }

    public get sprite(): number {
        return this.$raw.sprite;
    }
    public set sprite(value: number) {
        this.$raw.sprite = value;
    }

    public get color(): number {
        return this.$raw.color;
    }
    public set color(value: number) {
        this.$raw.color = value;
    }

    public get secondaryColor(): number {
        return this.$raw.secondaryColor as number;
    }
    public set secondaryColor(value: number) {
        this.$raw.secondaryColor = value;
    }

    public get alpha(): number {
        return this.$raw.alpha;
    }
    public set alpha(value: number) {
        this.$raw.alpha = value;
    }

    public get flashTimer(): number {
        return this.$raw.flashTimer;
    }
    public set flashTimer(value: number) {
        this.$raw.flashTimer = value;
    }

    public get flashInterval(): number {
        return this.$raw.flashInterval;
    }
    public set flashInterval(value: number) {
        this.$raw.flashInterval = value;
    }

    public get friendly(): boolean {
        return this.$raw.isFriendly;
    }
    public set friendly(value: boolean) {
        this.$raw.isFriendly = value;
    }

    public get route(): boolean {
        return this.$raw.route;
    }
    public set route(value: boolean) {
        this.$raw.route = value;
    }

    public get bright(): boolean {
        return this.$raw.bright;
    }
    public set bright(value: boolean) {
        this.$raw.bright = value;
    }

    public get number(): number {
        return this.$raw.number;
    }
    public set number(value: number) {
        this.$raw.number = value;
    }

    public get showCone(): boolean {
        return this.$raw.showCone;
    }
    public set showCone(value: boolean) {
        this.$raw.showCone = value;
    }

    public get flashes(): boolean {
        return this.$raw.flashes;
    }
    public set flashes(value: boolean) {
        this.$raw.flashes = value;
    }

    public get flashesAlternate(): boolean {
        return this.$raw.flashesAlternate;
    }
    public set flashesAlternate(value: boolean) {
        this.$raw.flashesAlternate = value;
    }

    public get shortRange(): boolean {
        return this.$raw.shortRange;
    }
    public set shortRange(value: boolean) {
        this.$raw.shortRange = value;
    }

    public get priority(): number {
        return this.$raw.priority;
    }
    public set priority(value: number) {
        this.$raw.priority = value;
    }

    public get rotation(): number {
        return this.$raw.rotation;
    }
    public set rotation(value: number) {
        this.$raw.rotation = value;
    }

    public get gxtName(): string {
        return this.$raw.gxtName;
    }
    public set gxtName(value: string) {
        this.$raw.gxtName = value;
    }

    public get name(): string {
        return this.$raw.name;
    }
    public set name(value: string) {
        this.$raw.name = value;
    }

    public get routeColor(): RGBA {
        return this.$raw.routeColor;
    }
    public set routeColor(value: RGBA) {
        this.$raw.routeColor = new altClient.RGBA(value.r, value.g, value.b, value.a);
    }

    public get pulse(): boolean {
        return this.$raw.pulse;
    }
    public set pulse(value: boolean) {
        this.$raw.pulse = value;
    }

    public get missionCreator(): boolean {
        return this.$raw.asMissionCreator;
    }
    public set missionCreator(value: boolean) {
        this.$raw.asMissionCreator = value;
    }

    public get tickVisible(): boolean {
        return this.$raw.tickVisible;
    }
    public set tickVisible(value: boolean) {
        this.$raw.tickVisible = value;
    }

    public get headingIndicatorVisible(): boolean {
        return this.$raw.headingIndicatorVisible;
    }
    public set headingIndicatorVisible(value: boolean) {
        this.$raw.headingIndicatorVisible = value;
    }

    public get outlineIndicatorVisible(): boolean {
        return this.$raw.outlineIndicatorVisible;
    }
    public set outlineIndicatorVisible(value: boolean) {
        this.$raw.outlineIndicatorVisible = value;
    }

    public get friendIndicatorVisible(): boolean {
        return this.$raw.friendIndicatorVisible;
    }
    public set friendIndicatorVisible(value: boolean) {
        this.$raw.friendIndicatorVisible = value;
    }

    public get crewIndicatorVisible(): boolean {
        return this.$raw.crewIndicatorVisible;
    }
    public set crewIndicatorVisible(value: boolean) {
        this.$raw.crewIndicatorVisible = value;
    }

    public get category(): number {
        return this.$raw.category;
    }
    public set category(value: number) {
        this.$raw.category = value;
    }

    public get highDetail(): boolean {
        return this.$raw.highDetail;
    }
    public set highDetail(value: boolean) {
        this.$raw.highDetail = value;
    }

    public get shrinked(): boolean {
        return this.$raw.shrinked;
    }
    public set shrinked(value: boolean) {
        this.$raw.shrinked = value;
    }

    public get visible(): boolean {
        return this.$raw.visible;
    }
    public set visible(value: boolean) {
        this.$raw.visible = value;
    }

    public get hiddenOnLegend(): boolean {
        return this.$raw.isHiddenOnLegend;
    }
    public set hiddenOnLegend(value: boolean) {
        this.$raw.isHiddenOnLegend = value;
    }

    public get minimalOnEdge(): boolean {
        return this.$raw.isMinimalOnEdge;
    }
    public set minimalOnEdge(value: boolean) {
        this.$raw.isMinimalOnEdge = value;
    }

    public get useHeightIndicatorOnEdge(): boolean {
        return this.$raw.useHeightIndicatorOnEdge;
    }
    public set useHeightIndicatorOnEdge(value: boolean) {
        this.$raw.useHeightIndicatorOnEdge = value;
    }

    public get shortHeightThreshold(): boolean {
        return this.$raw.isShortHeightThreshold;
    }
    public set shortHeightThreshold(value: boolean) {
        this.$raw.isShortHeightThreshold = value;
    }

    public attachTo(entity: Entity): boolean {
        return this.$raw.attachTo(entity);
    }
    public fade(opacity: number, duration: number): void {
        this.$raw.fade(opacity, duration);
    }

    public static create(options: BlipCreateOptions): Blip {
        const blip = new Blip();
        // blip.$raw = new altClient.Blip(options.blipType, options.pos.x, options.pos.y, options.pos.z);
        return blip;
    }

    public static override getByID(id: number): Blip | null {
        const blip = altClient.Blip.getByID(id);
        if (!blip) return null;
        const instance = new Blip();
        instance.$raw = blip;
        return instance;
    }
    public static override getByRemoteID(id: number): Blip | null {
        const blip = altClient.Blip.getByRemoteID(id);
        if (!blip) return null;
        const instance = new Blip();
        instance.$raw = blip;
        return instance;
    }
    public static getByScriptID(id: number): Blip | null {
        const blip = altClient.Blip.getByScriptID(id);
        if (!blip) return null;
        const instance = new Blip();
        instance.$raw = blip;
        return instance;
    }
}

export abstract class Marker extends WorldObject<Marker, altClient.Marker> {
    public get isGlobal(): boolean {
        return this.$raw.isGlobal;
    }
    public get streamingDistance(): number {
        return this.$raw.streamingDistance;
    }

    // readonly meta: MarkerMeta & Record<string, unknown>;

    public get color(): RGBA {
        const color = this.$raw.color;
        return new RGBA(color.r, color.g, color.b, color.a);
    }
    public set color(value: RGBA) {
        this.$raw.color = new altClient.RGBA(value.r, value.g, value.b, value.a);
    }

    public get visible(): boolean {
        return this.$raw.visible;
    }
    public set visible(value: boolean) {
        this.$raw.visible = value;
    }

    public get markerType(): Enums.MarkerType {
        return this.$raw.markerType as unknown as Enums.MarkerType;
    }
    public set markerType(value: Enums.MarkerType) {
        this.$raw.markerType = value as number;
    }

    public get scale(): IVector3 {
        const scale = this.$raw.scale;
        return { x: scale.x, y: scale.y, z: scale.z };
    }
    public set scale(value: IVector3) {
        this.$raw.scale = new altClient.Vector3(value.x, value.y, value.z);
    }

    public get rot(): IVector3 {
        const rot = this.$raw.rot;
        return { x: rot.x, y: rot.y, z: rot.z };
    }
    public set rot(value: IVector3) {
        this.$raw.rot = new altClient.Vector3(value.x, value.y, value.z);
    }

    public get direction(): IVector3 {
        const direction = this.$raw.dir;
        return { x: direction.x, y: direction.y, z: direction.z };
    }
    public set direction(value: IVector3) {
        this.$raw.dir = new altClient.Vector3(value.x, value.y, value.z);
    }

    public get faceCamer(): boolean {
        return this.$raw.faceCamera;
    }
    public set faceCamera(value: boolean) {
        this.$raw.faceCamera = value;
    }

    public get rotating(): boolean {
        return this.$raw.rotate;
    }
    public set rotating(value: boolean) {
        this.$raw.rotate = value;
    }

    public get bobUpDown(): boolean {
        return this.$raw.bobUpAndDown;
    }
    public set bobUpAndDown(value: boolean) {
        this.$raw.bobUpAndDown = value;
    }

    public static readonly all: ReadonlyArray<Marker> = [];

    public static getByID(id: number): Marker | null {}
    public static getByRemoteID(id: number): Marker | null {}
    public static create(opts: MarkerCreateOptions): Marker {}
}

export class ColShape<TClass = any, TRaw extends altClient.Colshape = altClient.Colshape> extends WorldObject<TClass, TRaw> {
    public get colShapeType(): Enums.ColShapeType {
        return this.$raw.colshapeType as unknown as Enums.ColShapeType;
    }
    public get playersOnly(): boolean {
        return this.$raw.playersOnly;
    }
    public set playersOnly(value: boolean) {
        this.$raw.playersOnly = value;
    }

    public isEntityIn(entity: Entity): boolean {
        return this.$raw.isEntityIn(entity.$raw);
    }

    public isEntityIdIn(id: number): boolean {
        const entity = altClient.Entity.getByID(Enums.BaseObjectType.COLSHAPE as number, id) as altClient.Entity;
        if (!entity) return false;
        return this.$raw.isEntityIn(entity);
    }

    public isPointIn(pos: Vector3): boolean {
        return this.$raw.isPointIn(pos);
    }

    public static readonly all: Array<ColShape> = [];

    public static create(opts: ColShapeCreateOptions): ColShape {
        const colShape = new ColShape();
        // colShape.$raw = new altClient.Colshape(opts.colShapeType, opts.pos.x, opts.pos.y, opts.pos.z, opts.radius, opts.height);
        this.all.push(colShape);
        return colShape;
    }

    public static override getByID(id: number): ColShape | null {
        const colShape = altClient.Colshape.getByID(id);
        if (!colShape) return null;
        const instance = new ColShape();
        instance.$raw = colShape;
        return instance;
    }

    public static override getByRemoteID(id: number): ColShape | null {
        const colShape = altClient.Colshape.getByRemoteID(Enums.BaseObjectType.COLSHAPE as number, id) as altClient.Colshape;
        if (!colShape) return null;
        const instance = new ColShape();
        instance.$raw = colShape;
        return instance;
    }
}

export abstract class Checkpoint extends ColShape {
    readonly scriptID: number;
    readonly isStreamedIn: boolean;

    checkpointType: number;
    radius: number;
    height: number;
    color: RGBA;
    iconColor: RGBA;
    nextPos: IVector3;
    readonly streamingDistance: number;
    visible: boolean;

    isEntityIn(entity: Entity): boolean;
    isEntityIdIn(id: number): boolean;
    isPointIn(point: Vector3): boolean;

    static readonly all: ReadonlyArray<Checkpoint>;

    static create(opts: CheckpointCreateOptions): Checkpoint;
    static getByID(id: number): Checkpoint | null;
    static getByRemoteID(id: number): Checkpoint | null;
    static getByScriptID(scriptId: number): Checkpoint | null;
}

export abstract class Entity<TClass, TRaw extends altClient.Entity> extends WorldObject<TClass, TRaw> {
    get scriptID(): number {
        return this.$raw.scriptID;
    }

    get model(): number {
        return this.$raw.model;
    }
    get netOwner(): Player {
        return this.$raw.netOwner;
    }
    get visible(): boolean {
        return this.$raw.visible;
    }
    get isStreamedIn(): boolean {
        return this.$raw.isSpawned;
    }

    readonly syncedMeta: Readonly<EntitySyncedMeta & Record<string, unknown>>;
    readonly streamSyncedMeta: Readonly<EntityStreamSyncedMeta & Record<string, unknown>>;

    frozen: boolean;
    rot: Vector3;

    getSyncInfo(): Data.ISyncInfo;

    static readonly all: ReadonlyArray<Entity>;
    static getByScriptID(scriptId: number): Entity | null;
}

export class Font extends BaseObject<Font, altClient.Font> {
    private constructor() {
        super();
    }

    public static register(path: string): Font | undefined {
        const font = altClient.Font.register(path);
        if (!font) return undefined;
        const instance = new Font();
        instance.$raw = font;
        return instance;
    }
}

export class HandlingData {
    protected $raw: altClient.HandlingData;

    protected constructor() {}

    readonly handlingNameHash: number;

    mass: number;
    initialDragCoeff: number;
    downforceModifier: number;
    unkFloat1: number;
    unkFloat2: number;
    unkFloat4: number;
    unkFloat5: number;
    centreOfMassOffset: Vector3;
    inertiaMultiplier: Vector3;
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

    public static get(modelHash: number | string): HandlingData | undefined {
        if (typeof modelHash === 'string') modelHash = altClient.hash(modelHash);
        const handling = altClient.HandlingData.getForHandlingName(modelHash);
        if (!handling) return undefined;
        const instance = new HandlingData();
        instance.$raw = handling;
        return instance;
    }
}

export abstract class Handling extends HandlingData {
    public get isModified(): boolean {
        return this.$raw;
    }

    public reset(): void {}
}

export class HttpClient extends BaseObject<HttpClient, altClient.HttpClient> {
    private constructor() {
        super();
    }

    public get(url: string): Promise<HttpResponse> {
        return this.$raw.get(url);
    }
    public head(url: string): Promise<HttpResponse> {
        return this.$raw.head(url);
    }
    public post(url: string, body: string): Promise<HttpResponse> {
        return this.$raw.post(url, body);
    }
    public put(url: string, body: string): Promise<HttpResponse> {
        return this.$raw.put(url, body);
    }
    public delete(url: string, body: string): Promise<HttpResponse> {
        return this.$raw.delete(url, body);
    }
    public connect(url: string, body: string): Promise<HttpResponse> {
        return this.$raw.connect(url, body);
    }
    public options(url: string, body: string): Promise<HttpResponse> {
        return this.$raw.options(url, body);
    }
    public trace(url: string, body: string): Promise<HttpResponse> {
        return this.$raw.trace(url, body);
    }
    public patch(url: string, body: string): Promise<HttpResponse> {
        return this.$raw.patch(url, body);
    }

    public get extraHeaders(): Record<string, string> {
        return this.$raw.getExtraHeaders();
    }

    public static create(): HttpClient {
        const client = new HttpClient();
        client.$raw = new altClient.HttpClient();
        return client;
    }

    public static override getByID(id: number): HttpClient | null {
        const client = altClient.HttpClient.getByID(id);
        if (!client) return null;
        const instance = new HttpClient();
        instance.$raw = client;
        return instance;
    }
}

export class Object extends Entity {
    readonly alpha: number;
    readonly textureVariation: number;
    readonly lodDistance: number;

    static readonly all: ReadonlyArray<Object>;
    static readonly streamedIn: ReadonlyArray<Object>;

    static getByID(id: number): Object | null;
    static getByRemoteID(id: number): Object | null;
    static getByScriptID(id: number): Object | null;
}

export class LocalObject extends Object {
    get model(): number;
    set model(value: number | string);
    declare alpha: number;
    readonly isDynamic: boolean;
    declare lodDistance: number;
    hasGravity: number;
    readonly isCollisionEnabled: boolean;
    positionFrozen: boolean;
    declare textureVariation: number;
    readonly isWorldObject: boolean;
    readonly isWeaponObject: boolean;
    readonly useStreaming: boolean;
    readonly streamingDistance: number;
    declare visible: boolean;

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

    static readonly allWorld: ReadonlyArray<LocalObject>;

    static create(options: LocalObjectCreateOptions): LocalObject;
    static getByID(id: number): LocalObject | null;
    static getByScriptID(scriptId: number): LocalObject | null;
}

export class Ped extends Entity {
    readonly health: number;
    readonly maxHealth: number;
    readonly armour: number;
    readonly currentWeapon: number;

    readonly meta: PedMeta & Record<string, unknown>;
    declare readonly syncedMeta: Readonly<PedSyncedMeta & Record<string, unknown>>;
    declare readonly streamSyncedMeta: Readonly<PedStreamSyncedMeta & Record<string, unknown>>;

    static readonly all: ReadonlyArray<Ped>;
    static readonly streamedIn: ReadonlyArray<Ped>;

    static getByID(id: number): Ped | null;
    static getByRemoteID(id: number): Ped | null;
    static getByScriptID(scriptID: number): Ped | LocalPed | null;
}

export class LocalPed extends Ped {
    get model(): number;
    set model(value: number | string);
    readonly streamingDistance: number;
    declare visible: boolean;
    declare readonly scriptID: number;
    declare readonly isStreamedIn: boolean;

    public waitForSpawn(timeout?: number): Promise<void>;

    static readonly all: ReadonlyArray<Ped>;

    static create(options: LocalPedCreateOptions): LocalPed;
    static getByID(id: number): LocalPed | null;
    static getByScriptID(scriptId: number): LocalPed | null;
}

export class LocalPlayer extends Player {
    readonly currentAmmo: number;
    stamina: number;
    maxStamina: number;
    readonly currentWeaponData: WeaponData;
    readonly weapons: ReadonlyArray<{ hash: number; tintIndex: number; components: ReadonlyArray<number> }>;

    getWeaponAmmo(wepaonHash: number | string): number | undefined;
    hasWeapon(wepaonHash: number | string): boolean;
    getWeaponComponents(wepaonHash: number | string): ReadonlyArray<number> | undefined;
}

export class LocalVehicle extends Vehicle {
    get model(): number;
    set model(value: number | string);

    readonly streamingDistance: number;
    declare visible: boolean;
    declare readonly scriptID: number;
    declare readonly isStreamedIn: boolean;

    public waitForSpawn(timeout?: number): Promise<void>;

    static create(opts: LocalVehicleCreateOptions): LocalVehicle;
    static getByID(id: number): LocalVehicle | null;
    static getByScriptID(scriptId: number): LocalVehicle | null;
}

export class Player extends Entity {
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
    readonly aimPos: Vector3;
    readonly headRotation: Vector3;
    readonly isInVehicle: boolean;
    readonly vehicle?: Vehicle;
    readonly seat: number;
    readonly entityAimingAt: Entity;
    readonly entityAimOffset: Vector3;
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

    declare readonly syncedMeta: Readonly<PlayerSyncedMeta & Record<string, unknown>>;
    declare readonly streamSyncedMeta: Readonly<PlayerStreamSyncedMeta & Record<string, unknown>>;

    static readonly local: LocalPlayer;
    static readonly all: ReadonlyArray<Player>;
    static readonly streamedIn: ReadonlyArray<Player>;

    static getByID(id: number): Player | null;
    static getByRemoteID(id: number): Player | null;
}

export class RmlDocument extends RmlElement {
    title: string;
    readonly sourceUrl: string;
    declare readonly isVisible: boolean;
    readonly isModal: boolean;

    readonly body: RmlElement;

    show(isModal?: boolean, focused?: boolean): void;
    hide(): void;
    update(): void;

    createElement(tag: string): RmlElement;
    createTextNode(text: string): RmlElement;

    static readonly all: ReadonlyArray<RmlDocument>;

    static create(options: RmlDocumentCreateOptions): RmlDocument;

    static getByID(id: string): RmlDocument | null;
}

// @ts-ignore - Suppresses "Class static side incorrectly extends base class static side"
export class RmlElement extends BaseObject {
    readonly listeners: ReadonlyMap<string, Array<(...args: unknown[]) => Promise<void> | void>>;

    readonly relativeOffset: Vector2;
    readonly absoluteOffset: Vector2;
    readonly baseline: number;
    readonly zIndex: number;
    readonly containingBlock: Vector2;

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
    setOffset(offsetParent: RmlElement, offset: Vector2, fixed?: boolean): void;
    isPointWithinElement(point: Vector2): boolean;
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

export class TextLabel extends WorldObject {
    readonly isStreamedIn: boolean;
    readonly isGlobal: boolean;
    readonly target: Entity;
    visible: boolean;
    color: RGBA;
    scale: number;
    rot: Vector3;
    faceCamera: boolean;

    outlineColor: RGBA;
    outlineWidth: number;
    fontSize: number;
    textAlign: Enums.TextLabelAlignment;
    text: string;
    font: string;

    readonly streamingDistance: number;

    static readonly all: ReadonlyArray<TextLabel>;

    static create(opts: TextLabelCreateOptions): TextLabel | null;

    static getByID(id: number): TextLabel | null;
    // static getByRemoteID(id: number): TextLabel | null;
}

export class Vehicle extends Entity {
    readonly neon: Readonly<VehicleNeonState>;

    readonly driver?: Player;
    readonly isDestroyed: boolean;
    readonly modKitsCount: number;
    readonly modKit: number;
    readonly IsPrimaryColorRGB: boolean;
    readonly primaryColor: number;
    readonly primaryColorRGB: RGBA;
    readonly isSecondaryColorRGB: boolean;
    readonly secondaryColor: number;
    readonly secondaryColorRGB: RGBA;
    readonly pearlColor: number;
    readonly wheelColor: number;
    readonly interiorColor: number;
    readonly dashboardColor: number;
    readonly isTireSmokeColorCustom: boolean;
    readonly tireSmokeColor: RGBA;
    readonly wheelType: number;
    readonly wheelVariation: number;
    readonly customTires: boolean;
    readonly specialDarkness: number;
    readonly numberplateIndex: number;
    readonly numberplateText: string;
    readonly windowTint: number;
    readonly dirtLevel: number;
    readonly isNeonActive: boolean;
    readonly neonColor: RGBA;
    readonly livery: number;
    readonly roofLivery: number;
    readonly appearanceDataBase64: string;
    readonly engineOn: boolean;
    readonly isHandbrakeActive: boolean;
    readonly headlightColor: number;
    readonly radioStationIndex: number;
    readonly isSirenActive: boolean;
    readonly lockState: Enums.VehicleLockState;
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
    readonly velocity: Vector3;
    readonly steeringAngle: number;
    readonly rearWheelVariation: number;

    declare readonly streamSyncedMeta: Readonly<VehicleStreamSyncedMeta & Record<string, unknown>>;

    readonly speed: number;
    readonly gear: number;
    readonly maxGear: number;
    readonly rpm: number;
    readonly speedVector: Vector3;
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

    getNeonActive(): VehicleNeonState;

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
}

export abstract class VirtualEntityGroup extends BaseObject {
    readonly maxEntitiesInStream: number;

    static create(opts: altShared.VirtualEntityGroupCreateOptions): VirtualEntityGroup;
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

    static create(opts: VirtualEntityCreateOptions): VirtualEntity;

    static getByID(id: number): VirtualEntity | null;
    static getByRemoteID(id: number): VirtualEntity | null;
}

export class WeaponData {
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

    static readonly all: Array<WeaponData> = [];

    static get(weaponHash: number | string): WeaponData | undefined;
}

export class WebSocketClient extends BaseObject<WebSocketClient, altClient.WebSocketClient> {
    public get url(): string {
        return this.$raw.url;
    }
    public set url(value: string) {
        this.$raw.url = value;
    }
    public get autoReconnect(): boolean {
        return this.$raw.autoReconnect;
    }
    public set autoReconnect(value: boolean) {
        this.$raw.autoReconnect = value;
    }
    public get perMessageDeflate(): boolean {
        return this.$raw.perMessageDeflate;
    }
    public set perMessageDeflate(value: boolean) {
        this.$raw.perMessageDeflate = value;
    }
    public get pingInterval(): number {
        return this.$raw.pingInterval;
    }
    public set pingInterval(value: number) {
        this.$raw.pingInterval = value;
    }
    public get readyState(): boolean {
        return this.$raw.readyState;
    }

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

    start(): void {
        this.$raw.start();
    }
    stop(): void {
        this.$raw.stop();
    }

    send(message: string | altShared.Buffer): boolean {
        return this.$raw.send(message);
    }

    addSubProtocol(protocol: string): void {
        this.$raw.addSubProtocol(protocol);
    }
    getSubProtocols(): ReadonlyArray<string> {
        return this.$raw.getSubProtocols();
    }
    setExtraHeader(name: string, value: string): void {
        this.$raw.setExtraHeader(name, value);
    }
    getExtraHeaders(): Readonly<Record<string, string>> {
        return this.$raw.getExtraHeaders();
    }

    static readonly all: Array<WebSocketClient> = [];

    static create(options: WebSocketClientCreateOptions): WebSocketClient;
    static getByID(id: number): WebSocketClient | null;
}

export class TextEncoder {
    public get encoding(): 'utf-8' {
        return 'utf-8';
    }

    public encode(str: string): Uint8Array {
        return Uint8Array.from(Buffer.from(str, 'utf-8'));
    }
    public encodeInto(str: string, arr: Uint8Array): { read: number; written: number } {
        const buffer = Buffer.from(str, 'utf-8');
        const read = buffer.copy(arr);
        return { read, written: read };
    }
}

export class TextDecoder {
    public get encoding(): 'utf-8' {
        return 'utf-8';
    }

    public constructor(encoding?: 'utf-8', options?: { fatal: boolean; ignoreBOM: boolean }) {}

    public decode(buffer: ArrayBuffer): string {
        return Buffer.from(buffer).toString('utf-8');
    }
}

export class WebView extends BaseObject<WebView, altClient.WebView> {
    public get focused(): boolean {
        return this.$raw.focused;
    }
    public set focused(value: boolean) {
        this.$raw.focused = value;
    }
    public get url(): string {
        return this.$raw.url;
    }
    public set url(value: string) {
        this.$raw.url = value;
    }
    public get visible(): boolean {
        return this.$raw.isVisible;
    }
    public set visible(value: boolean) {
        this.$raw.isVisible = value;
    }

    public get isOverlay(): boolean {
        return this.$raw.isOverlay;
    }
    public get isLoaded(): boolean {
        throw new Error('Not implemented');
    }
    public get isReady(): boolean {
        return this.$raw.isReady;
    }

    readonly listeners: ReadonlyMap<string, Array<(...args: unknown[]) => Promise<void> | void>>;

    public get size(): Vector2 {
        return new Vector2(this.$raw.size.x, this.$raw.size.y);
    }
    public set size(value: Vector2) {
        this.$raw.size = new altClient.Vector2(value.x, value.y);
    }
    public get pos(): Vector2 {
        return new Vector2(this.$raw.pos.x, this.$raw.pos.y);
    }
    public set pos(value: Vector2) {
        throw new Error('Not implemented');
    }

    readonly outputs: ReadonlyArray<AudioOutput>;

    emit(eventName: string, ...args: unknown[]): void {
        this.$raw.emit(eventName, ...args);
    }

    emitRaw(eventName: string, ...args: unknown[]): void {
        this.$raw.emit(eventName, ...args);
    }

    setExtraHeader(name: string, value: string): void {
        this.$raw.setExtraHeader(name, value);
    }
    setZoomLevel(value: number): void {
        this.$raw.setZoomLevel(value);
    }
    reload(ignoreCache: boolean): void {
        this.$raw.reload(ignoreCache);
    }

    addOutput(output: AudioOutput): void {
        this.$raw.addOutput(output.$raw);
    }
    removeOutput(output: AudioOutput): void {
        this.$raw.removeOutput(output.$raw);
    }

    on(eventName: string, listener: Events.CustomEventCallback<unknown[]>): void {
        this.$raw.on(eventName, listener);
    }

    once(eventName: string, listener: Events.CustomEventCallback<unknown[]>): void {
        this.$raw.once(eventName, listener);
    }

    off(eventName: string, listener: Events.CustomEventCallback<unknown[]>): void {
        this.$raw.off(eventName, listener);
    }

    static readonly all: Array<WebView> = [];
    static get isGpuAccelerationActive(): boolean {
        return altClient.WebView.gpuAccelerationActive;
    }

    static create(options: _WebViewCreateOptionsDrawable): WebView;
    static create(options: _WebViewCreateOptionsOverlay): WebView {
        const webView = new WebView();
        webView.$raw = new altClient.WebView(options.url, options.isOverlay, options.targetTexture);
        this.all.push(webView);
        return webView;
    }

    static getByID(id: number): WebView | null {
        const webView = altClient.WebView.getByID(id);
        if (!webView) return null;
        const instance = new WebView();
        instance.$raw = webView;
        return instance;
    }
}

export class ColShapeSphere extends ColShape<ColShapeSphere, altClient.ColshapeSphere> {
    public get radius(): number {
        return this.$raw.radius;
    }

    public static override create(opts: ColShapeSphereCreateOptions): ColShapeSphere {
        const colShape = new ColShapeSphere();
        colShape.$raw = new altClient.ColshapeSphere(opts.pos.x, opts.pos.y, opts.pos.z, opts.radius);
        this.all.push(colShape);
        return colShape;
    }
}

export class ColShapeCylinder extends ColShape<ColShapeCylinder, altClient.ColshapeCylinder> {
    public get radius(): number {
        return this.$raw.radius;
    }

    public get height(): number {
        return this.$raw.height;
    }

    public static override create(opts: ColShapeCylinderCreateOptions): ColShapeCylinder {
        const colShape = new ColShapeCylinder();
        colShape.$raw = new altClient.ColshapeCylinder(opts.pos.x, opts.pos.y, opts.pos.z, opts.radius, opts.height);
        this.all.push(colShape);
        return colShape;
    }
}

export class ColShapeCircle extends ColShape<ColShapeCircle, altClient.ColshapeCircle> {
    public get radius(): number {
        return this.$raw.radius;
    }

    public static override create(opts: ColShapeCircleCreateOptions): ColShapeCircle {
        const colShape = new ColShapeCircle();
        colShape.$raw = new altClient.ColshapeCircle(opts.pos.x, opts.pos.y, opts.radius);
        this.all.push(colShape);
        return colShape;
    }
}

export class ColShapeCuboid extends ColShape<ColShapeCuboid, altClient.ColshapeCuboid> {
    public get min(): Vector3 {
        return new Vector3(this.$raw.min.x, this.$raw.min.y, this.$raw.minZ);
    }

    public get max(): Vector3 {
        return new Vector3(this.$raw.max.x, this.$raw.max.y, this.$raw.maxZ);
    }

    public static override create(opts: ColShapeCuboidCreateOptions): ColShapeCuboid {
        const colShape = new ColShapeCuboid();
        colShape.$raw = new altClient.ColshapeCuboid(opts.pos1.x, opts.pos1.y, opts.pos1.z, opts.pos2.x, opts.pos2.y, opts.pos2.z);
        this.all.push(colShape);
        return colShape;
    }
}

export class ColShapeRectangle extends ColShape<ColShapeRectangle, altClient.ColshapeRectangle> {
    public get min(): Vector2 {
        return new Vector2(this.$raw.min.x, this.$raw.min.y);
    }

    public get max(): Vector2 {
        return new Vector2(this.$raw.max.x, this.$raw.max.y);
    }

    public static override create(opts: ColShapeRectangleCreateOptions): ColShapeRectangle {
        const colShape = new ColShapeRectangle();
        colShape.$raw = new altClient.ColshapeRectangle(opts.x1, opts.y1, opts.x2, opts.y2);
        this.all.push(colShape);
        return colShape;
    }
}

export class ColShapePolygon extends ColShape<ColShapePolygon, altClient.ColshapePolygon> {
    public get minZ(): number {
        return this.$raw.minZ;
    }

    public get maxZ(): number {
        return this.$raw.maxZ;
    }

    public get points(): Array<Vector2> {
        return this.$raw.points.map((point) => new Vector2(point.x, point.y));
    }

    public static override create(opts: ColShapePolygonCreateOptions): ColShapePolygon {
        const colShape = new ColShapePolygon();
        colShape.$raw = new altClient.ColshapePolygon(opts.minZ, opts.maxZ, opts.points);
        this.all.push(colShape);
        return colShape;
    }
}

export class RPCHandler {
    public readonly name: string;
    public readonly handler: (...args: unknown[]) => Promise<any> | any;
    public readonly valid: boolean;

    public destroy(): void;
}
