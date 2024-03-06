import { createEventDecorator } from '../create-event-decorator';

export function OnceWebView(id: string | number, eventName?: string) {
    return createEventDecorator('onceWebView', eventName, id);
}
