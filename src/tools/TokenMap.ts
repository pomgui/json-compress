import { CompressOptionsType } from '../compress';
import {
  A_BOOL,
  A_NULL,
  A_NUM,
  MAP_VALID_TYPES,
  RADIX,
  TOKEN_SEP,
} from '../const';
import { MapValueKey } from '../types';
import { escapeText, getArrayTypeCh } from './tools';

const ISO_DATE =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?(?:Z|[+-]\d{2}:?\d{2})$/;

type MapValueType = {
  type: string;
  count: number;
  weight?: number;
  idx?: number;
  idxs?: string;
};

export class TokenMap {
  private _valueMap = new Map<MapValueKey, MapValueType>();
  private _dateMap = new Map<string, { time: number; str?: string }>();
  private _dateMin = Infinity;

  getAllStringTokens() {
    return Array.from(this._valueMap.entries())
      .sort((a, b) => a[1].idx! - b[1].idx!)
      .map(([k, v]) => {
        const t = getArrayTypeCh(k);
        switch (t) {
          case A_NULL:
            return t;
          case A_NUM:
            return t + (k as number).toString(RADIX);
          case A_BOOL:
            return t + Number(k);
          default:
            return t + escapeText(k as string);
        }
      })
      .join('');
  }

  getMinimalDateToken() {
    return this._dateMap.size ? this._dateMin.toString(RADIX) : '';
  }

  getDateToken(s: string) {
    return this._dateMap.get(s)?.str;
  }

  getToken<T extends MapValueKey>(val: T): T | string {
    const k = this._valueMap.get(val)?.idxs;
    return k ? '§' + k : typeof val == 'string' ? escapeText(val) : val;
  }

  constructor(private _opts: CompressOptionsType) {}

  addValue(val: any): void {
    const type = val === null ? 'null' : typeof val;
    if (!MAP_VALID_TYPES[type]) return;
    if (type == 'number' && !Number.isInteger(val)) return; // Only integers
    if (type == 'string') {
      if (ISO_DATE.test(val)) {
        const time = new Date(val).getTime();
        if (!this._dateMin || this._dateMin > time) this._dateMin = time;
        this._dateMap.set(val, { time });
        return;
      } else if (this._opts.insideStrings) {
        const parts = (val as string).split(TOKEN_SEP);
        for (const part of parts) this._mapAdd(part, type);
        return;
      }
    }
    this._mapAdd(val, type);
  }

  addKeyValue = (key: string, value: any): void => {
    this._mapAdd(key, 'string');
    this.addValue(value);
  };

  finish(): void {
    // Create the valueMap selecting only the most used words
    // which compressed are smaller than the original string
    let i = 0;
    Array.from(this._valueMap.entries())
      .map((a) => ((a[1].weight = a[1].count * String(a[0]).length), a))
      .sort((a, b) => b[1].weight! - a[1].weight!)
      .forEach(([key, val]) => {
        const next = i.toString(RADIX);
        const newWeight =
          val.count * (next.length + 1) + String(key).length + 1;
        if (val.weight! > newWeight) {
          val.idx = i++;
          val.idxs = next;
        } else this._valueMap.delete(key);
      });

    // Use the date map, only if there are more than one date
    const dateMin = Math.min(
      ...Array.from(this._dateMap.values()).map((v) => v.time),
    );
    for (const [k, v] of this._dateMap.entries()) {
      v.str = (v.time - dateMin).toString(RADIX);
    }
  }

  private _mapAdd(val: MapValueKey, type: string) {
    if (String(val).length <= 2) return;
    let k = this._valueMap.get(val);
    if (!k) this._valueMap.set(val, (k = { type, count: 0 }));
    k.count++;
  }
}
