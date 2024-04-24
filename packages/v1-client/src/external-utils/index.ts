export function jenkinsOneAtATimeHashSigned(key: string) {
    const keyLowered = key.toLowerCase();
    const length = keyLowered.length;
    let hash, i;

    for (hash = i = 0; i < length; i++) {
        hash += keyLowered.charCodeAt(i);
        hash += hash << 10;
        hash ^= hash >>> 6;
    }

    hash += hash << 3;
    hash ^= hash >>> 11;
    hash += hash << 15;

    return hash;
}

export function jenkinsOneAtATimeHashSignedCase(key: string) {
    const length = key.length;
    let hash, i;

    for (hash = i = 0; i < length; i++) {
        hash += key.charCodeAt(i);
        hash += hash << 10;
        hash ^= hash >>> 6;
    }

    hash += hash << 3;
    hash ^= hash >>> 11;
    hash += hash << 15;

    return hash;
}

export function convertToUnsigned(value: number) {
    return value >>> 0;
}
