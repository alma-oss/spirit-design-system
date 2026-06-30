import { resolveImportSources } from '../resolveImportSources';

describe('resolveImportSources', () => {
  it('should return parsed value from sade when present', () => {
    expect(resolveImportSources(['-p', './src', '-s', '@org/design-system'], '@org/design-system')).toBe(
      '@org/design-system',
    );
  });

  it('should read --import-sources= form from argv', () => {
    expect(resolveImportSources(['-p', './src', '--import-sources=@org/design-system'])).toBe('@org/design-system');
  });

  it('should read -s value from next argv token', () => {
    expect(resolveImportSources(['-p', './src', '-s', '@org/design-system', '-t', 'v5/web-react/item-props'])).toBe(
      '@org/design-system',
    );
  });

  it('should find loose scoped package after -s when zsh drops the bound value', () => {
    expect(
      resolveImportSources(['-p', './src', '-s', '-t', 'v5/web-react/flex-direction-values', '@org/design-system']),
    ).toBe('@org/design-system');
  });

  it('should return undefined when no import sources are provided', () => {
    expect(resolveImportSources(['-p', './src', '-t', 'v5/web-react/item-props'])).toBeUndefined();
  });
});
