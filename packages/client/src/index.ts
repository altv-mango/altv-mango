import '@abraham/reflection';
import { AppBuilder, AppEnviroment, createAppBuilder as $createAppBuilder } from '@altv-mango/core/app';
import { ADD_WEBVIEW } from './constants';
import { EventMediatorPlugin, RpcPlugin, ServiceBinderPlugin, WebViewPlugin } from './plugins';
import * as altClient from '@altv/client';
import type { ErrorFilter, Guard, Interceptor } from './interfaces';

class ClientAppBuilder extends AppBuilder<Guard, Interceptor, ErrorFilter> {
    public addWebView(id: string | number, options: altClient._WebViewCreateOptionsDrawable | altClient._WebViewTextureCreateOptions) {
        const addWebViews = this.internalAppContainer.get<any[][]>(ADD_WEBVIEW) ?? [];
        this.internalAppContainer.bind(ADD_WEBVIEW).toConstantValue([...addWebViews, { id, options }]);
    }
}

export async function createAppBuilder() {
    return await $createAppBuilder({
        enviroment: AppEnviroment.Client,
        plugins: [ServiceBinderPlugin, EventMediatorPlugin, RpcPlugin, WebViewPlugin],
        appBuilderInherit: ClientAppBuilder,
    });
}

export * from './exports';
