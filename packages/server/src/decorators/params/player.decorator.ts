import { CoreMetadataKey, MethodParamType, type MethodParameter } from '@altv-mango/shared/app';
import { ErrorMessage, type Newable, type Pipe } from '@altv-mango/shared';

export function Player(key?: string, ...pipes: Newable<Pipe>[]) {
    return <ParameterDecorator>((target: Object, method: string, index: number) => {
        const params = Reflect.getMetadata<MethodParameter[]>(CoreMetadataKey.ControllerParams, target, method) ?? [];

        if (params.some((param) => param.index === index)) {
            throw new Error(ErrorMessage.MultipleDecoratorsOnSingleParameterNotAllowed);
        }

        const paramTypes = Reflect.getMetadata<Newable[]>('design:paramtypes', target, method);
        const metatype = Array.isArray(paramTypes) ? paramTypes[index] : undefined;

        Reflect.defineMetadata<MethodParameter[]>(
            CoreMetadataKey.ControllerParams,
            [...params, { index, method, pipes, type: MethodParamType.Player, data: key, metatype }],
            target,
            method,
        );
    });
}
