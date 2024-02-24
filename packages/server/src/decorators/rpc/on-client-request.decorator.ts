import { CoreMetadataKey, type PipelineMetadata, type RPCMetadata } from '@altv-mango/core/app';
import { ErrorMessage, isNil, isString } from '@altv-mango/core';

export function OnPlayerRequest(name?: string) {
    return <MethodDecorator>((target: Object, method: string) => {
        if (!isNil(name) && isString(name)) {
            throw new Error(ErrorMessage.RPCNameMustBeString);
        }

        name = name ?? method;

        const rpcs =
            Reflect.getMetadata<Omit<RPCMetadata, 'params' | keyof PipelineMetadata>[]>(CoreMetadataKey.ControllerRPCs, target) ?? [];

        if (rpcs.some((rpc) => rpc.method === method && rpc.name === name && rpc.type === 'onPlayerRequest')) {
            throw new Error(ErrorMessage.RPCNameMustBeUnique);
        }

        Reflect.defineMetadata<Omit<RPCMetadata, 'params' | keyof PipelineMetadata>[]>(
            CoreMetadataKey.ControllerRPCs,
            [...rpcs, { method, name, type: 'onPlayerRequest' }],
            target,
        );
    });
}
