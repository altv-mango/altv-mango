import { Container } from 'inversify';
import { APP_ENVIROMENT, INTERNAL_APP_CONTAINER, PLUGINS } from './constants';
import type { Newable } from '../types';
import type { MangoPlugin } from './interfaces';
import type { AppEnviroment } from './enums';
import type { AppBuilder } from './app-builder';

export async function createAppBuilder<T extends AppBuilder>({
    enviroment,
    plugins,
    appBuilderInherit,
}: {
    enviroment: AppEnviroment;
    plugins: Newable<MangoPlugin>[];
    appBuilderInherit: Newable<T>;
}) {
    const internalAppContainer = new Container();
    internalAppContainer.bind(INTERNAL_APP_CONTAINER).toConstantValue(internalAppContainer);
    internalAppContainer.bind(APP_ENVIROMENT).toConstantValue(enviroment);
    internalAppContainer.bind(PLUGINS).toConstantValue(plugins);
    internalAppContainer.bind(appBuilderInherit).toSelf().inSingletonScope();

    return internalAppContainer.get(appBuilderInherit);
}
