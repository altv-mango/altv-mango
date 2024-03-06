---
title: Plugins
---

The plugin mush implement the `MangoPlugin` interface.

```typescript
interface MangoPlugin {
    beforeCreate?(): Promise<void> | void;

    beforeStart?(): Promise<void> | void;
    afterStart?(): Promise<void> | void;

    beforeStop?(): Promise<void> | void;
    afterStop?(): Promise<void> | void;
}
```

| Lifecycle Method | Description                                                                                            |
| ---------------- | ------------------------------------------------------------------------------------------------------ |
| `beforeCreate`   | This method is called before the App Builder is created and after the internal dependencies are bound. |
| `beforeStart`    | This method is called before the App Builder is started.                                               |
| `afterStart`     | This method is called after the App Builder is started.                                                |
| `beforeStop`     | This method is called before the App Builder is stopped.                                               |

## Usage

First, create a class that implements the MangoPlugin interface. If you want to use dependency injection, you can use the `Injectable` decorator and then pass it as a class reference to the `usePlugins` method.

```typescript
@Injectable()
class FooPlugin implements MangoPlugin {
    public afterStart() {
        console.log('afterStart');
    }
}

class BarPlugin implements MangoPlugin {
    public beforeStart() {
        console.log('beforeStart');
    }
}
```

Then, use the `usePlugins` method to add the plugin to the App Builder.

```typescript
const appBuilder = createAppBuilder();
appBuilder.usePlugins(FooPlugin, new BarPlugin());
```
