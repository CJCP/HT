export const toBytes = (SHA1: string): string => {
    return new Uint8Array(SHA1.length / 2).map((e, i) => {
        const high = parseInt(SHA1[i], 16) << 4;
        const low = parseInt(SHA1[i + 1], 16);
        return high | low;
    }).toString();
}