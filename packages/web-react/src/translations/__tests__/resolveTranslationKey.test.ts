import { resolveTranslationKey } from '../resolveTranslationKey';

describe('resolveTranslationKey', () => {
  it('should return value for single-level path', () => {
    const obj = { common: { close: 'Close' } };

    expect(resolveTranslationKey(obj, 'common.close')).toBe('Close');
  });

  it('should return value for deeply nested path', () => {
    const obj = { a: { b: { c: 'value' } } };

    expect(resolveTranslationKey(obj, 'a.b.c')).toBe('value');
  });

  it('should return path when key is missing', () => {
    const obj = { common: { close: 'Close' } };

    expect(resolveTranslationKey(obj, 'common.missing')).toBe('common.missing');
  });

  it('should return path when top-level key is missing', () => {
    const obj = { common: { close: 'Close' } };

    expect(resolveTranslationKey(obj, 'unknown.key')).toBe('unknown.key');
  });

  it('should return path when path is empty', () => {
    const obj = { common: { close: 'Close' } };

    expect(resolveTranslationKey(obj, '')).toBe('');
  });

  it('should return path when intermediate value is not an object', () => {
    const obj = { a: 'string' };

    expect(resolveTranslationKey(obj, 'a.b')).toBe('a.b');
  });

  it('should work with translation-like structure', () => {
    const obj = {
      common: { close: 'Close', edit: 'Edit' },
      textField: { password: { show: 'Show password', hide: 'Hide password' } },
    };

    expect(resolveTranslationKey(obj, 'common.close')).toBe('Close');
    expect(resolveTranslationKey(obj, 'common.edit')).toBe('Edit');
    expect(resolveTranslationKey(obj, 'textField.password.show')).toBe('Show password');
    expect(resolveTranslationKey(obj, 'textField.password.hide')).toBe('Hide password');
  });
});
