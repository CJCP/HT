import parseTorrent from "parse-torrent";
import { readFileSync } from "fs";
import { get } from "https";
import { resolve } from "path";
import fetch from "node-fetch";
import { decode } from "bencode";
console.log('Starting', encodeURI);

const root = resolve('.');

const test = 'magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent';
const test2 = readFileSync(root + '/torrent-files/pic.torrent');

const torrent = parseTorrent(test2);
const torrent2 = decode(test2, undefined, undefined, 'utf8');
console.log(torrent2);

if (torrent.announce) {
  var lo = '';
  console.log(torrent.announce, torrent.infoHash);
  if (torrent.infoHash) {
    torrent.infoHash = torrent.infoHash.toUpperCase();
  } 
  if (torrent.infoHashBuffer) {
    var d = Buffer.from(torrent.infoHashBuffer, 10)
    console.log('buffer  ? ',torrent.infoHashBuffer, torrent.infoHashBuffer.toString('base64'));
    lo = escape('\xfd\xa7\xa2<X\xec\x05#\x81\x10\x05x\xa5\n\x00\xd7r\xa4(<');
  }
  var params = encodeURI(`${torrent.infoHash}`);
  var peer_id = '12345678909876543210'
  var url = `${torrent.announce[0]}?info_hash=${lo}`;
  console.log(url);
  fetch(url).then((res) => {
    console.log(res);
    return res.arrayBuffer();
  }).then((res:any) => {
    console.log(decode(res));
    console.log(res);
  }).catch(console.warn);
}

console.log('End');