import { CoreMetadataKey } from '../../app/enums';
import type { Newable } from '../../types';
import type { MethodParameter } from '../../app/interfaces';
import { MethodParamType } from '../../app/enums';
import { ErrorMessage } from '../../enums';

export function Request() {
    return <ParameterDecorator>((target: Object, method: string, index: number) => {
        const params = Reflect.getMetadata<MethodParameter[]>(CoreMetadataKey.ControllerParams, target, method) ?? [];

        if (params.some((param) => param.index === index)) {
            throw new Error(ErrorMessage.MultipleDecoratorsOnSingleParameterNotAllowed);
        }

        const paramTypes = Reflect.getMetadata<Newable[]>('design:paramtypes', target, method);
        const metatype = Array.isArray(paramTypes) ? paramTypes[index] : undefined;

        Reflect.defineMetadata<MethodParameter[]>(
            CoreMetadataKey.ControllerParams,
            [...params, { index, method, type: MethodParamType.Request, data: undefined, metatype }],
            target,
            method,
        );
    });
}

export function Req() {
    return Request();
}
