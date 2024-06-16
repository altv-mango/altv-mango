import * as alt from 'alt-client';

Object.defineProperty(alt.RmlElement.prototype, 'listeners', {
    get: function () {
        alt.logWarning(`RmlElement.listeners is not implemented yet, please use getEventListeners instead.`);
        return {};
    },
    set: function () {
        alt.logWarning(`RmlElement.listeners is not implemented yet, please use getEventListeners instead.`);
    },
});

Object.defineProperty(alt.RmlElement.prototype, 'rmlID', {
    get: function () {
        return (<alt.RmlElement>this).rmlId;
    },
    set: function (value: string) {
        (<alt.RmlElement>this).rmlId = value;
    },
});
Object.defineProperty(alt.RmlElement.prototype, 'attributes', {
    get: function () {
        return (<alt.RmlElement>this).getAttributes();
    },
});

Object.defineProperty(alt.RmlElement.prototype, 'classList', {
    get: function () {
        return (<alt.RmlElement>this).getClassList();
    },
});

Object.defineProperty(alt.RmlElement.prototype, 'pseudoClassList', {
    get: function () {
        return (<alt.RmlElement>this).getPseudoClassList();
    },
});

// @ts-ignore
alt.RmlElement.prototype.getClosest = function (selector: string) {
    return (<alt.RmlElement>this).closest(selector);
};

// @ts-ignore
alt.RmlDocument.prototype.getChild = function (id: number) {
    return (<alt.RmlDocument>this).childNodes[id];
};
