import type { AudioFilterCreateOptions } from '@altv/client';
import * as alt from 'alt-client';

// @ts-ignore
alt.AudioFilter.create = function (options: AudioFilterCreateOptions) {
    return new alt.AudioFilter(options.hash as string);
};

// @ts-ignore
alt.AudioFilter.setFactory = function (factory: typeof alt.AudioFilter) {
    alt.logWarning(`AudioFilter.setFactory is not implemented yet.`);
};

// @ts-ignore
alt.AudioFilter.getFactory = function () {
    return alt.AudioFilter;
};
