import * as compressJson from 'compress-json';
import * as compressedJson from 'compressed-json';
import jsonpack from 'jsonpack';
import * as jsonCompress from '../../dist/index';

export const engines = [
  {
    name: 'compressed-json',
    suffix: 'cj',
    run: compressedJson.compress,
  },
  {
    name: 'compress-json',
    suffix: 'cj2',
    run: compressJson.compress,
  },
  {
    name: 'jsonpack',
    suffix: 'jp',
    run: jsonpack.pack,
  },
  {
    name: '@pomgui/json-compress',
    suffix: 'pg',
    run: jsonCompress.compress,
  },
];
