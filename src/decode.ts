import { RADIX } from "./encode";

export function decode(value: any): any {
    if (!value?.d)
        return value;
    const map = value.$;
    const dateMin = parseInt(value.$$, RADIX);

    return dodecode(value.d);

    function dodecode(value: any): any {
        if (!Array.isArray(value) && typeof value === 'object' && value !== null) {
            if (value.$ !== undefined) {
                const keys = Object.keys(value).filter(key => key !== '$');
                const result = [];
                keys.forEach(key => value[key] = dodecode(value[key]));
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
                return Object.entries(value)
                    .reduce((result, [key, val]) => (result[getKey(key)] = dodecode(val), result), {} as any
                    );
            }
        } else if (Array.isArray(value)) {
            if (value[0] === '§') {
                return value.slice(1).map(e => {
                    if (typeof e == 'number')
                        return map[e];
                    if (typeof e == 'string')
                        return getKey(e);
                    return e;
                });
            } else
                return value.map(dodecode);
        } else if (typeof value === 'string')
            value = getKey(value);
        return value;
    }
    function getKey(key: string): string {
        if (key[0] == '§' && key[1] == '§')
            return new Date(dateMin + parseInt(key.substring(2), RADIX)).toISOString();
        return key[0] == '§' ? map[parseInt(key.substring(1), RADIX)] : key;
    }
}