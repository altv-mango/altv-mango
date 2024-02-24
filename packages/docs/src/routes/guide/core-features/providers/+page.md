---
title: Providers
---

<script lang="ts">
    import Badge from '$lib/Badge.svelte';
</script>

<Badge color='blue'>Server Enviroment</Badge>
<Badge color='green'>Client Enviroment</Badge>

## Overview

Providers are a fundamental concept in the Mango Framework. Many of the basic Mango Framework classes can be treated as providers - services, repositories, factories, helpers, and so on. The main idea of a provider is that it can be injected into a class that depends on it during application execution.

## Injectable Classes

Services are a great way to share information between classes that don't know each other. They can be injected into controllers, other services, and even custom providers.

For example, you could create an injectable class that returns when a mango is ripe.

```typescript
@Injectable()
export class MangoRipenessCheckerService {
    public isRipe(mango: Mango) {
        return mango.ripeness === 'ripe';
    }
}
```

Now you can inject the `MangoRipenessCheckerService` into a controller.

```typescript
@Controller()
export class DeliciousMangoController {
    @Inject()
    private readonly mangoRipenessCheckerService: MangoRipenessCheckerService;

    @On('check-mango-ripeness')
    public onCheckMangoRipeness() {
        const mango = new Mango();
        const isRipe = this.mangoRipenessCheckerService.isRipe(mango);
        console.log(`Is the mango ripe? ${isRipe}`);
    }
}
```

## Providers

One of the ways to create a custom provider is to use the `@Injectable` decorator, which is used to mark a class as a provider.

There are four types of providers: `useClass`, `useFactory`, `useValue`, and `useExisting`. They are used in the `@Module` decorator to provide a class, factory, value, or existing provider as a provider.

### Class-Based `useClass`

The `useClass` property is used to make a class available as a provider.

```typescript
const deliciousMango = {
    provide: DeliciousMangoService,
    useClass: DeliciousMangoService,
};
```

### Factory-Based `useFactory`

The `useFactory` property is used to provide a factory as a provider.

```typescript
const deliciousMango = {
    provide: DeliciousMangoService,
    useFactory: (repository: DeliciousMangoRepository) => new DeliciousMangoService(repository),
    inject: [DeliciousMangoRepository],
};
```

### Value-Based `useValue`

The `useValue` property is used to provide a value as a provider.

```typescript
const deliciousMango = {
    provide: 'DELICIOUS_MANGO',
    useValue: {
        name: 'Delicious Mango',
        color: 'green',
    },
};
```

### Existing-Based `useExisting`

The `useExisting` property is used to make an existing provider available as a provider.

```typescript
const deliciousMango = {
    provide: 'MANGO_SERVICE',
    useExisting: DeliciousMangoService,
};
```

## Scopes

The Mango Framework supports three scopes for providers: `Singleton`, `Transient`, and `Request`. The default scope is `Singleton`.

```typescript
import { InjectableScope } from '@altv-mango/server'; // [svp! ++]

const deliciousMango = {
    provide: DeliciousMangoService,
    useClass: DeliciousMangoService,
    scope: 'transient', // [svp! ++]
    // OR
    scope: InjectableScope.Transient, // [svp! ++]
};
```

## Provider Registration

Providers are registered in the `providers` array of the module decorator options and can be exported to make them available to other modules.

:::tip
You can specify the provider as an entire object in the `providers` array because the Mango Framework automatically takes the `provide` property as the identifier.
:::

```typescript
@Module({
    providers: [deliciousMango], // [svp! ++]
    exports: [deliciousMango], // Expose the provider to other modules that import this module  // [svp! ++]
})
export class DeliciousMangoModule {}
```

## Dependency Injection

Mango Framework uses InversifyJS under the hood to provide dependency injection. Mango Framework provides a set of decorators to make [InversifyJS](https://inversify.io/) easier to use.

### Property-Based

The `@Inject` decorator is used to inject a dependency into a class.

```typescript
@Controller()
export class DeliciousMangoController {
    @Inject(DeliciousMangoService) // [svp! ++]
    private readonly deliciousMangoService: DeliciousMangoService; // [svp! ++]
}
```

:::tip
If you are injecting a class, you can use `@Inject` without any arguments. For example, `@Inject() private readonly deliciousMangoService: DeliciousMangoService`. This is because the class reference is used as the identifier. However, if your property type is `string`, `number`, or `symbol`, you must provide the identifier.
:::

### Optional

The `@Optional` decorator is used to inject a dependency into a class, but does not throw an error if the dependency is not found.

```typescript
@Controller()
export class DeliciousMangoController {
    @Optional() // [svp! ++]
    @Inject(DeliciousMangoService)
    private readonly deliciousMangoService: DeliciousMangoService;
}
```

## Manual Provider Instantiation

You can manually instantiate a provider by injecting the `MODULE_CONTAINER` token into a class and using the `ModuleContainer` to get the provider.

```typescript
@Controller()
export class DeliciousMangoController {
    @Inject(MODULE_CONTAINER) private readonly moduleContainer: ModuleContainer; // [svp! ~~]

    @On('checkMangoRipeness')
    public onCheckMangoRipeness() {
        const deliciousMangoService = this.moduleContainer.get(DeliciousMangoService); // [svp! ~~]
        const mango = new Mango();
        const isRipe = deliciousMangoService.isRipe(mango);
        console.log(`Is the mango ripe? ${isRipe}`);
    }
}
```
