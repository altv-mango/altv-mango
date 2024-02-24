import { injectable } from 'inversify';
import type { ControllerMetadata } from '../interfaces';
import type { Module } from '../module';
import type { Events } from '@altv/shared';
import type { ScriptRPCHandler } from '../../interfaces';

@injectable()
export class Controller {
    public metadata: ControllerMetadata;
    public instance: { [key: string]: Function };
    public owner: Module;
    public eventHandlers: Events.EventHandler[] = [];
    public rpcHandlers: ScriptRPCHandler[] = [];
}
