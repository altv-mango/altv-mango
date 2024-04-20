import * as altClient from 'alt-client';

export function doesTextureExistInArchetype(modelNameOrHash: number | string, textureName: string) {
    if (typeof modelNameOrHash === 'string') modelNameOrHash = altClient.hash(modelNameOrHash);
    return altClient.isTextureExistInArchetype(modelNameOrHash, textureName);
}

export function requestIpl(iplName: string) {
    altClient.requestIpl(iplName);
}

export function removeIpl(iplName: string) {
    altClient.removeIpl(iplName);
}

export function loadDefaultIpls() {
    altClient.loadDefaultIpls();
}

export function loadModel(modelNameOrHash: number | string, isAsync?: boolean) {
    if (typeof modelNameOrHash === 'string') modelNameOrHash = altClient.hash(modelNameOrHash);
    if (isAsync) {
        altClient.loadModelAsync(modelNameOrHash);
    } else {
        altClient.loadModel(modelNameOrHash);
    }
}

export function loadYtyp(ytyp: string) {
    altClient.loadYtyp(ytyp);
}

export function unloadYtyp(ytyp: string) {
    altClient.unloadYtyp(ytyp);
}
