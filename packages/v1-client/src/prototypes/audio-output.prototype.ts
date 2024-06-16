import * as alt from 'alt-client';

Object.defineProperty(alt.Audio.prototype, 'owner', {
    get: function () {
        alt.logWarning('Audio.owner is not implemented yet');
        return undefined;
    },
});
