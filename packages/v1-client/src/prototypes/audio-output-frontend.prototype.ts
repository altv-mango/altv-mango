import type { AudioOutputFrontendCreateOptions } from '@altv/client';
import * as alt from 'alt-client';

// @ts-ignore
alt.AudioOutputFrontend.create = function (options: AudioOutputFrontendCreateOptions) {
    return new alt.AudioOutputFrontend(options.categoryHash);
};

// @ts-ignore
alt.AudioOutputFrontend.setFactory = function (factory: typeof alt.AudioOutputFrontend) {
    alt.logWarning(`AudioOutputFrontend.setFactory is not implemented yet.`);
};

// @ts-ignore
alt.AudioOutputFrontend.getFactory = function () {
    return alt.AudioOutputFrontend;
};
