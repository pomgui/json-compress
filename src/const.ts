import { VERSION } from './version';

export const PROTOCOL_VERSION = (() => {
  const v = VERSION.replace(/\..*$/, '');
  return v > '1' ? v : '';
})();

export const RADIX = 36;
// Array shrinking constants:
export const A_PREFIX = '$'; // Inside each array item
export const SHRINKED_ARR_PREFIX = '$#'; // array[0]
export const TOKEN_MARK = '';
export const A_STR = '$';
export const A_BOOL = '@';
export const A_NUM = '#';
export const A_NULL = '*';
export const PIVOT_KEY = '\u0000';
const TOKEN_SEP_STR = '\\s.,;:!?-';
export const TOKEN_SEP = new RegExp(`[${TOKEN_SEP_STR}]+`);
export const TOKEN_LIKE = new RegExp(`[^${TOKEN_SEP_STR}]+`);
export const TOKEN_LIKE_G = new RegExp(`[^${TOKEN_SEP_STR}]+`, 'g');
export const TOKEN_DEF = new RegExp(`^§[^${TOKEN_SEP_STR}]+$`);
export const MAP_VALID_TYPES: Record<string, string> = {
  boolean: A_BOOL,
  number: A_NUM,
  string: A_STR,
  null: A_NULL,
};
