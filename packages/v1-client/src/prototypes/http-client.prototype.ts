import * as alt from 'alt-client';

Object.defineProperty(alt.HttpClient.prototype, 'extraHeaders', {
    get: function () {
        return (<alt.HttpClient>this).getExtraHeaders();
    },
    set: function (value: Record<string, string>) {
        for (const key in value) {
            (<alt.HttpClient>this).setExtraHeader(key, value[key]!);
        }
    },
});

// @ts-ignore
alt.HttpClient.create = function () {
    return new alt.HttpClient();
};
