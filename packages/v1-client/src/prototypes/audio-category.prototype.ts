import * as alt from 'alt-client';

// @ts-ignore
alt.AudioCategory.get = function (name: string) {
    return alt.AudioCategory.getForName(name);
};
