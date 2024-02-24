import { injectable } from 'inversify';
import { Controller } from '../controller';
import type { ModuleMetadata } from '../interfaces';
import { ModuleContainer } from './module-container';

@injectable()
export class Module {
    public readonly container = new ModuleContainer();
    public readonly controllers: Controller[] = [];
    public parent: Module | undefined;
    public metadata: ModuleMetadata;
    public instance: { [key: string]: Function };
}
