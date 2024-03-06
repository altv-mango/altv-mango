---
title: Method Decorators
---

<script lang="ts">
    import Badge from '$lib/Badge.svelte';
</script>

<Badge color='blue'>Server Enviroment</Badge>
<Badge color='green'>Client Enviroment</Badge>

## `@Request()`

The `Request` decorator is used to inject the `MangoRequest` object. The `MangoRequest` object contains the request body and other request information.

```ts
@Controller()
export class DeliciousMangoController {
    @On('eat')
    public onEat(@Request() request: MangoRequest) {
        const body = request.body;
        console.log(`I ate ${body}`);
    }
}
```

## `@Response()`

The `Response` decorator is used to inject the `MangoResponse` object. The `MangoResponse` object contains methods for sending a response.

```ts
@Controller()
export class DeliciousMangoController {
    @On('eat')
    public onEat(@Response() response: MangoResponse) {
        response.send('I ate a mango'); // [svp! ++]
        // OR
        response.error('I did not eat a mango'); // [svp! ++]
    }
}
```

## `@Body()`

The `Body` decorator is used to inject the body of the request. The `Body` decorator takes pipes that are used to transform the data.

```ts
@Controller()
export class DeliciousMangoController {
    @On('eat')
    public onEat(@Body(MangoColorPipe) mangoColor: 'yellow' | 'green') {
        console.log(`I ate a ${mangoColor} mango`);
    }
}
```

## `@Param()`

The `Param` decorator is used to inject a parameter from the request body. The `Param` decorator takes a string parameter that is the key to the parameter in the body and pipes that are used to transform the data.

```ts
@Controller()
export class DeliciousMangoController {
    @On('eat')
    public onEat(@Param('color', MangoColorPipe) mangoColor: 'yellow' | 'green') {
        console.log(`I ate a ${mangoColor} mango`);
    }
}
```

## `@Player()`

The `Player` decorator is used to inject the player that sent the request. The `Player` decorator takes a string parameter that is the key to the player in the body.

```ts
@Controller()
export class DeliciousMangoController {
    @On('eat')
    public onEat(@Player() player: Player) {
        console.log(`Player ${player.id} ate a mango`);
    }
    // OR
    @On('eat')
    public onEat(@Player('id') id: number) {
        console.log(`Player ${id} ate a mango`);
    }
}
```
