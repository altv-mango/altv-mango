import { CoreMetadataKey, type TimerMetadata } from '../app';
import { ErrorMessage } from '../enums';
import { isNil, isString } from '../utils';

export function createTimerDecorator(type: TimerMetadata['type'], name?: string, options?: TimerMetadata['options']) {
    return <MethodDecorator>((target: Object, method: string) => {
        if (!isNil(name) && !isString(name)) {
            throw new Error(ErrorMessage.TimerNameMustBeString);
        }

        name = name ?? method;

        const timers = Reflect.getMetadata<TimerMetadata[]>(CoreMetadataKey.Timers, target) ?? [];

        if (timers.some((timer) => timer.method === method && timer.name === name && timer.type === type)) {
            throw new Error(ErrorMessage.EventNameMustBeUnique);
        }

        Reflect.defineMetadata<TimerMetadata[]>(
            CoreMetadataKey.Timers,
            [...timers, <TimerMetadata>{ method, name, type, options }],
            target,
        );
    });
}
