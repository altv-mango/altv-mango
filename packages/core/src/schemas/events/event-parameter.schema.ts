import { z } from 'zod';
import { PipeSchema } from './pipe.schema';

export const EventParameterSchema = z.object({
    key: z.string().optional(),
    index: z.number(),
    pipes: z.array(PipeSchema),
});
