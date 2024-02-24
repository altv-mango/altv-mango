import { CoreMetadataKey } from '../../app/enums';
import type { PipelineMetadata, RPCMetadata } from '../../app/interfaces';
import { ErrorMessage } from '../../enums';
import { isNil, isString } from '../../utils';

export function OnRequest(name?: string) {
    return <MethodDecorator>((target: Object, method: string) => {
        if (!isNil(name) && isString(name)) {
            throw new Error(ErrorMessage.RPCNameMustBeString);
        }

        name = name ?? method;

        const rpcs =
            Reflect.getMetadata<Omit<RPCMetadata, 'params' | keyof PipelineMetadata>[]>(
                CoreMetadataKey.ControllerRPCs,
                target,
            ) ?? [];

        if (rpcs.some((rpc) => rpc.method === method && rpc.name === name && rpc.type === 'onRequest')) {
            throw new Error(ErrorMessage.RPCNameMustBeUnique);
        }

        Reflect.defineMetadata<Omit<RPCMetadata, 'params' | keyof PipelineMetadata>[]>(
            CoreMetadataKey.ControllerRPCs,
            [...rpcs, { method, name, type: 'onRequest' }],
            target,
        );
    });
}
