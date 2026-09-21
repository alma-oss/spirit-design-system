'use client';

import React, { createContext, useMemo } from 'react';
import { defaultTranslations } from '../translations/defaults';
import { mergeTranslations } from '../translations/mergeTranslations';
import { type ChildrenProps } from '../types/shared';

export type I18nTranslations = typeof defaultTranslations;

export interface I18nProviderTranslations {
  [key: string]: string | I18nProviderTranslations;
}

export type I18nProviderProps = ChildrenProps & {
  /** Optional locale used when `translations` is a locale catalog. */
  locale?: string;
  /** Partial nested labels or locale catalog merged into {@link defaultTranslations}. */
  translations?: I18nProviderTranslations;
};

const I18nContext = createContext<I18nTranslations | null>(null);
const I18nConsumer = I18nContext.Consumer;

const isNestedTranslations = (value: unknown): value is I18nProviderTranslations =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const hasDefaultTranslationNamespace = (translations: Record<string, unknown>): boolean =>
  Object.keys(translations).some((key) => key in defaultTranslations);

const resolveLocalizedTranslations = (
  translations: I18nProviderTranslations | undefined,
  locale: string,
): I18nProviderTranslations | undefined => {
  if (translations == null || !isNestedTranslations(translations)) {
    return undefined;
  }

  if (hasDefaultTranslationNamespace(translations)) {
    return translations;
  }

  const localized = translations[locale];

  return isNestedTranslations(localized) ? localized : translations;
};

const I18nProvider = ({ children, locale = 'en', translations }: I18nProviderProps) => {
  const value = useMemo((): I18nTranslations => {
    const localizedTranslations = resolveLocalizedTranslations(translations, locale);

    if (localizedTranslations == null || Object.keys(localizedTranslations).length === 0) {
      return defaultTranslations;
    }

    return mergeTranslations(defaultTranslations, localizedTranslations) as I18nTranslations;
  }, [locale, translations]);

  return React.createElement(I18nContext.Provider, { value }, children);
};

export default I18nContext;
export { I18nConsumer, I18nProvider };
