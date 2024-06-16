import type { ColShapeCreateOptions, Enums } from '@altv/client';
import * as alt from 'alt-client';
import { ColShapeType } from '../enums';

// @ts-ignore
alt.Colshape.prototype.isEntityIdIn = function (id: number) {
    const entity = alt.Entity.all.find((ent) => ent.id === id);
    if (!entity) return false;
    return this.isEntityIn(entity);
};

// @ts-ignore
alt.Colshape.create = function (options: ColShapeCreateOptions) {
    if (options.colShapeType === (ColShapeType.SPHERE as unknown as Enums.ColShapeType.SPHERE)) {
        return new alt.ColshapeSphere(options.pos.x, options.pos.y, options.pos.z, options.radius);
    } else if (options.colShapeType === (ColShapeType.CIRCLE as unknown as Enums.ColShapeType.CIRCLE)) {
        return new alt.ColshapeCircle(options.pos.x, options.pos.y, options.radius);
    } else if (options.colShapeType === (ColShapeType.CUBOID as unknown as Enums.ColShapeType.CUBOID)) {
        return new alt.ColshapeCuboid(options.pos1.x, options.pos1.y, 0, options.pos2.x, options.pos2.y, options.pos2.z);
    } else if (options.colShapeType === (ColShapeType.RECT as unknown as Enums.ColShapeType.RECT)) {
        return new alt.ColshapeRectangle(options.x1, options.y1, options.x2, options.y2);
    } else if (options.colShapeType === (ColShapeType.CYLINDER as unknown as Enums.ColShapeType.CYLINDER)) {
        return new alt.ColshapeCylinder(options.pos.x, options.pos.y, options.pos.z, options.radius, options.height);
    } else if (options.colShapeType === (ColShapeType.POLYGON as unknown as Enums.ColShapeType.POLYGON)) {
        return new alt.ColshapePolygon(options.minZ, options.maxZ, options.points);
    }
};

// @ts-ignore
alt.Colshape.setFactory = function (factory: typeof alt.Colshape) {
    alt.logWarning(`Colshape.setFactory is not implemented yet.`);
};

// @ts-ignore
alt.Colshape.getFactory = function () {
    return alt.Colshape;
};
