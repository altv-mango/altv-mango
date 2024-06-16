import type { AudioCreateOptions } from '@altv/client';
import * as alt from 'alt-client';

Object.defineProperty(alt.Audio.prototype, 'loop', {
    get: function () {
        return (<alt.Audio>this).looped;
    },
    set: function (value: boolean) {
        (<alt.Audio>this).looped = value;
    },
});

Object.defineProperty(alt.Audio.prototype, 'outputs', {
    get: function () {
        return (<alt.Audio>this).getOutputs();
    },
});

Object.defineProperty(alt.Audio.prototype, 'isPlaying', {
    get: function () {
        return (<alt.Audio>this).playing;
    },
});

// @ts-ignore
alt.Audio.prototype.once = function (_eventName: string, _func: (...args: unknown[]) => void) {
    alt.logWarning('Audio.once is not implemented yet');
};

// @ts-ignore
alt.Audio.prototype.off = function (_eventName: string, _func: (...args: unknown[]) => void) {
    alt.logWarning('Audio.off is not implemented yet');
};

// @ts-ignore
alt.Audio.create = function (options: AudioCreateOptions) {
    return new alt.Audio(options.source, options.volume, options.radio, options.clearCache);
};

// @ts-ignore
alt.Audio.setFactory = function (factory: typeof alt.Audio) {
    alt.logWarning(`Audio.setFactory is not implemented yet.`);
};

// @ts-ignore
alt.Audio.getFactory = function () {
    return alt.Audio;
};
