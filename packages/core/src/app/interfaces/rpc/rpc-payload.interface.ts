import type { EventDestination } from '../../enums';

export interface RPCPayload<TBody = unknown> {
    source: EventDestination;
    destination: EventDestination;
    webViewId?: string | number | undefined;
    id: string;
    rpcName: string;
    body: TBody;
}
