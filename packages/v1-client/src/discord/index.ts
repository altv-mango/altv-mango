import * as alt from 'alt-client';

export const Discord = Object.defineProperties(
    {
        requestOAuth2Token(appId: string) {
            return alt.Discord.requestOAuth2Token(appId);
        },
    },
    {
        isReady: {
            get() {
                return alt.Discord.currentUser !== null;
            },
        },
        userID: {
            get() {
                return alt.Discord.currentUser?.id;
            },
        },
        userName: {
            get() {
                return alt.Discord.currentUser?.name;
            },
        },
        discriminator: {
            get() {
                return alt.Discord.currentUser?.discriminator;
            },
        },
        avatar: {
            get() {
                return alt.Discord.currentUser?.avatar;
            },
        },
    },
);
