---
title: Getting Started
---

:::caution[IMPORTANT]{icon=ph:layout-duotone}
It is not for beginners. It is recommended that you have some experience with TypeScript and JavaScript before you start using Mango Framework.
:::

## Requirements

-   [Node.js](https://nodejs.org/en/)
-   [alt\:V JavaScript v2 module](https://github.com/altmp/altv-js-module-v2)

:::important[Decorators]
Your project must support **emitDecoratorMetadata** and **experimentalDecorators** options. Usually this is done by adding the following to your **tsconfig.json** or **jsconfig.json** file. It depends what compiler you are using.

```json
{
    "compilerOptions": {
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true
    }
}
```

:::

## Dependecies (Packages)

Mango Framework has two packages, one for the server-side code and one for the client-side code. You can install them both using the following commands:

### Server

@install-pkg(@altv-mango/server)

### Client

@install-pkg(@altv-mango/client)

## Preparing the Application

Starting an application involves several steps. One of them is creating the application builder.

### App Builder

To initialize the application module tree (the root module and its children), the application builder has to be created first. You can do this using the createAppBuilder function from the `@altv-mango/server` or `@altv-mango/client` package.

```typescript
import { createAppBuilder } from '@altv-mango/server'; // [svp! ++]
// OR
import { createAppBuilder } from '@altv-mango/client'; // [svp! ++]

const appBuilder = createAppBuilder();
```

#### Global Error Filters, Guards, Interceptors and Pipes

The Application Builder also allows you to register global error filters, guards, interceptors, and pipes. These are used for all controllers.

```typescript
appBuilder.useGlobalFilters(MangoSeedFilter, MangoRipenessFilter, ...);
appBuilder.useGlobalGuards(MangoSeedPipe, MangoRipenessPipe, ...);
appBuilder.useGlobalInterceptors(MangoSeedInterceptor, MangoRipenessInterceptor, ...);
appBuilder.useGlobalPipes(MangoSeedPipe, MangoRipenessPipe, ...);
```

Learn more about error filters, guards, interceptors, and pipes in the following sections:

-   [Error Filters](/guide/core-features/error-filters)
-   [Guards](/guide/core-features/guards)
-   [Interceptors](/guide/core-features/interceptors)
-   [Pipes](/guide/core-features/pipes)

#### Other Options

The `onModuleDestroy()`, `beforeAppShutdown()` and `onAppShutdown()` hooks are called in the terminating phase \(in response to an explicit call to `app.close()`\).

Shutdown hook listeners consume system resources, so they are disabled by default. To use shutdown hooks, you must enable the listeners by calling `enableShutdownHooks()`.

```typescript
appBuilder.enableShutdownHooks();
```

In the client-side application, you can also add a WebView using the `addWebView` method.

```typescript
appBuilder.addWebView(id, options);
```

If you want more control over the application, you can use plugins. Plugins are used to add extra functionality to the application.

```typescript
appBuilder.usePlugins(MangoSeedPlugin, MangoRipenessPlugin, ...);
```

Learn more about plugins in the [Plugins](/guide/core-features/plugins) section.

#### Building the Application

Once you have registered all global error filters, guards, interceptors, and pipes, you are ready to build the application.

```typescript
const app = appBuilder.build();
```

### App

The application has two methods, `start` and `stop`. The `start` method starts the application and the `stop` method stops the application.

#### Starting the Application

Once you have built the application, you can start it. To start the application, you must call the `start` method and pass the root module as an argument.

The root module is the module that contains all the other modules. More about modules can be found in the [Modules](/guide/core-features/modules) section.

```typescript
await app.start(DeliciousMangoModule);
```

#### Stopping the Application

To stop the application, you need to call the `stop` method.

```typescript
await app.stop();
```
