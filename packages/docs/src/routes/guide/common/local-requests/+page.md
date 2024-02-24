---
title: Local Requests
---

<script lang="ts">
    import Badge from '$lib/Badge.svelte';
</script>

<Badge color='blue'>Server Enviroment</Badge>
<Badge color='green'>Client Enviroment</Badge>

:::note
There can be only one request and no more with the same name across all controllers.
:::

## Decorators

| Name                                                                   | Arguments       | Description                                                                 |
| ---------------------------------------------------------------------- | --------------- | --------------------------------------------------------------------------- |
| <a style='white-space:nowrap;' href='#@OnRequest()'>`@OnRequest()`</a> | `name?: string` | Listens to local requests and returns a value back to the local enviroment. |

## `@OnRequest()`

To listen to an RPC, use the `OnRequest` decorator.

```ts
@Controller()
export class MangoController {
    @OnRequest('mangoColor')
    public getMangoColor() {
        // Do something
        return 'green';
    }
}
```
