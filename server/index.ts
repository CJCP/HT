import parseTorrent from "parse-torrent";
import { readFileSync } from "fs";
import { get } from "https";
import fetch from "node-fetch";

console.log('Starting');

const test = 'magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent';
const test2 = readFileSync(__dirname + '/pic.torrent');

const torrent = parseTorrent(test2);


if (torrent.announce) {
  console.log(torrent.announce);
  fetch(`${torrent.announce[1]}?info_hash=${torrent.infoHash}`).then((res) => {
    return res.text();
  }).then((res) => {
    console.log(res);
  }).catch(console.warn);
}

console.log('End');