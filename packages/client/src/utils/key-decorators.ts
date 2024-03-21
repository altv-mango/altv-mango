import { applyDecorators } from '@altv-mango/core';
import type { ExecutionContext, Guard, MangoRequest, MangoResponse } from '../interfaces';
import type { Events } from '@altv/client';
import type { Enums } from '@altv/shared';
import { OnKeyUp as $OnKeyUp, OnKeyDown as $OnKeyDown, UseGuards } from '../decorators';

class KeyGuard implements Guard {
    public constructor(private readonly key: Enums.KeyCode) {}

    public canActivate(context: ExecutionContext<MangoRequest<Events.KeyUpDownEventParameters>, MangoResponse>) {
        const eventKey = context.request.body.key;
        return eventKey === this.key;
    }
}

export function OnKeyUp(key: Enums.KeyCode) {
    return applyDecorators($OnKeyUp(), UseGuards(new KeyGuard(key))) as MethodDecorator;
}

export function OnKeyDown(key: Enums.KeyCode) {
    return applyDecorators($OnKeyDown(), UseGuards(new KeyGuard(key))) as MethodDecorator;
}
