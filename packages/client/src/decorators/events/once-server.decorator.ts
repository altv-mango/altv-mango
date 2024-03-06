import { createEventDecorator } from '@altv-mango/core';

export function OnceServer(eventName?: string) {
    return createEventDecorator('onceServer', eventName);
}
