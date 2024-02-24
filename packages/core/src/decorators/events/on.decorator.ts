import type { EventMetadata, PipelineMetadata } from '../../app/interfaces';
import { CoreMetadataKey } from '../../app/enums';
import { isNil, isString } from '../../utils';
import { ErrorMessage } from '../../enums';

export function On(name?: string) {
    return <MethodDecorator>((target: Object, method: string) => {
        if (!isNil(name) && !isString(name)) {
            throw new Error(ErrorMessage.EventNameMustBeString);
        }

        name = name ?? method;

        const events =
            Reflect.getMetadata<Omit<EventMetadata, 'params' | keyof PipelineMetadata>[]>(
                CoreMetadataKey.ControllerEvents,
                target,
            ) ?? [];

        if (events.some((event) => event.method === method && event.name === name && event.type === 'on')) {
            throw new Error(ErrorMessage.EventNameMustBeUnique);
        }

        Reflect.defineMetadata<Omit<EventMetadata, 'params' | keyof PipelineMetadata>[]>(
            CoreMetadataKey.ControllerEvents,
            [...events, { method, name, type: 'on' }],
            target,
        );
    });
}
