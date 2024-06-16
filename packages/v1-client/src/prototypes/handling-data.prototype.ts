import * as alt from 'alt-client';

// @ts-ignore
alt.HandlingData.get = function (modelHash: number | string) {
    if (typeof modelHash === 'string') modelHash = alt.hash(modelHash);
    return alt.HandlingData.getForHandlingName(modelHash);
};
