import { escape, parseUDPTracker } from "./torrent-tools";

describe('Testing torrent-tools', () => {
    describe('escape function', () => {
        test('should return %7c%d3P%e5%a7%0f%0aaY%3eceC%f9%fcg%0f%fa%8aM', () => {
            const buffer = new Buffer([0x7c, 0xd3, 0x50, 0xe5, 0xa7, 0x0f, 0x0a, 0x61, 0x59, 0x3e, 0x63, 0x65, 0x43, 0xf9, 0xfc, 0x67, 0x0f, 0xfa, 0x8a, 0x4d])
            const escapedB = escape(buffer);
            expect(escapedB).toEqual('%7c%d3P%e5%a7%0f%0aaY%3eceC%f9%fcg%0f%fa%8aM');
        })

        test('should return %9a%813%3c%1b%16%e4%a8%3c%10%f3%05%2c%15%90%aa%df%5e.%2', () => {
            const buffer = new Buffer([0x9a, 0x81, 0x33, 0x3c, 0x1b, 0x16, 0xe4, 0xa8, 0x3c, 0x10, 0xf3, 0x05, 0x2c, 0x15, 0x90, 0xaa, 0xdf, 0x5e, 0x2e, 0x20]);
            const escapedB = escape(buffer);
            expect(escapedB).toEqual("%9a%813%3c%1b%16%e4%a8%3c%10%f3%05%2c%15%90%aa%df%5e.%20");
        })
    })

    describe('parseUDPTracker function', () => {
        test('should return null when we send an incorrect tracker', () => {
            const parsed = parseUDPTracker('randomString...-_-');
            expect(parsed).toEqual(null);
        })


        test('should return port, address property', () => {
            let address: string = '', port: string = '';
            const parsed = parseUDPTracker('udp://tracker.coppersurfer.tk:6969');

            if (parsed) {
                ({ address, port } = parsed);
            }

            expect(address).toEqual('tracker.coppersurfer.tk');
            expect(port).toEqual('6969');
        })

        test('should return path property', () => {
            let path: string | undefined = '';
            const parsed = parseUDPTracker('udp://tracker.opentrackr.org:1337/announce');

            if (parsed && parsed.path) {
                ({ path } = parsed);
            }

            expect(path).toEqual('/announce');
        })
    })
})