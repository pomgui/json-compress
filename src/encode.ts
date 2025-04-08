export function encode(value: any): any {
    const newval = getpivot(value);
    const map = createMap(newval);
    if (map.size > 0) {
        const replaced = replaceKeyValue(newval);
        const keys = Array.from(map.entries());
        return {
            $: keys.map(k => k[0]),
            d: replaced
        } as any;
    } else
        return {
            d: newval
        } as any;

    function createMap(value: any): Map<string, number> {
        const map = new Map<string, { idx: number; num: number }>();
        const add = (key: string) => {
            if (key.length > 3) {
                let k = map.get(key);
                if (!k)
                    map.set(key, k = { idx: map.size, num: 0 });
                k.num++;
            }
        };

        JSON.stringify(value, (key, val) => {
            add(key);
            if (typeof val == 'string')
                add(val);
            return val;
        });
        return new Map(Array.from(map.entries())
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .filter(([key, val]) => val.num > 1)
            .sort((a, b) => b[1].num * b[0].length - a[1].num * a[0].length)
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .filter(([key, val], i) => key.length > i.toString().length + 1)
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .map(([key, val], i) => [key, i])
        );
    }

    function replaceKeyValue(value: any): any {
        if (Array.isArray(value)) {
            return value.map(replaceKeyValue);
        } else if (typeof value === 'object' && value !== null) {
            const newValue: any = {};
            for (const [key, val] of Object.entries(value)) {
                const k = map.get(key);
                const newkey = k !== undefined ? '§' + k : key;
                newValue[newkey] = replaceKeyValue(val);
            }
            return newValue;
        }
        if (typeof value === 'string') {
            const k = map.get(value);
            return k !== undefined ? '§' + k : value;
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
