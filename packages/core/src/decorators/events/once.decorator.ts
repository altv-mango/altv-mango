import { createEventDecorator } from '../create-event-decorator';

export function Once(eventName?: string) {
    return createEventDecorator('once', eventName);
}
