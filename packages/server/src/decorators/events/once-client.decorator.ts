import { createEventDecorator } from '@altv-mango/core';

export function OncePlayer(eventName?: string) {
    return createEventDecorator('oncePlayer', eventName);
}
