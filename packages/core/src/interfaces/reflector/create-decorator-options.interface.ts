export interface CreateDecoratorOptions<TParam = unknown, TTransformed = TParam> {
    key?: string;
    transform?: (value: TParam) => TTransformed;
}
