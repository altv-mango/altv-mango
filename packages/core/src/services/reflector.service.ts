import { SetMetadata } from '../decorators';
import type { CreateDecoratorOptions, CreateDecoratorWithTransformOptions, ReflectableDecorator } from '../interfaces';
import type { Newable } from '../types';
import { generateRandomId, isEmpty, isObject } from '../utils';

export class Reflector {
    public get<TResult = unknown, TKey extends string | symbol = string>(
        metadataKey: TKey,
        target: Newable | Function,
    ) {
        return Reflect.getMetadata<TResult>(metadataKey, target);
    }

    public getAll<TResult extends unknown[] = unknown[], TKey extends string | symbol = string>(
        metadataKey: TKey,
        targets: (Newable | Function)[],
    ) {
        return <TResult>(targets || []).map((target) => this.get(metadataKey, target));
    }

    public getAllAndMerge<TResult extends unknown[] = unknown[], TKey extends string | symbol = string>(
        metadataKey: TKey,
        targets: (Newable | Function)[],
    ) {
        const metadataCollection = this.getAll<TResult, TKey>(metadataKey, targets).filter(
            (item) => item !== undefined,
        );

        if (isEmpty(metadataCollection)) return <TResult>metadataCollection;

        return <TResult>metadataCollection.reduce((a, b) => {
            if (Array.isArray(a)) {
                return a.concat(b);
            }
            if (isObject(a) && isObject(b)) {
                return {
                    ...a,
                    ...b,
                };
            }
            return [a, b];
        });
    }

    public getAllAndOverride<TResult = unknown, TKey extends string | symbol = string>(
        metadataKey: TKey,
        targets: (Newable | Function)[],
    ) {
        for (const target of targets) {
            const result = this.get(metadataKey, target);
            if (result !== undefined) return <TResult>result;
        }
        return undefined;
    }

    public static createDecorator<TParam>(options?: CreateDecoratorOptions<TParam>): ReflectableDecorator<TParam>;
    public static createDecorator<TParam, TTransformed>(
        options: CreateDecoratorWithTransformOptions<TParam, TTransformed>,
    ): ReflectableDecorator<TParam, TTransformed>;
    public static createDecorator<TParam, TTransformed = TParam>(
        options: CreateDecoratorOptions<TParam, TTransformed> = {},
    ): ReflectableDecorator<TParam, TTransformed> {
        const metadataKey = options.key ?? generateRandomId();
        const decoratorFn =
            (metadataValue: TParam) => (target: object | Function, key?: string | symbol, descriptor?: any) => {
                const value = options.transform ? options.transform(metadataValue) : metadataValue;
                SetMetadata(metadataKey, value ?? {})(target, key!, descriptor);
            };

        decoratorFn.KEY = metadataKey;
        return decoratorFn as ReflectableDecorator<TParam, TTransformed>;
    }
}
