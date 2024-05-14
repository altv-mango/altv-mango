import { AppBuilder, AppEnviroment, createAppBuilder as $createAppBuilder } from '@altv-mango/core/app';
import { ADD_WEBVIEW } from './constants';
import { EventMediatorPlugin, RPCPlugin, ServiceBinderPlugin, WebViewPlugin } from './plugins';
// import {
// Audio,
// AudioFilter,
// AudioOutputAttached,
// AudioOutputFrontend,
// AudioOutputWorld,
// Blip,
// Checkpoint,
// ColShape,
// LocalObject,
// LocalPed,
// LocalPlayer,
// LocalVehicle,
// Marker,
// Object,
// Ped,
// Player,
// RmlDocument,
// TextLabel,
// Vehicle,
// VirtualEntity,
// VirtualEntityGroup,
// WebSocketClient,
// WebView,
// } from '@altv/client';
import type {
    ErrorFilter,
    Guard,
    Interceptor,
    MultiplayerWebViewCreateOptionsDrawable,
    MultiplayerWebViewCreateOptionsOverlay,
} from './interfaces';

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

    // public setAudioFactory(factory: typeof Audio) {
    //     Audio.setFactory(factory);
    // }

    // public setAudioFilterFactory(factory: typeof AudioFilter) {
    //     AudioFilter.setFactory(factory);
    // }

    // public setAudioOutputAttachedFactory(factory: typeof AudioOutputAttached) {
    //     AudioOutputAttached.setFactory(factory);
    // }

    // public setAudioOutputFrontendFactory(factory: typeof AudioOutputFrontend) {
    //     AudioOutputFrontend.setFactory(factory);
    // }

    // public setAudioOutputWorldFactory(factory: typeof AudioOutputWorld) {
    //     AudioOutputWorld.setFactory(factory);
    // }

    // public setBlipFactory(factory: typeof Blip) {
    //     Blip.setFactory(factory);
    // }

    // public setMarkerFactory(factory: typeof Marker) {
    //     Marker.setFactory(factory);
    // }

    // public setColShapeFactory(factory: typeof ColShape) {
    //     ColShape.setFactory(factory);
    // }

    // public setCheckpointFactory(factory: typeof Checkpoint) {
    //     Checkpoint.setFactory(factory);
    // }

    // public setObjectFactory(factory: typeof Object) {
    //     Object.setFactory(factory);
    // }

    // public setLocalObjectFactory(factory: typeof LocalObject) {
    //     LocalObject.setFactory(factory);
    // }

    // public setPedFactory(factory: typeof Ped) {
    //     Ped.setFactory(factory);
    // }

    // public setLocalPedFactory(factory: typeof LocalPed) {
    //     LocalPed.setFactory(factory);
    // }

    // public setLocalPlayerFactory(factory: typeof LocalPlayer) {
    //     LocalPlayer.setFactory(factory);
    // }

    // public setLocalVehicleFactory(factory: typeof LocalVehicle) {
    //     LocalVehicle.setFactory(factory);
    // }

    // public setPlayerFactory(factory: typeof Player) {
    //     Player.setFactory(factory);
    // }

    // public setRmlDocumentFactory(factory: typeof RmlDocument) {
    //     RmlDocument.setFactory(factory);
    // }

    // public setTextLabelFactory(factory: typeof TextLabel) {
    //     TextLabel.setFactory(factory);
    // }

    // public setVehicleFactory(factory: typeof Vehicle) {
    //     Vehicle.setFactory(factory);
    // }

    // public setVirtualEntityGroupFactory(factory: typeof VirtualEntityGroup) {
    //     VirtualEntityGroup.setFactory(factory);
    // }

    // public setVirtualEntityFactory(factory: typeof VirtualEntity) {
    //     VirtualEntity.setFactory(factory);
    // }

    // public setWebSocketClientFactory(factory: typeof WebSocketClient) {
    //     WebSocketClient.setFactory(factory);
    // }

    // public setWebViewFactory(factory: typeof WebView) {
    //     WebView.setFactory(factory);
    // }
}

export async function createAppBuilder() {
    return await $createAppBuilder({
        enviroment: AppEnviroment.Client,
        plugins: [ServiceBinderPlugin, EventMediatorPlugin, RPCPlugin, WebViewPlugin],
        appBuilderInherit: ClientAppBuilder,
    });
}

export * from './exports';

import './extension.d.ts';
