import type { MultiplayerService } from '@altv-mango/core/app';
import type { ClientEventEmmiter } from '../event';
import type { MultiplayerWebViewManager } from './multiplaer-web-view.interface';

export interface ClientMultiplayerService extends MultiplayerService {
    Events: ClientEventEmmiter;
    WebView: MultiplayerWebViewManager;
    setAudioFactory(factory: unknown): void
    setAudioFilterFactory(factory: unknown): void
    setAudioOutputAttachedFactory(factory: unknown): void
    setAudioOutputFrontendFactory(factory: unknown): void
    setAudioOutputWorldFactory(factory: unknown): void
    setBlipFactory(factory: unknown): void
    setMarkerFactory(factory: unknown): void
    setColshapeFactory(factory: unknown): void
    setCheckpointFactory(factory: unknown): void
    setObjectFactory(factory: unknown): void
    setLocalObjectFactory(factory: unknown): void
    setPedFactory(factory: unknown): void
    setLocalPedFactory(factory: unknown): void
    setLocalPlayerFactory(factory: unknown): void
    setLocalVehicleFactory(factory: unknown): void
    setPlayerFactory(factory: unknown): void
    setRmlDocumentFactory(factory: unknown): void
    setTextLabelFactory(factory: unknown): void
    setVehicleFactory(factory: unknown): void
    setVirtualEntityGroupFactory(factory: unknown): void
    setVirtualEntityFactory(factory: unknown): void
    setWebSocketClientFactory(factory: unknown): void
    setWebViewFactory(factory: unknown): void
}
