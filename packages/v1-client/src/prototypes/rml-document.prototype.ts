import type { RmlDocumentCreateOptions } from '@altv/client';
import * as alt from 'alt-client';

// @ts-ignore
alt.RmlDocument.prototype.create = function (options: RmlDocumentCreateOptions) {
    return new alt.RmlDocument(options.url);
};

// @ts-ignore
alt.RmlDocument.prototype.setFactory = function (factory: typeof alt.RmlDocument) {
    alt.logWarning(`RmlDocument.setFactory is not implemented yet.`);
};

// @ts-ignore
alt.RmlDocument.prototype.getFactory = function () {
    return alt.RmlDocument;
};
