import { injectable } from 'inversify';
import { Controller } from '../controller';
import type { ModuleMetadata } from '../interfaces';
import { ModuleContainer } from './module-container';

@injectable()
export class Module {
    public readonly controllers: Controller[] = [];
    public container: ModuleContainer;
    public parent: Module | undefined;
    public metadata: ModuleMetadata;
    public instance: { [key: string]: Function };
    public imports: Set<Module> = new Set();
}
