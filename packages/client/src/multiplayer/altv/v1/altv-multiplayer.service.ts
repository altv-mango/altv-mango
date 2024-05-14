import type * as AltShared from 'alt-shared';
import type * as AltClient from 'alt-client';
import { AltVWebViewManagerV1 } from './altv-webview-manager';
import type { ClientMultiplayerService, MultiplayerWebViewManager } from '../../../interfaces/multiplayer';
import { ClientAltVEventEmmiterV1 } from './altv-event-emmiter';
import type { ClientEventEmmiter } from '../../../interfaces';
import { AltMultiplayerServceV1 } from '@altv-mango/core/app';

export class ClientAltMultiplayerServceV1 extends AltMultiplayerServceV1 implements ClientMultiplayerService {
    public override Events: ClientEventEmmiter;
    public WebView: MultiplayerWebViewManager;
    constructor(
        altShared: typeof AltShared,
        private readonly altClient: typeof AltClient,
    ) {
        super(altShared);
        this.Events = new ClientAltVEventEmmiterV1(altShared, altClient);
        this.WebView = new AltVWebViewManagerV1(altClient);
    }

    public setAudioFactory(factory: any): void {
        this.altClient.Audio.prototype = factory;
    }

    public setAudioFilterFactory(factory: any): void {
        this.altClient.AudioFilter.prototype = factory;
    }

    public setAudioOutputAttachedFactory(factory: any): void {
        this.altClient.AudioOutputAttached.prototype = factory;
    }

    public setAudioOutputFrontendFactory(factory: any): void {
        this.altClient.AudioOutputFrontend.prototype = factory;
    }

    public setAudioOutputWorldFactory(factory: any): void {
        this.altClient.AudioOutputWorld.prototype = factory;
    }

    public setBlipFactory(factory: any): void {
        this.altClient.Blip.prototype = factory;
    }

    public setMarkerFactory(factory: any): void {
        this.altClient.Marker.prototype = factory;
    }

    public setColshapeFactory(factory: any): void {
        this.altClient.Colshape.prototype = factory;
    }

    public setCheckpointFactory(factory: any): void {
        this.altClient.Checkpoint.prototype = factory;
    }

    public setObjectFactory(factory: any): void {
        this.altClient.Object.prototype = factory;
    }

    public setLocalObjectFactory(factory: any): void {
        this.altClient.LocalObject.prototype = factory;
    }

    public setPedFactory(factory: any): void {
        this.altClient.Ped.prototype = factory;
    }

    public setLocalPedFactory(factory: any): void {
        this.altClient.LocalPed.prototype = factory;
    }

    public setLocalPlayerFactory(factory: any): void {
        this.altClient.LocalPlayer.prototype = factory;
    }

    public setLocalVehicleFactory(factory: any): void {
        this.altClient.LocalVehicle.prototype = factory;
    }

    public setPlayerFactory(factory: any): void {
        this.altClient.Player.prototype = factory;
    }

    public setRmlDocumentFactory(factory: any): void {
        this.altClient.RmlDocument.prototype = factory;
    }

    public setTextLabelFactory(factory: any): void {
        this.altClient.TextLabel.prototype = factory;
    }

    public setVehicleFactory(factory: any): void {
        this.altClient.Vehicle.prototype = factory;
    }

    public setVirtualEntityGroupFactory(factory: any): void {
        this.altClient.VirtualEntityGroup.prototype = factory;
    }

    public setVirtualEntityFactory(factory: any): void {
        this.altClient.VirtualEntity.prototype = factory;
    }
    
    public setWebSocketClientFactory(factory: any): void {
        this.altClient.WebSocketClient.prototype = factory;
    }

    public setWebViewFactory(factory: any): void {
        this.altClient.WebView.prototype = factory;
    }
}
