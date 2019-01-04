import { readFileSync } from "fs";
import { resolve } from "path";
import sha1 from "sha1";
import { decode , encode} from "bencode";
import {pipe} from "lodash/fp";

const root = resolve('.');

/**
 *  Read torrent          | OK
 *  Decode torrent        | OK
 *  Extract info_hash     | OK
 *  Escape it             
 */

const torrentFile = readFileSync(root + '/torrent-files/pic.torrent');
const metadata = decode(torrentFile);

if (!metadata) {
  // handle error
}

const {info, files} = metadata;

if (!info || !files) {
  // handle error
}

const info_hash = pipe([encode, sha1, escape])(info);

function escape(l: string) {
  console.log(l)
  return l;
}

