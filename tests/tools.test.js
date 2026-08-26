const { escapeText, unescapeText } = require('../src/tools/tools');

describe('Tools', () => {
  describe('Escape', () => {
    test('escapeText', () => {
      expect(escapeText('These \\ are # escaped$, @')).toBe(
        'These \\\\ are \\# escaped\\$, \\@',
      );
    });
  });

  describe('Unescape', () => {
    test('Normal', () => {
      expect(unescapeText('These \\\\ are \\# escaped\\$, \\@')).toBe(
        'These \\ are # escaped$, @',
      );
    });
    test('\\ at the end', () => {
      expect(unescapeText('These \\\\ are \\# escaped\\$, \\@\\')).toBe(
        'These \\ are # escaped$, @\\',
      );
    });
    test('\\ with non control chars', () => {
      expect(unescapeText('here \\w and \\!')).toBe('here \\w and \\!');
    });
    test('\\ with+without non control chars', () => {
      expect(unescapeText('here \\w and \\!, but \\$')).toBe(
        'here \\w and \\!, but $',
      );
    });
  });
});
