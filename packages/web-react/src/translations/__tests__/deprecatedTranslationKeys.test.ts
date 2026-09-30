import { renderHook } from '@testing-library/react';
import React, { type ReactNode } from 'react';
import { I18nProvider } from '../../context/I18nContext';
import { useI18n } from '../../hooks/useI18n';
import { defaultTranslations } from '../defaults';
import { migrateDeprecatedTranslations, resolveTranslation } from '../deprecatedTranslationKeys';
import { mergeTranslations } from '../mergeTranslations';

describe('deprecated translation keys', () => {
  it('resolves a previous dictionary path from the strings-shaped default', () => {
    expect(resolveTranslation(defaultTranslations, 'picker.add')).toBe('Add');
    expect(resolveTranslation(defaultTranslations, 'picker.addAria')).toBe('Add');
    expect(resolveTranslation(defaultTranslations, 'combobox.addMore')).toBe('+ Add more…');
    expect(resolveTranslation(defaultTranslations, 'combobox.addMore.descriptionAria')).toBe('Add more {label}');
    expect(resolveTranslation(defaultTranslations, 'splitButton.dropdown')).toBe('More');
    expect(resolveTranslation(defaultTranslations, 'textField.password.hide')).toBe('Hide password');
    expect(resolveTranslation(defaultTranslations, 'textArea.counter.charactersEntered')).toBe(
      '{count} characters entered',
    );
  });

  it('keeps sibling defaults when a deprecated leaf override replaces an object', () => {
    const migrated = migrateDeprecatedTranslations({
      combobox: {
        addMore: 'Přidat další',
        addMoreDescription: 'Přidat {label}',
      },
      splitButton: { dropdown: 'Více' },
      textField: { password: { show: 'Zobrazit' } },
    });
    const merged = mergeTranslations(defaultTranslations, migrated);

    expect(resolveTranslation(merged, 'combobox.addMore.label')).toBe('Přidat další');
    expect(resolveTranslation(merged, 'combobox.addMore.descriptionAria')).toBe('Přidat {label}');
    expect(resolveTranslation(merged, 'splitButton.dropdown.trigger')).toBe('Více');
    expect(resolveTranslation(merged, 'splitButton.dropdown')).toBe('Více');
    expect(resolveTranslation(merged, 'textField.showAria')).toBe('Zobrazit');
    expect(resolveTranslation(merged, 'textField.hideAria')).toBe('Hide password');
    expect(resolveTranslation(merged, 'textField.password.show')).toBe('Zobrazit');
  });

  it('keeps an explicit current key when the deprecated key is also set', () => {
    const migrated = migrateDeprecatedTranslations({
      pagination: { next: 'Další', nextAria: 'Dál' },
    });

    expect(resolveTranslation(mergeTranslations(defaultTranslations, migrated), 'pagination.nextAria')).toBe('Dál');
    expect(resolveTranslation(mergeTranslations(defaultTranslations, migrated), 'pagination.next')).toBe('Další');
  });

  it('applies deprecated I18nProvider overrides through useI18n', () => {
    const wrapper = ({ children }: { children: ReactNode }) =>
      React.createElement(
        I18nProvider,
        {
          translations: {
            combobox: { addMore: 'Přidat další' },
            pagination: { goToPage: 'Strana' },
          },
        },
        children,
      );
    const { result } = renderHook(() => useI18n(), { wrapper });

    expect(result.current.t('combobox.addMore.label')).toBe('Přidat další');
    expect(result.current.t('combobox.addMore.descriptionAria')).toBe('Add more {label}');
    expect(result.current.t('combobox.addMore')).toBe('Přidat další');
    expect(result.current.t('pagination.pageAria')).toBe('Strana');
    expect(result.current.t('pagination.goToPage')).toBe('Strana');
  });
});
