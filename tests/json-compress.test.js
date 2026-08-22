const { jsonCompress } = require('../dist/index');
const { testData } = require('./data');
const fs = require('fs');

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

  test.each(testData)(
    'decode(encode($name)) returns the original value',
    (data) => {
      const out = jsonCompress.decode(data.out);
      expect(out).toMatchObject(data.in);
    },
  );

  test(`Shrinking arrays`, () => {
    // prettier-ignore
    const _in = [ 1235, 1235, 1235, 1235, 1235, 1235, 259874, 259874, 259874, 259874, 259874, 259874, 259874, 259874, 'academy', 'academy', 'academy', 'academy', 'academy', 'academy', 'academy', 'academy', 123, 'academy'];
    const out = jsonCompress.encode(_in);
    const newin = jsonCompress.decode(out);
    expect(out).toStrictEqual({
      $: ['academy'],
      d: ['þ', 'þ6nyb', 'þ8n5kiq', 'þ8c§0', 123, '§0'],
    });
    expect(newin).toMatchObject(_in);
  });

  test.only('test', () => {
    const td = testData.find((t) => t.name == 'players/id/tournaments');
    const _in = td.in;
    const out1 = td.out;
    const out2 = jsonCompress.encode(_in);
    fs.writeFileSync('/tmp/in.json', JSON.stringify(_in), 'utf8');
    fs.writeFileSync('/tmp/out1.json', JSON.stringify(out1), 'utf8');
    fs.writeFileSync('/tmp/out2.json', JSON.stringify(out2), 'utf8');
    // process.stdout.write(JSON.stringify(out));
    const newin = jsonCompress.decode(out2);
    fs.writeFileSync('/tmp/in2.json', JSON.stringify(newin), 'utf8');
    expect(newin).toMatchObject(_in);
  });
});
