---
title: Controllers
---

<script lang="ts">
    import Badge from '$lib/Badge.svelte';
</script>

<Badge color='blue'>Server Enviroment</Badge>
<Badge color='green'>Client Enviroment</Badge>

## Overview

Controllers are the core of your application, as they are responsible for handling incoming events/RPCs and returning responses to the client when RPC is used. Controllers are classes that are decorated with the `@Controller()` decorator. A single controller can have multiple event/RPC handlers, and different event/RPC handlers can perform different actions.

```typescript
import { Controller } from '@altv-mango/server'; // [svp! ++]
//  or
import { Controller } from '@altv-mango/client'; // [svp! ++]

@Controller()
export class DeliciousMangoController {
    @Inject() private readonly db: MyDatabaseService;

    @OnPlayerConnect()
    public onPlayerConnect(@Player() player: alt.Player) {
        console.log(`${player.name} wants to eat a mango!`);
    }

    @OnRequest('getMango')
    public getMango(@Param('id') id: number) {
        return db.getMango(id);
    }
}
```

## Event/RPC Handlers

### Passing Arguments

By default, in alt:V event emitting you can pass multiple arguments because it uses the spread operator. However, in the Mango framework, you can only pass one argument. If you want to pass multiple arguments, you should use an object or an array.

```typescript
// alt:V
alt.Events.emit('myEvent', arg1, arg2, arg3);
// Mango Framework
eventService.emit('myEvent', { arg1, arg2, arg3 });
```

It is similar to the POST request, where you can define the body of the request.

```typescript
fetch('http://localhost:3000/myEvent', {
    method: 'POST',
    body: JSON.stringify({ arg1, arg2, arg3 }),
    headers: {
        'Content-Type': 'application/json',
    },
});
```

### Events

Event handlers are methods decorated with decorators like `@On`, `@Once`. Event handlers are used to handle incoming events from server/client.

-   [Local Events](/guide/common/local-events) (`@On`, `@Once`) <Badge color='green'>Client Enviroment</Badge> <Badge color='blue'>Server Enviroment</Badge>
-   [Server/WebView Events](/guide/client/events) (`@OnServer`, `@OnceServer`, `@OnWebView`, `@OnceWebView`) <Badge color='green'>Client Enviroment</Badge>
-   [Client/WebView Events](/guide/server/events) (`@OnClient`, `@OnceClient`, `@OnWebView`, `@OnceWebView`) <Badge color='blue'>Server Enviroment</Badge>

### RPCs

RPCs are methods decorated with decorators like `@OnRequest`, `@OnServerRequest` that are used to handle incoming RPCs from server/clients and return responses to the requester.

-   [Local Requests](/guide/common/local-requests) (`@OnRequest`) <Badge color='green'>Client Enviroment</Badge> <Badge color='blue'>Server Enviroment</Badge>
-   [Server/WebView Requests](/guide/client/requests) (`@OnServerRequest`, `@OnWebViewRequest`) <Badge color='green'>Client Enviroment</Badge>
-   [Client/WebView Requests](/guide/server/requests) (`@OnClientRequest`, `@OnWebViewRequest`) <Badge color='blue'>Server Enviroment</Badge>
