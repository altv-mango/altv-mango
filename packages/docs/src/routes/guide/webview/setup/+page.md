---
title: Setup
---

<script lang="ts">
    import Badge from '$lib/Badge.svelte';
</script>

<Badge color='yellow'>WebView</Badge>

## Install Package

Install the package inside your webview project (Vite, Webpack, etc.) using the following command:

@install-pkg(@altv-mango/webview)

## Initialization

To initialize the Mango object, you need to use the `initMango` function from the `@altv-mango/webview` package.

```ts
import { initMango } from '@altv-mango/webview';
```

`initMango` will attach the `mango` object to the `window` object and return the object itself. This object contains all the methods and properties that you need to use in the WebView to communicate with the server and the client.

```ts
const mango = initMango();
```

## How to use it in Svelte, React, Vue, etc.

You can use the `initMango` function in any framework. For example, you can use it in `useMount` (Svelte), `useEffect` (React), `mounted` (Vue), etc.

### Svelte

Svelte has a built-in `onMount` function that you can use to initialize the Mango object.

```svelte
<script>
    import { onMount } from 'svelte';
    import { initMango } from '@altv-mango/webview';

    onMount(() => {
        const mango = initMango();
    });
</script>
```

### React

React has a built-in `useEffect` hook that you can use to initialize the Mango object.

```tsx
import { useEffect } from 'react';

export function App() {
    useEffect(() => {
        const mango = initMango();
    }, []);

    return <div></div>;
}
```

### Vue (Composition API)

Vue has a built-in `onMounted` function that you can use to initialize the Mango object.

```svelte
<script setup>
import { onMounted } from 'vue';

onMounted(() => {
    const mango = initMango();
});
</script>
```
