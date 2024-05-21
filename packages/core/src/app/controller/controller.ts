import { injectable } from 'inversify';
import type { ControllerMetadata, ScriptEventHandler } from '../interfaces';
import type { Module } from '../module';
import type { ScriptRPCHandler } from '../../interfaces';

@injectable()
export class Controller {
    public metadata: ControllerMetadata;
    public instance: { [key: string]: Function };
    public owner: Module;
    public eventHandlers: ScriptEventHandler[] = [];
    public rpcHandlers: ScriptRPCHandler[] = [];
}
