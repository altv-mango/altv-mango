---
title: Custom Decorators
---

<script lang="ts">
    import Badge from '$lib/Badge.svelte';
</script>

<Badge color='blue'>Server Enviroment</Badge>
<Badge color='green'>Client Enviroment</Badge>

## Overview

Decorators are a way to add both annotations and meta-programming syntax to class declarations and members.

## Parameter Decorators

Mango Framework provides some decorators that can be used on parameters.

-   `@MangoRequest()`
-   `@MangoResponse()`
-   `@Param()`
-   `@Player()` (Only available in <Badge color='blue'>Server Enviroment</Badge>)

Aditionally, you can create your own parameter decorators.

### Creating a Parameter Decorator

Parameter decorators are declared just before a parameter declaration. To create a parameter decorator, you need to define a function that takes two parameters:

```ts
export const MangoCount = createParamDecorator((data, ctx) => {
    const data = ctx.getMangoData();
    return data.get('count');
});
```

### Using a Parameter Decorator

```ts
@Controller()
export class DeliciousMangoController {
    @On('growMangoes')
    public onGiveMeMangoes(@MangoCount() count: number) {
        console.log(`Growing ${count} mangoes`);
    }
}
```

### Working with Pipes

Custom parameter decorators can be used with pipes. For example, the following code uses the `ParseIntPipe` to parse the `count` parameter into a number:

```ts
@Controller()
export class DeliciousMangoController {
    @On('growMangoes')
    public onGiveMeMangoes(@MangoCount(new ParseIntPipe()) count: number) {
        console.log(`Growing ${count} mangoes`);
    }
}
```

## Decorator Composition

Multiple decorators can be applied to a single declaration, as in the following examples:

```ts
export function Auth(...roles: Role[]) {
    return applyDecorators(SetMetadata('roles', roles), UseGuards(AuthGuard, RolesGuard));
}
```

Then you can use it like this:

```ts
enum Role {
    Admin,
    User,
}

@Controller()
export class DeliciousMangoController {
    @Auth(Role.Admin)
    @OnClient('giveMeMangoes')
    public onGiveMeMangoes(@Player() player: Player) {
        player.giveMangoes(100);
    }
}
```
