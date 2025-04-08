const {encode }= require('../dist/encode');
const {decode} = require('../dist/decode');
const {testData} = require('./data');

describe(`encode`, () => {

    test(`simple array`, () => {
        expect(encode([{
            id: 1,
            name: 'name1'
        }, {
            id: 2,
            name: 'name2'
        }])).toMatchObject({
            d: {
                $: 0,
                id: [1, 2],
                name: ['name1', 'name2']
            }
        });
    });

    test(`complex`, () => {
        const _in = testData[0].in;
        const out = encode(_in);
        const newin = decode(out);
        expect(newin).toMatchObject(_in);
    });

    test.each(testData)('encode', (data) => {
        const lenIn = JSON.stringify(data.in).length;
        const out = encode(data.in);
        const lenOut = JSON.stringify(out).length;
        process.stdout.write(`lenIn: ${lenIn}, lenOut: ${lenOut}\n`);
        expect(lenOut).toBeLessThan(lenIn);
        expect(out).toMatchObject(data.out);
    });

    test.each(testData)('decode', (data) => {
        const out = decode(data.out);
        expect(out).toMatchObject(data.in);
    });
});