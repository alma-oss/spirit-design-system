type Segment = string;
type TwoSegments = `${Segment}.${Segment}`;
type ThreeSegments = `${TwoSegments}.${Segment}`;
type FourSegments = `${ThreeSegments}.${Segment}`;
type DotPath = Segment | TwoSegments | ThreeSegments | FourSegments;
type Translations = { [key: string]: string | Translations };

/**
 * Resolves a translation key from a dot-notation path in a translations object.
 *
 * @param obj - Translations object with string values at leaf nodes
 * @param path - Dot-separated path (e.g. `'common.close'`, `'textField.password.show'`)
 * @returns {string} The value at the path, or the path string if the path is not found
 *
 * @example
 * resolveTranslationKey({ common: { close: 'Close' } }, 'common.close') // 'Close'
 * resolveTranslationKey({ a: { b: { c: 'value' } } }, 'a.b.c') // 'value'
 * resolveTranslationKey({ common: {} }, 'common.missing') // 'common.missing'
 */
export const resolveTranslationKey = (obj: Translations, path: DotPath): string => {
  const keys = path.split('.');
  let current: string | Translations = obj;

  for (const key of keys) {
    if (typeof current === 'object' && current !== null && key in current) {
      current = current[key];
    } else {
      return path;
    }
  }

  return typeof current === 'string' ? current : path;
};
