import type { AreaBlipCreateOptions, Enums, PointBlipCreateOptions, RadiusBlipCreateOptions } from '@altv/client';
import * as alt from 'alt-client';
import { BlipType } from '../enums';

Object.defineProperty(alt.Blip.prototype, 'global', {
    get() {
        return (<alt.Blip>this).isGlobal;
    },
});

Object.defineProperty(alt.Blip.prototype, 'scaleXY', {
    get() {
        const scale: number = (<alt.Blip>this).scale;
        return new alt.Vector2(scale, scale);
    },
    set(value: alt.Vector2) {
        (<alt.Blip>this).scale = value.x;
    },
});

Object.defineProperty(alt.Blip.prototype, 'friendly', {
    get() {
        return (<alt.Blip>this).isFriendly;
    },
    set(value: boolean) {
        (<alt.Blip>this).isFriendly = value;
    },
});

Object.defineProperty(alt.Blip.prototype, 'rotation', {
    get() {
        alt.logWarning('Blip.prototype.rotation is not implemented yet.');
        return 0;
    },
    set(_value: number) {
        alt.logWarning('Blip.prototype.rotation is not implemented yet.');
    },
});

Object.defineProperty(alt.Blip.prototype, 'missionCreator', {
    get() {
        return (<alt.Blip>this).asMissionCreator;
    },
    set(value: boolean) {
        (<alt.Blip>this).asMissionCreator = value;
    },
});

Object.defineProperty(alt.Blip.prototype, 'hiddenOnLegend', {
    get() {
        return (<alt.Blip>this).isHiddenOnLegend;
    },
    set(value: boolean) {
        (<alt.Blip>this).isHiddenOnLegend = value;
    },
});

Object.defineProperty(alt.Blip.prototype, 'minimalOnEdge', {
    get() {
        return (<alt.Blip>this).isMinimalOnEdge;
    },
    set(value: boolean) {
        (<alt.Blip>this).isMinimalOnEdge = value;
    },
});

Object.defineProperty(alt.Blip.prototype, 'shortHeightThreshold', {
    get() {
        return (<alt.Blip>this).isShortHeightThreshold;
    },
    set(value: boolean) {
        (<alt.Blip>this).isShortHeightThreshold = value;
    },
});

type BlipCreateOptions =
    | ({ blipType: Enums.BlipType.AREA } & AreaBlipCreateOptions)
    | ({ blipType: Enums.BlipType.RADIUS } & RadiusBlipCreateOptions)
    | ({ blipType: Enums.BlipType.DESTINATION } & PointBlipCreateOptions);

// @ts-ignore
alt.Blip.create = function (options: BlipCreateOptions) {
    if (options.blipType === BlipType.AREA) {
        return new alt.AreaBlip(options.pos.x, options.pos.y, options.pos.z, options.scale.x, options.scale.y);
    }

    if (options.blipType === BlipType.RADIUS) {
        return new alt.RadiusBlip(options.pos.x, options.pos.y, options.pos.z, options.radius);
    }

    if (options.blipType === BlipType.DESTINATION) {
        const pos = options.pos ? options.pos : options.entity.pos;
        return new alt.PointBlip(pos.x, pos.y, pos.z);
    }

    throw new Error('Invalid BlipType');
};

// @ts-ignore
alt.Blip.setFactory = function (factory: typeof alt.Blip) {
    alt.logWarning(`Blip.setFactory is not implemented yet.`);
};

// @ts-ignore
alt.Blip.getFactory = function () {
    return alt.Blip;
};
