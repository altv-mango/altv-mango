import type { LocalObjectCreateOptions } from '@altv/client';
import * as alt from 'alt-client';

Object.defineProperty(alt.LocalObject.prototype, 'isDynamic', {
    get() {
        return this.dynamic;
    },
});

// @ts-ignore
alt.LocalObject.prototype.attachTo = function (
    target: number | alt.Entity,
    boneIndex: number,
    pos: alt.Vector3,
    rot: alt.Vector3,
    useSoftPinning: boolean,
    collision: boolean,
    fixedRot: boolean,
) {
    if (typeof target === 'number') {
        target = alt.Entity.getByID(19, target) as alt.LocalObject;
    }

    (<alt.LocalObject>this).attachToEntity(target, boneIndex, pos, rot, useSoftPinning, collision, fixedRot);
};

// @ts-ignore
alt.LocalObject.create = function (options: LocalObjectCreateOptions) {
    return new alt.LocalObject(
        options.model,
        options.pos as unknown as alt.Vector3,
        options.rot as unknown as alt.Vector3,
        options.noOffset,
        options.dynamic,
        options.useStreaming,
        options.streamingDistance,
    );
};

// @ts-ignore
alt.LocalObject.setFactory = function (factory: typeof alt.LocalObject) {
    alt.logWarning(`LocalObject.setFactory is not implemented yet.`);
};

// @ts-ignore
alt.LocalObject.getFactory = function () {
    return alt.LocalObject;
};
