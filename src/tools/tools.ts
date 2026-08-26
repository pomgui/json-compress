import { A_NULL, MAP_VALID_TYPES } from '../const';
import { MapValueKey } from '../types';

const ESCAPE_CHARS = new Set('\\$@#*§'.split(''));

// Searching manually, as it's 1.89x faster than the regexp version (running in 53% of the time).
// export const escapeText1 = (value: string): string =>
//  value.replace(/[\\$@#*§]/g, '\\$&');
export const escapeText = (value: string): string => {
  let ret = '';
  let i = 0,
    len = value.length;
  while (i < len) {
    let p: number;
    for (p = i; p < len && !ESCAPE_CHARS.has(value[p]); p++);
    if (p < len) {
      ret += value.substring(i, p) + '\\' + value[p];
      i = p + 1;
    } else {
      ret += value.substring(i);
      i = len;
    }
  }
  return ret;
};

// Using regex, as the performance difference compared to manual search is negligible
export const unescapeText = (value: string): string => {
  return value.indexOf('\\') < 0
    ? value
    : value.replace(/\\([\\$@#*§])/g, '$1');
};

export const getArrayTypeCh = (val: MapValueKey): string =>
  val === null ? A_NULL : MAP_VALID_TYPES[typeof val]!;

// export const perfOf = (f: Function, n = 10_000) => {
//   const start = performance.now();
//   while (n--) f();
//   const end = performance.now();
//   const time = end - start;
//   console.log(`Time: ${time.toFixed(2)}ms`);
// };
