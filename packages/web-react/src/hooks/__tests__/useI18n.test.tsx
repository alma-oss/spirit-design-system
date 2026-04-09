import { renderHook } from '@testing-library/react';
import React, { type ReactNode } from 'react';
import { I18nProvider, type I18nProviderProps } from '../../context/I18nContext';
import { useI18n } from '../useI18n';

jest.mock('../../translations/defaults', () => ({
  defaultTranslations: {
    common: { close: 'Close', edit: 'Edit' },
    pagination: { next: 'Next' },
    textField: { password: { show: 'Show password', hide: 'Hide password' } },
    test: {
      greeting: 'Hello, {name}!',
      greetingTwice: 'Hi {name}, hello {name}!',
      pageOf: 'Page {current} of {total}',
      count: 'Count: {count}',
    },
  },
}));

describe('useI18n', () => {
  type ProviderOptions = {
    locale?: I18nProviderProps['locale'];
    translations?: I18nProviderProps['translations'];
  };

  const createProviderWrapper = ({ locale, translations }: ProviderOptions) => {
    const Wrapper = ({ children }: { children: ReactNode }) => (
      <I18nProvider locale={locale} translations={translations}>
        {children}
      </I18nProvider>
    );

    return Wrapper;
  };

  it('should return t function', () => {
    const { result } = renderHook(() => useI18n());

    expect(typeof result.current.t).toBe('function');
  });

  it('should return default value for known key', () => {
    const { result } = renderHook(() => useI18n());
    const { t } = result.current;

    expect(t('common.close')).toBe('Close');
    expect(t('pagination.next')).toBe('Next');
    expect(t('textField.password.show')).toBe('Show password');
  });

  it('should return key itself for unknown key', () => {
    const { result } = renderHook(() => useI18n());
    const { t } = result.current;

    expect(t('unknown.key')).toBe('unknown.key');
    expect(t('another.missing.key')).toBe('another.missing.key');
  });

  it('should return correct deeply nested value', () => {
    const { result } = renderHook(() => useI18n());
    const { t } = result.current;

    expect(t('textField.password.hide')).toBe('Hide password');
  });

  it('should replace placeholders with params for unknown key', () => {
    const { result } = renderHook(() => useI18n());
    const { t } = result.current;

    expect(t('test.message.{name}', { name: 'World' })).toBe('test.message.World');
  });

  describe('parameter interpolation with valid translation keys', () => {
    it('should replace single placeholder in resolved translation', () => {
      const { result } = renderHook(() => useI18n());
      const { t } = result.current;

      expect(t('test.greeting', { name: 'World' })).toBe('Hello, World!');
    });

    it('should replace all occurrences when same placeholder appears twice', () => {
      const { result } = renderHook(() => useI18n());
      const { t } = result.current;

      expect(t('test.greetingTwice', { name: 'World' })).toBe('Hi World, hello World!');
    });

    it('should replace multiple placeholders in one translation', () => {
      const { result } = renderHook(() => useI18n());
      const { t } = result.current;

      expect(t('test.pageOf', { current: 2, total: 10 })).toBe('Page 2 of 10');
    });

    it('should convert param values to string when interpolating', () => {
      const { result } = renderHook(() => useI18n());
      const { t } = result.current;

      expect(t('test.count', { count: 42 })).toBe('Count: 42');
    });

    it('should return translation unchanged when params is empty for key with placeholders', () => {
      const { result } = renderHook(() => useI18n());
      const { t } = result.current;

      expect(t('test.greeting')).toBe('Hello, {name}!');
    });
  });

  describe('I18nProvider', () => {
    it('should prefer provider translations over defaults', () => {
      const wrapper = createProviderWrapper({ translations: { common: { close: 'Zavřít' } } });
      const { result } = renderHook(() => useI18n(), { wrapper });

      expect(result.current.t('common.close')).toBe('Zavřít');
    });

    it('should fall back to defaults for keys not overridden in a partial namespace', () => {
      const wrapper = createProviderWrapper({ translations: { common: { close: 'Zavřít' } } });
      const { result } = renderHook(() => useI18n(), { wrapper });

      expect(result.current.t('common.edit')).toBe('Edit');
    });

    it('should keep using defaults for keys outside overridden namespaces', () => {
      const wrapper = createProviderWrapper({ translations: { common: { close: 'Zavřít' } } });
      const { result } = renderHook(() => useI18n(), { wrapper });

      expect(result.current.t('pagination.next')).toBe('Next');
    });

    it('should interpolate placeholders using provider strings', () => {
      const wrapper = createProviderWrapper({
        translations: {
          test: { greeting: 'Ahoj, {name}!' },
        } as unknown as NonNullable<I18nProviderProps['translations']>,
      });
      const { result } = renderHook(() => useI18n(), { wrapper });

      expect(result.current.t('test.greeting', { name: 'World' })).toBe('Ahoj, World!');
    });

    it('should use locale-specific catalog when locale is set', () => {
      const wrapper = createProviderWrapper({
        locale: 'cs',
        translations: {
          en: { common: { close: 'Close EN' } },
          cs: { common: { close: 'Zavřít' } },
        } as unknown as NonNullable<I18nProviderProps['translations']>,
      });
      const { result } = renderHook(() => useI18n(), { wrapper });

      expect(result.current.t('common.close')).toBe('Zavřít');
    });

    it('should default to en locale when locale is omitted for locale catalog', () => {
      const wrapper = createProviderWrapper({
        translations: {
          en: { common: { close: 'Close EN' } },
          cs: { common: { close: 'Zavřít' } },
        } as unknown as NonNullable<I18nProviderProps['translations']>,
      });
      const { result } = renderHook(() => useI18n(), { wrapper });

      expect(result.current.t('common.close')).toBe('Close EN');
    });

    it('should fall back to defaults when selected locale does not exist in catalog', () => {
      const wrapper = createProviderWrapper({
        locale: 'de',
        translations: {
          cs: { common: { close: 'Zavřít' } },
        } as unknown as NonNullable<I18nProviderProps['translations']>,
      });
      const { result } = renderHook(() => useI18n(), { wrapper });

      expect(result.current.t('common.close')).toBe('Close');
    });
  });
});
