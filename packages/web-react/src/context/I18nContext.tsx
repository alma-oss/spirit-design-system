'use client';

import React, { createContext, useMemo } from 'react';
import { defaultTranslations } from '../translations/defaults';
import { mergeTranslations } from '../translations/mergeTranslations';
import { type ChildrenProps } from '../types/shared';

type TranslationTree = { [key: string]: string | TranslationTree };

export type I18nTranslations = typeof defaultTranslations;

type NestedPartial<T> = {
  [K in keyof T]?: T[K] extends string ? string : T[K] extends object ? NestedPartial<T[K]> : never;
};

type LocaleCatalog = Record<string, NestedPartial<I18nTranslations>>;

export type I18nProviderTranslations = NestedPartial<I18nTranslations> | LocaleCatalog;

export type I18nProviderProps = ChildrenProps & {
  /** Optional locale used when `translations` is a locale catalog. */
  locale?: string;
  /** Partial nested labels or locale catalog merged into {@link defaultTranslations}. */
  translations?: I18nProviderTranslations;
};

const I18nContext = createContext<I18nTranslations | null>(null);
const I18nConsumer = I18nContext.Consumer;

const isNestedTranslations = (value: unknown): value is TranslationTree =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const hasDefaultTranslationNamespace = (translations: Record<string, unknown>): boolean =>
  Object.keys(translations).some((key) => key in defaultTranslations);

const resolveLocalizedTranslations = (
  translations: I18nProviderTranslations | undefined,
  locale: string,
): TranslationTree | undefined => {
  if (translations == null || !isNestedTranslations(translations)) {
    return undefined;
  }

  if (hasDefaultTranslationNamespace(translations)) {
    return translations as TranslationTree;
  }

  const localized = (translations as LocaleCatalog)[locale];

  return isNestedTranslations(localized) ? (localized as TranslationTree) : undefined;
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
