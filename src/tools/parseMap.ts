import { A_BOOL, A_NULL, A_NUM, A_STR } from '../const';
import { MapValueKey } from '../types';

export function parseTokenMap(input: string): MapValueKey[] {
  const result: MapValueKey[] = [];
  const typeMarkers = new Set([A_STR, A_BOOL, A_NUM, A_NULL]);
  let i = 0;

  while (i < input.length) {
    const char = input[i];

    if (!typeMarkers.has(char)) {
      i++;
      continue;
    }

    const type = char;
    i++; // Avança o marcador de tipo

    switch (type) {
      case A_STR: {
        let value = '';
        let escaped = false;

        while (i < input.length) {
          const current = input[i];

          if (escaped) {
            value += current;
            escaped = false;
          } else if (current === '\\') {
            escaped = true;
          } else if (typeMarkers.has(current)) {
            break; // Encontrou o próximo tipo não-escapado
          } else {
            value += current;
          }
          i++;
        }

        result.push(value);
        break;
      }

      case A_BOOL: {
        if (i < input.length) {
          const val = input[i];
          if (val === '1') result.push(true);
          else if (val === '0') result.push(false);
          i++;
        }
        break;
      }

      case A_NUM: {
        let rawBase36 = '';
        while (i < input.length && /[0-9a-z]/i.test(input[i])) {
          rawBase36 += input[i];
          i++;
        }
        if (rawBase36.length > 0) {
          result.push(parseInt(rawBase36, 36));
        }
        break;
      }

      case A_NULL: {
        result.push(null);
        break;
      }
    }
  }

  return result;
}
