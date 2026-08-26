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
    let compressed;
    let decompressed;

    test.each(testData)(`$name`, (td) => {
      data = { json: td.in, len: 0 };
      data.len = save('in', data.json);
      compressed = {
        json: jsonCompress.compress(data.json, opts),
        len: 0,
      };
      compressed.len = save('compressed', compressed.json);
      decompressed = { json: jsonCompress.decompress(compressed.json), len: 0 };
      decompressed.len = save('decompressed', decompressed.json || {});

      expect(decompressed.json).toStrictEqual(data.json);
    });
  });

  describe('Version control', () => {
    afterEach(() => {
      jest.resetModules();
    });
    test('compress version != decompress version', () => {
      let compressed;

      jest.isolateModules(() => {
        jest.doMock('../src/version', () => ({ VERSION: '2.0.0' }));
        const { jsonCompress } = require('../src/index');
        compressed = jsonCompress.compress({
          first: 'a repeated value',
          second: 'a repeated value',
        });
      });

      jest.isolateModules(() => {
        jest.doMock('../src/version', () => ({ VERSION: '1.0.0' }));
        const { jsonCompress } = require('../src/index');
        expect(() => jsonCompress.decompress(compressed)).toThrow(
          'Invalid compressed version',
        );
      });
    });
  });

  test('escapes control characters in JSON data', () => {
    const data = {
      $: '§',
      plain: '§0',
      dateLike: '§§abc',
      compressedArray: ['$1$oi\\$aqui*', '§', '\\$\\§', '$#', '$10@1'],
      nested: { $: 'literal key' },
      zero: { $: 0, value: 'ordinary object' },
    };

    const compressed = jsonCompress.compress(data);
    const decompressed = jsonCompress.decompress(compressed);
    expect(data).toStrictEqual(decompressed);
  });

  test.skip('test', async () => {
    const data = testData.find((t) => t.name == 'players/id/tournaments').in;
    const compressed = jsonCompress.compress(data);
    expect(data).toStrictEqual(jsonCompress.decompress(compressed));
  });
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
