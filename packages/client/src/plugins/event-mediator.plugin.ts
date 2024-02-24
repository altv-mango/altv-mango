import { inject, injectable } from 'inversify';
import type { MangoPlugin } from '@altv-mango/shared/app';
import { EVENT_SERVICE } from '@altv-mango/shared';
import type { ClientEventService, ClientWebViewService } from '../services';
import { WEBVIEW_SERVICE } from '../constants';

@injectable()
export class EventMediatorPlugin implements MangoPlugin {
    @inject(EVENT_SERVICE) private readonly eventService: ClientEventService;
    @inject(WEBVIEW_SERVICE) private readonly webViewService: ClientWebViewService;

    public beforeCreate() {
        this.eventService.onServer('SERVER::EMIT_WEBVIEW', (body) => {
            this.webViewService.get(body.id)?.emit(`WEBVIEW::ON_SERVER_${body.eventName}`, body.payload);
        });

        this.webViewService.$onCreate((id, webView) => {
            webView.on('WEBVIEW::EMIT_SERVER', (...params: unknown[]) => {
                const data = params[0] as { eventName: string; payload: Record<string, unknown> };
                const { eventName, payload } = data;
                this.eventService.emitServer(`SERVER::ON_WEBVIEW_${eventName}_${id}`, payload);
            });
        });
    }
}
