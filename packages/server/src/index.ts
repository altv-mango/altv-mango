import '@abraham/reflection';
import { createAppBuilder as $createAppBuilder, AppBuilder, AppEnviroment } from '@altv-mango/core/app';
import { RPCPlugin, ServiceBinderPlugin } from './plugins';
import type { ErrorFilter, Guard, Interceptor } from './interfaces';

class ServerAppBuilder extends AppBuilder<Guard, Interceptor, ErrorFilter> {}

export async function createAppBuilder() {
    return await $createAppBuilder({
        enviroment: AppEnviroment.Server,
        plugins: [ServiceBinderPlugin, RPCPlugin],
        appBuilderInherit: ServerAppBuilder,
    });
}

export * from './exports';

import './extension.d.ts';
