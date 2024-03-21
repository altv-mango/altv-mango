import { isNil, isNumber, isString } from '../utils';
import { CoreMetadataKey, type PipelineMetadata, type RPCMetadata } from '../app';
import { ErrorMessage } from '../enums';

export function createRPCDecorator(type: RPCMetadata['type'], name?: string, webViewId?: string | number) {
    return <MethodDecorator>((target: Object, method: string) => {
        if (!isNil(webViewId) && !isString(webViewId) && !isNumber(webViewId)) {
            throw new Error(ErrorMessage.WebViewIdMustBeStringOrNumber);
        }

        if (!isNil(name) && !isString(name)) {
            throw new Error(ErrorMessage.RPCNameMustBeString);
        }

        name = name ?? method;

        const rpcs =
            Reflect.getMetadata<Omit<RPCMetadata, 'params' | keyof PipelineMetadata>[]>(CoreMetadataKey.ControllerRPCs, target) ?? [];

        if (rpcs.some((rpc) => rpc.method === method && rpc.name === name && rpc.type === type)) {
            throw new Error(ErrorMessage.RPCNameMustBeUnique);
        }

        Reflect.defineMetadata<Omit<RPCMetadata, 'params' | keyof PipelineMetadata>[]>(
            CoreMetadataKey.ControllerRPCs,
            [...rpcs, { method, name, type, webViewId }],
            target,
        );
    });
}
