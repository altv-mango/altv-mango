import { AppBuilder, AppEnviroment, createAppBuilder as $createAppBuilder } from '@altv-mango/core/app';
import { ADD_WEBVIEW } from './constants';
import { EventMediatorPlugin, RPCPlugin, ServiceBinderPlugin, WebViewPlugin } from './plugins';
import type {
    ClientMultiplayerService,
    ErrorFilter,
    Guard,
    Interceptor,
    MultiplayerWebViewCreateOptionsDrawable,
    MultiplayerWebViewCreateOptionsOverlay,
} from './interfaces';

const sharedV1 = await import('alt-shared').catch(() => false);
const multiplayerService: ClientMultiplayerService =
    sharedV1 !== false && typeof sharedV1 !== 'boolean'
        ? new ClientAltMultiplayerServceV1(sharedV1.default, (await import('alt-client')).default)
        : new ClientAltMultiplayerServceV2(await import('@altv/shared'), await import('@altv/client'));

class ClientAppBuilder extends AppBuilder<Guard, Interceptor, ErrorFilter> {
    public addWebView(id: string | number, options: MultiplayerWebViewCreateOptionsDrawable): ClientAppBuilder;
    public addWebView(id: string | number, options: MultiplayerWebViewCreateOptionsOverlay): ClientAppBuilder;
    public addWebView(id: string | number, options: MultiplayerWebViewCreateOptionsOverlay) {
        const addWebViews = this.internalAppContainer.isBound(ADD_WEBVIEW)
            ? this.internalAppContainer.get<
                  {
                      id: string | number;
                      options: MultiplayerWebViewCreateOptionsDrawable | MultiplayerWebViewCreateOptionsOverlay;
                  }[]
              >(ADD_WEBVIEW)
            : [];
        if (this.internalAppContainer.isBound(ADD_WEBVIEW)) {
            this.internalAppContainer.rebind(ADD_WEBVIEW).toConstantValue([...addWebViews, { id, options }]);
        } else {
            this.internalAppContainer.bind(ADD_WEBVIEW).toConstantValue([{ id, options }]);
        }
        return this;
    }

    public setAudioFactory(factory: unknown) {
        multiplayerService.setAudioFactory(factory);
    }

    public setAudioFilterFactory(factory: unknown) {
        multiplayerService.setAudioFilterFactory(factory);
    }

    public setAudioOutputAttachedFactory(factory: unknown) {
        multiplayerService.setAudioOutputAttachedFactory(factory);
    }

    public setAudioOutputFrontendFactory(factory: unknown) {
        multiplayerService.setAudioOutputFrontendFactory(factory);
    }

    public setAudioOutputWorldFactory(factory: unknown) {
        multiplayerService.setAudioOutputWorldFactory(factory);
    }

    public setBlipFactory(factory: unknown) {
        multiplayerService.setBlipFactory(factory);
    }

    public setMarkerFactory(factory: unknown) {
        multiplayerService.setMarkerFactory(factory);
    }

    public setColShapeFactory(factory: unknown) {
        multiplayerService.setColshapeFactory(factory);
    }

    public setCheckpointFactory(factory: unknown) {
        multiplayerService.setCheckpointFactory(factory);
    }

    public setObjectFactory(factory: unknown) {
        multiplayerService.setObjectFactory(factory);
    }

    public setLocalObjectFactory(factory: unknown) {
        multiplayerService.setLocalObjectFactory(factory);
    }

    public setPedFactory(factory: unknown) {
        multiplayerService.setPedFactory(factory);
    }

    public setLocalPedFactory(factory: unknown) {
        multiplayerService.setLocalPedFactory(factory);
    }

    public setLocalPlayerFactory(factory: unknown) {
        multiplayerService.setLocalPlayerFactory(factory);
    }

    public setLocalVehicleFactory(factory: unknown) {
        multiplayerService.setLocalVehicleFactory(factory);
    }

    public setPlayerFactory(factory: unknown) {
        multiplayerService.setPlayerFactory(factory);
    }

    public setRmlDocumentFactory(factory: unknown) {
        multiplayerService.setRmlDocumentFactory(factory);
    }

    public setTextLabelFactory(factory: unknown) {
        multiplayerService.setTextLabelFactory(factory);
    }

    public setVehicleFactory(factory: unknown) {
        multiplayerService.setVehicleFactory(factory);
    }

    public setVirtualEntityGroupFactory(factory: unknown) {
        multiplayerService.setVirtualEntityGroupFactory(factory);
    }

    public setVirtualEntityFactory(factory: unknown) {
        multiplayerService.setVirtualEntityFactory(factory);
    }

    public setWebSocketClientFactory(factory: unknown) {
        multiplayerService.setWebSocketClientFactory(factory);
    }

    public setWebViewFactory(factory: unknown) {
        multiplayerService.setWebViewFactory(factory);
    }
}

export async function createAppBuilder() {
    return await $createAppBuilder({
        enviroment: AppEnviroment.Client,
        plugins: [ServiceBinderPlugin, EventMediatorPlugin, RPCPlugin, WebViewPlugin],
        multiplayerService,
        appBuilderInherit: ClientAppBuilder,
    });
}

export * from './exports';

import './extension.d.ts';import { ClientAltMultiplayerServceV1, ClientAltMultiplayerServceV2 } from './multiplayer';

