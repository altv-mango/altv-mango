---
title: RPCs
---

<script lang="ts">
    import Badge from '$lib/Badge.svelte';
</script>

<Badge color='yellow'>WebView</Badge>

## Listen RPC Requests

| Name                                             | Description             |
| ------------------------------------------------ | ----------------------- |
| <a href='#onRequest'>`onRequest`</a>             | Listens to local RPCs.  |
| <a href='#onServerRequest'>`onServerRequest`</a> | Listens to server RPCs. |
| <a href='#onPlayerRequest'>`onPlayerRequest`</a> | Listens to client RPCs. |

Mango provides a set of methods to listen to RPC requests. These methods are available in the `window.mango.rpc` object after the `mango` object is initialized in the WebView.

### `onRequest`

```ts
window.mango.rpc.onRequest('iWantDeliciousMango', (body: unknown) => {
    // ...
    return "Here's your mango from the webview!";
});
```

### `onServerRequest`

```ts
window.mango.rpc.onServerRequest('iWantDeliciousMango', (body: unknown) => {
    // ...
    return "Here's your mango from the webview!";
});
```

### `onPlayerRequest`

```ts
window.mango.rpc.onPlayerRequest('iWantDeliciousMango', (body: unknown) => {
    // ...
    return "Here's your mango from the webview!";
});
```

## Call RPC Requests

| Name                                                               | Description                                      |
| ------------------------------------------------------------------ | ------------------------------------------------ |
| <a style='white-space:nowrap;' href='#call'>`call`</a>             | Calls local RPC handler and waits for response.  |
| <a style='white-space:nowrap;' href='#callServer'>`callServer`</a> | Calls server RPC handler and waits for response. |
| <a style='white-space:nowrap;' href='#callPlayer'>`callPlayer`</a> | Calls client RPC handler and waits for response. |

Mango provides a set of methods to send RPC requests. These methods are available in the `window.mango.rpc` object after the `mango` object is initialized in the WebView.

```ts
const body = { color: 'yellow', ripe: true };
```

### `call`

```ts
const result = await window.mango.rpc.call('iWantDeliciousMango', body);
```

### `callServer`

```ts
const result = await window.mango.rpc.callServer('iWantDeliciousMango', body);
```

### `callPlayer`

```ts
const result = await window.mango.rpc.callPlayer('iWantDeliciousMango', body);
```
