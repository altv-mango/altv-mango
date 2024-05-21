import type { EventEmmiter, ScriptEventHandler } from '@altv-mango/core/app';
import type { MultiplayerPlayer } from '../multiplayer';

export interface ServerEventEmmiter extends EventEmmiter {
    emitPlayer(player: MultiplayerPlayer, eventName: string, ...args: any[]): void;
    emitAllPlayersRaw(eventName: string, ...args: any[]): void;
    emitAllPlayersUnreliableRaw(eventName: string, ...args: any[]): void;
    onPlayer(eventName: string, listener: (...args: any[]) => void): ScriptEventHandler;
    oncePlayer(eventName: string, listener: (...args: any[]) => void): ScriptEventHandler;
    offPlayer(eventName: string, listener: (...args: any[]) => void): void;
}