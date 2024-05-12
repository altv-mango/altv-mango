import type { ExecutionContext } from '@altv-mango/server';
import type { ThrottlerOptions } from './throttler-options.interface';

export type ThrottlerModuleOptions =
    | Array<ThrottlerOptions>
    | {
          skipIf?: (context: ExecutionContext) => boolean | Promise<boolean>;
          errorMessage?: string;
          throttlers: Array<ThrottlerOptions>;
      };
