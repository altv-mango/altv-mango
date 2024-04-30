import { z } from 'zod';
import { EventParameterSchema } from './event-parameter.validate';
import { isNil } from '../../utils';

export const EventMetadataSchema = z.object({
    type: z.enum(['on', 'once', 'onClient', 'onceClient', 'onServer', 'onceServer']),
    name: z.string(),
    method: z.string(),
    params: z.array(EventParameterSchema).optional().default([]),
});

export function validateEventMetadata(value: unknown) {
    if (isNil(value)) {
        return { valid: false, value };
    }
}
