const ISO_DATE = /^\d{4}-\d{2}-\d{2}/;
export function encode(value: any): any {
    const newval = getpivot(value);
    const valueMap = new Map<string | boolean, number>();
    const dateMap = new Map<string, number>();
    let dateMin: number | undefined = undefined;

    createMap(newval);
    const ret = {} as any;
    if (dateMin) ret.$$ = dateMin;
    if (valueMap.size > 0) {
        ret.$ = Array.from(valueMap.keys());
        ret.d = replaceKeyValue(newval);
    } else
        ret.d = newval;
    return ret;

    function createMap(value: any): void {
        const map = new Map<string | boolean, { type: string, idx: number; num: number }>();
        const add = (key: string | boolean) => {
            const type = typeof key;
            if (!['string', 'boolean'].includes(type)) return;
            if (type != 'string' || (key as string).length > 3) {
                let k = map.get(key);
                if (!k)
                    map.set(key, k = { type, idx: map.size, num: 0 });
                k.num++;
            }
        };

        JSON.stringify(value, (key, val) => {
            add(key);
            if (typeof val == 'string' && ISO_DATE.test(val)) {
                // Is an ISO Date
                const date = new Date(val);
                dateMap.set(val, date.getTime());
                return val;
            }
            add(val);
            return val;
        });

        // Cleanup the value map
        Array.from(map.entries())
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .filter(([key, val]) => val.num > 1)
            .sort((a, b) => b[1].num * String(b[0]).length - a[1].num * String(a[0]).length)
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .filter(([key, val], i) => String(key).length > i.toString().length + 1)
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .forEach(([key, val], i) => valueMap.set(key, i));

        // Use the date map, only if there are more than one date
        if (dateMap.size > 1) {
            dateMin = Math.min(...Array.from(dateMap.values()));
            for (const k of dateMap.keys())
                dateMap.set(k, dateMap.get(k)! - dateMin);
        }
    }

    function replaceKeyValue(value: any): any {
        if (Array.isArray(value)) {
            return value.map(replaceKeyValue);
        } else if (typeof value === 'object' && value !== null) {
            const newValue: any = {};
            for (const [key, val] of Object.entries(value)) {
                const k = valueMap.get(key);
                const newkey = k !== undefined ? '§' + k : key;
                newValue[newkey] = replaceKeyValue(val);
            }
            return newValue;
        }
        const type = typeof value;
        if (['string', 'boolean'].includes(type)) {
            const k = valueMap.get(value);
            if (k !== undefined)
                return '§' + k;
        }
        if (type === 'string') {
            const d = dateMap.get(value);
            if (d !== undefined)
                return '§D' + d;
        }

        return value;
    }

    function getpivot(value: any): any {
        if (Array.isArray(value)) {
            if (value.length > 1 &&
                typeof value[0] === 'object' &&
                value[0] !== null &&
                !Array.isArray(value[0])
            ) {
                return (Object.keys(value[0]) as any[])
                    .reduce((result, key) =>
                        (result[key] = value.map(item => getpivot(item[key])), result),
                        { $: 0 } as any as Record<string, any[]>
                    );
            } else
                return value.map(getpivot) as any;
        }
        else if (value instanceof Date) {
            return value.toISOString() as any;
        } else if (typeof value === 'object' && value !== null) {
            return Object.entries(value)
                .reduce((result, [key, val]) => (result[key] = getpivot(val), result), {} as any
                );
        }
        return value;
    }
}
