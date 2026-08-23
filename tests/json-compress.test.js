const { jsonCompress } = require('../dist/index');
const { testData } = require('./data');
const fs = require('fs');

describe.each(testData)(`@pomgui/json-compress`, (td) => {
  let data;
  let encoded;
  let decoded;
  describe.each([
    { insideStrings: false, shrinkArrays: false },
    { insideStrings: false, shrinkArrays: true },
    { insideStrings: true, shrinkArrays: false },
    { insideStrings: true, shrinkArrays: true },
  ])(`Opts combination: %s`, (opts) => {
    beforeAll(() => {
      data = { json: td.in, len: 0 };
      data.len = save('in', data.json);
      encoded = {
        json: jsonCompress.encode(data.json, opts),
        len: 0,
      };
      encoded.len = save('encoded', encoded.json);
      decoded = { json: jsonCompress.decode(encoded.json), len: 0 };
      decoded.len = save('decoded', decoded.json || {});
    });
    test(`in == decode(encode(in)) // ${td.name}`, () => {
      expect(data.json).toStrictEqual(decoded.json);
    });
  });

  //   test.only('test', async () => {
  //     const data = await readUrl(
  //       `https://files.jsons.live/Amazon/1-level/1-KB/minified.json`,
  //     );
  //     const encoded = { json: jsonCompress.encode(data), len: 0 };
  //     encoded.len = save('encoded', encoded.json);
  //   });
});

async function readUrl(url) {
  const response = await fetch(url);
  const text = await response.text();
  return JSON.parse(text);
}

function save(file, json) {
  const str = JSON.stringify(json);
  fs.writeFileSync(`/tmp/${file}-min.json`, str, 'utf8');
  fs.writeFileSync(
    `/tmp/${file}-nrm.json`,
    JSON.stringify(json, null, 2),
    'utf8',
  );
  return str.length;
}
