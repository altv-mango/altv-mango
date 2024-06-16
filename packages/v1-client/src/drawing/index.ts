import * as alt from 'alt-client';

export function drawText2dThisFrame(
    text: string,
    pos2d?: alt.IVector2,
    font?: alt.GameFont,
    scale?: number,
    color?: alt.RGBA,
    outline?: boolean,
    dropShadow?: boolean,
    textAlign?: alt.TextAlign,
) {
    alt.Utils.drawText2dThisFrame(text, pos2d, font, scale, color, outline, dropShadow, textAlign);
}

export function drawText2d(
    text: string,
    pos2d?: alt.IVector2,
    font?: alt.GameFont,
    scale?: number,
    color?: alt.RGBA,
    outline?: boolean,
    dropShadow?: boolean,
    textAlign?: alt.TextAlign,
) {
    alt.Utils.drawText2d(text, pos2d, font, scale, color, outline, dropShadow, textAlign);
}

export function drawText3dThisFrame(
    text: string,
    pos3d: alt.IVector3,
    font?: alt.GameFont,
    scale?: number,
    color?: alt.RGBA,
    outline?: boolean,
    dropShadow?: boolean,
    textAlign?: alt.TextAlign,
) {
    alt.Utils.drawText3dThisFrame(text, pos3d, font, scale, color, outline, dropShadow, textAlign);
}

export function drawText3d(
    text: string,
    pos3d: alt.IVector3,
    font?: alt.GameFont,
    scale?: number,
    color?: alt.RGBA,
    outline?: boolean,
    dropShadow?: boolean,
    textAlign?: alt.TextAlign,
) {
    alt.Utils.drawText3d(text, pos3d, font, scale, color, outline, dropShadow, textAlign);
}
