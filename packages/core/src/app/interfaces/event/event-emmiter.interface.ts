import type { ScriptEventHandler } from "./script-event-handler.interface";

export interface EventEmmiter {
    emit(eventName: string, ...args: any[]): void;
    on(eventName: string, listener: (...args: any[]) => void): ScriptEventHandler;
    once(eventName: string, listener: (...args: any[]) => void): ScriptEventHandler;
    off(eventName: string, listener: (...args: any[]) => void): void;
}