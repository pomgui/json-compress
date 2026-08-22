import { RADIX } from './encode';

export function decode(value: any): any {
  if (!value?.d) return value;
  const map = value.$;
  const dateMin = parseInt(value.$$, RADIX);
  const d = expandAllArrays(value.d);

  return dodecode(d);

  function dodecode(value: any): any {
    if (!Array.isArray(value) && typeof value === 'object' && value !== null) {
      if (value.$ !== undefined) {
        const keys = Object.keys(value).filter((key) => key !== '$');
        const result = [];
        keys.forEach((key) => (value[key] = dodecode(value[key])));
        const len = value[keys[0]].length;
        for (let i = 0; i < len; i++) {
          const item: any = {};
          for (const key of keys) {
            item[getKey(key)] = value[key][i];
          }
          result.push(item);
        }
        return result;
      } else {
        return Object.entries(value).reduce(
          (result, [key, val]) => (
            (result[getKey(key)] = dodecode(val)),
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
          return dodecode(e);
        });
      } else return value.map(dodecode);
    } else if (typeof value === 'string') value = getKey(value);
    return value;
  }
  function getKey(key: string): string {
    if (key[0] == '§' && key[1] == '§')
      return new Date(
        dateMin + parseInt(key.substring(2), RADIX),
      ).toISOString();
    return key[0] == '§' ? map[parseInt(key.substring(1), RADIX)] : key;
  }
}

const expandAllArrays = (value: any): any => {
  if (typeof value !== 'object' || !value) return value;
  if (Array.isArray(value)) {
    const arr = Array(value.length);
    for (let i = 0; i < value.length; i++) arr[i] = expandAllArrays(value[i]);
    if (arr[0] !== 'þ') return arr;
    else return expandOneArray(arr);
  } else {
    const obj = {} as any;
    for (const key in value) obj[key] = expandAllArrays(value[key]);
    return obj;
  }
};

const expandOneArray = <T = any>(arr: T[]): T[] => {
  const result: T[] = [];
  for (let i = 1; i < arr.length; i++) {
    if (typeof arr[i] !== 'string' || (arr[i] as string)[0] !== 'þ') {
      result.push(arr[i]);
    } else {
      const encoded = (arr[i] as string).substring(1);
      const g = /^(\d+)([nsb])(.*)$/.exec(encoded);
      const count = parseInt(g![1]);
      const value = (
        g![2] == 'n'
          ? parseInt(g![3], RADIX) // number
          : g![2] == 'b'
            ? g![3] == '1' // true|false
            : g![3]
      ) as T;
      for (let i = 0; i < count; i++) result.push(value);
    }
  }
  return result;
};
