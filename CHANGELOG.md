## [1.2.28] - 2024-03-15

### Added

-   `AppBuilder.setContainerOptions` to set the container options.

```typescript
const appBuilder = await createAppBuilder();
const app = await appBuilder
    .setContainerOptions(
        {
            autoBindInjectable: true,
            defaultScope: 'Singleton',
            skipBaseClassChecks: true,
        },
        true,
        // If false, the options will be applied to every module's container.
        // If true, the options will be applied to the global container.
    )
    .build();
await app.start(RootModule);
```

-   `@Module` decorator now accepts a `container` property to set the container options individually for each module.

```typescript
@Module({
    container: {
        autoBindInjectable: true,
        defaultScope: 'Singleton',
        skipBaseClassChecks: true,
    },
})
```

### Fixed

-   `@Player` decorator now works with internal/built-in events.

```typescript
@OnPlayerConnect()
public onPlayerConnect(@Player() player: altServer.Player) {
    this.loggerService.log(`Player ${player.name} connected`);
}
```

### Changed

-   `AppBuilder.build` now is a async method.

```typescript
const appBuilder = await createAppBuilder();
const app = await appBuilder.build();
await app.start(RootModule);
```

-   `MangoPlugin.beforeCreate` to `MangoPlugin.onBuild`

```typescript
export class MyPlugin extends MangoPlugin {
    public onBuild() {
        // This function is run after the AppBuilder.build function is started and before the app is initialised.
    }
}
```
