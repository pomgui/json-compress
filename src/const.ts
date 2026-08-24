import { VERSION } from './version';

export const PROTOCOL_VERSION = (() => {
  const v = VERSION.replace(/\..*$/, '');
  return v > '1' ? v : '';
})();
