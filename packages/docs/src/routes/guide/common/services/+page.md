---
title: Services
---

<script lang="ts">
    import Badge from '$lib/Badge.svelte';
</script>

<Badge color='blue'>Server Enviroment</Badge>
<Badge color='green'>Client Enviroment</Badge>

## Available Services

| Name           | Injection Token  | Type            | Scope     |
| -------------- | ---------------- | --------------- | --------- |
| Event Service  | `EVENT_SERVICE`  | `EventService`  | Singleton |
| RPC Service    | `RPC_SERVICE`    | `RPCService`    | Singleton |
| Logger Service | `LOGGER_SERVICE` | `LoggerService` | Singleton |

## Event Service

The event service is a service that allows you to listen to events and emit events.

```ts
@Controller()
export class FooController {
    @Inject(EVENT_SERVICE) private readonly eventService: EventService;

    @On('foo')
    public onFoo() {
        // Do something
        this.eventService.emit('bar');
    }
}
```

## RPC Service

The RPC service is a service that allows you to listen to RPC requests and send RPC requests.

```ts
@Controller()
export class FooController {
    @Inject(RPC_SERVICE) private readonly rpcService: RPCService;
    @Inject(LOGGING_SERVICE) private readonly loggingService: LoggingService;

    @On('foo')
    public onFoo() {
        const barResult = this.rpcService.call('bar');
        this.loggerService.log(barResult);
    }
}
```

## Logging Service

The logging service is a service that allows you to log messages to the console.

```ts
@Controller()
export class FooController {
    @Inject(LOGGING_SERVICE) private readonly loggingService: LoggingService;

    @On('foo')
    public onFoo() {
        // Do something
        this.loggingService.log('bar');
    }
}
```
