---
title: Error Filters
---

<script lang="ts">
    import Badge from '$lib/Badge.svelte';
</script>

<Badge color='blue'>Server Enviroment</Badge>
<Badge color='green'>Client Enviroment</Badge>

## Overview

Error filters are classes annotated with an `@ErrorFilter()` decorator. They can be used to handle errors thrown by guards, pipes, interceptors and handlers.

## Creating an Error Filter

Error filters are classes that implement the `ErrorFilter` interface. The `ErrorFilter` interface has a `catch` method that returns the transformed data.

```typescript
@ErrorFilter()
export class MangoSpoilFilter implements ErrorFilter {
    public catch(error) {
        console.log('Mango is spoiled!');
        return error;
    }
}
```

The error filter can take several different error types as arguments. The error filter is only executed if the error thrown is an instance of one of the error types. If no error types are specified, the error filter is executed for all errors.

## Using an Error Filter

Error filters can be used at the module, controller or handler level. To use an error filter, use the `@UseErrorFilters` decorator on the module, controller or handler, and pass the error filter class as an argument.

:::note
When you specify an error filter as a class reference, it is instantiated as a singleton by the dependency injection container. This means that the same instance is used for all requests. If you want to use a new instance for each request, you can specify an instance of the error filter instead of a class reference.
:::

```typescript
@UseErrorFilters(MangoSpoilFilter) // [svp! ++]
@Controller()
export class DeliciousMangoController {
    @UseErrorFilters(MangoSpoilFilter) // [svp! ++]
    @On('eat')
    public onEat(@Param('mango', ColorPipe) color: 'green' | 'yellow') {
        console.log(`I am eating a ${color} mango`);
    }
}
```

Also, instead of providing a class reference, you can provide an instance of the error filter. However, dependency injection will not work for the error filter instance.

```typescript
@UseErrorFilters(new MangoSpoilFilter()) // [svp! ++]
@Module({
    controllers: [DeliciousMangoController],
})
export class DeliciousMangoModule {}
```
