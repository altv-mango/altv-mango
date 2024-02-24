---
title: Lifecycle Methods
---

<script lang="ts">
    import Badge from '$lib/Badge.svelte';
</script>

<Badge color='blue'>Server Enviroment</Badge>
<Badge color='green'>Client Enviroment</Badge>

## Overview

Lifecycle methods are methods that are called at different stages of the application lifecycle. They are used to perform actions when the application is bootstrapped, shut down, or when a module is initialized or destroyed.

## `OnModuleInit`

The class that implements the `OnModuleInit` method is called when the module is initialized.

```typescript
@Controller()
export class DeliciousMangoController implements OnModuleInit {
    public onModuleInit() {
        console.log('DeliciousMangoModule initialized');
    }
}

@Module({ controllers: [DeliciousMangoController] })
export class DeliciousMangoModule implements OnModuleInit {
    public onModuleInit() {
        console.log('DeliciousMangoModule initialized');
    }
}
```

## `OnModuleDestroy`

:::note
In order to use the `OnModuleDestroy' lifecycle method, the shutdown hook must be enabled in the [App Builder](/guide/introduction/getting-started#Other-Options).
:::

The class that implements the `OnModuleDestroy` method is called when the module is destroyed.

```typescript
@Controller()
export class DeliciousMangoController implements OnModuleDestroy {
    public onModuleDestroy() {
        console.log('DeliciousMangoModule destroyed');
    }
}
```

## `onAppBootstrap`

The class that implements the `OnAppBootstrap` method is called when the application is bootstrapped.

```typescript
@Controller()
export class DeliciousMangoController implements OnAppBootstrap {
    public onAppBootstrap() {
        console.log('Application bootstrapped');
    }
}
```

## `OnAppShutdown`

:::note
In order to use the `OnModuleDestroy' lifecycle method, the shutdown hook must be enabled in the [App Builder](/guide/introduction/getting-started#Other-Options).
:::

The class that implements the `OnAppShutdown` method is called when the application is shut down.

```typescript
@Controller()
export class DeliciousMangoController implements OnAppShutdown {
    public onAppShutdown() {
        console.log('Application shut down');
    }
}
```
