'use client';

import { useContext } from 'react';
import I18nContext from '../context/I18nContext';
import { defaultLabels, replaceTranslationParams, resolveTranslationKey } from '../translations';

export type TranslateFunction = (key: string, params?: Record<string, unknown>) => string;

export interface UseI18nReturn {
  t: TranslateFunction;
}

/**
 * Hook that provides a translation function with built-in default labels.
 * When the app is wrapped in `I18nProvider`, `t` resolves overrides first, then defaults.
 * With no provider, behavior matches built-in {@link defaultLabels} only.
 *
 * The returned `t` function looks up keys (e.g. `'common.close'`) and optionally replaces
 * placeholders like `{name}` with values from the params object.
 *
 * @returns {UseI18nReturn} Object with `t` function for translating keys to strings
 *
 * @example
 * const { t } = useI18n();
 * t('common.close'); // 'Close'
 * t('unknown.key'); // 'unknown.key'
 * t('greeting', { name: 'World' }); // replaces '{name}' in translation
 */
export const useI18n = (): UseI18nReturn => {
  const mergedTranslations = useContext(I18nContext);
  const translations = mergedTranslations ?? defaultLabels;

  const t: TranslateFunction = (key, params) => {
    const translation = resolveTranslationKey(translations, key);

    return !params ? translation : replaceTranslationParams(translation, params);
  };

  return { t };
};
