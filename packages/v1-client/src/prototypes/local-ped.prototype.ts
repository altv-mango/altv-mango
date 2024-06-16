import type { LocalPedCreateOptions } from '@altv/client';
import * as alt from 'alt-client';

// @ts-ignore
alt.LocalPed.create = function (options: LocalPedCreateOptions) {
    return new alt.LocalPed(
        options.model,
        options.dimension,
        options.pos,
        new alt.Vector3(0, 0, options.heading ?? 0),
        options.useStreaming as true,
        options.streamingDistance ?? 0,
    );
};

// @ts-ignore
alt.LocalPed.setFactory = function (factory: typeof alt.LocalPed) {
    alt.logWarning(`LocalPed.setFactory is not implemented yet.`);
};

// @ts-ignore
alt.LocalPed.getFactory = function () {
    return alt.LocalPed;
};
