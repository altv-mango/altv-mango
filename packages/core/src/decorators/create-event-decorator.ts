import { ErrorMessage, isNil, isString } from '..';
import { CoreMetadataKey, type EventMetadata, type PipelineMetadata } from '../app';

export function createEventDecorator(type: EventMetadata['type'], name?: string, webViewId?: string | number) {
    return <MethodDecorator>((target: object, method: string) => {
        if (!isNil(name) && !isString(name)) {
            throw new Error(ErrorMessage.EventNameMustBeString);
        }

        name = name ?? method;

        const events =
            Reflect.getMetadata<Omit<EventMetadata, 'params' | keyof PipelineMetadata>[]>(CoreMetadataKey.ControllerEvents, target) ?? [];

        if (events.some((event) => event.method === method && event.name === name && event.type === type)) {
            throw new Error(ErrorMessage.EventNameMustBeUnique);
        }

        Reflect.defineMetadata<Omit<EventMetadata, 'params' | keyof PipelineMetadata>[]>(
            CoreMetadataKey.ControllerEvents,
            [...events, { method, name, type, webViewId }],
            target,
        );
    });
}
