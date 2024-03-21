export function applyDecorators(...decorators: (ClassDecorator | MethodDecorator | PropertyDecorator)[]) {
    return <TFunction extends Function, Y>(
        target: TFunction | Object,
        propertyKey: string | symbol,
        descriptor: TypedPropertyDescriptor<Y>,
    ) => {
        for (const decorator of decorators) {
            if (target instanceof Function && !descriptor) {
                (<ClassDecorator>decorator)(target);
                continue;
            }
            (<MethodDecorator | PropertyDecorator>decorator)(target, propertyKey, descriptor);
        }
    };
}
