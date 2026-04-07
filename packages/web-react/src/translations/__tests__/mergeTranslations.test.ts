import { mergeTranslations } from '../mergeTranslations';

type TestTree = {
  common: { close: string; edit: string };
  nested: { a: { b: string } };
  leaf: string;
};

describe('mergeTranslations', () => {
  const base: TestTree = {
    common: { close: 'Close', edit: 'Edit' },
    nested: { a: { b: 'deep' } },
    leaf: 'value',
  };

  it('returns equivalent structure when override is empty', () => {
    const merged = mergeTranslations(base, {});

    expect(merged).toEqual(base);
    expect(merged).not.toBe(base);
    expect(merged.common).not.toBe(base.common);
  });

  it('overrides a nested string leaf', () => {
    const merged = mergeTranslations(base, { common: { close: 'Schließen' } }) as TestTree;

    expect(merged.common.close).toBe('Schließen');
    expect(merged.common.edit).toBe('Edit');
  });

  it('merges partial nested objects without dropping sibling defaults', () => {
    const merged = mergeTranslations(base, { nested: { a: {} } }) as TestTree;

    expect(merged.nested.a.b).toBe('deep');
  });

  it('replaces a subtree when override provides a string for a former branch', () => {
    const merged = mergeTranslations(base, { nested: 'replaced' });

    expect(merged.nested).toBe('replaced');
  });

  it('adds keys only present in override', () => {
    const merged = mergeTranslations(base, { extra: { key: 'new' } });

    expect(merged).toEqual({ ...base, extra: { key: 'new' } });
  });
});
