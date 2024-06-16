import type { TextLabelCreateOptions } from '@altv/client';
import * as alt from 'alt-client';

Object.defineProperty(alt.TextLabel.prototype, 'textAlign', {
    get: function () {
        return (<alt.TextLabel>this).align;
    },
    set: function (value: number) {
        (<alt.TextLabel>this).align = value;
    },
});

// @ts-ignore
alt.TextLabel.prototype.create = function (options: TextLabelCreateOptions) {
    return new alt.TextLabel(
        options.text,
        options.fontName,
        options.fontSize,
        options.fontScale ?? 1,
        options.pos,
        options.rot as unknown as alt.Vector3,
        options.color as unknown as alt.RGBA,
        options.outlineWidth ?? 0,
        options.outlineColor as unknown as alt.RGBA,
        options.useStreaming,
        options.streamingDistance,
    );
};

// @ts-ignore
alt.TextLabel.prototype.setFactory = function (factory: typeof alt.TextLabel) {
    alt.logWarning(`TextLabel.setFactory is not implemented yet.`);
};

// @ts-ignore
alt.TextLabel.prototype.getFactory = function () {
    return alt.TextLabel;
};
