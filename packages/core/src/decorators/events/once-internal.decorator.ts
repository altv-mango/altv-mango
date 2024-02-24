import type { EventMetadata, PipelineMetadata } from '../../app/interfaces';
import { CoreMetadataKey } from '../../app/enums';
import { isString } from '../../utils';
import { ErrorMessage } from '../../enums';

export function OnceInternal(name: string) {
    return <MethodDecorator>((target: Object, method: string) => {
        if (!isString(name)) {
            throw new Error(ErrorMessage.EventNameMustBeString);
        }

        const events =
            Reflect.getMetadata<Omit<EventMetadata, 'params' | keyof PipelineMetadata>[]>(
                CoreMetadataKey.ControllerEvents,
                target,
            ) ?? [];

        if (events.some((event) => event.method === method && event.name === name && event.type === 'onceInternal')) {
            throw new Error(ErrorMessage.EventNameMustBeUnique);
        }

        Reflect.defineMetadata<Omit<EventMetadata, 'params' | keyof PipelineMetadata>[]>(
            CoreMetadataKey.ControllerEvents,
            [...events, { method, name, type: 'onceInternal' }],
            target,
        );
    });
}
