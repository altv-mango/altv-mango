---
title: Local Events
---

<script lang="ts">
    import Badge from '$lib/Badge.svelte';
</script>

<Badge color='blue'>Server Enviroment</Badge>
<Badge color='green'>Client Enviroment</Badge>

## Decorators

| Name                                                         | Arguments       | Description                   |
| ------------------------------------------------------------ | --------------- | ----------------------------- |
| <a style='white-space:nowrap;' href='#@On()'>`@On()`</a>     | `name?: string` | Listens to local events.      |
| <a style='white-space:nowrap;' href='#@Once()'>`@Once()`</a> | `name?: string` | Listens to local events once. |

## `@On()`

The `On` decorator is used to listen to local events.

```ts
@Controller()
export class MangoController {
    @On('myCustomEvent')
    public onMyCustomEvent() {
        // ...
    }
}
```

## `@Once()`

The `Once` decorator is used to listen to local events once.

```ts
@Controller()
export class MangoController {
    @Once('myCustomEvent')
    public onMyCustomEvent() {
        // ...
    }
}
```

## Internal Events

Every internal event has its own decorator. For example, the `@OnPlayerConnect()` decorator is used to listen to the `playerConnect` event.

```ts
import { Controller, OnPlayerConnect, Player } from '@altv-mango/server';

@Controller()
export class MangoController {
    @Inject(LOGGER_SERVICE) private readonly loggerService: LoggerService;

    @OnPlayerConnect()
    public onPlayerConnect(@Player() player: Player) {
        this.loggerService.log(`${player.name} connected`);
    }
}
```
