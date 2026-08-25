import { PROTOCOL_VERSION } from './const';

const ISO_DATE =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?(?:Z|[+-]\d{2}:?\d{2})$/;
const TOKEN_SEP_STR = '\\s.,;:!?-';
export const TOKEN_SEP = new RegExp(`[${TOKEN_SEP_STR}]+`);
export const TOKEN_LIKE = new RegExp(`[^${TOKEN_SEP_STR}]+`);
export const TOKEN_LIKE_G = new RegExp(`[^${TOKEN_SEP_STR}]+`, 'g');
export const TOKEN_DEF = new RegExp(`^§[^${TOKEN_SEP_STR}]+$`);

export const escapeText = (value: string): string =>
  value.replace(/[\\$§]/g, '\\$&');

export const RADIX = 36;
// Array shrinking constants:
export const A_PREFIX = '$'; // Inside each array item
export const SHRINKED_ARR_PREFIX = '$#'; // array[0]
export const TOKEN_MARK = '';
export const A_STR = '$';
export const A_BOOL = '@';
export const A_NUM = '#';
export const A_NULL = '*';
const PIVOT_KEY = '\u0000';

export function encode(
  value: any,
  opts = { insideStrings: true, shrinkArrays: true },
): any {
  // First convert the array of objects into object of arrays
  const valueMap = new Map<string | boolean | null, string>();
  const dateMap = new Map<string, string | number>();
  let dateMin: number | string = 0;

  const collect = createStringMap();
  const pivot = getpivot(value, collect.addKey, collect.addValue);
  collect.finish();
  const result: any[] = [];
  let data = replaceKeyValue(pivot);
  if (opts.shrinkArrays) {
    data = shrinkAllArrays(data);
  }

  if (valueMap.size > 0 || dateMap.size > 0) {
    if (valueMap.size > 0) {
      const $ = Array.from(valueMap.keys())
        .map((k) => {
          const t = getArrayTypeCh(k);
          return t + (t == A_NULL ? '' : escapeText(String(k)));
        })
        .join('');
      result.push(`$${PROTOCOL_VERSION}:` + $);
    }
    if (dateMap.size > 0)
      result.push(
        `$$${PROTOCOL_VERSION}:` + (dateMin as number).toString(RADIX),
      );
  } else result.push('$');
  result.push(data);
  return result;

  /** Process the object of arrays to populate the maps  */
  function createStringMap(): {
    addKey: (key: string, value: any) => void;
    addValue: (value: any) => void;
    finish: () => void;
  } {
    const map = new Map<
      string | boolean | null,
      { type: string; idx: number; num: number }
    >();

    const mapAdd = (val: string | boolean | null, keyval: 'key' | 'value') => {
      const isKey = keyval === 'key';
      const type = val === null ? 'null' : typeof val;
      if (
        ['string', 'boolean', 'null'].includes(type) &&
        (isKey || type == 'string' || /^\d+$/.test(val as string)) &&
        (type != 'string' || (val as string).length > 2)
      ) {
        if (opts.insideStrings && type == 'string') {
          const parts = (val as string).split(TOKEN_SEP);
          for (const part of parts) {
            let k = map.get(part);
            if (!k) map.set(part, (k = { type, idx: map.size, num: 0 }));
            k.num++;
          }
        } else {
          let k = map.get(val);
          if (!k) map.set(val, (k = { type, idx: map.size, num: 0 }));
          k.num++;
        }
      }
    };

    const addValue = (val: any): void => {
      if (typeof val == 'string' && ISO_DATE.test(val)) {
        const timestamp = new Date(val).getTime();
        if (!dateMin || (dateMin as number) > timestamp) dateMin = timestamp;
        dateMap.set(val, timestamp);
      } else {
        mapAdd(val, 'value');
      }
    };
    const addKey = (key: string, value: any): void => {
      mapAdd(key, 'key');
      addValue(value);
    };

    const finish = (): void => {
      // Create the valueMap selecting only the most used words
      // which compressed are smaller than the original string
      Array.from(map.entries())
        .map((a: any) => ((a[1].weight = a[1].num * String(a[0]).length), a))
        .sort((a, b) => b[1].weight - a[1].weight)
        .filter(
          ([key, val], i) =>
            val.weight >
            val.num * (i.toString(RADIX).length + 1) + String(key).length + 1,
        )
        .map(([key]) => key)
        .forEach((key, i) => valueMap.set(key, i.toString(RADIX)));

      // Use the date map, only if there are more than one date
      if (dateMap.size > 0) {
        for (const k of dateMap.keys())
          dateMap.set(
            k,
            ((dateMap.get(k)! as number) - (dateMin as number)).toString(RADIX),
          );
      }
    };
    return { addKey, addValue, finish };
  }

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
      for (const [key, val] of Object.entries(value)) {
        const k = valueMap.get(key);
        const isPivot = key === PIVOT_KEY;
        const newkey = isPivot
          ? '$'
          : k !== undefined
            ? '§' + k
            : escapeText(key);
        newValue[newkey] = replaceKeyValue(val);
      }
      return newValue;
    } else if (
      type == 'boolean' ||
      type == 'null' ||
      (type == 'string' && !opts.insideStrings)
    ) {
      const k = valueMap.get(value);
      if (k !== undefined) return '§' + k;
    } else if (type === 'string' && opts.insideStrings) {
      if (TOKEN_SEP.test(value)) {
        const newval = String(value).replace(TOKEN_LIKE_G, (g: string) => {
          const k = valueMap.get(g);
          if (k !== undefined) return '§' + k;
          else return escapeText(g);
        });
        return newval;
      } else {
        const k = valueMap.get(value);
        if (k !== undefined) return '§' + k;
        return escapeText(value);
      }
    }
    if (type == 'string') {
      const d = dateMap.get(value);
      if (d !== undefined) return '§§' + d;
    }
    return value;
  }
}

