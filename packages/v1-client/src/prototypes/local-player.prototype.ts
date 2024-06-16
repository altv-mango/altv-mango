import * as alt from 'alt-client';

// @ts-ignore
alt.LocalPlayer.prototype.setFactory = function (factory: typeof alt.LocalPlayer) {
    alt.logWarning(`LocalPlayer.setFactory is not implemented yet.`);
};

// @ts-ignore
alt.LocalPlayer.prototype.getFactory = function () {
    return alt.LocalPlayer;
};
