import * as alt from 'alt-client';
import * as native from 'natives';

// isJumping
Object.defineProperty(alt.Player.prototype, 'isJumping', {
    get: function () {
        return native.isPedJumping(this);
    },
});

// isShooting
Object.defineProperty(alt.Player.prototype, 'isShooting', {
    get: function () {
        return native.isPedShooting(this);
    },
});

// headRotation
Object.defineProperty(alt.Player.prototype, 'headRotation', {
    get: function () {
        return (<alt.Player>this).headRot;
    },
});

// isInVehicle
Object.defineProperty(alt.Player.prototype, 'isInVehicle', {
    get: function () {
        return (<alt.Player>this).vehicle !== null;
    },
});

// isFlashlightActive
Object.defineProperty(alt.Player.prototype, 'isFlashlightActive', {
    get: function () {
        return (<alt.Player>this).flashlightActive;
    },
});

// isSuperJumpEnabled
Object.defineProperty(alt.Player.prototype, 'isSuperJumpEnabled', {
    get: function () {
        alt.logWarning('isSuperJumpEnabled is not implemented yet.');
        return false;
    },
});

// currentAnimationDict
Object.defineProperty(alt.Player.prototype, 'currentAnimationDict', {
    get: function () {
        alt.logWarning('currentAnimationDict is not implemented yet.');
        return 0;
    },
});

// currentAnimationName
Object.defineProperty(alt.Player.prototype, 'currentAnimationName', {
    get: function () {
        alt.logWarning('currentAnimationName is not implemented yet.');
        return '';
    },
});

// @ts-ignore
alt.Player.prototype.setFactory = function (factory: typeof alt.Player) {
    alt.logWarning(`Player.setFactory is not implemented yet.`);
};

// @ts-ignore
alt.Player.prototype.getFactory = function () {
    return alt.Player;
};
