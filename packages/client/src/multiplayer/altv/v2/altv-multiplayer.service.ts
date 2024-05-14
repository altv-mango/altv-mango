import type { ClientMultiplayerService, MultiplayerWebViewManager } from '../../../interfaces/multiplayer';
import type * as AltShared from '@altv/shared';
import type * as AltClient from '@altv/client';
import { ClientAltVEventEmmiterV2 } from './altv-event-emmiter';
import type { ClientEventEmmiter } from '../../../interfaces';
import { AltVWebViewManagerV2 } from './altv-webview-manager';
import { AltMultiplayerServceV2 } from '@altv-mango/core/app';

export class ClientAltMultiplayerServceV2 extends AltMultiplayerServceV2 implements ClientMultiplayerService {
    public override Events: ClientEventEmmiter;
    public WebView: MultiplayerWebViewManager;
    constructor(
        altShared: typeof AltShared,
        private altClient: typeof AltClient,
    ) {
        super(altShared);
        this.Events = new ClientAltVEventEmmiterV2(altShared, altClient);
        this.WebView = new AltVWebViewManagerV2(altClient);
    }

    public setAudioFactory(factory: any): void {
        this.altClient.Audio.setFactory(factory);
    }

    public setAudioFilterFactory(factory: any): void {
        this.altClient.AudioFilter.setFactory(factory);
    }

    public setAudioOutputAttachedFactory(factory: any): void {
        this.altClient.AudioOutputAttached.setFactory(factory);
    }

    public setAudioOutputFrontendFactory(factory: any): void {
        this.altClient.AudioOutputFrontend.setFactory(factory);
    }

    public setAudioOutputWorldFactory(factory: any): void {
        this.altClient.AudioOutputWorld.setFactory(factory);
    }

    public setBlipFactory(factory: any): void {
        this.altClient.Blip.setFactory(factory);
    }

    public setMarkerFactory(factory: any): void {
        this.altClient.Marker.setFactory(factory);
    }

    public setColshapeFactory(factory: any): void {
        this.altClient.ColShape.setFactory(factory);
    }

    public setCheckpointFactory(factory: any): void {
        this.altClient.Checkpoint.setFactory(factory);
    }

    public setObjectFactory(factory: any): void {
        this.altClient.Object.setFactory(factory);
    }

    public setLocalObjectFactory(factory: any): void {
        this.altClient.LocalObject.setFactory(factory);
    }

    public setPedFactory(factory: any): void {
        this.altClient.Ped.setFactory(factory);
    }

    public setLocalPedFactory(factory: any): void {
        this.altClient.LocalPed.setFactory(factory);
    }

    public setLocalPlayerFactory(factory: any): void {
        this.altClient.LocalPlayer.setFactory(factory);
    }

    public setLocalVehicleFactory(factory: any): void {
        this.altClient.LocalVehicle.setFactory(factory);
    }

    public setPlayerFactory(factory: any): void {
        this.altClient.Player.setFactory(factory);
    }

    public setRmlDocumentFactory(factory: any): void {
        this.altClient.RmlDocument.setFactory(factory);
    }

    public setTextLabelFactory(factory: any): void {
        this.altClient.TextLabel.setFactory(factory);
    }

    public setVehicleFactory(factory: any): void {
        this.altClient.Vehicle.setFactory(factory);
    }

    public setVirtualEntityGroupFactory(factory: any): void {
        this.altClient.VirtualEntityGroup.setFactory(factory);
    }

    public setVirtualEntityFactory(factory: any): void {
        this.altClient.VirtualEntity.setFactory(factory);
    }

    public setWebSocketClientFactory(factory: any): void {
        this.altClient.WebSocketClient.setFactory(factory);
    }

    public setWebViewFactory(factory: any): void {
        this.altClient.WebView.setFactory(factory);
    }
}
