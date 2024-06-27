import type { Player } from '@altv/server';
import type { ThrottlerStorageRecord } from './throttler-storage-record.interface';

export interface ThrottlerLimitDetail extends ThrottlerStorageRecord {
    ttl: number;
    limit: number;
    key: string;
    player: Player;
}
