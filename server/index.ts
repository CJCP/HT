import { readFileSync } from "fs";
import { resolve } from "path";
import sha1 from "sha1";
import { escape } from "./torrent-tools";
import { decode , encode} from "bencode";
import {pipe} from "lodash/fp";


interface Sha1Options {
  asBytes?: boolean;
  asString?: boolean;
}

interface Metadata {
  info: object;
  'url-list'?: Array<Buffer>;
}

const root = resolve('.');

/**
 *  Read torrent          | OK
 *  Decode torrent        | OK
 *  Extract info_hash     | OK
 *  Escape it             
 */

const torrentFile = readFileSync(root + '/torrent-files/pic.torrent');
const metadata: Metadata = decode(torrentFile);

if (!metadata) {
  // handle error
}

const {info} = metadata;
// const url_list = metadata['url-list'].toString().split(',');

if (!info) {
  // handle error
}

console.log(metadata);

const sha = (options: Sha1Options) => (msg: Buffer) => sha1(msg, options);

const info_hash: string = pipe([encode, sha({})])(info);

console.log('INFO_HASH : ', info_hash);
