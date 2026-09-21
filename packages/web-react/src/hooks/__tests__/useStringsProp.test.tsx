import { renderHook } from '@testing-library/react';
import React, { type ReactNode } from 'react';
import { I18nProvider } from '../../context/I18nContext';
import { useStringsProp } from '../useStringsProp';

describe('useStringsProp', () => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <I18nProvider
      translations={{
        common: { close: 'Close' },
        picker: { selectionAriaLabel: 'Selected {label}' },
      }}
    >
      {children}
    </I18nProvider>
  );

  it('prefers the strings value over a deprecated alias and the dictionary key', () => {
    const { result } = renderHook(
      () =>
        useStringsProp({
          close: { value: 'Dismiss', deprecated: 'Legacy', key: 'common.close' },
        }),
      { wrapper },
    );

    expect(result.current.close).toBe('Dismiss');
  });

  it('uses the deprecated alias when the strings value is unset', () => {
    const { result } = renderHook(
      () =>
        useStringsProp({
          close: { deprecated: 'Legacy', key: 'common.close' },
        }),
      { wrapper },
    );

    expect(result.current.close).toBe('Legacy');
  });

  it('falls back to the dictionary key', () => {
    const { result } = renderHook(
      () =>
        useStringsProp({
          close: { key: 'common.close' },
        }),
      { wrapper },
    );

    expect(result.current.close).toBe('Close');
  });

  it('returns undefined when no value, alias, or key is set', () => {
    const { result } = renderHook(
      () =>
        useStringsProp({
          close: {},
        }),
      { wrapper },
    );

    expect(result.current.close).toBeUndefined();
  });

  it('interpolates runtime params into the dictionary fallback', () => {
    const { result } = renderHook(
      () =>
        useStringsProp({
          selection: { key: 'picker.selectionAriaLabel', params: { label: 'Languages' } },
        }),
      { wrapper },
    );

    expect(result.current.selection).toBe('Selected Languages');
  });

  it('interpolates runtime params into a literal override', () => {
    const { result } = renderHook(
      () =>
        useStringsProp({
          selection: { value: 'Chosen {label}', params: { label: 'Languages' } },
        }),
      { wrapper },
    );

    expect(result.current.selection).toBe('Chosen Languages');
  });
});
