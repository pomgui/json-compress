import {
  A_BOOL,
  A_NULL,
  A_NUM,
  A_PREFIX,
  A_STR,
  MAP_VALID_TYPES,
  PIVOT_KEY,
  PROTOCOL_VERSION,
  RADIX,
  SHRINKED_ARR_PREFIX,
  TOKEN_DEF,
  TOKEN_LIKE_G,
  TOKEN_SEP,
} from './const';
import { TokenMap } from './tools/TokenMap';
import { MapValueKey } from './types';

export type CompressOptionsType = { insideStrings: true; shrinkArrays: true };

export function compress(
  value: any,
  opts: CompressOptionsType = { insideStrings: true, shrinkArrays: true },
): any {
  const map = new TokenMap(opts);
  const pivot = getpivot(value, map);
  map.finish();

  const result: any[] = [];
  let data = replaceKeyValue(pivot);
  if (opts.shrinkArrays) {
    data = shrinkAllArrays(data);
  }

  const tokens = map.getAllStringTokens();
  if (tokens) {
    result.push(`$${PROTOCOL_VERSION}:` + tokens);
  }
  const dateToken = map.getMinimalDateToken();
  if (dateToken) result.push(`$$${PROTOCOL_VERSION}:` + dateToken);

  if (!result.length) result.push('$');
  result.push(data);
  return result;

  function replaceKeyValue(value: any): any {
    const type = value === null ? 'null' : typeof value;
    if (Array.isArray(value)) {
      const arr = value.map(replaceKeyValue);
      // Se o array não tem nenhum number
      if (!arr.some((e) => typeof e == 'number')) {
        let c = 0;
        const arrCopy = arr.map((e) => {
          if (typeof e == 'string' && TOKEN_DEF.test(e[0])) {
            e = parseInt(e.substring(1), RADIX) as any;
            c++;
          }
          return e;
        });
        if (c > 1) {
          arrCopy.unshift('§');
          return arrCopy;
        }
      }
      return arr;
    } else if (type == 'object') {
      const newValue: any = {};
      const keys = Object.keys(value);
      for (let i = 0, len = keys.length; i < len; i++) {
        const key = keys[i];
        const val = value[key];
        const isPivot = key === PIVOT_KEY;
        const newkey = isPivot ? '$' : (map.getToken(key) as string); // key is string
        newValue[newkey] = replaceKeyValue(val);
      }
      return newValue;
    } else if (type == 'string') {
      const d = map.getDateToken(value);
      if (d !== undefined) return '§§' + d;
    } // there's no else
    if (
      type == 'boolean' ||
      type == 'null' ||
      type == 'number' ||
      (type == 'string' && !opts.insideStrings)
    ) {
      const token = map.getToken(value);
      if (token !== value) return token;
    } else if (type === 'string' && opts.insideStrings) {
      if (TOKEN_SEP.test(value)) {
        const newval = value.replace(TOKEN_LIKE_G, (g: string) =>
          map.getToken(g),
        );
        return newval;
      } else {
        return map.getToken(value);
      }
    }
    return value;
  }
}

const getpivot = (value: any, map: TokenMap): any => {
  if (Array.isArray(value)) {
    if (
      value.length > 1 &&
      typeof value[0] === 'object' &&
      value[0] !== null &&
      !Array.isArray(value[0])
    ) {
      const result: Record<string, any[]> = { [PIVOT_KEY]: 0 as any };
      // map.addKeyValue(PIVOT_KEY, result[PIVOT_KEY]);
      const keys = Object.keys(value[0]);
      for (let i = 0, len = keys.length; i < len; i++) {
        const key = keys[i];
        result[key] = value.map((item) => getpivot(item[key], map));
        map.addKeyValue(key, result[key]);
      }
      return result;
    } else {
      return value.map((item) => {
        const result = getpivot(item, map);
        map.addValue(result);
        return result;
      }) as any;
    }
  } else if (value instanceof Date) {
    const val = value.toISOString();
    map.addValue(val);
    return val;
  } else if (typeof value === 'object' && value !== null) {
    const result: Record<string, any> = {};
    const keys = Object.keys(value);
    for (let i = 0, len = keys.length; i < len; i++) {
      const key = keys[i];
      const val = value[key];
      result[key] = getpivot(val, map);
      map.addKeyValue(key, result[key]);
    }
    return result;
  }
  map.addValue(value);
  return value;
};

/** Search recursively the structure and compress every found array */
const shrinkAllArrays = (value: any): any => {
  if (typeof value !== 'object' || !value) return value;
  if (Array.isArray(value)) {
    const arr = value.map(shrinkAllArrays);
    return shrinkOneArray(arr);
  } else {
    const obj = {} as any;
    const keys = Object.keys(value);
    for (let i = 0, len = keys.length; i < len; i++) {
      const key = keys[i];
      obj[key] = shrinkAllArrays(value[key]);
    }
    return obj;
  }
};

const shrinkOneArray = <T extends MapValueKey>(arr: T[]): T[] => {
  const result: T[] = [];
  let i = 0;
  const n = arr.length;
  let shrinked = false;
  let normalLen = 0;
  let packedLen = 5; // initial "$#",

  while (i < n) {
    const curr: T = arr[i];
    const currType = curr === null ? 'null' : typeof curr;

    // Only consider strings, numbers, boolean, or null
    const type = MAP_VALID_TYPES[currType];
    if (type) {
      let count = 1;
      while (i + 1 < n && arr[i + 1] === curr) {
        count++;
        i++;
      }
      // Only consider a minumum of elements than surpasses the compressed prefix size
      // otherwise it does not worth it
      const currLen = String(curr).length;
      const currNormalLen = count * (currLen + (type == A_STR ? 3 : 1));
      const currPackedLen =
        6 + (type == A_BOOL ? 1 : type == A_NULL ? 0 : currLen);
      if (currNormalLen >= currPackedLen) {
        let newval: MapValueKey = curr;
        if (type == A_NUM) newval = (curr as number).toString(RADIX);
        else if (type == A_BOOL) newval = curr ? '1' : '0';
        else if (type == A_NULL) newval = '';
        const topush = `${A_PREFIX}${count}${type}${newval}`;
        result.push(topush as T);
        shrinked = true;
        normalLen += currNormalLen;
        packedLen += currPackedLen;
      } else {
        // It does not satisfy the shrinking condition, so copy all
        for (let i = 0; i < count; i++) result.push(curr);
      }
    } else result.push(curr);
    i++;
  }
  if (shrinked) {
    // Check if the shrinking worths it
    if (normalLen <= packedLen) return arr;
    result.unshift(SHRINKED_ARR_PREFIX as T);
  }

  return result;
};
