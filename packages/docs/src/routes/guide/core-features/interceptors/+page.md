---
title: Interceptors
---

<script lang="ts">
    import Badge from '$lib/Badge.svelte';
</script>

<Badge color='blue'>Server Enviroment</Badge>
<Badge color='green'>Client Enviroment</Badge>

## Overview

Interceptors are classes annotated with an `@Interceptor()` decorator. They can be used to intercept any incoming event/request and outgoing response. They can also change the execution context. Interceptors are executed after guards.

## Creating an Interceptor

Interceptors are classes that implement the `Interceptor` interface. The `Interceptor` interface has an `intercept` method that returns a function to be used after the handler method has been executed.

```typescript
@Interceptor()
export class DeliciousMangoInterceptor implements Interceptor {
    public intercept(context: ExecutionContext) {
        console.log('Mango is delicious!');
        return (result: 'yellow' | 'green') => {
            if (result === 'green') {
                console.log('Mango is not ripe yet!');
            } else {
                console.log('Mango is ripe!');
            }
        };
    }
}
```

## Using an Interceptor

Interceptors can be used at the module, controller or handler level. To use an interceptor, use the `@UseInterceptors` decorator on the module, controller or handler, and pass the interceptor class as an argument.

:::note
When you specify an interceptor as a class reference, it is instantiated as a singleton by the dependency injection container. This means that the same instance is used for all requests. If you want to use a new instance for each request, you can specify an instance of the interceptor instead of a class reference.
:::

```typescript
@Controller()
@UseInterceptors(DeliciousMangoInterceptor) // [svp! ++]
export class DeliciousMangoController {
    @UseInterceptors(DeliciousMangoInterceptor) // [svp! ++]
    @On('eat')
    public onEat() {
        console.log('Mango is eaten!');
    }
}

@UseInterceptors(DeliciousMangoInterceptor) // [svp! ++]
@Module({
    controllers: [DeliciousMangoController],
})
export class DeliciousMangoModule {}
```

You can also pass an instance of the interceptor instead of a class reference. However, dependency injection will not work for the interceptor instance.

```typescript
@Controller()
@UseInterceptors(new DeliciousMangoInterceptor()) // [svp! ++]
export class DeliciousMangoController {}
```
