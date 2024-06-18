---
title: Interceptors
---

<script lang="ts">
    import Badge from '$lib/Badge.svelte';
</script>

<Badge color='blue'>Server Enviroment</Badge>
<Badge color='green'>Client Enviroment</Badge>

## Overview

Interceptors can be used to intercept any incoming event/request and outgoing response. Interceptors are executed after guards.

## Creating an Interceptor

Interceptors are specialized classes that implement the `Interceptor` interface. This interface defines an `intercept` method, which is responsible for handling the logic before and after an event or RPC method is executed. Within the `intercept` method, you can invoke the `next.handle` method to trigger the execution of the target event or RPC method registered in the controller. By default, `next.handle` will automatically return the result of the RPC method execution.

However, if you want to intercept the response and prevent `next.handle` from returning the result immediately, you can pass an options object to `next.handle` with the `send` property set to `false`. This allows you to manually handle the result before returning it. To send the final result back, you can use the `next.return` method.

```typescript
@Injectable()
export class DeliciousMangoInterceptor implements Interceptor<Promise<string>> {
    public async intercept(context: ExecutionContext, next: CallHandler) {
        // Call next.handle with send: false to intercept the result
        const result = await next.handle({ send: false });
        // Perform any additional logic with the intercepted result here
        // Manually return a custom result
        next.return({ body: 'Mango is delicious!' });
    }
}
```

## Using an Interceptor

Interceptors can be used at the module, controller or handler level. To use an interceptor, use the `@UseInterceptors` decorator on the module, controller or handler, and pass the interceptor class as an argument.

:::note

-   When you specify an interceptor as a class reference, it is instantiated as a singleton by the dependency injection container. This means that the same instance is used for all requests. If you want to use a new instance for each request, you can specify an instance of the interceptor instead of a class reference.
-   If you're using class references, don't forget to add the `@Injectable` decorator and add the guard to the `providers` array in the module.

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
    providers: [DeliciousMangoInterceptor],
})
export class DeliciousMangoModule {}
```

You can also pass an instance of the interceptor instead of a class reference. However, dependency injection will not work for the interceptor instance.

```typescript
@Controller()
@UseInterceptors(new DeliciousMangoInterceptor()) // [svp! ++]
export class DeliciousMangoController {}
```
