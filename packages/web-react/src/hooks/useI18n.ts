import { defaultLabels, replaceTranslationParams, resolveTranslationKey } from '../translations';

type TranslateFunction = (key: string, params?: Record<string, unknown>) => string;

export interface UseI18nReturn {
  t: TranslateFunction;
}

/**
 * Hook that provides a translation function with built-in default labels.
 * The returned `t` function looks up keys (e.g. `'common.close'`) in the default labels
 * and optionally replaces placeholders like `{name}` with values from the params object.
 *
 * @returns {UseI18nReturn} Object with `t` function for translating keys to default strings
 *
 * @example
 * const { t } = useI18n();
 * t('common.close'); // 'Close'
 * t('unknown.key'); // 'unknown.key'
 * t('greeting', { name: 'World' }); // replaces '{name}' in translation
 */
export const useI18n = (): UseI18nReturn => {
  const t: TranslateFunction = (key, params) => {
    const translation = resolveTranslationKey(defaultLabels, key);

    return !params ? translation : replaceTranslationParams(translation, params);
  };

  return { t };
};