const getpivot = (
  value: any,
  addKey: (key: string, value: any) => void,
  addValue: (value: any) => void,
): any => {
  if (Array.isArray(value)) {
    if (
      value.length > 1 &&
      typeof value[0] === 'object' &&
      value[0] !== null &&
      !Array.isArray(value[0])
    ) {
      const result: Record<string, any[]> = { [PIVOT_KEY]: 0 as any };
      addKey(PIVOT_KEY, result[PIVOT_KEY]);
      for (const key of Object.keys(value[0])) {
        result[key] = value.map((item) =>
          getpivot(item[key], addKey, addValue),
        );
        addKey(key, result[key]);
      }
      return result;
    } else {
      return value.map((item) => {
        const result = getpivot(item, addKey, addValue);
        addValue(result);
        return result;
      }) as any;
    }
  } else if (value instanceof Date) {
    return value.toISOString() as any;
  } else if (typeof value === 'object' && value !== null) {
    const result: Record<string, any> = {};
    for (const [key, val] of Object.entries(value)) {
      result[key] = getpivot(val, addKey, addValue);
      addKey(key, result[key]);
    }
    return result;
  }
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
    for (const key in value) {
      obj[key] = shrinkAllArrays(value[key]);
    }
    return obj;
  }
};

const shrinkOneArray = <T extends string | boolean | number>(arr: T[]): T[] => {
  const result: T[] = [];
  let i = 0;
  const n = arr.length;
  let used = false;

  while (i < n) {
    const curr: T | string = arr[i];
    const currType = curr === null ? 'null' : typeof curr;
    // Only consider strings (or numbers)
    if (
      currType == 'number' ||
      currType == 'string' ||
      currType == 'boolean' ||
      currType == 'null'
    ) {
      let count = 1;
      while (i + 1 < n && arr[i + 1] === curr) {
        count++;
        i++;
      }
      // Only consider a minumum of elements than surpasses the compressed prefix size
      // otherwise it does not worth it
      const currLen = String(curr).length;
      const type = getArrayTypeCh(curr);
      if (
        count * (currLen + (type == A_STR ? 3 : 1)) >=
        9 + (type == A_BOOL ? 1 : type == A_NULL ? 0 : currLen)
      ) {
        let newval: any = curr;
        if (type == A_NUM) newval = curr.toString(RADIX);
        else if (type == A_BOOL) newval = curr ? '1' : '0';
        else if (type == A_NULL) newval = '';
        const topush = `${A_PREFIX}${count}${type}${newval}`;
        result.push(topush as T);
        used = true;
      } else {
        for (let i = 0; i < count; i++) result.push(curr);
      }
    } else result.push(curr);
    i++;
  }
  if (used) result.unshift(SHRINKED_ARR_PREFIX as T);

  return result;
};

const getArrayTypeCh = (val: string | null | number | boolean): string =>
  val === null ? A_NULL : { s: A_STR, n: A_NUM, b: A_BOOL }[(typeof val)[0]]!;
