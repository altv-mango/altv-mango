---
title: Events
---

<script lang="ts">
    import Badge from '$lib/Badge.svelte';
</script>

<Badge color='yellow'>WebView</Badge>

## Listen Event Methods

| Name                                                               | Description                    |
| ------------------------------------------------------------------ | ------------------------------ |
| <a style='white-space:nowrap;' href='#on'>`on`</a>                 | Listens to local events.       |
| <a style='white-space:nowrap;' href='#once'>`once`</a>             | Listens to local events once.  |
| <a style='white-space:nowrap;' href='#onPlayer'>`onPlayer`</a>     | Listens to client events.      |
| <a style='white-space:nowrap;' href='#oncePlayer'>`oncePlayer`</a> | Listens to client events once. |
| <a style='white-space:nowrap;' href='#onServer'>`onServer`</a>     | Listens to server events.      |
| <a style='white-space:nowrap;' href='#onceServer'>`onceServer`</a> | Listens to server events once. |

Mango provides a set of methods to listen to events. These methods are available in the `window.mango.event` object after the `mango` object is initialized in the WebView.

### `on`

```ts
window.mango.event.on('eventName', (body: unknown) => /* ... */);
```

### `once`

```ts
window.mango.event.once('eventName', (body: unknown) => /* ... */);
```

### `onPlayer`

```ts
window.mango.event.onPlayer('eventName', (body: unknown) => /* ... */);
```

### `oncePlayer`

```ts
window.mango.event.oncePlayer('eventName', (body: unknown) => /* ... */);
```

### `onServer`

```ts
window.mango.event.onServer('eventName', (body: unknown) => /* ... */);
```

### `onceServer`

```ts
window.mango.event.onceServer('eventName', (body: unknown) => /* ... */);
```

## Emit Event Methods

| Name                                   | Description         |
| -------------------------------------- | ------------------- |
| <a href='#emit'>`emit`</a>             | Emits local events. |
| <a href='#emitServer'>`emitServer`</a> | Emit server events. |
| <a href='#emitClient'>`emitPlayer`</a> | Emit client events. |

Mango provides a set of methods to emit events. These methods are available in the `window.mango.event` object after the `mango` object is initialized in the WebView.

```ts
const body = { color: 'yellow', ripe: true };
```

### `emit`

```ts
window.mango.event.emit('eventName', body);
```

### `emitServer`

```ts
window.mango.event.emitServer('eventName', body);
```

### `emitClient`

```ts
window.mango.event.emitPlayer('eventName', body);
```
