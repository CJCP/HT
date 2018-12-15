import { toBytes } from "./torrent-tools";

describe('Testing torrent-tools', () => {
    describe('toBytes', () => {
        test('should return 17', () => {
            const received = toBytes('11');
            const expected = '17'
            expect(received).toEqual(expected);
        })

        test('should return \'31\'', () => {
            const received = toBytes('1f')
        })
    })
})