import { getColorSchemeClassName } from '../getColorSchemeClassName';

describe('getColorSchemeClassName', () => {
  it('should return an unprefixed basic color scheme class', () => {
    expect(
      getColorSchemeClassName({
        color: 'selected',
      }),
    ).toBe('color-scheme-on-selected-basic');
  });

  it('should return an unprefixed subtle color scheme class', () => {
    expect(
      getColorSchemeClassName({
        color: 'neutral',
        isSubtle: true,
      }),
    ).toBe('color-scheme-on-neutral-subtle');
  });

  it('should return a prefixed color scheme class', () => {
    expect(
      getColorSchemeClassName({
        color: 'success',
      }),
    ).toBe('color-scheme-on-emotion-success-basic');
  });

  it('should return a prefixed subtle color scheme class', () => {
    expect(
      getColorSchemeClassName({
        color: 'warning',
        isSubtle: true,
      }),
    ).toBe('color-scheme-on-emotion-warning-subtle');
  });
});
