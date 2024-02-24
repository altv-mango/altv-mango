---
title: Server/WebView Requests
---

<script lang="ts">
    import Badge from '$lib/Badge.svelte';
</script>

<Badge color='green'>Client Enviroment</Badge>

:::note
There can be only one request and no more with the same name across all controllers.
:::

## Decorators

| Name                                                                                 | Arguments                             | Description                                                          |
| ------------------------------------------------------------------------------------ | ------------------------------------- | -------------------------------------------------------------------- |
| <a style='white-space:nowrap;' href='#@OnServerRequest()'>`@OnServerRequest()`</a>   | `name?: string`                       | Listens to server requests and returns a value back to the server.   |
| <a style='white-space:nowrap;' href='#@OnWebViewRequest()'>`@OnWebViewRequest()`</a> | `id: string \| number, name?: string` | Listens to WebView requests and returns a value back to the webview. |

## `@OnServerRequest()`

The `OnServerRequest` decorator is used to listen to server requests and returns a value back to the server.

```ts
@Controller()
export class DeliciousMangoController {
    @OnServer('eat')
    public onEat() {
        return 'Server said to the client that it ate a delicious mango!';
    }
}
```

## `@OnWebViewRequest()`

The `OnWebViewRequest` decorator is used to listen to WebView requests and return a value back to the WebView.

```ts
@Controller()
export class DeliciousMangoController {
    @OnWebView('my_webview_id', 'eat')
    public onFoo() {
        return 'WebView said to the client that it ate a delicious mango!';
    }
}
```
