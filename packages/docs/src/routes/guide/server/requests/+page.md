---
title: Client/WebView Requests
---

<script lang="ts">
    import Badge from '$lib/Badge.svelte';
</script>

<Badge color='blue'>Server Enviroment</Badge>

:::note
There can be only one request and no more with the same name across all controllers.
:::

## Decorators

| Name                                                                                 | Arguments                             | Description                                                          |
| ------------------------------------------------------------------------------------ | ------------------------------------- | -------------------------------------------------------------------- |
| <a style='white-space:nowrap;' href='#@OnPlayerRequest()'>`@OnPlayerRequest()`</a>   | `name?: string`                       | Listens to client requests and returns a value back to the client.   |
| <a style='white-space:nowrap;' href='#@OnWebViewRequest()'>`@OnWebViewRequest()`</a> | `id: string \| number, name?: string` | Listens to WebView requests and returns a value back to the webview. |

## `@OnPlayerRequest()`

The `OnPlayerRequest` decorator is used to listen to client requests and returns a value back to the client.

```ts
@Controller()
export class DeliciousMangoController {
    @OnClient('eat')
    public onEat(@Player() player: alt.Player) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(`${player.name} ate a mango!`);
            }, 200);
        });
    }
}
```

## `@OnWebViewRequest()`

The `OnWebViewRequest` decorator is used to listen to WebView requests and return a value back to the WebView.

```ts
@Controller()
export class DeliciousMangoController {
    @OnWebView('my_webview_id', 'eat')
    public onEat() {
        const timeToEat = 1000;
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve('I ate');
            }, timeToEat);
        });
    }
}
```
