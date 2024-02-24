---
title: Rate Limiting
---

Rate limiting is only integrated on the server side.

## Usage

First, import the `ThrottlerModule` and use the `forRoot` or `forRootAsync` method to add the throttler module to the root module.

```typescript
import { ThrottlerModule } from '@altv-mango/server';

@Module({
    imports: [
        ThrottlerModule.forRoot({
            ttl: 60,
            limit: 10,
        }),
    ],
})
export class AppModule {}
```

The above will set the global options for the ttl, the time to live in milliseconds, and the limit, the maximum number of requests within the ttl, for the routes of your application that are guarded.

Once the module has been imported, you can choose how you want to integrate the `ThrottlerGuard`. You can use the `@UseGuards` decorator to apply the guard to a specific route handler or controller, or you can use the `ThrottlerGuard` as a global guard by adding it in the App Builder.

## Multiple Throttler Definitions

There may be times when you want to set up multiple throttling definitions, such as no more than 3 calls per second, 20 calls per 10 seconds, and 100 calls per minute. To do this, you can set up your definitions in the array with named options, which can be referenced later in the `@SkipThrottle()` and `@Throttle()` decorators to change the options again.

```typescript
@Module({
    imports: [
        ThrottlerModule.forRoot([
            {
                name: 'short',
                ttl: 1000,
                limit: 3,
            },
            {
                name: 'medium',
                ttl: 10000,
                limit: 20,
            },
            {
                name: 'long',
                ttl: 60000,
                limit: 100,
            },
        ]),
    ],
})
export class AppModule {}
```

## Customization

There may be a time when you want to bind the guard to a controller or globally, but disable rate limiting for one or more of your endpoints. To do this, you can use the `@SkipThrottle()` decorator to negate the throttle for an entire class or a single route. The `@SkipThrottle()` decorator can also take an object of string keys with boolean values, in case there is a case where you want to exclude most of a controller but not every route, and configure it per throttle set if you have more than one. If you do not pass an object, the default is to use

```json
{ "default": true }
```

```typescript
@SkipThrottle()
@Controller()
export class MangoController {}
```

This `@SkipThrottle()` decorator can be used to skip a route or a class or to negate the skipping of a route in a class that is skipped.

```typescript
@SkipThrottle()
@Controller()
export class MangoController {
    @SkipThrottle({ default: false })
    public dontSkip() {
        return 'This route will not skip rate limiting.';
    }
    public doSkip() {
        return 'This route will skip rate limiting.';
    }
}
```

There is also the `@Throttle()` decorator, which can be used to override the `limit` and `ttl` set in the global module to provide tighter or looser security options. This decorator can also be used on a class or function. The decorator takes an object with the string relating to the name of the throttle set, and an object with the limit and ttl keys and integer values, similar to the options passed to the root module. If you do not specify a name in your original options, use the `default` string.

```typescript
// Override default configuration for Rate limiting and duration.
@Controller()
export class MangoController {
    @Throttle({ default: { limit: 3, ttl: 60000 } })
    @Get()
    public findAll() {
        return 'This route will have a limit of 3 requests per minute.';
    }
}
```

## Configuration

The following options are valid for the object passed to the options array of the `ThrottlerModule`.

| Option   | Description                                                                                                         |
| -------- | ------------------------------------------------------------------------------------------------------------------- |
| `ttl`    | The number of milliseconds that each request will last in storage.                                                  |
| `limit`  | The maximum number of requests within the ttl.                                                                      |
| `skipIf` | A function that takes the request and returns a boolean. If the function returns true, the request will be skipped. |

## Async Configuration

You may want to get your rate-limiting configuration asynchronously rather than synchronously. You can use the forRootAsync() method, which allows dependency injection and async methods.

One approach would be to use a factory function.

```typescript
@Module({
    imports: [
        ThrottlerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => [
                {
                    ttl: config.get('THROTTLE_TTL'),
                    limit: config.get('THROTTLE_LIMIT'),
                },
            ],
        }),
    ],
})
export class AppModule {}
```

Another approach would be to use a class.

```typescript
@Module({
    imports: [
        ThrottlerModule.forRootAsync({
            imports: [ConfigModule],
            useClass: ThrottlerConfigService,
        }),
    ],
})
export class AppModule {}
```

This is possible as long as the `ThrottlerConfigService` implements the `ThrottlerOptionsFactory` interface.

## Custom Storage

:::note
Custom storage is not currently supported. The default storage is a simple in-memory store that lives for the duration of the application.
:::
