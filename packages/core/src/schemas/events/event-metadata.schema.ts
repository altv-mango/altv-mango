import { z } from 'zod';
import { EventParameterSchema } from './event-parameter.schema';

export const EventMetadataSchema = z.object({
    type: z.enum(['on', 'once', 'onClient', 'onceClient', 'onServer', 'onceServer']),
    name: z.string(),
    method: z.string(),
    params: z.array(EventParameterSchema).optional().default([]),
});
