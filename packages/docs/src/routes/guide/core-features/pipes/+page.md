---
title: Pipes
---

<script lang="ts">
    import Badge from '$lib/Badge.svelte';
</script>

<Badge color='blue'>Server Enviroment</Badge>
<Badge color='green'>Client Enviroment</Badge>

## Overview

Pipes can be used to transform the input data before passing it to the handler method.

## Creating a Pipe

Pipes are classes that implement the `Pipe` interface. The `Pipe` interface has a `transform` method that returns the transformed data.

```typescript
@Injectable()
export class MangoColorPipe implements Pipe<MyMangoData> {
    public transform(data) {
        return data.isRipe ? 'yellow' : 'green';
    }
}
```

## Using a Pipe

Pipes can be used at the module, controller, or handler level. To use a pipe at the controller level, use the `@UsePipes` decorator.

:::note

-   When you specify a pipe as a class reference, it is instantiated as a singleton by the dependency injection container. This means that the same instance is used for all requests. If you want to use a new instance for each request, you can specify an instance of the pipe instead of a class reference.
-   If you're using class references, don't forget to add the `@Injectable` decorator and add the guard to the `providers` array in the module.

:::

```typescript
@UsePipes(MangoColorPipe) // [svp! ++]
@Controller()
export class DeliciousMangoController {
    @UsePipes(MangoColorPipe) // [svp! ++]
    @On('eat')
    public onEat(@Param('mango', ColorPipe) color: 'green' | 'yellow') {
        console.log(`I am eating a ${color} mango!`);
    }
}

@Module({
    controllers: [DeliciousMangoController],
    providers: [MangoColorPipe],
})
export class DeliciousMangoModule {}
```

Also, instead of providing a class reference, you can provide an instance of the pipe. However, dependency injection will not work for the pipe instance.

```typescript
@UsePipes(new MangoColorPipe()) // [svp! ++]
@Module({
    controllers: [DeliciousMangoController],
})
export class DeliciousMangoModule {}
```
