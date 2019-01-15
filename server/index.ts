import { readFileSync } from "fs";
import { resolve } from "path";
import sha1 from "sha1";
import { escape } from "./torrent-tools";
import { decode, encode } from "bencode";
import { pipe } from "lodash/fp";
// import fetch from "node-fetch";
import fetch from "./fetch-tools";


interface Sha1Options {
  asBytes?: boolean
  asString?: boolean
}

interface Info {
  collections: Array<Buffer>
  files: Array<Array<Object>>
  name: Buffer,
  'piece length': number
  pieces: Buffer
}

interface TrackerResponse {
  download: number
  incomplete: number
  interval: number
  'min interval': number
  peers: Buffer
}

interface Metadata {
  info: Info
  'url-list'?: Array<Buffer>
  announce: Buffer | Array<Buffer>
  'announce-list': Array<Array<Buffer>>
}

/***
 *    TOOLS
 */

function createTrackersURL(tracker: string, info_hash: string): string {
  const peer_id = '12345678901234567890';
  return `${tracker}?info_hash=${info_hash}&peer_id=${peer_id}`
}

const sha = (options: Sha1Options) => (msg: Buffer) => sha1(msg, options);


const root = resolve('.');

/** 
 *  Read torrent          | OK
 *  Decode torrent        | OK
 *  Extract info_hash     | OK
 *  Escape it             
 */

const torrentFile = readFileSync(root + '/torrent-files/hawai.torrent');
const metadata: Metadata = decode(torrentFile);

if (!metadata) {
  // handle error
}

const { info, announce } = metadata;
let announce_list;
let url_list: Array<string> = [];

if (metadata['announce-list']) {
  announce_list = metadata['announce-list'].toString().split(',');
}


if (metadata['url-list']) {
  url_list = metadata['url-list'].toString().split(',');
}

if (!info) {
  // handle error
}

const info_hash: string = pipe([encode, sha({ asBytes: true }), escape])(info);
const endpoint = createTrackersURL(announce.toString(), info_hash);

// console.log('METADATA : ', metadata);
console.log('URL_LIST : ', url_list);
console.log('ANNOUNCE : ', announce_list);
console.log('ANNOUNCE_LIST : ', announce_list);
console.log('TORRENT NAME : ', info.name.toString());
console.log('INFO_HASH : ', info_hash);
console.log('TRACKER ENDPOINT : ', endpoint)

fetch(endpoint)
  .then((body: Buffer) => {
    console.log('successed to call tracker : ', body);
    // return decode(body);
  }).then(trackerResponse => {
    console.log(trackerResponse);
  })
  .catch(err => console.log('failed to call tracker : ', err));


/**
 * udp://tracker.coppersurfer.tk:6969
 * udp://tracker.opentrackr.org:1337/announce
 */

function parseUDPTracker(endpoint: string) {

}