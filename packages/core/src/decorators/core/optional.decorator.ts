import { optional } from 'inversify';

export function Optional() {
    return <PropertyDecorator | ParameterDecorator>((target: Object, propertyKey: string, paramIndex?: number) => {
        return optional()(target, propertyKey, paramIndex);
    });
}
