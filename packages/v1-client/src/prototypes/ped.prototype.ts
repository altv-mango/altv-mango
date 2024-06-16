import * as alt from 'alt-client';

// @ts-ignore
alt.Ped.setFactory = function (factory: typeof alt.Ped) {
    alt.logWarning(`Ped.setFactory is not implemented yet.`);
};

// @ts-ignore
alt.Ped.getFactory = function () {
    return alt.Ped;
};
