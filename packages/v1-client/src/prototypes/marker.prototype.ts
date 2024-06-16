import type { MarkerCreateOptions } from '@altv/client';
import * as alt from 'alt-client';

Object.defineProperty(alt.Marker.prototype, 'direction', {
    get() {
        return (<alt.Marker>this).dir;
    },
    set(value: alt.Vector3) {
        (<alt.Marker>this).dir = value;
    },
});

Object.defineProperty(alt.Marker.prototype, 'rotating', {
    get() {
        return (<alt.Marker>this).rotate;
    },
    set(value: boolean) {
        (<alt.Marker>this).rotate = value;
    },
});

Object.defineProperty(alt.Marker.prototype, 'bobUpDown', {
    get() {
        return (<alt.Marker>this).bobUpAndDown;
    },
    set(value: boolean) {
        (<alt.Marker>this).bobUpAndDown = value;
    },
});

// @ts-ignore
alt.Marker.create = function (options: MarkerCreateOptions) {
    return new alt.Marker(
        options.type as any,
        options.pos as alt.Vector3,
        options.color as alt.RGBA,
        (options.useStreaming as true) ?? (false as true),
        options.streamingDistance ?? 0,
    );
};

// @ts-ignore
alt.Marker.setFactory = function (factory: typeof alt.Marker) {
    alt.logWarning(`Marker.setFactory is not implemented yet.`);
};

// @ts-ignore
alt.Marker.getFactory = function () {
    return alt.Marker;
};
