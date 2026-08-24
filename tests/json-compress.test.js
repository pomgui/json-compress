const { jsonCompress } = require('../dist/index');
const { testData } = require('./data');
const fs = require('fs');

describe('@pomgui/json-compress', () => {
  describe.each([
    { insideStrings: false, shrinkArrays: false },
    { insideStrings: false, shrinkArrays: true },
    { insideStrings: true, shrinkArrays: false },
    { insideStrings: true, shrinkArrays: true },
  ])(`Opts combination: %s`, (opts) => {
    let data;
    let encoded;
    let decoded;
    test.each(testData)(`$name`, (td) => {
      data = { json: td.in, len: 0 };
      data.len = save('in', data.json);
      encoded = {
        json: jsonCompress.encode(data.json, opts),
        len: 0,
      };
      encoded.len = save('encoded', encoded.json);
      decoded = { json: jsonCompress.decode(encoded.json), len: 0 };
      decoded.len = save('decoded', decoded.json || {});

      expect(data.json).toStrictEqual(decoded.json);
    });
  });

  describe('Version control', () => {
    afterEach(() => {
      jest.resetModules();
    });
    test('encode version != decode version', () => {
      let encoded;

      jest.isolateModules(() => {
        jest.doMock('../src/version', () => ({ VERSION: '2.0.0' }));
        const { jsonCompress } = require('../src/index');
        encoded = jsonCompress.encode({
          first: 'a repeated value',
          second: 'a repeated value',
        });
      });

      jest.isolateModules(() => {
        jest.doMock('../src/version', () => ({ VERSION: '1.0.0' }));
        const { jsonCompress } = require('../src/index');
        expect(() => jsonCompress.decode(encoded)).toThrow(
          'Invalid encoded version',
        );
      });
    });
  });

  //   test.only('test', async () => {
  //     const data = await readUrl(
  //       `https://github.com/antonmedv/json-examples/raw/refs/heads/master/data_50mb.json`,
  //     );
  //     const encoded = { json: jsonCompress.encode(data.json), len: 0 };
  //     encoded.len = save('encoded', encoded.json);
  //   });
});

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
