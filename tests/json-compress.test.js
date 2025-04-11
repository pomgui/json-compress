const {jsonCompress }= require('../dist/index');
const {testData} = require('./data');

describe(`encode`, () => {

    test.each(testData)(`Equal IN and decode(encode($name))`, (data) => {
        const _in = data.in;
        const out = jsonCompress.encode(_in);
        const newin = jsonCompress.decode(out);
        expect(newin).toMatchObject(_in);
    });

    test.each(testData)('encode($name) return the expected value', (data) => {
        const lenIn = JSON.stringify(data.in).length;
        const out = jsonCompress.encode(data.in);
        const lenOut = JSON.stringify(out).length;
        process.stdout.write(`lenIn: ${lenIn}, lenOut: ${lenOut}\n`);
        expect(lenOut).toBeLessThanOrEqual(lenIn);
        expect(out).toMatchObject(data.out);
    });

    test.each(testData)('decode(encode($name)) returns the original value', (data) => {
        const out = jsonCompress.decode(data.out);
        expect(out).toMatchObject(data.in);
    });
});