import * as alt from 'alt-client';

// @ts-ignore
alt.Object.setFactory = function (factory: typeof alt.Object) {
    alt.logWarning(`Object.setFactory is not implemented yet.`);
};

// @ts-ignore
alt.Object.getFactory = function () {
    return alt.Object;
};
