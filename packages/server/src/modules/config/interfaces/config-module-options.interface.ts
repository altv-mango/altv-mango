import type { ConfigFactory } from './config-factory.interface';
import type { DotenvExpandOptions } from 'dotenv-expand';

export interface ConfigModuleOptions {
    cache?: boolean;
    isGlobal?: boolean;
    ignoreEnvFile?: boolean;
    ignoreEnvVars?: boolean;
    envFilePath?: string | string[];
    validate?: (config: Record<string, any>) => Record<string, any>;
    validationSchema?: any;
    validationOptions?: Record<string, any>;
    load?: Array<ConfigFactory>;
    expandVariables?: boolean | DotenvExpandOptions;
}
