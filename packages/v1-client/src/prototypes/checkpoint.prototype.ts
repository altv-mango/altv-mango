import type { CheckpointCreateOptions } from '@altv/client';
import * as alt from 'alt-client';

// @ts-ignore
alt.Checkpoint.prototype.isEntityIdIn = function (id: number) {
    const entity = alt.Entity.all.find((ent) => ent.id === id);
    if (!entity) return false;
    return this.isEntityIn(entity);
};

// @ts-ignore
alt.Checkpoint.create = function (options: CheckpointCreateOptions) {
    return new alt.Checkpoint(
        options.type as unknown as alt.CheckpointType,
        options.pos,
        options.nextPos,
        options.radius,
        options.height,
        options.color as alt.RGBA,
        options.iconColor as alt.RGBA,
        options.streamingDistance,
    );
};

// @ts-ignore
alt.Checkpoint.setFactory = function (factory: typeof alt.Checkpoint) {
    alt.logWarning(`Checkpoint.setFactory is not implemented yet.`);
};

// @ts-ignore
alt.Checkpoint.getFactory = function () {
    return alt.Checkpoint;
};
