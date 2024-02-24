import type { CreateDecoratorOptions } from './create-decorator-options.interface';

export type CreateDecoratorWithTransformOptions<TParam, TTransformed = TParam> = CreateDecoratorOptions<
    TParam,
    TTransformed
> &
    Required<Pick<CreateDecoratorOptions<TParam, TTransformed>, 'transform'>>;
