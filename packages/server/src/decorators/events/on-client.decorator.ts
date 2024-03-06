import { createEventDecorator } from '@altv-mango/core';

export function OnPlayer(eventName: string) {
    return createEventDecorator('onPlayer', eventName);
}
