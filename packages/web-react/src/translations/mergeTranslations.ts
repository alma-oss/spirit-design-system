type TranslationTree = { [key: string]: string | TranslationTree };

const isNestedTranslations = (value: unknown): value is TranslationTree =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

/**
 * Deep-clones a nested translation tree (string leaves only).
 *
 * @param tree - Translation object to clone.
 */
const cloneTranslationTree = (tree: TranslationTree): TranslationTree => {
  const result: TranslationTree = {};

  for (const key of Object.keys(tree)) {
    const value = tree[key];
    result[key] = typeof value === 'string' ? value : cloneTranslationTree(value as TranslationTree);
  }

  return result;
};

/**
 * Merges user translation overrides into default labels. Override wins per key;
 * nested objects are merged recursively so partial overrides keep defaults for missing keys.
 *
 * @param base - Default translation tree.
 * @param override - User overrides merged into `base`.
 */
export const mergeTranslations = (base: TranslationTree, override: TranslationTree): TranslationTree => {
  const result = cloneTranslationTree(base);

  for (const key of Object.keys(override)) {
    const overrideVal = override[key];
    const baseVal = result[key];

    if (typeof overrideVal === 'string') {
      result[key] = overrideVal;
    } else if (isNestedTranslations(overrideVal)) {
      if (typeof baseVal === 'string') {
        result[key] = mergeTranslations({}, overrideVal);
      } else if (isNestedTranslations(baseVal)) {
        result[key] = mergeTranslations(baseVal, overrideVal);
      } else {
        result[key] = mergeTranslations({}, overrideVal);
      }
    }
  }

  return result;
};
