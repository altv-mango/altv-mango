import { createEventDecorator } from '../create-event-decorator';

export function On(eventName?: string) {
    return createEventDecorator('on', eventName);
}
