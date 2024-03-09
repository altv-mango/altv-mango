import { inject, injectable } from 'inversify';
import type { MangoPlugin } from '@altv-mango/core/app';
import { EVENT_SERVICE, LOGGER_SERVICE } from '@altv-mango/core';
import type { ClientEventService, ClientLoggerService, ClientWebViewService } from '../services';
import { WEBVIEW_SERVICE } from '../constants';

@injectable()
export class EventMediatorPlugin implements MangoPlugin {
    @inject(EVENT_SERVICE) private readonly eventService: ClientEventService;
    @inject(WEBVIEW_SERVICE) private readonly webViewService: ClientWebViewService;
    @inject(LOGGER_SERVICE) private readonly loggerService: ClientLoggerService;

    public beforeLoad() {
        const time = Date.now();

        this.eventService.onServer('SERVER::EMIT_WEBVIEW', (body) => {
            this.webViewService.get(body.id)?.emit(`WEBVIEW::ON_SERVER_${body.eventName}`, body.payload);
        });

        this.webViewService.$onCreate((id, webView) => {
            webView.on('WEBVIEW::EMIT_SERVER', (body) => {
                this.eventService.emitServer(`SERVER::ON_WEBVIEW_${body.eventName}_${id}`, body.payload);
            });
        });

        this.loggerService.log(`~lw~Event mediator methods defined ~lk~(${Date.now() - time}ms)`);
    }
}
