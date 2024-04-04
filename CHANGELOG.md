## [1.3.9] - 2024-04-04

### Fixed

-   Client-side `@OnWebViewRequest` decorator now works correctly with `@Param` and other decorators.

## [1.3.6] - 2024-03-22

### Added

-   `@Index` decorator to get the value from `body`, which is an array type.

```typescript
@On('I_LOVE_MANGOES')
public loveMangoes(@Body() myArray: string[], @Index(5) value: string) {
    this.loggerService.log(myArray[5] === value); // true
}
```

-   `@altv-mango/client` package now has a subpackage `@altv-mango/client/utils` with the following functions:
    -   `@OnKeyUp`
    -   `@OnceKeyUp`
    -   `@OnKeyDown`
    -   `@OnceKeyDown`
    -   `@OnKeyBoardEvent`
    -   `@OnceKeyBoardEvent`

```typescript
@OnKeyUp(69)
public onKeyUpE() {
    this.loggerService.log('E key was pressed');
}
```

### Fixed

-   `RPCService` and `EventService` mistypos.
-   `@UseGuards`, `@UseInterceptors`, `@UsePipes` decorators now works at method level, whereas before it only worked at class level.
-   `createParamDecorator` data argument is now optional.

## [1.3.5] - 2024-03-20

### Fixed

-   Module external providers are now correctly injected.

## [1.2.29] - 2024-03-15

### Fixed

-   `RPCService.callPlayer` now returns a value.

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
