---
title: Client/WebView Events
---

<script lang="ts">
    import Badge from '$lib/Badge.svelte';
</script>

<Badge color='blue'>Server Enviroment</Badge>

## Decorators

| Name                                                                       | Arguments                             | Description                     |
| -------------------------------------------------------------------------- | ------------------------------------- | ------------------------------- |
| <a style='white-space:nowrap;' href='#@OnPlayer()'>`@OnPlayer()`</a>       | `name?: string`                       | Listens to client events.       |
| <a style='white-space:nowrap;' href='#@OncePlayer()'>`@OncePlayer()`</a>   | `name?: string`                       | Listens to client events once.  |
| <a style='white-space:nowrap;' href='#@OnWebView()'>`@OnWebView()`</a>     | `id: string \| number, name?: string` | Listens to WebView events.      |
| <a style='white-space:nowrap;' href='#@OnceWebView()'>`@OnceWebView()`</a> | `id: string \| number, name?: string` | Listens to WebView events once. |

## `@OnPlayer()`

The `OnPlayer` decorator is used to listen to client events.

```ts
@Controller()
export class DeliciousMangoController {
    @Inject(LOGGER_SERVICE) private readonly loggerService: LoggerService;

    @OnPlayer('eat')
    public onEat(@Player() player: alt.Player) {
        this.loggerService.log(`${player.name} ate a mango!`);
    }
}
```

## `@OncePlayer()`

The `OncePlayer` decorator is used to listen to client events once.

```ts
@Controller()
export class DeliciousMangoController {
    @Inject(LOGGER_SERVICE) private readonly loggerService: LoggerService;

    @OncePlayer('eat')
    public onEat(@Player() player: alt.Player) {
        this.loggerService.log(`${player.name} ate a mango!`);
    }
}
```

## `@OnWebView()`

The `OnWebView` decorator is used to listen to WebView events.

```ts
@Controller()
export class DeliciousMangoController {
    @Inject(LOGGER_SERVICE) private readonly loggerService: LoggerService;

    @OnWebView('my_webview_id', 'eat')
    public onEat(@Player() player: alt.Player) {
        this.loggerService.log(`${player.name} ate a mango!`);
    }
}
```

## `@OnceWebView()`

The `OnceWebView` decorator is used to listen to WebView events once.

```ts
@Controller()
export class DeliciousMangoController {
    @Inject(LOGGER_SERVICE) private readonly loggerService: LoggerService;

    @OnceWebView('my_webview_id', 'eat')
    public onHello(@Player() player: alt.Player) {
        this.loggerService.log(`${player.name} ate a mango!`);
    }
}
```
