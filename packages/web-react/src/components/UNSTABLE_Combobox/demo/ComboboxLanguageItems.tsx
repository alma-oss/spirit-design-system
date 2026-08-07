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

export const COMBOBOX_LANGUAGE_OPTION_KEYS = COMBOBOX_LANGUAGE_OPTIONS.map((option) => option.id);

export const getComboboxLanguageOptionKeys = (options: readonly ComboboxLanguageOption[]) =>
  options.map((option) => option.id);

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
