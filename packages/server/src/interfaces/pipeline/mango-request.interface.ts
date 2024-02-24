import type { Player } from '@altv/server';
import type { MangoRequest as $MangoRequest } from '@altv-mango/core/app';

export interface MangoRequest extends $MangoRequest {
    player: Player;
}
