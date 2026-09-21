import { replaceTranslationParams } from '../replaceTranslationParams';
import { resolveComponentString, resolveComponentStrings } from '../resolveComponentString';

describe('resolveComponentString', () => {
  const t = jest.fn((key: string, params?: Record<string, unknown>) => {
    const translations: Record<string, string> = {
      'common.close': 'Close',
      'modal.close': 'Close {name}',
    };
    const translation = translations[key] ?? key;

    return replaceTranslationParams(translation, params ?? {});
  });

  beforeEach(() => {
    t.mockClear();
  });

  it('returns a literal string without calling the translation function', () => {
    expect(resolveComponentString('Dismiss', t)).toBe('Dismiss');
    expect(t).not.toHaveBeenCalled();
  });

  it('interpolates runtime parameters in a literal string', () => {
    expect(resolveComponentString('Close {name}', t, { name: 'Settings' })).toBe('Close Settings');
  });

  it('resolves a translation reference', () => {
    expect(resolveComponentString({ key: 'common.close' }, t)).toBe('Close');
    expect(t).toHaveBeenCalledWith('common.close', {});
  });

  it('merges runtime and reference parameters with reference precedence', () => {
    expect(
      resolveComponentString({ key: 'modal.close', params: { name: 'Profile' } }, t, {
        name: 'Settings',
        unused: true,
      }),
    ).toBe('Close Profile');
    expect(t).toHaveBeenCalledWith('modal.close', { name: 'Profile', unused: true });
  });
});

describe('resolveComponentStrings', () => {
  const t = jest.fn((key: string, params?: Record<string, unknown>) => {
    const translations: Record<string, string> = {
      'common.close': 'Close',
      'picker.add': 'Add',
      'picker.selectionAriaLabel': 'Selected {label}',
    };
    const translation = translations[key] ?? key;

    return replaceTranslationParams(translation, params ?? {});
  });

  beforeEach(() => {
    t.mockClear();
  });

  it('resolves each source with override, alias, then fallback key', () => {
    const resolved = resolveComponentStrings(
      {
        ariaAdd: { value: undefined, key: 'picker.add' },
        ariaClose: { value: 'Dismiss', key: 'common.close' },
        ariaSelection: { value: undefined, key: 'picker.selectionAriaLabel', params: { label: 'Languages' } },
      },
      t,
    );

    expect(resolved).toEqual({
      ariaAdd: 'Add',
      ariaClose: 'Dismiss',
      ariaSelection: 'Selected Languages',
    });
  });
});
