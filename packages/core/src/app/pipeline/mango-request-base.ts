import * as altServer from '@altv/server';
import { injectable } from 'inversify';
import type { MangoRequest } from '../interfaces';

@injectable()
export class MangoRequestBase<TData = unknown> implements MangoRequest {
    public $body: TData;
    public $player?: altServer.Player;

    public get body() {
        return this.$body;
    }

    public get player() {
        return this.$player;
    }
}
