import '@abraham/reflection';
import { AppBuilder, AppEnviroment, createAppBuilder as $createAppBuilder } from '@altv-mango/core/app';
import { ADD_WEBVIEW } from './constants';
import { EventMediatorPlugin, RPCPlugin, ServiceBinderPlugin, WebViewPlugin } from './plugins';
import * as altClient from '@altv/client';
import type { ErrorFilter, Guard, Interceptor } from './interfaces';

class ClientAppBuilder extends AppBuilder<Guard, Interceptor, ErrorFilter> {
    public addWebView(id: string | number, options: altClient._WebViewCreateOptionsDrawable): void;
    public addWebView(id: string | number, options: altClient._WebViewCreateOptionsOverlay): void;
    public addWebView(id: string | number, options: altClient._WebViewCreateOptionsOverlay) {
        const addWebViews = this.internalAppContainer.isBound(ADD_WEBVIEW)
            ? this.internalAppContainer.get<
                  {
                      id: string | number;
                      options: altClient._WebViewCreateOptionsDrawable | altClient._WebViewCreateOptionsOverlay;
                  }[]
              >(ADD_WEBVIEW)
            : [];
        if (this.internalAppContainer.isBound(ADD_WEBVIEW)) {
            this.internalAppContainer.rebind(ADD_WEBVIEW).toConstantValue([...addWebViews, { id, options }]);
        } else {
            this.internalAppContainer.bind(ADD_WEBVIEW).toConstantValue([{ id, options }]);
        }
    }

    public setAudioFactory(factory: typeof altClient.Audio) {
        altClient.Audio.setFactory(factory);
    }

    public setAudioFilterFactory(factory: typeof altClient.AudioFilter) {
        altClient.AudioFilter.setFactory(factory);
    }

    public setAudioOutputAttachedFactory(factory: typeof altClient.AudioOutputAttached) {
        altClient.AudioOutputAttached.setFactory(factory);
    }

    public setAudioOutputFrontendFactory(factory: typeof altClient.AudioOutputFrontend) {
        altClient.AudioOutputFrontend.setFactory(factory);
    }

    public setAudioOutputWorldFactory(factory: typeof altClient.AudioOutputWorld) {
        altClient.AudioOutputWorld.setFactory(factory);
    }

    public setBlipFactory(factory: typeof altClient.Blip) {
        altClient.Blip.setFactory(factory);
    }

    public setMarkerFactory(factory: typeof altClient.Marker) {
        altClient.Marker.setFactory(factory);
    }

    public setColShapeFactory(factory: typeof altClient.ColShape) {
        altClient.ColShape.setFactory(factory);
    }

    public setCheckpointFactory(factory: typeof altClient.Checkpoint) {
        altClient.Checkpoint.setFactory(factory);
    }

    public setObjectFactory(factory: typeof altClient.Object) {
        altClient.Object.setFactory(factory);
    }

    public setLocalObjectFactory(factory: typeof altClient.LocalObject) {
        altClient.LocalObject.setFactory(factory);
    }

    public setPedFactory(factory: typeof altClient.Ped) {
        altClient.Ped.setFactory(factory);
    }

    public setLocalPedFactory(factory: typeof altClient.LocalPed) {
        altClient.LocalPed.setFactory(factory);
    }

    public setLocalPlayerFactory(factory: typeof altClient.LocalPlayer) {
        altClient.LocalPlayer.setFactory(factory);
    }

    public setLocalVehicleFactory(factory: typeof altClient.LocalVehicle) {
        altClient.LocalVehicle.setFactory(factory);
    }

    public setPlayerFactory(factory: typeof altClient.Player) {
        altClient.Player.setFactory(factory);
    }

    public setRmlDocumentFactory(factory: typeof altClient.RmlDocument) {
        altClient.RmlDocument.setFactory(factory);
    }

    public setTextLabelFactory(factory: typeof altClient.TextLabel) {
        altClient.TextLabel.setFactory(factory);
    }

    public setVehicleFactory(factory: typeof altClient.Vehicle) {
        altClient.Vehicle.setFactory(factory);
    }

    public setVirtualEntityGroupFactory(factory: typeof altClient.VirtualEntityGroup) {
        altClient.VirtualEntityGroup.setFactory(factory);
    }

    public setVirtualEntityFactory(factory: typeof altClient.VirtualEntity) {
        altClient.VirtualEntity.setFactory(factory);
    }

    public setWebSocketClientFactory(factory: typeof altClient.WebSocketClient) {
        altClient.WebSocketClient.setFactory(factory);
    }

    public setWebViewFactory(factory: typeof altClient.WebView) {
        altClient.WebView.setFactory(factory);
    }
}

export async function createAppBuilder() {
    return await $createAppBuilder({
        enviroment: AppEnviroment.Client,
        plugins: [ServiceBinderPlugin, EventMediatorPlugin, RPCPlugin, WebViewPlugin],
        appBuilderInherit: ClientAppBuilder,
    });
}

export * from './exports';
