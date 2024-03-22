import {
    Controller,
    Inject,
    LOGGER_SERVICE,
    Module,
    type LoggerService,
    type Guard,
    type ExecutionContext,
    type MangoRequest,
    type MangoResponse,
    applyDecorators,
    OnKeyUp,
    UseGuards,
    EVENT_SERVICE,
    type EventService,
} from '@altv-mango/client';
import type { Enums } from '@altv/shared';
import type { Events } from '@altv/client';

class KeyGuard implements Guard {
    public constructor(private readonly key: Enums.KeyCode, private readonly state?: Enums.KeyState) {}

    public canActivate(
        context: ExecutionContext<MangoRequest<Events.KeyUpDownEventParameters & Events.KeyboardEventParameters>, MangoResponse>,
    ) {
        const eventKey = context.request.body.key;
        return eventKey === this.key && (!this.state || context.request.body.state === this.state);
    }
}

export function OnTest(key: Enums.KeyCode) {
    return applyDecorators(OnKeyUp(), UseGuards(new KeyGuard(key))) as MethodDecorator;
}

@Controller()
export class RootController {
    @Inject(LOGGER_SERVICE) private readonly loggerService: LoggerService;
    // @Inject(RPC_SERVICE) private readonly rpcService: RPCService;
    @Inject(EVENT_SERVICE) private readonly eventService: EventService;

    @OnTest(69)
    public async onKeyDown() {
        this.loggerService.debug('Key E was pressed');
        this.eventService.emitServer('testEvent', 'Key E was pressed');
    }
}

@Module({
    controllers: [RootController],
})
export class RootModule {}
