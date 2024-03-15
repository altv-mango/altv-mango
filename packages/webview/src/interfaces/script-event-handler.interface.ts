import type { Events as SharedEvents } from '@altv/shared';

export type ScriptEventHandler = Omit<SharedEvents.ScriptEventHandler, 'location' | 'eventType' | 'eventTypeName'>;
