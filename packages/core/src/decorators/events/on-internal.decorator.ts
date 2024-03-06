import { createEventDecorator } from '../create-event-decorator';

export function OnInternal(eventName: string) {
    return createEventDecorator('onInternal', eventName);
}
