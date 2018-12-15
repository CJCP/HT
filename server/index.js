"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var parse_torrent_1 = __importDefault(require("parse-torrent"));
var fs_1 = require("fs");
var node_fetch_1 = __importDefault(require("node-fetch"));
console.log('Starting');
var test = 'magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent';
var test2 = fs_1.readFileSync(__dirname + '/pic.torrent');
var torrent = parse_torrent_1.default(test2);
if (torrent.announce) {
    console.log(torrent.announce);
    node_fetch_1.default(torrent.announce[1] + "?info_hash=" + torrent.infoHash).then(function (res) {
        return res.text();
    }).then(function (res) {
        console.log(res);
    }).catch(console.warn);
}
console.log('End');
