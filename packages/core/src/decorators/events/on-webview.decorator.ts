import { createEventDecorator } from '../create-event-decorator';

export function OnWebView(id: string | number, eventName?: string) {
    return createEventDecorator('onWebView', eventName, id);
}
