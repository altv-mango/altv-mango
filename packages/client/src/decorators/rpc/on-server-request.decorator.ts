import { CoreMetadataKey, type PipelineMetadata, type RPCMetadata } from '@altv-mango/shared/app';
import { ErrorMessage, isNil, isString } from '@altv-mango/shared';

export function OnServerRequest(name?: string) {
    return <MethodDecorator>((target: Object, method: string) => {
        if (!isNil(name) && isString(name)) {
            throw new Error(ErrorMessage.EventNameMustBeString);
        }

        name = name ?? method;

        const rpcs =
            Reflect.getMetadata<Omit<RPCMetadata, 'params' | keyof PipelineMetadata>[]>(CoreMetadataKey.ControllerRPCs, target) ?? [];

        if (rpcs.some((rpc) => rpc.method === method && rpc.name === name && rpc.type === 'onServerRequest')) {
            throw new Error(ErrorMessage.EventNameMustBeUnique);
        }

        Reflect.defineMetadata<Omit<RPCMetadata, 'params' | keyof PipelineMetadata>[]>(
            CoreMetadataKey.ControllerRPCs,
            [...rpcs, { method, name, type: 'onServerRequest' }],
            target,
        );
    });
}
