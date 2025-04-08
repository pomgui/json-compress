export function decode(value: any): any {
    if (!value?.d)
        return value;
    const map = value.$;
    return dodecode(value.d);

    function dodecode(value: any): any {
        if (!Array.isArray(value) && typeof value === 'object' && value !== null) {
            if (value.$ !== undefined) {
                const keys = Object.keys(value).filter(key => key !== '$');
                const result = [];
                const len = value[keys[0]].length;
                for (let i = 0; i < len; i++) {
                    const item: any = {};
                    for (const key of keys) {
                        item[getKey(key)] = dodecode(value[key][i]);
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
            return value.map(dodecode);
        } else if (typeof value === 'string')
            value = getKey(value);
        return value;
    }
    function getKey(key: string): string {
        return key[0] == '§' ? map[Number(key.substring(1))] : key;
    }
}