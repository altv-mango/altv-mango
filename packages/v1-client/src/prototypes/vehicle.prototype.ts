import * as alt from 'alt-client';
import * as native from 'natives';

Object.defineProperty(alt.Vehicle.prototype, 'neon', {
    get: function () {
        return {
            left: native.getVehicleNeonEnabled((<alt.Vehicle>this).scriptID, 0),
            right: native.getVehicleNeonEnabled((<alt.Vehicle>this).scriptID, 1),
            front: native.getVehicleNeonEnabled((<alt.Vehicle>this).scriptID, 2),
            back: native.getVehicleNeonEnabled((<alt.Vehicle>this).scriptID, 3),
        };
    },
});

Object.defineProperty(alt.Vehicle.prototype, 'driver', {
    get: function () {
        return (<alt.Vehicle>this).netOwner;
    },
});

Object.defineProperty(alt.Vehicle.prototype, 'isDestroyed', {
    get: function () {
        return native.isVehicleDriveable((<alt.Vehicle>this).scriptID, false);
    },
});

Object.defineProperty(alt.Vehicle.prototype, 'modKitsCount', {
    get: function () {
        return native.getNumModKits((<alt.Vehicle>this).scriptID);
    },
});

Object.defineProperty(alt.Vehicle.prototype, 'modKit', {
    get: function () {
        return native.getVehicleModKit((<alt.Vehicle>this).scriptID);
    },
});
