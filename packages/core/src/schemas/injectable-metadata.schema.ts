import { z } from 'zod';

export const InjectableMetadataSchema = z
    .object({
        scope: z.enum(['transient', 'request', 'singleton']).default('singleton'),
    })
    .optional()
    .default({
        scope: 'singleton',
    });
