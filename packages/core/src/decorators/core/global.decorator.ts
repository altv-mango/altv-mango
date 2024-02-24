import { CoreMetadataKey } from '../../app/enums';
import type { Newable } from '../../types';

export function Global<T extends Newable>() {
    return (target: T) => {
        Reflect.defineMetadata(CoreMetadataKey.GlobalModule, true, target);
        return target;
    };
}
