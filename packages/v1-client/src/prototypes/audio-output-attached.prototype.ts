import type { AudioOutputAttachedCreateOptions } from '@altv/client';
import * as alt from 'alt-client';

// @ts-ignore
alt.AudioOutputAttached.create = function (options: AudioOutputAttachedCreateOptions) {
    return new alt.AudioOutputAttached(options.entity as unknown as alt.Entity, options.categoryHash);
};

// @ts-ignore
alt.AudioOutputAttached.setFactory = function (factory: typeof alt.AudioOutputAttached) {
    alt.logWarning(`AudioOutputAttached.setFactory is not implemented yet.`);
};

// @ts-ignore
alt.AudioOutputAttached.getFactory = function () {
    return alt.AudioOutputAttached;
};
