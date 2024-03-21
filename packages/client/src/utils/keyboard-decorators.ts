import { applyDecorators } from '@altv-mango/core';
import type { ExecutionContext, Guard, MangoRequest, MangoResponse } from '../interfaces';
import type { Events } from '@altv/client';
import type { Enums } from '@altv/shared';
import {
    OnKeyUp as $OnKeyUp,
    OnceKeyUp as $OnceKeyUp,
    OnKeyDown as $OnKeyDown,
    OnceKeyDown as $OnceKeyDown,
    OnKeyBoardEvent as $OnKeyBoardEvent,
    OnceKeyBoardEvent as $OnceKeyBoardEvent,
    UseGuards,
} from '../decorators';

class KeyGuard implements Guard {
    public constructor(private readonly key: Enums.KeyCode, private readonly state?: Enums.KeyState) {}

    public canActivate(
        context: ExecutionContext<MangoRequest<Events.KeyUpDownEventParameters & Events.KeyboardEventParameters>, MangoResponse>,
    ) {
        const eventKey = context.request.body.key;
        return eventKey === this.key && (!this.state || context.request.body.state === this.state);
    }
}

export function OnKeyUp(key: Enums.KeyCode) {
    return applyDecorators($OnKeyUp(), UseGuards(new KeyGuard(key))) as MethodDecorator;
}

export function OnceKeyUp(key: Enums.KeyCode) {
    return applyDecorators($OnceKeyUp(), UseGuards(new KeyGuard(key))) as MethodDecorator;
}

export function OnKeyDown(key: Enums.KeyCode) {
    return applyDecorators($OnKeyDown(), UseGuards(new KeyGuard(key))) as MethodDecorator;
}

export function OnceKeyDown(key: Enums.KeyCode) {
    return applyDecorators($OnceKeyDown(), UseGuards(new KeyGuard(key))) as MethodDecorator;
}

export function OnKeyBoardEvent(key: Enums.KeyCode, state: Enums.KeyState) {
    return applyDecorators($OnKeyBoardEvent(), UseGuards(new KeyGuard(key, state))) as MethodDecorator;
}

export function OnceKeyBoardEvent(key: Enums.KeyCode, state: Enums.KeyState) {
    return applyDecorators($OnceKeyBoardEvent(), UseGuards(new KeyGuard(key, state))) as MethodDecorator;
}
