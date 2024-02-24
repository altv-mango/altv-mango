---
title: Server/WebView Events
---

<script lang="ts">
    import Badge from '$lib/Badge.svelte';
</script>

<Badge color='green'>Client Enviroment</Badge>

## Decorators

| Name                                           | Arguments                             | Description                     |
| ---------------------------------------------- | ------------------------------------- | ------------------------------- |
| <a href='#@OnServer()'>`@OnServer()`</a>       | `name?: string`                       | Listens to server events.       |
| <a href='#@OnceServer()'>`@OnceServer()`</a>   | `name?: string`                       | Listens to server events once.  |
| <a href='#@OnWebView()'>`@OnWebView()`</a>     | `id: string \| number, name?: string` | Listens to WebView events.      |
| <a href='#@OnceWebView()'>`@OnceWebView()`</a> | `id: string \| number, name?: string` | Listens to WebView events once. |

## `@OnServer()`

The `OnServer` decorator is used to listen to server events.

```ts
@Controller()
export class DeliciousMangoController {
    @Inject(LOGGER_SERVICE) private readonly loggerService: LoggerService;

    @OnServer('eat')
    public onEat() {
        this.loggerService.log('Server said to the client that it ate a delicious mango!');
    }
}
```

## `@OnceServer()`

The `OnceServer` decorator is used to listen to server events once.

```ts
@Controller()
export class DeliciousMangoController {
    @Inject(LOGGER_SERVICE) private readonly loggerService: LoggerService;

    @OnceServer('eat')
    public onEat() {
        this.loggerService.log('Server said to the client that it ate a delicious mango!');
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
    public onEat() {
        this.loggerService.log('WebView said to the client that it ate a delicious mango!');
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
    public onEat() {
        this.loggerService.log('WebView said to the client that it ate a delicious mango!');
    }
}
```
