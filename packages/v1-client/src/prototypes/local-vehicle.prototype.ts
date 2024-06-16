import type { LocalVehicleCreateOptions } from '@altv/client';
import * as alt from 'alt-client';

// @ts-ignore
alt.LocalVehicle.prototype.create = function (options: LocalVehicleCreateOptions) {
    return new alt.LocalVehicle(
        options.model,
        options.dimension,
        options.pos,
        options.rot,
        options.useStreaming as true,
        options.streamingDistance ?? 0,
    );
};

// @ts-ignore
alt.LocalVehicle.prototype.setFactory = function (factory: typeof alt.LocalVehicle) {
    alt.logWarning(`LocalVehicle.setFactory is not implemented yet.`);
};

// @ts-ignore
alt.LocalVehicle.prototype.getFactory = function () {
    return alt.LocalVehicle;
};
