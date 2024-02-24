import { z } from 'zod';

export const ControllerOptionsSchema = z
    .object({
        prefix: z.string().optional().default(''),
    })
    .optional()
    .default({ prefix: '' });
