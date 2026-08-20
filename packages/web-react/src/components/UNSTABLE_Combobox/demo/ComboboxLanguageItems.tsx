'use client';

import React from 'react';
import { Label, UNSTABLE_ComboboxOption } from '../..';

export type ComboboxLanguageOption = { id: string; label: string };

export const COMBOBOX_LANGUAGE_OPTIONS: readonly ComboboxLanguageOption[] = [
  { id: 'cs', label: 'Czech' },
  { id: 'da', label: 'Danish' },
  { id: 'en', label: 'English' },
  { id: 'fi', label: 'Finnish' },
  { id: 'sk', label: 'Slovak' },
];

/** Extra languages shown only after the consumer “loads” search results (typing). */
export const COMBOBOX_LANGUAGE_OPTIONS_EXTENDED: readonly ComboboxLanguageOption[] = [
  { id: 'de', label: 'German' },
  { id: 'fr', label: 'French' },
  { id: 'es', label: 'Spanish' },
  { id: 'it', label: 'Italian' },
  { id: 'nl', label: 'Dutch' },
  { id: 'pl', label: 'Polish' },
  { id: 'hu', label: 'Hungarian' },
  { id: 'pt', label: 'Portuguese' },
  { id: 'sv', label: 'Swedish' },
  { id: 'no', label: 'Norwegian' },
];

export const COMBOBOX_LANGUAGE_OPTIONS_ALL: readonly ComboboxLanguageOption[] = [
  ...COMBOBOX_LANGUAGE_OPTIONS,
  ...COMBOBOX_LANGUAGE_OPTIONS_EXTENDED,
];

export const COMBOBOX_LANGUAGE_OPTION_KEYS = COMBOBOX_LANGUAGE_OPTIONS.map((option) => option.id);

export const COMBOBOX_LANGUAGE_OPTION_KEYS_ALL = COMBOBOX_LANGUAGE_OPTIONS_ALL.map((option) => option.id);

export const getComboboxLanguageOptionKeys = (options: readonly ComboboxLanguageOption[]) =>
  options.map((option) => option.id);

export const sortComboboxLanguageOptions = (options: readonly ComboboxLanguageOption[]) =>
  [...options].sort((a, b) => a.label.localeCompare(b.label));

export const filterComboboxLanguageOptions = (
  query: string,
  options: readonly ComboboxLanguageOption[] = COMBOBOX_LANGUAGE_OPTIONS,
) => {
  const normalised = query.trim().toLowerCase();

  if (!normalised) {
    return [...options];
  }

  return options.filter((option) => option.label.toLowerCase().includes(normalised));
};

export const renderComboboxLanguageItems = (options: readonly ComboboxLanguageOption[] = COMBOBOX_LANGUAGE_OPTIONS) =>
  options.map((option) => (
    <UNSTABLE_ComboboxOption key={option.id} value={option.id}>
      <Label>{option.label}</Label>
    </UNSTABLE_ComboboxOption>
  ));
