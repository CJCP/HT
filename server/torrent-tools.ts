const A = 65;
const Z = 90;
const a = 97;
const z = 122;

const ZERO = 48;
const NINE = 57;

const UNDERSCORE = 95;
const DASH = 45;
const DOT = 46;
const TILDE = 126;

/**
    https://wiki.theory.org/index.php/BitTorrentSpecification

    Note that all binary data in the URL (particularly info_hash and peer_id) must be properly escaped. 
    this means any byte not in the set 0-9, a-z, A-Z, '.', '-', '_' and '~', must be encoded using the "%nn" format, 
    where nn is the hexadecimal value of the byte. (See RFC1738 for details.)
 */

export function escape(l: Buffer): string {
    return l.reduce((acc: string, v) => {
        const isAlpha = v >= A && v <= Z || v >= a && v <= z;
        const isNumber = v >= ZERO && v <= NINE;
        const isSpecialChars = v === UNDERSCORE || v === DOT || v === TILDE || v === DASH;
        if (isAlpha || isNumber || isSpecialChars) {
            return acc + String.fromCharCode(v);
        } else {
            return acc + `%${v.toString(16).padStart(2, '0')}`;
        }
    }, '');
}


/**
 * udp://tracker.coppersurfer.tk:6969
 * udp://tracker.opentrackr.org:1337/announce
 */

const DOMAIN_NAME = 2;
const PORT = 3;
const PATH = 4

interface TrackerInformations {
    address: string,
    port: string,
    path?: string 
}

export function parseUDPTracker(endpoint: string): TrackerInformations | null {
    const captured = endpoint.match(/(udp:\/\/)(.*):([0-9]*)(\/.*){0,1}/);
    // PORT AND DOMAIN_NAME ARE MANDATORY
    if (!captured || captured.length < 3) {
        return null;
    }
    return {
        address: captured[DOMAIN_NAME],
        port: captured[PORT],
        path: captured[PATH]
    };
}