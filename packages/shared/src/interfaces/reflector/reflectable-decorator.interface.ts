import type { CustomDecorator } from '../../types';

// @ts-ignore
export type ReflectableDecorator<TParam, TTransformed = TParam> = ((options?: TParam) => CustomDecorator) & {
    KEY: string;
};
