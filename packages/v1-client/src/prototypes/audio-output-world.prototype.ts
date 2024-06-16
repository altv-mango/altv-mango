import type { AudioOutputWorldCreateOptions } from '@altv/client';
import * as alt from 'alt-client';

// @ts-ignore
alt.AudioOutputWorld.create = function (options: AudioOutputWorldCreateOptions) {
    return new alt.AudioOutputWorld(options.pos, options.categoryHash);
};

// @ts-ignore
alt.AudioOutputWorld.setFactory = function (factory: typeof alt.AudioOutputWorld) {
    alt.logWarning(`AudioOutputWorld.setFactory is not implemented yet.`);
};

// @ts-ignore
alt.AudioOutputWorld.getFactory = function () {
    return alt.AudioOutputWorld;
};
