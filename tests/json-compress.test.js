const {jsonCompress }= require('../dist/index');
const {testData} = require('./data');

describe(`encode`, () => {

    test(`simple array`, () => {
        expect(jsonCompress.encode([{
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
        const out = jsonCompress.encode(_in);
        const newin = jsonCompress.decode(out);
        expect(newin).toMatchObject(_in);
    });

    test.each(testData)('encode', (data) => {
        const lenIn = JSON.stringify(data.in).length;
        const out = jsonCompress.encode(data.in);
        const lenOut = JSON.stringify(out).length;
        process.stdout.write(`lenIn: ${lenIn}, lenOut: ${lenOut}\n`);
        expect(lenOut).toBeLessThan(lenIn);
        expect(out).toMatchObject(data.out);
    });

    test.each(testData)('decode', (data) => {
        const out = jsonCompress.decode(data.out);
        expect(out).toMatchObject(data.in);
    });
});