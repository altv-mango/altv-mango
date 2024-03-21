import type { DynamicModule, LoggerService } from '../../interfaces';
import type { Newable } from '../../types';
import { Controller, ControllerMetadataReader } from '../controller';
import { Module, ModuleMetadataReader } from '../module';
import { inject, injectable } from 'inversify';
import { ErrorMessage } from '../../enums';
import { Tree, TreeNode } from '../utils';
import { LOGGER_SERVICE } from '../../constants';
import type { ModuleMetadata } from '../interfaces';
import { isNil } from '../../utils';

@injectable()
export class ModuleTreeScanner {
    @inject(ModuleMetadataReader) private readonly moduleMetadataReader: ModuleMetadataReader;
    @inject(ControllerMetadataReader) private readonly controllerMetadataReader: ControllerMetadataReader;
    @inject(LOGGER_SERVICE) private readonly loggerService: LoggerService;

    public async scan(classRef: Newable | DynamicModule | Promise<DynamicModule>) {
        const startTime = Date.now();
        // Read module metadata
        const moduleMetadata = await this.moduleMetadataReader.read(classRef);
        // Create module instance and set metadata to it
        const module = new Module();
        module.metadata = moduleMetadata;
        // Log module info
        this.loggerService.log(`~lw~Module ~lb~${module.metadata.classRef.name} ~lw~scanned ~lk~(${Date.now() - startTime}ms)`);
        // Scan controllers in module
        await this.scanControllers(module);
        // Scan controllers in module
        const moduleTree = new Tree(module);
        const scannedModules = new Map<Newable | DynamicModule | Promise<DynamicModule>, Module>();
        scannedModules.set(classRef, module);
        // Scan imported modules
        for (const importedModule of moduleMetadata.imports) {
            await this.scanModules(moduleTree.root, importedModule, scannedModules);
        }
        return moduleTree;
    }

    private async scanModules(
        parentNode: TreeNode<Module>,
        classRef: Newable | DynamicModule | Promise<DynamicModule>,
        scannedModules = new Map<Newable | DynamicModule | Promise<DynamicModule>, Module>(),
    ) {
        // Check if module is already imported
        const scannedModule = scannedModules.get(classRef);
        if (!isNil(scannedModule)) {
            parentNode.value.repetitiveImports.add(scannedModule);
            return;
        }

        const startTime = Date.now();

        // Read module metadata
        const moduleMetadata = await this.moduleMetadataReader.read(classRef);
        // Check if there is a circular dependency
        this.checkCircularDependency(parentNode.value.metadata, moduleMetadata);
        // Create module instance
        const module = new Module();
        module.metadata = moduleMetadata;
        module.parent = parentNode.value;
        // Log module info
        this.loggerService.log(`~lw~Module ~lb~${module.metadata.classRef.name} ~lw~scanned ~lk~(${Date.now() - startTime}ms)`);
        // Scan controllers in module
        await this.scanControllers(module);
        // Add module to tree
        const treeNode = new TreeNode(module);
        parentNode.addChild(treeNode);
        // Add module to imported modules set to prevent unnecessary scanning
        scannedModules.set(classRef, module);
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

            this.loggerService.log(`~lw~Controller ~lc~${classRef.name} ~lw~scanned ~lk~(${Date.now() - startTime}ms)`);
        }
    }

    private async checkCircularDependency(parentMetadata: ModuleMetadata, moduleMetadata: ModuleMetadata) {
        // Check if parent module is imported in module
        if (moduleMetadata.imports.includes(parentMetadata.classRef)) {
            // this.loggerService.error('An error occurred while scanning the module tree.');
            throw new Error(ErrorMessage.CircularDependencyDetected);
        }
    }
}
