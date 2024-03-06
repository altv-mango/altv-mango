---
title: Modules
---

<script lang="ts">
    import Badge from '$lib/Badge.svelte';
</script>

<Badge color='blue'>Server Enviroment</Badge>
<Badge color='green'>Client Enviroment</Badge>

### Overview

A module is a class annotated with the `@Module` decorator. The application has a root module that contains all the other modules. The root module is passed to the `start` method of the application to start the application.

Each module can have its own imports, controllers, providers, and exports. The module options are described in the following table:

| Property                                               | Description                                                                                                                                                              |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| <span style="white-space:nowrap;">`imports`</span>     | List of modules that this module imports.                                                                                                                                |
| <span style="white-space:nowrap;">`controllers`</span> | List of controllers where events and RPCs will be initialized.                                                                                                           |
| <span style="white-space:nowrap;">`providers`</span>   | List of providers that belong to this module.                                                                                                                            |
| <span style="white-space:nowrap;">`exports`</span>     | A subset of providers that will be available to other modules that import this module. You can use either the provider itself or the provider token as the export value. |

```typescript
@Module({
  imports: [MangoLeafModule, MangoTrunkBarkModule, ...],
  controllers: [MangoLeafController, MangoTrunkBarkController, ...],
  providers: [MangoLeafService, MangoTrunkBarkService, ...],
  exports: [MangoLeafService, MangoTrunkBarkService, ...],
})
export class DeliciousMangoModule {}
```

### Feature Modules

The `DeliciousMangoController` and `DeliciousMangoService` are only available as part of the `DeliciousMangoModule` scope.

```typescript title="./mango/delicious-mango.module"
@Module({
    controllers: [DeliciousMangoController],
    providers: [DeliciousMangoService],
})
export class DeliciousMangoModule {}
```

Above we have the `DeliciousMangoModule`. So if we want to initialize and use the `DeliciousMangoController` and `DeliciousMangoService` within the scope of the `DeliciousMangoModule`, we need to import it into the root module, for example the `MangoTreeModule`.

```typescript title="./mango-tree.module.ts"
import { DeliciousMangoModule } from './mango/delicious-mango.module';

@Module({
    imports: [DeliciousMangoModule],
})
export class MangoTreeModule {}
```

### Shared Modules

Modules are singletons by default. This means that if you import the same module into multiple modules, the same instance will be used. This is useful for sharing providers between modules.

```typescript title="./mango/delicious-mango.module.ts"
@Module({
    controllers: [DeliciousMangoController],
    providers: [DeliciousMangoService],
    exports: [DeliciousMangoService],
})
export class DeliciousMangoModule {}
```

If we import the `DeliciousMangoModule` into the `AppleModule`, we can use the `DeliciousMangoService` inside the `AppleModule`.

```typescript title="./apple/apple.module.ts"
import { DeliciousMangoModule } from '../mango/delicious-mango.module';
import { DeliciousMangoService } from '../mango/delicious-mango.service';

@Controller()
export class AppleController {
    constructor(private readonly deliciousMangoService: DeliciousMangoService) {}
}

@Module({
    imports: [DeliciousMangoModule],
    controllers: [AppleController],
})
export class AppleModule {}
```

### Global Modules

Global modules are modules that are available to all other modules. To make a module global, you must use the `@Global` decorator.

```typescript
@Global() // [svp! ++]
@Module({
    controllers: [DeliciousMangoController],
    providers: [DeliciousMangoService],
    exports: [DeliciousMangoService],
})
export class DeliciousMangoModule {}
```

:::tip
The global module only needs to be included once. The best way is to simply insert it into the root module.
:::

:::note
Global modules are not recommended. They are a way to share providers between modules, but they make it difficult to track where a provider is being used. Instead, use shared modules.
:::

### Dynamic Modules

Dynamic modules are modules that are created dynamically. They are useful when you need to create a module based on dynamic data. For example, you can create a module based on the configuration file.

The `module` is the only required property. It is the class that is instantiated by the Mango framework and must be annotated with the `@Module` decorator.

```typescript
@Module()
export class DeliciousMangoModule {
    public static register(options: Options): DynamicModule {
        return {
            module: DeliciousMangoModule,
            providers: [
                {
                    provide: 'OPTIONS',
                    useValue: { ... },
                },
            ],
        };
    }
}
```

:::note
The `@Module` decorator options (`imports`, `providers`, `exports` and `controllers`) are merged with the options returned by the `register` method.
:::

If you want to register a dynamic module as a global module, you can set the `global` property to `true` or use the `@Global` decorator.

```typescript
@Global() // [svp! ++]
@Module()
export class DeliciousMangoModule {
    public static register(options: Options): DynamicModule {
        return {
            module: DeliciousMangoModule,
            global: true,// [svp! ++]
            providers: [
                {
                    provide: 'OPTIONS',
                    useValue: { ... },
                },
            ],
        };
    }
}
```
