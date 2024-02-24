import { z } from 'zod';
import { CoreMetadataKey } from '../../app/enums';
import type { Newable } from '../../types';
import { PipeSchema } from '../../schemas';
import type { MethodParameter } from '../../app/interfaces';
import { MethodParamType } from '../../app/enums';
import { isString } from '../../utils';
import { ErrorMessage } from '../../enums';
import type { Pipe } from '../../interfaces';

export function Param(key: string, ...pipes: Newable<Pipe>[]) {
    return <ParameterDecorator>((target: object, method: string, index: number) => {
        if (!isString(key)) {
            throw new Error(ErrorMessage.ParamKeyMustBeString);
        }
        if (!z.array(PipeSchema).safeParse(pipes).success) {
            throw new Error(ErrorMessage.InvalidPipeDefinition);
        }

        const params = Reflect.getMetadata<MethodParameter[]>(CoreMetadataKey.ControllerParams, target, method) ?? [];

        if (params.some((param) => param.index === index)) {
            throw new Error(ErrorMessage.MultipleDecoratorsOnSingleParameterNotAllowed);
        }

        const paramTypes = Reflect.getMetadata<Newable[]>('design:paramtypes', target, method);
        const metatype = Array.isArray(paramTypes) ? paramTypes[index] : undefined;

        Reflect.defineMetadata<MethodParameter[]>(
            CoreMetadataKey.ControllerParams,
            [...params, { index, method, data: key, pipes, type: MethodParamType.Param, metatype }],
            target,
            method,
        );
    });
}
