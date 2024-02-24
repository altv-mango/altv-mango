import type { Events } from '@altv/shared';

export type ScriptEventHandler = Omit<Events.ScriptEventHandler, 'location' | 'eventType' | 'eventTypeName'>;
