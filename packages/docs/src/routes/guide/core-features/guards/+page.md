---
title: Guards
---

<script lang="ts">
    import Badge from '$lib/Badge.svelte';
</script>

<Badge color='blue'>Server Enviroment</Badge>
<Badge color='green'>Client Enviroment</Badge>

## Overview

Guards can be used to control access to a handler. They are executed before the handler method and can allow or deny execution of the handler method. They may also change the execution context. Interceptors are executed after guards.

## Creating a Guard

Guards are classes that implement the `Guard` interface. The `Guard` interface has a single method, `canActivate`, which returns a boolean or a promise that resolves to a boolean.

```typescript
@Injectable()
export class OnlyRipeMangoGuard implements Guard {
    public canActivate(context: ExecutionContext) {
        const data = context.getMangoData();
        if (data.getParam('isRipe')) {
            return false;
        }
        return true;
    }
}
```

## Using a Guard

Guards can be used at the module, controller or handler level. To use a guard, use the `@UseGuards` decorator on the module, controller or handler, and pass the guard class as an argument.

:::note
When you specify a guard as a class reference, it is instantiated as a singleton by the dependency injection container. This means that the same instance is used for all requests. If you want to use a new instance for each request, you can specify an instance of the guard instead of a class reference.
:::

```typescript
@Controller()
@UseGuards(OnlyRipeMangoGuard) // [svp! ++]
export class DeliciousMangoController {
    @UseGuards(OnlyRipeMangoGuard) // [svp! ++]
    @On('eat')
    public onEat() {
        console.log('I love mangoes 🥭');
    }
}

@UseGuards(OnlyRipeMangoGuard) // [svp! ++]
@Module({
    controllers: [DeliciousMangoController],
})
export class DeliciousMangoModule {}
```

Also, instead of providing a class reference, you can provide an instance of the guard. However, dependency injection will not work for the guard instance.

```typescript
@Controller()
@UseGuards(new OnlyRipeMangoGuard()) // [svp! ++]
export class DeliciousMangoController {}
```
