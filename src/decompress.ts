// prettier-ignore
import {
  A_BOOL,
  A_NULL,
  A_NUM,
  A_PREFIX,
  A_STR,
  RADIX,
  SHRINKED_ARR_PREFIX,
  TOKEN_DEF,
  TOKEN_LIKE_G,
  TOKEN_SEP,
} from './compress';
import { PROTOCOL_VERSION } from './const';

const TYPES = A_STR + A_BOOL + A_NUM + A_NULL;
const MAP_RE = new RegExp(`([${TYPES}])([^${TYPES}]*)`, 'g');
const VERSION_RE = new RegExp(`^\\$\\$?${PROTOCOL_VERSION}(:.+)?$`);

export function decompress(value: any): any {
  // If it's not an compressed object, returns it "as is"
  if (!value || !Array.isArray(value) || !String(value[0]).startsWith('$'))
    return value;

  if (!VERSION_RE.test(value[0]))
    throw new Error(`@pomgui/json-compress: Invalid compressed version!`);
  const map: (string | number | boolean | null)[] = getmap(value[0]);
  let next = !map.length ? 0 : 1;
  const dateMin = String(value[next]).startsWith(`$$${PROTOCOL_VERSION}:`)
    ? parseInt(value[next].substring(3 + PROTOCOL_VERSION.length), RADIX)
    : 0;
  next = map.length && dateMin ? 2 : 1;
  const d = expandAllArrays(value[next]);

  return dodecompress(d);

  function getmap(map: string): (string | number | boolean | null)[] {
    // A map exists only if the first element is "$:xxxxx", otherwise there's no map
    if (!map.startsWith(`$${PROTOCOL_VERSION}:`)) return [];
    map = map.substring(2 + PROTOCOL_VERSION.length);
    const result = [];
    for (const g of Array.from(map.matchAll(MAP_RE))) {
      result.push(
        g[1] == A_NUM
          ? Number(g[2])
          : g[1] == A_BOOL
            ? Boolean(g[2])
            : g[1] == A_NULL
              ? null
              : /*g[1] == A_STR */ g[2],
      );
    }
    return result.map((entry) =>
      typeof entry === 'string' ? unescapeText(entry) : entry,
    );
  }

  function dodecompress(value: any): any {
    if (!Array.isArray(value) && typeof value === 'object' && value !== null) {
      if (value.$ !== undefined) {
        const keys = Object.keys(value).filter((key) => key !== '$');
        const result = [];
        keys.forEach((key) => (value[key] = dodecompress(value[key])));
        const len = value[keys[0]].length;
        for (let i = 0; i < len; i++) {
          const item: any = {};
          for (const key of keys) {
            item[getKey(key) as string] = value[key][i];
          }
          result.push(item);
        }
        return result;
      } else {
        return Object.entries(value).reduce(
          (result, [key, val]) => (
            (result[getKey(key) as string] = dodecompress(val)),
            result
          ),
          {} as any,
        );
      }
    } else if (Array.isArray(value)) {
      if (value[0] === '§') {
        return value.slice(1).map((e) => {
          if (typeof e == 'number') return map[e];
          if (typeof e == 'string') return getKey(e);
          return dodecompress(e);
        });
      } else return value.map(dodecompress);
    } else if (typeof value === 'string') value = getKey(value);
    return value;
  }
  function getKey(key: string): string | number | boolean | null {
    if (TOKEN_SEP.test(key))
      return key.replace(TOKEN_LIKE_G, (g) =>
        TOKEN_DEF.test(g)
          ? (map[parseInt(g.substring(1), RADIX)] as string)
          : g,
      );
    else if (key[0] == '§' && key[1] == '§')
      return new Date(
        dateMin + parseInt(key.substring(2), RADIX),
      ).toISOString();
    else
      return key[0] == '§'
        ? map[parseInt(key.substring(1), RADIX)]
        : unescapeText(key);
  }

  function unescapeText(value: string): string {
    return value.indexOf('\\') < 0 ? value : value.replace(/\\([\\$§])/g, '$1');
  }
}

const expandAllArrays = (value: any): any => {
  if (typeof value !== 'object' || !value) return value;
  if (Array.isArray(value)) {
    const arr = Array(value.length);
    for (let i = 0; i < value.length; i++) arr[i] = expandAllArrays(value[i]);
    if (arr[0] !== SHRINKED_ARR_PREFIX) return arr;
    else return expandOneArray(arr);
  } else {
    const obj = {} as any;
    for (const key in value) obj[key] = expandAllArrays(value[key]);
    return obj;
  }
};

const ARR_SHRINK_RE = new RegExp(
  `^\\${A_PREFIX}(\\d+)([${A_STR + A_NUM + A_BOOL + A_NULL}])(.*)$`,
);
const expandOneArray = <T = any>(arr: T[]): T[] => {
  const result: T[] = [];
  for (let i = 1; i < arr.length; i++) {
    const e = arr[i] as string;
    let g: RegExpMatchArray | null;
    if (typeof e !== 'string' || !(g = e.match(ARR_SHRINK_RE))) {
      result.push(e as T);
    } else {
      const [, q, t, v] = g;
      const count = parseInt(q);
      const value: string | boolean | number | null = (() => {
        switch (t) {
          case A_NUM:
            return parseInt(v, RADIX); // number
          case A_BOOL:
            return v == '1'; // true|false
          case A_NULL:
            return null; // true|false
          default:
            return v; // string
        }
      })();
      for (let i = 0; i < count; i++) result.push(value as T);
    }
  }
  return result;
};
