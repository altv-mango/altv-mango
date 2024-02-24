import { CoreMetadataKey, type EventMetadata, type PipelineMetadata } from '@altv-mango/shared/app';
import { ErrorMessage, isNil, isString } from '@altv-mango/shared';

export function OnServer(name?: string) {
    return <MethodDecorator>((target: Object, method: string) => {
        if (!isNil(name) && isString(name)) {
            throw new Error(ErrorMessage.EventNameMustBeString);
        }

        name = name ?? method;

        const events =
            Reflect.getMetadata<Omit<EventMetadata, 'params' | keyof PipelineMetadata>[]>(CoreMetadataKey.ControllerEvents, target) ?? [];

        if (events.some((event) => event.method === method && event.name === name && event.type === 'onServer')) {
            throw new Error(ErrorMessage.EventNameMustBeUnique);
        }

        Reflect.defineMetadata<Omit<EventMetadata, 'params' | keyof PipelineMetadata>[]>(
            CoreMetadataKey.ControllerEvents,
            [...events, { method, name, type: 'onServer' }],
            target,
        );
    });
}
