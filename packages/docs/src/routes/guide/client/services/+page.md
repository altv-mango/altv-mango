---
title: Services
---

<script lang="ts">
    import Badge from '$lib/Badge.svelte';
</script>

<Badge color='green'>Client Enviroment</Badge>

## Client Services

| Name            | Injection Token   | Type             | Scope     |
| --------------- | ----------------- | ---------------- | --------- |
| WebView Service | `WEBVIEW_SERVICE` | `WebViewService` | Singleton |

## WebView Service

The reason this service is needed is because the `@OnWebView`, `@OnceWebView`, and `@OnWebViewRequest` decorators need an id of the WebView they are listening to. This makes it easy to keep track of which webview is being listened to when multiple WebViews are created with their own ids.

```ts
@Controller()
export class DeliciousMangoController implements OnModuleInit {
    @Inject(WEBVIEW_SERVICE) private readonly webViewService: WebViewService;

    public onModuleInit() {
        this.webViewService.create('mango', 'ui/mango.html');
    }
}
```
