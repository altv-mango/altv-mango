import type { EventEmmiter, ScriptEventHandler } from '@altv-mango/core/app';

export interface ClientEventEmmiter extends EventEmmiter {
    emitServer(eventName: string, ...args: any[]): void;
    onServer(eventName: string, listener: (...args: any[]) => void): ScriptEventHandler;
    onceServer(eventName: string, listener: (...args: any[]) => void): ScriptEventHandler;
    offServer(eventName: string, listener: (...args: any[]) => void): void;
}