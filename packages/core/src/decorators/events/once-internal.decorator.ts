import { createEventDecorator } from '../create-event-decorator';

export function OnceInternal(eventName: string) {
    return createEventDecorator('onceInternal', eventName);
}
