import { Inject, Injectable, Optional, isUndefined } from '@altv-mango/core';
import * as dotenv from 'dotenv';
import fs from 'fs';
import get from 'lodash/get';
import has from 'lodash/has';
import set from 'lodash/set';
import { Subject } from 'rxjs';
import { CONFIGURATION_TOKEN, VALIDATED_ENV_PROPNAME } from './config.constants';
import type { ConfigChangeEvent } from './interfaces/config-change-event.interface';
import type { NoInferType, Path, PathValue } from './types';

type ValidatedResult<WasValidated extends boolean, T> = WasValidated extends true ? T : T | undefined;

export interface ConfigGetOptions {
    infer: true;
}

type KeyOf<T> = keyof T extends never ? string : keyof T;

@Injectable()
export class ConfigService<K = Record<string, unknown>, WasValidated extends boolean = false> {
    private set isCacheEnabled(value: boolean) {
        this._isCacheEnabled = value;
    }

    private get isCacheEnabled(): boolean {
        return this._isCacheEnabled;
    }

    private readonly cache: Partial<K> = {} as any;
    private readonly _changes$ = new Subject<ConfigChangeEvent>();
    private _isCacheEnabled = false;
    private envFilePaths: string[] = [];

    public constructor(
        @Optional()
        @Inject(CONFIGURATION_TOKEN)
        private readonly internalConfig: Record<string, any> = {},
    ) {}

    public get changes$() {
        return this._changes$.asObservable();
    }

    public get<T = any>(propertyPath: KeyOf<K>): ValidatedResult<WasValidated, T>;
    public get<T = K, P extends Path<T> = any, R = PathValue<T, P>>(
        propertyPath: P,
        options: ConfigGetOptions,
    ): ValidatedResult<WasValidated, R>;
    public get<T = any>(propertyPath: KeyOf<K>, defaultValue: NoInferType<T>): T;
    public get<T = K, P extends Path<T> = any, R = PathValue<T, P>>(
        propertyPath: P,
        defaultValue: NoInferType<R>,
        options: ConfigGetOptions,
    ): Exclude<R, undefined>;
    public get<T = any>(propertyPath: KeyOf<K>, defaultValueOrOptions?: T | ConfigGetOptions, options?: ConfigGetOptions): T | undefined {
        const validatedEnvValue = this.getFromValidatedEnv(propertyPath);
        if (!isUndefined(validatedEnvValue)) {
            return validatedEnvValue;
        }
        const defaultValue =
            this.isGetOptionsObject(defaultValueOrOptions as Record<string, any>) && !options ? undefined : defaultValueOrOptions;

        const processEnvValue = this.getFromProcessEnv(propertyPath, defaultValue);
        if (!isUndefined(processEnvValue)) {
            return processEnvValue;
        }

        const internalValue = this.getFromInternalConfig(propertyPath);
        if (!isUndefined(internalValue)) {
            return internalValue;
        }

        return defaultValue as T;
    }

    public getOrThrow<T = any>(propertyPath: KeyOf<K>): Exclude<T, undefined>;
    public getOrThrow<T = K, P extends Path<T> = any, R = PathValue<T, P>>(
        propertyPath: P,
        options: ConfigGetOptions,
    ): Exclude<R, undefined>;
    public getOrThrow<T = any>(propertyPath: KeyOf<K>, defaultValue: NoInferType<T>): Exclude<T, undefined>;
    public getOrThrow<T = K, P extends Path<T> = any, R = PathValue<T, P>>(
        propertyPath: P,
        defaultValue: NoInferType<R>,
        options: ConfigGetOptions,
    ): Exclude<R, undefined>;
    public getOrThrow<T = any>(
        propertyPath: KeyOf<K>,
        defaultValueOrOptions?: T | ConfigGetOptions,
        options?: ConfigGetOptions,
    ): Exclude<T, undefined> {
        // @ts-expect-error Bypass method overloads
        const value = this.get(propertyPath, defaultValueOrOptions, options) as T | undefined;

        if (isUndefined(value)) {
            throw new TypeError(`Configuration key "${propertyPath.toString()}" does not exist`);
        }

        return value as Exclude<T, undefined>;
    }

    public set<T = any>(propertyPath: KeyOf<K>, value: T): void {
        const oldValue = this.get(propertyPath);
        set(this.internalConfig, propertyPath, value);

        if (typeof propertyPath === 'string') {
            process.env[propertyPath] = String(value);
            this.updateInterpolatedEnv(propertyPath, String(value));
        }

        if (this.isCacheEnabled) {
            this.setInCacheIfDefined(propertyPath, value);
        }

        this._changes$.next({
            path: propertyPath as string,
            oldValue,
            newValue: value,
        });
    }

    public setEnvFilePaths(paths: string[]): void {
        this.envFilePaths = paths;
    }

    private getFromCache<T = any>(propertyPath: KeyOf<K>, defaultValue?: T): T | undefined {
        const cachedValue = get(this.cache, propertyPath);
        return isUndefined(cachedValue) ? defaultValue : (cachedValue as unknown as T);
    }

    private getFromValidatedEnv<T = any>(propertyPath: KeyOf<K>): T | undefined {
        const validatedEnvValue = get(this.internalConfig[VALIDATED_ENV_PROPNAME], propertyPath);
        return validatedEnvValue as unknown as T;
    }

    private getFromProcessEnv<T = any>(propertyPath: KeyOf<K>, defaultValue: any): T | undefined {
        if (this.isCacheEnabled && has(this.cache as Record<any, any>, propertyPath)) {
            const cachedValue = this.getFromCache(propertyPath, defaultValue);
            return !isUndefined(cachedValue) ? cachedValue : defaultValue;
        }
        const processValue = get(process.env, propertyPath);
        this.setInCacheIfDefined(propertyPath, processValue);

        return processValue as unknown as T;
    }

    private getFromInternalConfig<T = any>(propertyPath: KeyOf<K>): T | undefined {
        const internalValue = get(this.internalConfig, propertyPath);
        return internalValue;
    }

    private setInCacheIfDefined(propertyPath: KeyOf<K>, value: any): void {
        if (typeof value === 'undefined') {
            return;
        }
        set(this.cache as Record<any, any>, propertyPath, value);
    }

    private isGetOptionsObject(options: Record<string, any> | undefined): options is ConfigGetOptions {
        return options && options?.['infer'] && Object.keys(options).length === 1;
    }

    private updateInterpolatedEnv(propertyPath: string, value: string) {
        let config: ReturnType<typeof dotenv.parse> = {};
        for (const envFilePath of this.envFilePaths) {
            if (fs.existsSync(envFilePath)) {
                config = Object.assign(dotenv.parse(fs.readFileSync(envFilePath)), config);
            }
        }

        const regex = new RegExp(`\\$\\{?${propertyPath}\\}?`, 'g');
        for (const [k, v] of Object.entries(config)) {
            if (regex.test(v)) {
                process.env[k] = v.replace(regex, value);
            }
        }
    }
}
