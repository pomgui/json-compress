const ISO_DATE = /^\d{4}-\d{2}-\d{2}/;
export const RADIX = 36;

export function encode(value: any): any {
  // First convert the array of objects into object of arrays
  const pivot = getpivot(value);
  const valueMap = new Map<string | boolean | null, string>();
  const dateMap = new Map<string, string | number>();
  let dateMin: number | string = 0;

  createStringMap(pivot);
  const ret = {} as any;
  if (valueMap.size > 0 || dateMap.size > 0) {
    if (dateMap.size > 0) ret.$$ = (dateMin as number).toString(RADIX);
    if (valueMap.size > 0) ret.$ = Array.from(valueMap.keys());
    ret.d = replaceKeyValue(pivot);
  } else ret.d = pivot;

  ret.d = shrinkAllArrays(ret.d);

  return ret;

  /** Process the object of arrays to populate the maps  */
  function createStringMap(value: any): void {
    const map = new Map<
      string | boolean,
      { type: string; idx: number; num: number }
    >();

    const mapAdd = (val: string | boolean, keyval: 'key' | 'value') => {
      const isKey = keyval === 'key';
      const type = val === null ? 'null' : typeof val;
      if (
        ['string', 'boolean', 'null'].includes(type) &&
        (isKey || type == 'string' || /^\d+$/.test(val as string)) &&
        (type != 'string' || (val as string).length > 2)
      ) {
        let k = map.get(val);
        if (!k) map.set(val, (k = { type, idx: map.size, num: 0 }));
        k.num++;
      }
    };

    JSON.stringify(value, (key, val) => {
      mapAdd(key, 'key');
      // It's an ISO Date, then convert it into a number and get the min date
      if (typeof val == 'string' && ISO_DATE.test(val)) {
        const date = new Date(val);
        const t = date.getTime();
        if (!dateMin || (dateMin as number) > t) dateMin = t;
        dateMap.set(val, t);
        return val;
      }
      mapAdd(val, 'value');
      return val;
    });

    // Cleanup the value map
    Array.from(map.entries())
      .filter((entry) => entry[1].num > 1)
      .sort(
        (a, b) =>
          b[1].num * String(b[0]).length - a[1].num * String(a[0]).length,
      )
      .map(([key, val]) => key)
      .filter((key, i) => String(key).length > i.toString(RADIX).length + 1)
      .forEach((key, i) => valueMap.set(key, i.toString(RADIX)));

    // Use the date map, only if there are more than one date
    if (dateMap.size > 0) {
      for (const k of dateMap.keys())
        dateMap.set(
          k,
          ((dateMap.get(k)! as number) - (dateMin as number)).toString(RADIX),
        );
    }
  }

  function replaceKeyValue(value: any): any {
    const type = value === null ? 'null' : typeof value;
    if (Array.isArray(value)) {
      const arr = value.map(replaceKeyValue);
      // Se o array não tem nenhum number
      if (!arr.some((e) => typeof e == 'number')) {
        let c = 0;
        const arrCopy = arr.map((e) => {
          if (typeof e == 'string' && e[0] == '§' && e[1] != '§') {
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
    } else if (type == 'object' && value !== null) {
      const newValue: any = {};
      for (const [key, val] of Object.entries(value)) {
        const k = valueMap.get(key);
        const newkey = k !== undefined ? '§' + k : key;
        newValue[newkey] = replaceKeyValue(val);
      }
      return newValue;
    }
    if (['string', 'boolean', 'null'].includes(type)) {
      const k = valueMap.get(value);
      if (k !== undefined) return '§' + k;
    }
    if (type === 'string') {
      const d = dateMap.get(value);
      if (d !== undefined) return '§§' + d;
    }
    return value;
  }
}

const getpivot = (value: any): any => {
  if (Array.isArray(value)) {
    if (
      value.length > 1 &&
      typeof value[0] === 'object' &&
      value[0] !== null &&
      !Array.isArray(value[0])
    ) {
      const result: Record<string, any[]> = { $: 0 as any };
      for (const key of Object.keys(value[0]))
        result[key] = value.map((item) => getpivot(item[key]));
      return result;
    } else return value.map(getpivot) as any;
  } else if (value instanceof Date) {
    return value.toISOString() as any;
  } else if (typeof value === 'object' && value !== null) {
    return Object.entries(value).reduce(
      (result, [key, val]) => ((result[key] = getpivot(val)), result),
      {} as any,
    );
  }
  return value;
};

const shrinkOneArray = <T extends string | boolean | number>(arr: T[]): T[] => {
  const result: T[] = [];
  let i = 0;
  const n = arr.length;
  let used = false;

  while (i < n) {
    const curr: T | string = arr[i];
    const currType = typeof curr;
    // Only consider strings (or numbers)
    if (currType == 'number' || currType == 'string' || currType == 'boolean') {
      let count = 1;
      while (i + 1 < n && arr[i + 1] === curr) {
        count++;
        i++;
      }
      // Only consider a minumum o elements than surpasses the compressed prefix size
      // otherwise it does not worth it
      const currLen = String(curr).length;
      const type = currType[0];
      if (
        count * (currLen + (type == 's' ? 3 : 1)) >=
        9 + (type == 'b' ? 1 : currLen)
      ) {
        let newval: any = curr;
        if (type == 'n') newval = curr.toString(RADIX);
        else if (type == 'b') newval = curr ? '1' : '0';
        const topush = `þ${count}${type}${newval}`;
        result.push(topush as T);
        used = true;
      } else {
        for (let i = 0; i < count; i++) result.push(curr);
      }
    } else result.push(curr);
    i++;
  }
  if (used) result.unshift('þ' as T);

  return result;
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
