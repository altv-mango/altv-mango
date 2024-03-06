import { createEventDecorator } from '@altv-mango/core';

export function OnServer(eventName?: string) {
    return createEventDecorator('onServer', eventName);
}
