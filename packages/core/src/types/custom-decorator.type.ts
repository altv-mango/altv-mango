export type CustomDecorator<TKey = string> = MethodDecorator &
    ClassDecorator & {
        KEY: TKey;
    };
