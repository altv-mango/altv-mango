import type { DynamicModule } from '../../interfaces';
import type { Newable } from '../../types';
import { Controller, ControllerMetadataReader } from '../controller';
import { Module, ModuleMetadataReader } from '../module';
import { inject, injectable } from 'inversify';
import { InternalLoggerService } from '../services';
import { ErrorMessage } from '../../enums';
import { Tree, TreeNode } from '../utils';

@injectable()
export class ModuleTreeScanner {
    @inject(ModuleMetadataReader) private readonly moduleMetadataReader: ModuleMetadataReader;
    @inject(ControllerMetadataReader) private readonly controllerMetadataReader: ControllerMetadataReader;
    @inject(InternalLoggerService) private readonly loggerService: InternalLoggerService;

    public async scan(classRef: Newable | DynamicModule | Promise<DynamicModule>) {
        const startTime = Date.now();
        // Read module metadata
        const moduleMetadata = await this.moduleMetadataReader.read(classRef);
        // Create module instance and set metadata to it
        const module = new Module();
        module.metadata = moduleMetadata;
        // Log module info
        this.loggerService.log(
            ['~lm~Scan', `~lb~${module.metadata.classRef.name}`],
            `~lw~Module scanned ~lk~(${Date.now() - startTime}ms)`,
        );
        // Scan controllers in module
        await this.scanControllers(module);
        // Scan controllers in module
        const moduleTree = new Tree(module);
        const scannedModules = new Set<Newable | DynamicModule | Promise<DynamicModule>>();
        scannedModules.add(classRef);
        // Scan imported modules
        for (const importedModule of moduleMetadata.imports) {
            await this.scanModules(moduleTree.root, importedModule, scannedModules);
        }
        return moduleTree;
    }

    private async scanModules(
        parentNode: TreeNode<Module>,
        classRef: Newable | DynamicModule | Promise<DynamicModule>,
        scannedModules = new Set<Newable | DynamicModule | Promise<DynamicModule>>(),
    ) {
        // Check if module is already imported
        if (scannedModules.has(classRef)) {
            return;
        }
        // Add module to imported modules set to prevent unnecessary scanning
        scannedModules.add(classRef);

        const startTime = Date.now();

        // Read module metadata
        const moduleMetadata = await this.moduleMetadataReader.read(classRef);
        // Create module instance
        const module = new Module();
        module.metadata = moduleMetadata;
        module.parent = parentNode.value;
        // Log module info
        this.loggerService.log(
            ['~lm~Scan', `~lb~${module.metadata.classRef.name}`],
            `~lw~Module scanned ~lk~(${Date.now() - startTime}ms)`,
        );
        // Scan controllers in module
        await this.scanControllers(module);
        // Check if there is a circular dependency
        this.checkCircularDependency(parentNode.value, module);
        // Add module to tree
        const treeNode = new TreeNode(module);
        parentNode.addChild(treeNode);
        // Scan imported modules recursively
        for (const importModule of moduleMetadata.imports) {
            await this.scanModules(treeNode, importModule, scannedModules);
        }
    }

    private async scanControllers(module: Module) {
        // Scan controllers
        for (const classRef of module.metadata.controllers) {
            const startTime = Date.now();
            const controllerMetadata = await this.controllerMetadataReader.read(classRef);
            const controller = new Controller();
            controller.metadata = controllerMetadata;
            controller.owner = module;
            module.controllers.push(controller);

            this.loggerService.log(['~lm~Scan', `~lc~${classRef.name}`], `~lw~Controller scanned ~lk~(${Date.now() - startTime}ms)`);
        }
    }

    private async checkCircularDependency(parentModule: Module, module: Module) {
        // Check if parent module is imported in module
        if (module.metadata.imports.includes(parentModule.metadata.classRef)) {
            this.loggerService.error('An error occurred while scanning the module tree.');
            throw new Error(ErrorMessage.CircularDependencyDetected);
        }
    }
}
